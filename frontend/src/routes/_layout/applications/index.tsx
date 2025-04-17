import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import {
  useApplicationsListApplications,
  type ApplicationsListApplicationsQueryParams,
} from "@/gen";
import { Button } from "@/components/ui/button";
import { useApplicationModals } from "@/contexts/ApplicationModalsContext";
import { GroupedApplicationList } from "@/components/application/GroupedApplicationList";

const applicationListQueryParams: ApplicationsListApplicationsQueryParams = {
  page_size: 100,
};

export const Route = createFileRoute("/_layout/applications/")({
  component: ListApplications,
});

function ListApplications() {
  const { data, refetch, isLoading } = useApplicationsListApplications(
    applicationListQueryParams
  );
  const { openStatusModal, openDeleteModal } = useApplicationModals();

  return (
    <div className="w-full h-full p-6 @3xl:py-2 flex flex-col">
      <div className="w-full flex justify-between @3xl:mb-4 items-center">
        <h1 className="text-2xl sm:text-3xl">Your applications</h1>
        <Button size={"icon"} asChild>
          <Link to={"/applications/new"}>
            <Plus className="size-4 md:size-5" />
          </Link>
        </Button>
      </div>
      <div className="w-full h-full">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <p>Loading...</p>
          </div>
        ) : !data?.data.length ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-center">
              You don't have any applications yet.{" "}
              <Link
                to={"/applications/new"}
                className="hover:underline text-primary"
              >
                Add one
              </Link>{" "}
              to get started.
            </p>
          </div>
        ) : (
          <GroupedApplicationList
            applications={data.data}
            onUpdateStatus={(app) => {
              openStatusModal(app, () => refetch());
            }}
            onDelete={(app) => {
              openDeleteModal(app, () => refetch());
            }}
          />
        )}
      </div>
    </div>
  );
}
