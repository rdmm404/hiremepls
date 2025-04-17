import { type ApplicationSummary, ApplicationStatusEnum } from "@/gen";
import { ApplicationCard } from "./ApplicationCard";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { getStatusBadgeVariant } from "@/lib/application-status";

interface GroupedApplicationListProps {
  applications: ApplicationSummary[];
  onUpdateStatus: (app: ApplicationSummary) => void;
  onDelete: (app: ApplicationSummary) => void;
}

export function GroupedApplicationList({
  applications,
  onUpdateStatus,
  onDelete,
}: GroupedApplicationListProps) {
  // Group applications by status
  const groupedApplications = useMemo(() => {
    return applications.reduce<
      Record<ApplicationStatusEnum, ApplicationSummary[]>
    >((groups, app) => {
      const status = app.status;
      if (!groups[status]) {
        groups[status] = [];
      }
      groups[status].push(app);
      return groups;
    }, {} as Record<ApplicationStatusEnum, ApplicationSummary[]>);
  }, [applications]);

  return (
    <div className="w-full space-y-8">
      {Object.entries(groupedApplications).map(([status, apps]) => (
        <section key={status} className="space-y-4 my-3">
          <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 py-2 border-b">
            <div className="flex items-center gap-3">
              <h2 className="text-lg">{status}</h2>
              <Badge
                variant={getStatusBadgeVariant(status as ApplicationStatusEnum)}
                className="font-normal"
              >
                {apps.length}
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-1 @3xl:grid-cols-2 @6xl:grid-cols-3 gap-3">
            {apps.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onUpdateStatus={() => onUpdateStatus(app)}
                onDelete={() => onDelete(app)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
