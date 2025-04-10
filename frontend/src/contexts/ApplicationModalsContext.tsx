import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "sonner";

import {
  ApplicationStatusEnum,
  useApplicationsGetAllowedStatusesForUpdate,
  useApplicationsApplicationPartialUpdate,
  useApplicationsDeleteApplication,
  type ApplicationSummary,
  WebApplicationsApiSchemaApplication,
} from "@/gen";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the context type
interface ApplicationContextType {
  openStatusModal: (
    application: ApplicationSummary | WebApplicationsApiSchemaApplication,
    onSuccess?: () => void
  ) => void;
  openDeleteModal: (
    application: ApplicationSummary | WebApplicationsApiSchemaApplication,
    onSuccess?: () => void
  ) => void;
}

// Create the context with default values
const ApplicationModalContext = createContext<ApplicationContextType>({
  openStatusModal: () => {},
  openDeleteModal: () => {},
});

// Custom hook to use the context
export function useApplicationModals() {
  return useContext(ApplicationModalContext);
}

// Application modals provider component
export function ApplicationModalsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<
    ApplicationSummary | WebApplicationsApiSchemaApplication | null
  >(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [onSuccessCallback, setOnSuccessCallback] = useState<
    (() => void) | null
  >(null);

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
        setIsStatusModalOpen(false);
        // Call the callback if it exists
        if (onSuccessCallback) {
          onSuccessCallback();
          setOnSuccessCallback(null);
        }
      },
      onError: (error) => {
        toast.error(`Something went wrong`, {
          description: error.response?.data.detail?.[0].msg,
        });
      },
    },
  });

  const deleteApplicationMutation = useApplicationsDeleteApplication({
    mutation: {
      onSuccess: () => {
        toast.success("Application deleted successfully");
        setIsDeleteModalOpen(false);
        // Call the callback if it exists
        if (onSuccessCallback) {
          onSuccessCallback();
          setOnSuccessCallback(null);
        }
      },
      onError: (error) => {
        toast.error("Failed to delete application", {
          description: error.response?.data.detail?.[0].msg,
        });
      },
    },
  });

  const handleStatusSubmit = () => {
    if (selectedApplication) {
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
  };

  const handleConfirmDelete = () => {
    if (selectedApplication) {
      deleteApplicationMutation.mutate({
        application_id: selectedApplication.id,
      });
    }
  };

  useEffect(() => {
    if (
      selectedApplication?.status &&
      availableStatuses?.includes(selectedApplication.status)
    ) {
      setSelectedStatus(selectedApplication.status);
    } else if (availableStatuses) {
      setSelectedStatus(availableStatuses[0]);
    }
  }, [availableStatuses, selectedApplication]);

  const openStatusModal = (
    application: ApplicationSummary | WebApplicationsApiSchemaApplication,
    onSuccess?: () => void
  ) => {
    console.log("Opening status modal for application:", application.id);
    setSelectedApplication(application);
    console.log("Selected status:", selectedStatus);
    setIsStatusModalOpen(true);
    if (onSuccess) {
      setOnSuccessCallback(() => onSuccess);
    }
  };

  const openDeleteModal = (
    application: ApplicationSummary | WebApplicationsApiSchemaApplication,
    onSuccess?: () => void
  ) => {
    setSelectedApplication(application);
    setIsDeleteModalOpen(true);
    if (onSuccess) {
      setOnSuccessCallback(() => onSuccess);
    }
  };

  return (
    <ApplicationModalContext.Provider
      value={{
        openStatusModal,
        openDeleteModal,
      }}
    >
      {children}

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
    </ApplicationModalContext.Provider>
  );
}
