import {
  createFileRoute,
  Outlet,
  Navigate,
  useLoaderData,
} from "@tanstack/react-router";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar, MobileSidebarTrigger } from "@/components/AppSidebar";
import { Breadcrumbs } from "@/components/Breadcrumbs";

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
      <div className="size-full flex flex-col">
        <div className="p-4">
          <Breadcrumbs />
        </div>
        <div className="w-full grow flex items-center justify-center @container">
          <Outlet />
          <MobileSidebarTrigger />
        </div>
      </div>
    </SidebarProvider>
  );
}
