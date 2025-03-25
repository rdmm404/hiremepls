// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type {
  ApplicationsListApplicationsQueryResponse,
  ApplicationsListApplicationsQueryParams,
  ApplicationsListApplications422,
} from '../../types/ApplicationsListApplications.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { applicationsListApplications } from '../../clients/applicationsClient/applicationsListApplications.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const applicationsListApplicationsQueryKey = (params?: ApplicationsListApplicationsQueryParams) =>
  [{ url: '/applications/' }, ...(params ? [params] : [])] as const

export type ApplicationsListApplicationsQueryKey = ReturnType<typeof applicationsListApplicationsQueryKey>

export function applicationsListApplicationsQueryOptions(
  params?: ApplicationsListApplicationsQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = applicationsListApplicationsQueryKey(params)
  return queryOptions<
    ApplicationsListApplicationsQueryResponse,
    ResponseErrorConfig<ApplicationsListApplications422>,
    ApplicationsListApplicationsQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return applicationsListApplications(params, config)
    },
  })
}

/**
 * @summary List Applications
 * {@link /applications/}
 */
export function useApplicationsListApplications<
  TData = ApplicationsListApplicationsQueryResponse,
  TQueryData = ApplicationsListApplicationsQueryResponse,
  TQueryKey extends QueryKey = ApplicationsListApplicationsQueryKey,
>(
  params?: ApplicationsListApplicationsQueryParams,
  options: {
    query?: Partial<
      QueryObserverOptions<ApplicationsListApplicationsQueryResponse, ResponseErrorConfig<ApplicationsListApplications422>, TData, TQueryData, TQueryKey>
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? applicationsListApplicationsQueryKey(params)

  const query = useQuery({
    ...(applicationsListApplicationsQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<ApplicationsListApplications422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}