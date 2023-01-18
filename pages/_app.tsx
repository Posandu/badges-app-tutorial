// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

import theme from "$/theme";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<NextNProgress
				height={2}
				startPosition={0.0}
				options={{ showSpinner: false }}
			/>

			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
