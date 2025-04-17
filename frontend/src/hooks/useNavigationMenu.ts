import { ChartPie, Briefcase, LucideIcon, SquarePlus } from "lucide-react";
import { useMatchRoute, ValidateLinkOptions } from "@tanstack/react-router";

type SidebarItem = {
  title: string;
  icon: LucideIcon;
  linkOptions: ValidateLinkOptions;
  isActive?: boolean;
};

export const navigationItems: SidebarItem[] = [
  {
    title: "Dashboard",
    icon: ChartPie,
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
  {
    title: "New",
    icon: SquarePlus,
    linkOptions: {
      to: "/applications/new",
    },
  },
];

export function useNavigationMenu() {
  const matchRoute = useMatchRoute();

  return navigationItems.map((item) => ({
    ...item,
    isActive: Boolean(matchRoute({ to: item.linkOptions.to })),
  }));
}
