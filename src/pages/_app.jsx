import "@/styles/globals.css";
import Layout from "../layout";
import { Fragment, useState } from "react";
import Head from "next/head";

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
          <Head>
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
