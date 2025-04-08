import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  useApplicationsListApplicationsSuspense,
  applicationsListApplicationsQueryOptions,
  type ApplicationsListApplicationsQueryParams,
  type ApplicationSummary,
  ApplicationStatusEnum,
  useApplicationsGetAllowedStatusesForUpdate,
  useApplicationsApplicationPartialUpdate,
  useApplicationsDeleteApplication,
} from "@/gen";
import { ApplicationCard } from "@/components/application/ApplicationCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const applicationListQueryParams: ApplicationsListApplicationsQueryParams = {
  page_size: 100,
};

export const Route = createFileRoute("/_layout/applications/")({
  component: ListApplications,
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(
      applicationsListApplicationsQueryOptions(applicationListQueryParams)
    );
  },
  pendingComponent: () => <p>Loading...</p>,
});

function ListApplications() {
  const { data, refetch } = useApplicationsListApplicationsSuspense(
    applicationListQueryParams
  );

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationSummary | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const {
    data: availableStatuses,
    isLoading: isStatusQueryLoading,
    isError: isStatusQueryError,
  } = useApplicationsGetAllowedStatusesForUpdate(
    {
      status: selectedApplication?.status as ApplicationStatusEnum,
    },
    {
      query: {
        enabled: !!selectedApplication, // TODO: add cache as this is almost never going to change
      },
    }
  );

  const applicationUpdateMutation = useApplicationsApplicationPartialUpdate({
    mutation: {
      onSuccess: () => {
        toast.success("Application status updated successfully");
        refetch(); // TODO: consider not refetching the whole list on a single application update
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
        refetch();
        setIsDeleteModalOpen(false);
      },
      onError: (error) => {
        toast.error("Failed to delete application", {
          description: error.response?.data.detail![0].msg,
        });
      },
    },
  });

  useEffect(() => {
    console.log("effect");
    if (
      selectedApplication?.status &&
      availableStatuses?.includes(selectedApplication.status)
    ) {
      console.log("hi");
      setSelectedStatus(selectedApplication.status);
    } else if (availableStatuses) {
      console.log("hello");
      setSelectedStatus(availableStatuses[0]);
    }
  }, [availableStatuses, selectedApplication]);

  useEffect(() => {
    if (!isStatusModalOpen) {
      setSelectedApplication(null);
    }
  }, [isStatusModalOpen]);

  useEffect(() => {
    if (!isDeleteModalOpen) {
      setSelectedApplication(null);
    }
  }, [isDeleteModalOpen]);

  const handleUpdateStatus = (application: ApplicationSummary) => {
    setSelectedApplication(application);
    setSelectedStatus(application.status || "");
    setIsStatusModalOpen(true);
  };

  const handleStatusSubmit = () => {
    if (selectedApplication) {
      console.log("Application ID:", selectedApplication.id);
      console.log("New status:", selectedStatus);

      applicationUpdateMutation.mutate({
        application_id: selectedApplication.id,
        data: {
          status:
            ApplicationStatusEnum[
              selectedStatus as keyof typeof ApplicationStatusEnum
            ],
        },
      });
    }
    setIsStatusModalOpen(false);
  };

  const handleDeleteApplication = (application: ApplicationSummary) => {
    setSelectedApplication(application);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedApplication) {
      deleteApplicationMutation.mutate({
        application_id: selectedApplication.id,
      });
    }
  };

  return (
    <>
      <div className="w-full max-h-full @3xl:w-3/4 p-5 @3xl:p-0 max-w-4xl flex flex-col">
        <div className="w-full flex justify-between mb-3 md:mb-6 px-1 items-center">
          <h1 className="text-xl md:text-3xl">My applications</h1>
          <Button size={"icon"} asChild>
            <Link to={"/applications/new"}>
              <Plus className="size-4 md:size-5" />
            </Link>
          </Button>
        </div>
        <div className="w-full gap-3 grid grid-cols-1 @2xl:grid-cols-2 grow">
          {data.data.map((app) => (
            <ApplicationCard
              application={app}
              key={app.id}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDeleteApplication}
            />
          ))}
        </div>
      </div>

      {/* TODO: Move to it's own component (if needed) */}
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
    </>
  );
}
