import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import {
  useApplicationsListApplicationsSuspense,
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
  const { openStatusModal, openDeleteModal } = useApplicationModals();

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
              onUpdateStatus={() => {
                openStatusModal(app, () => refetch()); // TODO: consider not refetching the whole list on a single application update
              }}
              onDelete={() => {
                openDeleteModal(app, () => refetch());
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
