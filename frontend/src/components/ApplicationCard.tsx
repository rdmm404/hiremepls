import { MapPin, Info, Link as LinkIcon } from "lucide-react";

import { ApplicationSummary } from "@/gen";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface ApplicationCardProps {
  application: ApplicationSummary;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <div className="bg-card border-border border rounded-lg p-4 flex flex-col">
      <div>
        <h3>
          <Link
            to={"/applications/$applicationId"}
            params={{ applicationId: application.id.toString() }}
            className="hover:text-white"
          >
            {application.job.job_title}{" "}
          </Link>
          <Link
            to={application.job.company.url || "#"}
            className={cn(!application.job.company.url && "cursor-auto")}
          >
            <span
              className={cn(
                application.job.company.url && "hover:text-foreground",
                "text-muted-foreground text-sm"
              )}
            >
              @ {application.job.company.name}
            </span>
          </Link>
        </h3>
      </div>
      <hr className="my-2" />
      <div className="flex grow gap-2 items-center flex-wrap">
        <Link to={application.job.job_url} className="hover:text-white">
          <LinkIcon className="size-4" />
        </Link>
        |
        <span className="inline-flex gap-1 items-center justify-end text-sm">
          <MapPin className="size-4" /> {application.job.location}
        </span>
        |
        <span className="inline-flex gap-1 items-center justify-end text-sm">
          <Info className="size-4" /> {application.status}
        </span>
      </div>
    </div>
  );
}
