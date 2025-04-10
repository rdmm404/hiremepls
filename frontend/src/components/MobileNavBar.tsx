import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useNavigationMenu } from "@/hooks/useNavigationMenu";

export function MobileNavBar() {
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
    </nav>
  );
}
