import prisma from "db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    collected: {
        m: number;
        t: number;
        w: number;
        th: number;
        f: number;
        s: number;
        su: number;
    }
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const USER_ID = 1; // TODO: get user id from session

    const badges = await prisma.collectedBadges.findMany({
        where: {
            userId: USER_ID
        },
        select: {
            badgeId: true,
            collectedAt: false,
            id: false,
            userId: false
        }
    })

    const dateC = (d: number) => badges.filter(badge => badge.badgeId === d).length;

    const collected = {
        m: dateC(1),
        t: dateC(2),
        w: dateC(3),
        th: dateC(4),
        f: dateC(5),
        s: dateC(6),
        su: dateC(7)
    }

    return res.status(200).json({
        collected
    })
};

export default handler;