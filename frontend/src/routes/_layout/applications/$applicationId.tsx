import { createFileRoute } from "@tanstack/react-router";
import { Building2, MapPin, Clock, Dot } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import {
  useApplicationsGetApplicationSuspense,
  applicationsGetApplicationSuspenseQueryOptions,
  ApplicationStatusEnum,
  useApplicationsGetAllowedStatusesForUpdate,
  useApplicationsApplicationPartialUpdate,
  useApplicationsDeleteApplication,
} from "@/gen";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ApplicationStatusBadge } from "@/components/application/ApplicationStatusBadge";
import { ApplicationActionsMenu } from "@/components/application/ApplicationActionsMenu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const {
    data: availableStatuses,
    isLoading: isStatusQueryLoading,
    isError: isStatusQueryError,
  } = useApplicationsGetAllowedStatusesForUpdate(
    {
      status: application.status as ApplicationStatusEnum,
    },
    {
      query: {
        enabled: isStatusModalOpen,
      },
    }
  );

  const applicationUpdateMutation = useApplicationsApplicationPartialUpdate({
    mutation: {
      onSuccess: () => {
        toast.success("Application status updated successfully");
        setIsStatusModalOpen(false);
      },
      onError: (error) => {
        toast.error(`Something went wrong`, {
          description: error.response?.data.detail![0].msg,
        });
      },
    },
  });

  const deleteApplicationMutation = useApplicationsDeleteApplication({
    mutation: {
      onSuccess: () => {
        toast.success("Application deleted successfully");
        setIsDeleteModalOpen(false);
        // TODO: Navigate back to applications list
      },
      onError: (error) => {
        toast.error("Failed to delete application", {
          description: error.response?.data.detail![0].msg,
        });
      },
    },
  });

  const handleStatusSubmit = () => {
    if (application) {
      applicationUpdateMutation.mutate({
        application_id: application.id,
        data: {
          status:
            ApplicationStatusEnum[
              selectedStatus as keyof typeof ApplicationStatusEnum
            ],
        },
      });
    }
  };

  const handleConfirmDelete = () => {
    if (application) {
      deleteApplicationMutation.mutate({
        application_id: application.id,
      });
    }
  };

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
        <div className="flex gap-4 items-start flex-wrap sm:items-center sm:justify-between">
          <h1 className="text-xl sm:text-3xl font-bold">{job.job_title}</h1>
          <ApplicationStatusBadge
            className="hidden sm:block"
            status={application.status!}
          />
        </div>

        <div className="flex flex-row justify-center sm:items-center sm:justify-between flex-wrap">
          <div className="flex flex-row items-center gap-4 text-muted-foreground flex-wrap">
            <ApplicationStatusBadge
              className="sm:hidden"
              status={application.status!}
            />
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
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span className="capitalize">
                {job.job_type.replace("_", " ")}
              </span>
            </div>
          </div>
          <ApplicationActionsMenu
            application={application}
            onUpdateStatus={() => setIsStatusModalOpen(true)}
            onDelete={() => setIsDeleteModalOpen(true)}
            layout={"buttons"}
          />
        </div>

        <Separator />

        {/* Status Update Dialog */}
        <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Application Status</DialogTitle>
              <DialogDescription>
                Update the status of your job application.
              </DialogDescription>
            </DialogHeader>
            {isStatusQueryError ? (
              <p>Something went deeply wrong :(</p>
            ) : isStatusQueryLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="py-4">
                {availableStatuses && availableStatuses.length > 0 && (
                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {!availableStatuses?.length && (
                  <p>
                    No further status updates can be done to this application.
                  </p>
                )}
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsStatusModalOpen(false)}
              >
                Cancel
              </Button>
              {!isStatusQueryError && !!availableStatuses?.length && (
                <Button
                  onClick={handleStatusSubmit}
                  disabled={isStatusQueryLoading}
                >
                  Save
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Application</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this application? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmDelete}
                disabled={deleteApplicationMutation.isPending}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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