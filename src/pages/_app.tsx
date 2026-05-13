import type { AppProps } from "next/app";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { AuthProvider } from "src/global-state/AuthContext";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
}