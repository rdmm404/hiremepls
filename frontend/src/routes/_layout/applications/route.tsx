import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/applications")({
  component: RouteComponent,
  loader: () => ({
    crumb: "Applications",
  }),
});

function RouteComponent() {
  return <Outlet />;
}
