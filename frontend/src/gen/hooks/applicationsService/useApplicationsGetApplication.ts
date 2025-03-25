// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type {
  ApplicationsGetApplicationQueryResponse,
  ApplicationsGetApplicationPathParams,
  ApplicationsGetApplication422,
} from '../../types/ApplicationsGetApplication.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { applicationsGetApplication } from '../../clients/applicationsClient/applicationsGetApplication.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const applicationsGetApplicationQueryKey = (application_id: ApplicationsGetApplicationPathParams['application_id']) =>
  [{ url: '/applications/:application_id', params: { application_id: application_id } }] as const

export type ApplicationsGetApplicationQueryKey = ReturnType<typeof applicationsGetApplicationQueryKey>

export function applicationsGetApplicationQueryOptions(
  application_id: ApplicationsGetApplicationPathParams['application_id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = applicationsGetApplicationQueryKey(application_id)
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
export function useApplicationsGetApplication<
  TData = ApplicationsGetApplicationQueryResponse,
  TQueryData = ApplicationsGetApplicationQueryResponse,
  TQueryKey extends QueryKey = ApplicationsGetApplicationQueryKey,
>(
  application_id: ApplicationsGetApplicationPathParams['application_id'],
  options: {
    query?: Partial<
      QueryObserverOptions<ApplicationsGetApplicationQueryResponse, ResponseErrorConfig<ApplicationsGetApplication422>, TData, TQueryData, TQueryKey>
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? applicationsGetApplicationQueryKey(application_id)

  const query = useQuery({
    ...(applicationsGetApplicationQueryOptions(application_id, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<ApplicationsGetApplication422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}