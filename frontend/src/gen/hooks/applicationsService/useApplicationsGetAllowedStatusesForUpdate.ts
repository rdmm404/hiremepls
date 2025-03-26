// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type {
  ApplicationsGetAllowedStatusesForUpdateQueryResponse,
  ApplicationsGetAllowedStatusesForUpdateQueryParams,
  ApplicationsGetAllowedStatusesForUpdate422,
} from '../../types/ApplicationsGetAllowedStatusesForUpdate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { applicationsGetAllowedStatusesForUpdate } from '../../clients/applicationsClient/applicationsGetAllowedStatusesForUpdate.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const applicationsGetAllowedStatusesForUpdateQueryKey = (params: ApplicationsGetAllowedStatusesForUpdateQueryParams) =>
  [{ url: '/applications/status_flow' }, ...(params ? [params] : [])] as const

export type ApplicationsGetAllowedStatusesForUpdateQueryKey = ReturnType<typeof applicationsGetAllowedStatusesForUpdateQueryKey>

export function applicationsGetAllowedStatusesForUpdateQueryOptions(
  params: ApplicationsGetAllowedStatusesForUpdateQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = applicationsGetAllowedStatusesForUpdateQueryKey(params)
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
export function useApplicationsGetAllowedStatusesForUpdate<
  TData = ApplicationsGetAllowedStatusesForUpdateQueryResponse,
  TQueryData = ApplicationsGetAllowedStatusesForUpdateQueryResponse,
  TQueryKey extends QueryKey = ApplicationsGetAllowedStatusesForUpdateQueryKey,
>(
  params: ApplicationsGetAllowedStatusesForUpdateQueryParams,
  options: {
    query?: Partial<
      QueryObserverOptions<
        ApplicationsGetAllowedStatusesForUpdateQueryResponse,
        ResponseErrorConfig<ApplicationsGetAllowedStatusesForUpdate422>,
        TData,
        TQueryData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? applicationsGetAllowedStatusesForUpdateQueryKey(params)

  const query = useQuery({
    ...(applicationsGetAllowedStatusesForUpdateQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<ApplicationsGetAllowedStatusesForUpdate422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}