import { ChevronsRight, ChevronsLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { User } from "@/gen";
import { useNavigationMenu } from "@/hooks/useNavigationMenu";
import { UserDropdown } from "@/components/UserDropdown";

function InlineSidebarTrigger() {
  const { toggleSidebar, open } = useSidebar();
  return (
    <SidebarMenuButton
      onClick={(e) => {
        e.preventDefault();
        toggleSidebar();
      }}
    >
      {open ? <ChevronsLeft /> : <ChevronsRight />}
    </SidebarMenuButton>
  );
}

interface SidebarProps {
  currentUser?: User;
}

export function AppSidebar({ currentUser }: SidebarProps) {
  const navigationItems = useNavigationMenu();
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex justify-between items-center">
              <h1 className="pl-2 py-2 font-bold text-xl group-data-[collapsible=icon]:hidden">
                HireMePLS
              </h1>
              <InlineSidebarTrigger />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link {...item.linkOptions}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {currentUser && <UserDropdown user={currentUser} />}
      </SidebarFooter>
    </Sidebar>
  );
}
