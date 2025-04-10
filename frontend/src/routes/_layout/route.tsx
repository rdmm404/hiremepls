import {
  createFileRoute,
  Outlet,
  Navigate,
  useLoaderData,
} from "@tanstack/react-router";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MobileNavBar } from "@/components/MobileNavBar";

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
      <div className="hidden sm:block">
        <AppSidebar currentUser={currentUser} />
      </div>
      <div className="size-full flex flex-col">
        <div className="hidden sm:block p-4">
          <Breadcrumbs />
        </div>
        <div className="w-full grow flex flex-col items-center justify-center pb-16 sm:pb-0 @container">
          <Outlet />
        </div>
        <MobileNavBar />
      </div>
    </SidebarProvider>
  );
}
