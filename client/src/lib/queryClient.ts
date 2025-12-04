import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { resolveApi } from "./mockApi";

// This is a static, server-less demo: query keys that look like "/api/..." are
// resolved against the in-memory mock data instead of being fetched over HTTP.
type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  () =>
  async ({ queryKey }) => {
    const path = queryKey.join("/") as string;
    return await resolveApi(path);
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
