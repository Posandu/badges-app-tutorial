import {
	Box,
	Button,
	Container,
	Flex,
	Grid,
	Heading,
	Text,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

import ColormodeToggle from "@/colormodeToggle";

type Data = {
	collected: {
		m: number;
		t: number;
		w: number;
		th: number;
		f: number;
		s: number;
		su: number;
	};
};

const Home: NextPage = () => {
	const [collectedData, setCollectedData] = useState<Data>();
	const [update, setUpdate] = useState(0);
	const toast = useToast();

	const days = ["m", "t", "w", "th", "f", "s", "su"];

	useEffect(() => {
		fetch("/api/getCollectedBadges")
			.then((r) => r.json())
			.then((res) => {
				setCollectedData(res as Data);
				console.log(res);
			})
			.catch(() => {
				toast({
					title: "Error",
					description: "There was an error getting the badges",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [update]);

	const boxBorder = useColorModeValue("gray.300", "gray.700");
	const textColor = useColorModeValue("gray.600", "gray.400");

	return (
		<Container maxW="6xl" p={4}>
			<Grid templateColumns="repeat(3, 1fr)" gap={4} mb={4}>
				<Heading>Welcome user!</Heading>

				<Flex justifyContent="flex-end">
					<ColormodeToggle />
				</Flex>
			</Grid>

			<Heading my={8} size="md">
				Here are the available badges
			</Heading>

			<Grid templateColumns="repeat(7, 1fr)" gap={4}>
				{[...Array(7)].map((_, i) => (
					<Box
						key={i}
						borderRadius="md"
						shadow="md"
						border="1px"
						borderColor={boxBorder}
						p={4}
						_hover={{
							shadow: "lg",
						}}
					>
						<Image
							src={`/badges/${i}.png`}
							alt="badge"
							width={200}
							height={200}
						/>

						<Text align="center" my={4}>
							{"Mon|Tues|Wenes|Thurs|Fri|Satur|Sun".split("|")[
								i
							] + "day"}
						</Text>

						<Text align="center" color={textColor}>
							{
								//@ts-ignore
								collectedData?.collected[days[i]]
							}{" "}
							collected
						</Text>
					</Box>
				))}
			</Grid>

			<Button
				mt={4}
				colorScheme="blue"
				onClick={() => {
					fetch("/api/collect")
						.then((r) => r.json())
						.then((res) => {
							if (res.collected) {
								toast({
									title: "Success",
									description: "You have collected a badge",
									status: "success",
									duration: 5000,
									isClosable: true,
								});

								setUpdate((prev) => prev + 1);
							} else {
								toast({
									title: "Error",
									description:
										"You have already collected today's badge",
									status: "error",
									duration: 5000,
									isClosable: true,
								});
							}
						});
				}}
			>
				Collect badge
			</Button>
		</Container>
	);
};

export default Home;
