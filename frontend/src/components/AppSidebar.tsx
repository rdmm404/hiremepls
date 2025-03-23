import {
  Home,
  Briefcase,
  LucideIcon,
  User2,
  ChevronUp,
  ChevronsRight,
  ChevronsLeft,
  Menu,
} from "lucide-react";
import {
  Link,
  ValidateLinkOptions,
  useRouter,
  useLocation,
} from "@tanstack/react-router";

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
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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

export function MobileSidebarTrigger() {
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  return (
    <Button
      className={cn("fixed bottom-4 right-4", !isMobile && "hidden")}
      variant={"ghost"}
      onClick={(e) => {
        e.preventDefault();
        toggleSidebar();
      }}
    >
      <Menu />
    </Button>
  );
}

type SidebarItem = {
  title: string;
  icon: LucideIcon;
  linkOptions: ValidateLinkOptions;
};
// Menu items.
const items: SidebarItem[] = [
  {
    title: "Home",
    icon: Home,
    linkOptions: {
      to: "/",
    },
  },
  {
    title: "New Application",
    icon: Briefcase,
    linkOptions: {
      to: "/applications/new",
    },
  },
];

interface SidebarProps {
  currentUser?: User;
}

export function AppSidebar({ currentUser }: SidebarProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex justify-between items-center">
              <h1 className="pl-2 py-2 font-bold text-xl group-data-[collapsible=icon]:hidden">
                HireMePLS
              </h1>
              <div className={cn(isMobile && "hidden")}>
                <InlineSidebarTrigger />
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.linkOptions.to;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
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
