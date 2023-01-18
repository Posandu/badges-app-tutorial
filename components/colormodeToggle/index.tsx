import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import type { NextPage } from "next";

const ColormodeToggle: NextPage = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<>
			<IconButton
				onClick={toggleColorMode}
				variant="outline"
				rounded="full"
				aria-label={colorMode === "light" ? "Dark mode" : "Light mode"}
				icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
			/>
		</>
	);
};

export default ColormodeToggle;
