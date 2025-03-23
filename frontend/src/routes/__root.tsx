import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/sonner";
import { Auth } from "@/lib/auth";

interface RouterContext {
  queryClient: QueryClient;
  auth: Auth;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  loader: async ({ context }) => {
    return await context.auth.getCurrentUser();
  },
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools position="top-right" />
      <ReactQueryDevtools buttonPosition="top-right" />
    </>
  );
}
