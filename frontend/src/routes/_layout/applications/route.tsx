import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ApplicationModalsProvider } from "@/contexts/ApplicationModalsContext";

export const Route = createFileRoute("/_layout/applications")({
  component: RouteComponent,
  loader: () => ({
    crumb: "Applications",
  }),
});

function RouteComponent() {
  return (
    <ApplicationModalsProvider>
      <Outlet />
    </ApplicationModalsProvider>
  );
}
