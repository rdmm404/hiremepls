import { Link, useRouter } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useNavigationMenu } from "@/hooks/useNavigationMenu";
import { useAuthLogout, User } from "@/gen";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { User2 } from "lucide-react";

interface MobileNavBarProps {
  currentUser: User;
}

interface UserDropdownMobileProps {
  user: User;
}

function UserDropdownMobile({ user }: UserDropdownMobileProps) {
  const router = useRouter();
  const logoutMutation = useAuthLogout({
    mutation: {
      onSuccess: () => router.navigate({ to: "/login" }),
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground transition-colors hover:cursor-pointer">
          <User2 className="size-5" />
          <span className="text-xs">
            {user.name} {user.last_name[0].toUpperCase()}.
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={"top"}>
        <DropdownMenuItem onClick={() => logoutMutation.mutate(undefined)}>
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function MobileNavBar({ currentUser }: MobileNavBarProps) {
  const navigationItems = useNavigationMenu();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-sidebar border-t flex items-center justify-around gap-5 px-4">
      {navigationItems.map((item) => {
        return (
          <Link
            key={item.title}
            {...item.linkOptions}
            className={cn(
              "flex flex-col items-center justify-center gap-1",
              "text-muted-foreground hover:text-foreground transition-colors",
              item.isActive && "text-foreground"
            )}
          >
            <item.icon className="size-5" />
            <span className="text-xs">{item.title}</span>
          </Link>
        );
      })}
      <UserDropdownMobile user={currentUser} />
    </nav>
  );
}
