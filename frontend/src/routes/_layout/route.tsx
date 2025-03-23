import {
  createFileRoute,
  Outlet,
  Navigate,
  useLoaderData,
} from "@tanstack/react-router";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar, MobileSidebarTrigger } from "@/components/AppSidebar";

export const Route = createFileRoute("/_layout")({
  component: AuthenticatedRoute,
});

function AuthenticatedRoute() {
  const currentUser = useLoaderData({ from: "__root__" });
  if (!currentUser) {
    return <Navigate to="/login" search={{ redirect: location.pathname }} />;
  }
  return (
    <SidebarProvider>
      <AppSidebar currentUser={currentUser} />
      <main className="size-full">
        <Outlet />
        <MobileSidebarTrigger />
      </main>
    </SidebarProvider>
  );
}
