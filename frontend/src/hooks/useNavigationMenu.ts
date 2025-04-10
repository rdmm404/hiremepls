import { Home, Briefcase, LucideIcon } from "lucide-react";
import { useMatchRoute, ValidateLinkOptions } from "@tanstack/react-router";

type SidebarItem = {
  title: string;
  icon: LucideIcon;
  linkOptions: ValidateLinkOptions;
  isActive?: boolean;
};

export const navigationItems: SidebarItem[] = [
  {
    title: "Home",
    icon: Home,
    linkOptions: {
      to: "/",
    },
  },
  {
    title: "Applications",
    icon: Briefcase,
    linkOptions: {
      to: "/applications",
    },
  },
];

export function useNavigationMenu() {
  const matchRoute = useMatchRoute();

  return navigationItems.map((item) => ({
    ...item,
    isActive: Boolean(matchRoute({ to: item.linkOptions.to, fuzzy: true })),
  }));
}
