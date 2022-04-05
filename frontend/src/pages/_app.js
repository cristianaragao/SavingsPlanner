import Head from "next/head";

import "../styles/globals.css";

import ContextProvider from "../components/context/Context";
import ApolloProvider from "../api";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Planejador de Poupança</title>
      </Head>
      <ApolloProvider>
        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
