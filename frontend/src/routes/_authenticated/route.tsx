import {
  createFileRoute,
  Outlet,
  Navigate,
  useLoaderData,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedRoute,
});

function AuthenticatedRoute() {
  const currentUser = useLoaderData({ from: "__root__" });
  if (!currentUser) {
    return <Navigate to="/login" search={{ redirect: location.pathname }} />;
  }
  return <Outlet />;
}
