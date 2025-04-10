import { User2, ChevronUp, ChevronsRight, ChevronsLeft } from "lucide-react";
import { Link, useRouter } from "@tanstack/react-router";

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

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import { User, useAuthLogout } from "@/gen";
import { useNavigationMenu } from "@/hooks/useNavigationMenu";

interface UserDropdownProps {
  user: User;
}

function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();
  const logoutMutation = useAuthLogout({
    mutation: {
      onSuccess: () => router.navigate({ to: "/login" }),
    },
  });
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <User2 /> {user.email}
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            <DropdownMenuItem onClick={() => logoutMutation.mutate(undefined)}>
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

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
