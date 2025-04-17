import { SidebarMenuButton, useSidebar } from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

import { SidebarMenuItem } from "./ui/sidebar";
import { SidebarMenu } from "./ui/sidebar";

import { useRouter } from "@tanstack/react-router";
import { useAuthLogout, User } from "@/gen";
import { ChevronUp, User2 } from "lucide-react";

interface UserDropdownProps {
  user: User;
}

export function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();
  const logoutMutation = useAuthLogout({
    mutation: {
      onSuccess: () => router.navigate({ to: "/login" }),
    },
  });
  const { open } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-full">
              <User2 />
              <span className="ml-2 max-w-5/6 truncate">
                {user.name} {user.last_name[0].toUpperCase()}.
              </span>
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side={open ? "top" : "right"}
            className={cn(open && "w-60")}
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
