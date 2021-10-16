import {
	ApolloClient,
	ApolloProvider,
	HttpLink,
	InMemoryCache
} from "@apollo/client";
import { AppProps } from "next/app";
import { FC } from "react";
import Layout from "../components/common/Layout";
import { __serverUrl__ } from "../lib/constants";
import "../styles/globals.css";

const client = new ApolloClient({
	link: new HttpLink({ uri: `${__serverUrl__}/graphql` }),
	cache: new InMemoryCache()
});

const _App: FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<ApolloProvider client={client}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ApolloProvider>
	);
};

export default _App;
