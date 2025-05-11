import "@/styles/globals.css";
import Layout from "../layout";
import { Fragment } from "react";
import Head from "next/head";

function App({ Component, pageProps }) {
  return (
    <Fragment>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  );
}

export default App;
