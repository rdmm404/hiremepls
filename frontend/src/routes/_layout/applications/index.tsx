import { createFileRoute } from "@tanstack/react-router";

import {
  useApplicationsListApplicationsSuspense,
  applicationsListApplicationsQueryOptions,
  ApplicationsListApplicationsQueryParams,
} from "@/gen";
import { ApplicationCard } from "@/components/ApplicationCard";

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
    <div className="w-full max-h-full @3xl:w-3/4 p-5 @3xl:p-0 max-w-4xl gap-3 grid grid-cols-1 @2xl:grid-cols-2">
      {data.data.map((app) => (
        <ApplicationCard application={app} key={app.id} />
      ))}
    </div>
  );
}
