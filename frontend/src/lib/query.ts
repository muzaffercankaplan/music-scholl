import { QueryClient } from "@tanstack/react-query";

let queryClientSingleton: QueryClient | null = null;

export function getQueryClient(): QueryClient {
  if (!queryClientSingleton) {
    queryClientSingleton = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30_000,
          refetchOnWindowFocus: false,
          retry: 1,
        },
        mutations: {
          retry: 0,
        },
      },
    });
  }
  return queryClientSingleton;
}
