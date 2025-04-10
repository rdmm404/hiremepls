import {
  EllipsisVertical,
  Pencil,
  Trash2,
  RefreshCw,
  ExternalLink,
  LucideIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ApplicationSummary, WebApplicationsApiSchemaApplication } from "@/gen";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ApplicationActionsMenuProps {
  application: ApplicationSummary | WebApplicationsApiSchemaApplication;
  onUpdateStatus?: () => void;
  onDelete?: () => void;
  layout?: "menu" | "buttons";
}

type ActionItem = {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  url?: string;
  variant?: "default" | "destructive";
  externalLink?: boolean;
};

export function ApplicationActionsMenu({
  application,
  onUpdateStatus,
  onDelete,
  layout = "menu",
}: ApplicationActionsMenuProps) {
  const actions = useMemo(() => {
    return [
      {
        icon: ExternalLink,
        label: "Go to URL",
        url: application.job.job_url,
        externalLink: true,
      },
      {
        icon: Pencil,
        label: "Edit",
        onClick: () => console.log("Edit clicked"),
      },
      {
        icon: RefreshCw,
        label: "Update Status",
        onClick: onUpdateStatus,
      },
      {
        icon: Trash2,
        label: "Delete",
        onClick: onDelete,
        variant: "ghost-destructive",
      },
    ] as ActionItem[];
  }, [application.job.job_url, onUpdateStatus, onDelete]);

  if (layout === "buttons") {
    return (
      <div className="flex items-center gap-1">
        <TooltipProvider>
          {actions.map((action, index) => {
            const Icon = action.icon;
            const isExternalLink = !!(action.url && action.externalLink);

            return (
              <Tooltip key={index} delayDuration={200}>
                <TooltipTrigger asChild>
                  <Button
                    variant={action.variant ?? "ghost"}
                    size="icon"
                    onClick={action.onClick}
                    asChild={isExternalLink}
                  >
                    {isExternalLink ? (
                      <Link to={action.url!} target="_blank">
                        <Icon className="size-4" />
                      </Link>
                    ) : (
                      <Icon className="size-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{action.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <EllipsisVertical className="size-4 text-muted-foreground hover:text-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, index) => {
          const Icon = action.icon;

          if (action.url && action.externalLink) {
            return (
              <Link key={index} to={action.url} target="_blank">
                <DropdownMenuItem>
                  <Icon className="mr-2 size-4" />
                  {action.label}
                </DropdownMenuItem>
              </Link>
            );
          }

          return (
            <DropdownMenuItem
              key={index}
              onClick={action.onClick}
              className={
                action.variant === "destructive"
                  ? "text-destructive focus:bg-destructive focus:text-destructive-foreground group"
                  : ""
              }
            >
              <Icon
                className={`mr-2 size-4 ${
                  action.variant === "destructive"
                    ? "group-focus:text-destructive-foreground"
                    : ""
                }`}
              />
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
