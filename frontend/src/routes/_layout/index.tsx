import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
  component: Index,
  loader: () => ({
    crumb: "Dashboard",
  }),
});

function Index() {
  return (
    <div className="p-2">
      <h3>This will be a dashboard of your applications</h3>
    </div>
  );
}
