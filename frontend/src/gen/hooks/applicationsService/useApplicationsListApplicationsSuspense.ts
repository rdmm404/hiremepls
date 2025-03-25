// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type {
  ApplicationsListApplicationsQueryResponse,
  ApplicationsListApplicationsQueryParams,
  ApplicationsListApplications422,
} from '../../types/ApplicationsListApplications.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { applicationsListApplications } from '../../clients/applicationsClient/applicationsListApplications.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const applicationsListApplicationsSuspenseQueryKey = (params?: ApplicationsListApplicationsQueryParams) =>
  [{ url: '/applications/' }, ...(params ? [params] : [])] as const

export type ApplicationsListApplicationsSuspenseQueryKey = ReturnType<typeof applicationsListApplicationsSuspenseQueryKey>

export function applicationsListApplicationsSuspenseQueryOptions(
  params?: ApplicationsListApplicationsQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = applicationsListApplicationsSuspenseQueryKey(params)
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
export function useApplicationsListApplicationsSuspense<
  TData = ApplicationsListApplicationsQueryResponse,
  TQueryData = ApplicationsListApplicationsQueryResponse,
  TQueryKey extends QueryKey = ApplicationsListApplicationsSuspenseQueryKey,
>(
  params?: ApplicationsListApplicationsQueryParams,
  options: {
    query?: Partial<UseSuspenseQueryOptions<ApplicationsListApplicationsQueryResponse, ResponseErrorConfig<ApplicationsListApplications422>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? applicationsListApplicationsSuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(applicationsListApplicationsSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<ApplicationsListApplications422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}