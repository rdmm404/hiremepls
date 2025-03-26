import { createFileRoute } from "@tanstack/react-router";
import { Building2, MapPin, Clock, Link as LinkIcon, Dot } from "lucide-react";
import { Link } from "@tanstack/react-router";

import {
  useApplicationsGetApplicationSuspense,
  applicationsGetApplicationSuspenseQueryOptions,
  ApplicationStatusEnum,
} from "@/gen";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ApplicationStatusBadge } from "@/components/application/ApplicationStatusBadge";

export const Route = createFileRoute("/_layout/applications/$applicationId")({
  component: ApplicationDetail,
  loader: async ({ params, context }) => {
    const applicationId = Number(params.applicationId);
    const data = await context.queryClient.ensureQueryData(
      applicationsGetApplicationSuspenseQueryOptions(applicationId)
    );
    return {
      data: { applicationId },
      crumb: `${data.job.job_title} @ ${data.job.company.name}`,
    };
  },
  pendingComponent: () => <p>Loading...</p>,
});

function ApplicationDetail() {
  const {
    data: { applicationId },
  } = Route.useLoaderData();
  const { data: application } =
    useApplicationsGetApplicationSuspense(applicationId);
  const { job } = application;
  const formattedDescription = job.job_description
    .split("\n\n")
    .map((paragraph, index) => (
      <p key={index} className="mb-4">
        {paragraph}
      </p>
    ));

  return (
    <div className="container mx-auto px-6">
      <div className="space-y-4 my-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{job.job_title}</h1>
          <ApplicationStatusBadge status={application.status!} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Building2 className="h-4 w-4" />
            <Link
              to={job.company.url || "#"}
              className={cn(!job.company.url && "cursor-auto")}
            >
              <span
                className={cn(
                  job.company.url && "hover:text-foreground",
                  "text-muted-foreground"
                )}
              >
                {job.company.name}
              </span>
            </Link>
          </div>
          <Dot />
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <Dot />
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span className="capitalize">{job.job_type.replace("_", " ")}</span>
          </div>
        </div>

        <a
          href={job.job_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-primary hover:underline"
        >
          <LinkIcon className="h-4 w-4" />
          View original job posting
        </a>
        <Separator />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{job.llm_summary}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>{formattedDescription}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {job.requirements?.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {job.other_details && (
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{job.other_details}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - 1/3 width on large screens */}
        <div className="space-y-6">
          {application.status != ApplicationStatusEnum.Pending && (
            <Card>
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {application.interview_rounds !== null && (
                    <div>
                      <p className="text-sm font-medium mb-1">
                        Interview Rounds
                      </p>
                      <p>{application.interview_rounds}</p>
                    </div>
                  )}

                  {application.current_round !== null && (
                    <div>
                      <p className="text-sm font-medium mb-1">Current Round</p>
                      <p>{application.current_round}</p>
                    </div>
                  )}

                  {application.notes !== null && (
                    <div>
                      <p className="text-sm font-medium mb-1">Notes</p>
                      <p>{application.notes}</p>
                    </div>
                  )}

                  {application.fit !== null && (
                    <div>
                      <p className="text-sm font-medium mb-1">Fit</p>
                      <p>{application.fit}</p>
                    </div>
                  )}

                  {application.resume_used !== null && (
                    <div>
                      <p className="text-sm font-medium mb-1">Resume Used</p>
                      <p>{application.resume_used}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.skills?.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {(job.compensation.minimum ||
            job.compensation.maximum ||
            job.compensation.details ||
            (job.compensation.benefits &&
              job.compensation.benefits.length > 0)) && (
            <Card>
              <CardHeader>
                <CardTitle>Compensation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(job.compensation.minimum || job.compensation.maximum) && (
                    <div>
                      <p className="text-sm font-medium mb-1">Salary Range</p>
                      <p>
                        {job.compensation.minimum &&
                          `${job.compensation.currency || "USD"} ${
                            job.compensation.minimum
                          }`}
                        {job.compensation.minimum &&
                          job.compensation.maximum &&
                          " - "}
                        {job.compensation.maximum &&
                          `${job.compensation.currency || "USD"} ${
                            job.compensation.maximum
                          }`}
                        {!job.compensation.minimum &&
                          !job.compensation.maximum &&
                          "Not specified"}
                      </p>
                    </div>
                  )}

                  {job.compensation.details && (
                    <div>
                      <p className="text-sm font-medium mb-1">Details</p>
                      <p>{job.compensation.details}</p>
                    </div>
                  )}

                  {job.compensation.benefits &&
                    job.compensation.benefits.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-1">Benefits</p>
                        <ul className="list-disc pl-5 space-y-1">
                          {job.compensation.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}