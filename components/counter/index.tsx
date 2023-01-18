import { Button, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";

const Counter: NextPage = () => {
	const [count, setCount] = useState(0);
	const toast = useToast();

	return (
		<>
			<Text mt={6} fontSize="2xl" mb={4}>
				Count: {count}
			</Text>

			<Button onClick={() => setCount(count + 1)}>+1</Button>

			<Button
				onClick={() => {
					setCount(count - 1);
					toast({
						title: ":| Think positive!",
						description: "You can do it!",
						icon: "👍",
						status: "warning",
					});
				}}
				ml={2}
			>
				-1
			</Button>
		</>
	);
};

export default Counter;
