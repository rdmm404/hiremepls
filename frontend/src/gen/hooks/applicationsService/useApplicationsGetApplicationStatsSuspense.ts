// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type { ApplicationsGetApplicationStatsQueryResponse } from '../../types/ApplicationsGetApplicationStats.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { applicationsGetApplicationStats } from '../../clients/applicationsClient/applicationsGetApplicationStats.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const applicationsGetApplicationStatsSuspenseQueryKey = () => [{ url: '/applications/stats' }] as const

export type ApplicationsGetApplicationStatsSuspenseQueryKey = ReturnType<typeof applicationsGetApplicationStatsSuspenseQueryKey>

export function applicationsGetApplicationStatsSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = applicationsGetApplicationStatsSuspenseQueryKey()
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
export function useApplicationsGetApplicationStatsSuspense<
  TData = ApplicationsGetApplicationStatsQueryResponse,
  TQueryData = ApplicationsGetApplicationStatsQueryResponse,
  TQueryKey extends QueryKey = ApplicationsGetApplicationStatsSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<ApplicationsGetApplicationStatsQueryResponse, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? applicationsGetApplicationStatsSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(applicationsGetApplicationStatsSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}