import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import { auth } from "@/lib/auth";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const router = createRouter({
  routeTree,
  context: {
    auth,
    queryClient: undefined!,
  },
  scrollRestoration: true,
});
