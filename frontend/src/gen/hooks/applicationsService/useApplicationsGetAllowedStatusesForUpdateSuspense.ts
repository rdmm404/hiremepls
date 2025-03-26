// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type {
  ApplicationsGetAllowedStatusesForUpdateQueryResponse,
  ApplicationsGetAllowedStatusesForUpdateQueryParams,
  ApplicationsGetAllowedStatusesForUpdate422,
} from '../../types/ApplicationsGetAllowedStatusesForUpdate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { applicationsGetAllowedStatusesForUpdate } from '../../clients/applicationsClient/applicationsGetAllowedStatusesForUpdate.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const applicationsGetAllowedStatusesForUpdateSuspenseQueryKey = (params: ApplicationsGetAllowedStatusesForUpdateQueryParams) =>
  [{ url: '/applications/status_flow' }, ...(params ? [params] : [])] as const

export type ApplicationsGetAllowedStatusesForUpdateSuspenseQueryKey = ReturnType<typeof applicationsGetAllowedStatusesForUpdateSuspenseQueryKey>

export function applicationsGetAllowedStatusesForUpdateSuspenseQueryOptions(
  params: ApplicationsGetAllowedStatusesForUpdateQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = applicationsGetAllowedStatusesForUpdateSuspenseQueryKey(params)
  return queryOptions<
    ApplicationsGetAllowedStatusesForUpdateQueryResponse,
    ResponseErrorConfig<ApplicationsGetAllowedStatusesForUpdate422>,
    ApplicationsGetAllowedStatusesForUpdateQueryResponse,
    typeof queryKey
  >({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return applicationsGetAllowedStatusesForUpdate(params, config)
    },
  })
}

/**
 * @summary Get Allowed Statuses For Update
 * {@link /applications/status_flow}
 */
export function useApplicationsGetAllowedStatusesForUpdateSuspense<
  TData = ApplicationsGetAllowedStatusesForUpdateQueryResponse,
  TQueryData = ApplicationsGetAllowedStatusesForUpdateQueryResponse,
  TQueryKey extends QueryKey = ApplicationsGetAllowedStatusesForUpdateSuspenseQueryKey,
>(
  params: ApplicationsGetAllowedStatusesForUpdateQueryParams,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        ApplicationsGetAllowedStatusesForUpdateQueryResponse,
        ResponseErrorConfig<ApplicationsGetAllowedStatusesForUpdate422>,
        TData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? applicationsGetAllowedStatusesForUpdateSuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(applicationsGetAllowedStatusesForUpdateSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<ApplicationsGetAllowedStatusesForUpdate422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}