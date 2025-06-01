import "@/styles/globals.css";
import Layout from "../layout";
import { Fragment, useState } from "react";
import Head from "next/head";
import Script from "next/script";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { ThemeProvider } from "@/context/ThemeContext";

// Create a client
const queryClient = new QueryClient();
function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Fragment>
          <Script
            src={"https://www.googletagmanager.com/gtag/js?id=G-YSZLCLEYBX"}
            strategy="afterInteractive"
          />
          <Script id="google-analytics-script" strategy="afterInteractive">
            {` window.dataLayer = window.dataLayer || []; function gtag()
            {dataLayer.push(arguments)}
            gtag('js', new Date()); gtag('config', 'G-YSZLCLEYBX');`}
          </Script>

          <Head>
            <title>Weatherly</title>
            <meta
              name="description"
              content="Get up-to-date weather forecasts for cities across Australia including temperature, rain probability, and more."
            />

            <meta
              name="google-site-verification"
              content="IYJ89LdoROJCl6W1XtRXDWvZG65k0IC2RFA18frH53w"
            />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Fragment>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
