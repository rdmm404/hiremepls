import { MapPin, Building } from "lucide-react";

import { ApplicationSummary } from "@/gen";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";
import { ApplicationActionsMenu } from "./ApplicationActionsMenu";

interface ApplicationCardProps {
  application: ApplicationSummary;
  onUpdateStatus?: (application: ApplicationSummary) => void;
  onDelete?: (application: ApplicationSummary) => void;
}

export function ApplicationCard({
  application,
  onUpdateStatus,
  onDelete,
}: ApplicationCardProps) {
  const handleUpdateStatus = () => {
    if (onUpdateStatus) {
      onUpdateStatus(application);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(application);
    }
  };

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
              target="_blank"
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
        <ApplicationActionsMenu
          application={application}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDelete}
        />
      </div>
      <hr className="my-2" />
      <div className="flex gap-y-2 grow items-center flex-wrap gap-3">
        <ApplicationStatusBadge status={application.status} />
        <span className="inline-flex gap-1 items-center justify-end text-sm">
          <MapPin className="size-4" /> {application.job.location}
        </span>
        {application.job.modality.map((modality) => (
          <div key={modality} className="inline-flex">
            <span className="inline-flex gap-1 items-center justify-end text-sm capitalize">
              <Building className="size-4" /> {modality.replace("_", " ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
