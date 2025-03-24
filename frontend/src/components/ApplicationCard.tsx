import { MapPin } from "lucide-react";

import { ApplicationSummary } from "@/gen";

interface ApplicationCardProps {
  application: ApplicationSummary;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <div className="bg-card border-border border rounded-lg p-4">
      <div className="flex justify-between items-start flex-wrap">
        <div>
          <h3 className="text-lg">{application.job.company.name}</h3>
        </div>
        <span className="inline-flex gap-1 items-center justify-end">
          <MapPin className="size-4" /> {application.job.location}
        </span>
      </div>
      <p className="text-sm">{application.job.job_title}</p>
      <hr className="my-2" />
      <p className="mt-0 pt-0">Status: {application.status}</p>
      {/* <p>{application.job.llm_summary}</p> */}
    </div>
  );
}
