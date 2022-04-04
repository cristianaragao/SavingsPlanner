import Head from "next/head";

import "../styles/globals.css";

import Provider from "../components/context/Context";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Planejador de Poupança</title>
      </Head>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
