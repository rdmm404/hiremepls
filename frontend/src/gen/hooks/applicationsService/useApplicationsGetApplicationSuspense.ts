import client from '@/client'
import type {
  ApplicationsGetApplicationQueryResponse,
  ApplicationsGetApplicationPathParams,
  ApplicationsGetApplication422,
} from '../../types/ApplicationsGetApplication.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { applicationsGetApplication } from '../../clients/applicationsClient/applicationsGetApplication.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const applicationsGetApplicationSuspenseQueryKey = (application_id: ApplicationsGetApplicationPathParams['application_id']) =>
  [{ url: '/applications/:application_id', params: { application_id: application_id } }] as const

export type ApplicationsGetApplicationSuspenseQueryKey = ReturnType<typeof applicationsGetApplicationSuspenseQueryKey>

export function applicationsGetApplicationSuspenseQueryOptions(
  application_id: ApplicationsGetApplicationPathParams['application_id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = applicationsGetApplicationSuspenseQueryKey(application_id)
  return queryOptions<
    ApplicationsGetApplicationQueryResponse,
    ResponseErrorConfig<ApplicationsGetApplication422>,
    ApplicationsGetApplicationQueryResponse,
    typeof queryKey
  >({
    enabled: !!application_id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return applicationsGetApplication(application_id, config)
    },
  })
}

/**
 * @summary Get Application
 * {@link /applications/:application_id}
 */
export function useApplicationsGetApplicationSuspense<
  TData = ApplicationsGetApplicationQueryResponse,
  TQueryData = ApplicationsGetApplicationQueryResponse,
  TQueryKey extends QueryKey = ApplicationsGetApplicationSuspenseQueryKey,
>(
  application_id: ApplicationsGetApplicationPathParams['application_id'],
  options: {
    query?: Partial<UseSuspenseQueryOptions<ApplicationsGetApplicationQueryResponse, ResponseErrorConfig<ApplicationsGetApplication422>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? applicationsGetApplicationSuspenseQueryKey(application_id)

  const query = useSuspenseQuery({
    ...(applicationsGetApplicationSuspenseQueryOptions(application_id, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<ApplicationsGetApplication422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}