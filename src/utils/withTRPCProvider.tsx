import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCRouter } from "../server/api/trpc";
import type { PropsWithChildren } from "react";
import superjson from "superjson";

const Router = createTRPCRouter({});
const trpcReact = createTRPCReact<typeof Router>();

const url = `${process.env.NEXTAUTH_URL as string}/api/trpc`;

const queryClient = new QueryClient();

const trpcClient = trpcReact.createClient({
  links: [httpBatchLink({ url })],
  transformer: superjson,
});

const withTRPCProvider = ({ children }: PropsWithChildren) => {
  return (
    <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpcReact.Provider>
  );
};

export default withTRPCProvider;
