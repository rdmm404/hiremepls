import {
  MapPin,
  EllipsisVertical,
  Pencil,
  Trash2,
  RefreshCw,
  ExternalLink,
  Dot,
  Building,
} from "lucide-react";

import { ApplicationSummary } from "@/gen";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";

interface ApplicationCardProps {
  application: ApplicationSummary;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <div className="bg-card border-border border rounded-lg p-4 flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <h3>
            <Link
              to={"/applications/$applicationId"}
              params={{ applicationId: application.id.toString() }}
              className="hover:text-white"
            >
              {application.job?.job_title || "Untitled Position"}{" "}
            </Link>
            <Link
              to={application.job?.company?.url || "#"}
              className={cn(!application.job?.company?.url && "cursor-auto")}
            >
              <span
                className={cn(
                  application.job?.company?.url && "hover:text-foreground",
                  "text-muted-foreground text-sm"
                )}
              >
                @ {application.job?.company?.name || "Unknown Company"}
              </span>
            </Link>
          </h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <EllipsisVertical className="size-4 text-muted-foreground hover:text-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link to={application.job.job_url}>
              <DropdownMenuItem>
                <ExternalLink />
                Go to URL
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RefreshCw />
              Update Status
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground group">
              <Trash2 className="group-focus:text-destructive-foreground" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <hr className="my-2" />
      <div className="flex grow items-center flex-wrap">
        <ApplicationStatusBadge
          status={application.status}
          className="mr-2 mb-2"
        />
        <span className="inline-flex gap-1 items-center justify-end text-sm">
          <MapPin className="size-4" /> {application.job.location}
        </span>
        {application.job.modality.map((modality) => (
          <>
            <Dot />
            <span className="inline-flex gap-1 items-center justify-end text-sm capitalize">
              <Building className="size-4" /> {modality.replace("_", " ")}
            </span>
          </>
        ))}
      </div>
    </div>
  );
}
