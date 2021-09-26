import { Provider } from "next-auth/client";
import { AppProps } from "next/app";
import { FC } from "react";
import Layout from "../components/common/Layout";
import "../styles/globals.css";

const _App: FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<Provider session={pageProps.session}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
};

export default _App;
