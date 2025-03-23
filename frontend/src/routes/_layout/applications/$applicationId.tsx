import { createFileRoute } from "@tanstack/react-router";
import {
  useApplicationsGetApplicationSuspense,
  applicationsGetApplicationSuspenseQueryOptions,
} from "@/gen";

export const Route = createFileRoute(
  "/_layout/applications/$applicationId"
)({
  component: ApplicationDetail,
  loader: async ({ params, context }) => {
    const applicationId = Number(params.applicationId);
    await context.queryClient.ensureQueryData(
      applicationsGetApplicationSuspenseQueryOptions(applicationId)
    );
    return { applicationId };
  },
  pendingComponent: () => <p>Loading...</p>,
});

function ApplicationDetail() {
  const { applicationId } = Route.useLoaderData();
  const { data } = useApplicationsGetApplicationSuspense(applicationId);
  return <div>{JSON.stringify(data, null, 2)}</div>;
}
