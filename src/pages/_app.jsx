import "@/styles/globals.css";
import Layout from "../layout";
import { Fragment } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();
function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Fragment>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Fragment>
    </QueryClientProvider>
  );
}

export default App;
