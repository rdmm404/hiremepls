import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import {
  useApplicationsListApplications,
  applicationsListApplicationsQueryOptions,
  type ApplicationsListApplicationsQueryParams,
} from "@/gen";
import { ApplicationCard } from "@/components/application/ApplicationCard";
import { Button } from "@/components/ui/button";
import { useApplicationModals } from "@/contexts/ApplicationModalsContext";

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
    <>
      <div className="w-full h-full @3xl:w-3/4 py-10 px-5 @3xl:p-0 max-w-4xl flex flex-col">
        <div className="w-full flex justify-between py-3 md:py-6 items-center">
          <h1 className="text-xl md:text-3xl">Your applications</h1>
          <Button size={"icon"} asChild>
            <Link to={"/applications/new"}>
              <Plus className="size-4 md:size-5" />
            </Link>
          </Button>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          {isLoading ? (
            <p>Loading...</p>
          ) : data?.data.length === 0 ? (
            <p className="text-center">
              You don't have any applications yet.{" "}
              <Link
                to={"/applications/new"}
                className="hover:underline text-primary"
              >
                Create one
              </Link>{" "}
              to get started.
            </p>
          ) : (
            <div className="gap-3 grid grid-cols-1 @2xl:grid-cols-2 grow">
              {data?.data.map((app) => (
                <ApplicationCard
                  application={app}
                  key={app.id}
                  onUpdateStatus={() => {
                    openStatusModal(app, () => refetch()); // TODO: consider not refetching the whole list on a single application update
                  }}
                  onDelete={() => {
                    openDeleteModal(app, () => refetch());
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
