import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import {
  useApplicationsListApplicationsSuspense,
  applicationsListApplicationsQueryOptions,
  ApplicationsListApplicationsQueryParams,
} from "@/gen";
import { ApplicationCard } from "@/components/application/ApplicationCard";
import { Button } from "@/components/ui/button";

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
  const { data } = useApplicationsListApplicationsSuspense(
    applicationListQueryParams
  );
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
            <ApplicationCard application={app} key={app.id} />
          ))}
        </div>
      </div>
    </>
  );
}
