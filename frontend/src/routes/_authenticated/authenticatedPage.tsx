import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/authenticatedPage")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/authenticatedPage"!</div>;
}
