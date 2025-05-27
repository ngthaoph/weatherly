import "@/styles/globals.css";
import Layout from "../layout";
import { Fragment, useState } from "react";

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
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Fragment>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
