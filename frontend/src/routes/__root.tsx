import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

import { LogoutButton } from "@/components/LogoutButton";
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
  const currentUser = Route.useLoaderData();

  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/applications/url" className="[&.active]:font-bold">
          Create Application
        </Link>{" "}
        {!currentUser && (
          <Link to="/login" className="[&.active]:font-bold">
            Login
          </Link>
        )}
        {currentUser && <LogoutButton />}
      </div>
      <Outlet />
      <Toaster />
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  );
}
