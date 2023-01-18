import prisma from "db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    collected: boolean;
    date?: any
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const USER_ID = 1; // TODO: get user id from session

    // Get server date
    const serverDate = new Date();

    // Get the number of the day name starting from monday
    const dayNumber = serverDate.getDay() === 0 ? 7 : serverDate.getDay(); // 1-7

    // Get user's last collected item
    const lastCollected = await prisma.users.findUnique({
        where: { id: USER_ID },
    })

    let lastCollectedDate = new Date();

    if (lastCollected?.lastBadgeId) {
        const data = await prisma.collectedBadges.findUnique({
            where: { id: lastCollected.lastBadgeId },
        })

        if (data) {
            lastCollectedDate = new Date(data.collectedAt);
        }
    } else {
        // New user
        const data = await prisma.collectedBadges.create({
            data: {
                userId: USER_ID,
                badgeId: dayNumber,
            }
        })

        await prisma.users.update({
            where: { id: USER_ID },
            data: {
                lastBadgeId: data.id
            }
        })

        return res.status(200).json({
            collected: true
        })
    }


    // If the last collected item is from today, return false
    if (
        lastCollectedDate.getDate() === serverDate.getDate() &&  // Same day
        lastCollectedDate.getMonth() === serverDate.getMonth() &&  // Same month
        lastCollectedDate.getFullYear() === serverDate.getFullYear() // Same year
    ) {
        return res.status(200).json({
            collected: false,
            date: {
                lastCollectedDate,
                serverDate
            }
        })
    } else {
        // Create new collected badge
        const data = await prisma.collectedBadges.create({
            data: {
                userId: USER_ID,
                badgeId: dayNumber,
            }
        })

        // Update user's last collected badge id
        await prisma.users.update({
            where: { id: USER_ID },
            data: {
                lastBadgeId: data.id
            }
        })

        return res.status(200).json({
            collected: true
        })
    }
};

export default handler;