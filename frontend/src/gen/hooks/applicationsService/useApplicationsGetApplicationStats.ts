// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type { ApplicationsGetApplicationStatsQueryResponse } from '../../types/ApplicationsGetApplicationStats.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { applicationsGetApplicationStats } from '../../clients/applicationsClient/applicationsGetApplicationStats.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const applicationsGetApplicationStatsQueryKey = () => [{ url: '/applications/stats' }] as const

export type ApplicationsGetApplicationStatsQueryKey = ReturnType<typeof applicationsGetApplicationStatsQueryKey>

export function applicationsGetApplicationStatsQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = applicationsGetApplicationStatsQueryKey()
  return queryOptions<ApplicationsGetApplicationStatsQueryResponse, ResponseErrorConfig<Error>, ApplicationsGetApplicationStatsQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return applicationsGetApplicationStats(config)
    },
  })
}

/**
 * @description Get overview statistics of user's applications for the dashboard.Includes total count, status breakdowns, and other relevant metrics.
 * @summary Get Application Stats
 * {@link /applications/stats}
 */
export function useApplicationsGetApplicationStats<
  TData = ApplicationsGetApplicationStatsQueryResponse,
  TQueryData = ApplicationsGetApplicationStatsQueryResponse,
  TQueryKey extends QueryKey = ApplicationsGetApplicationStatsQueryKey,
>(
  options: {
    query?: Partial<QueryObserverOptions<ApplicationsGetApplicationStatsQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? applicationsGetApplicationStatsQueryKey()

  const query = useQuery({
    ...(applicationsGetApplicationStatsQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}