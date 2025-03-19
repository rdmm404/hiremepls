import client from '@kubb/plugin-client/clients/axios'
import type { ListUsersUsersGetQueryResponse, ListUsersUsersGetQueryParams, ListUsersUsersGet422 } from '../types/ListUsersUsersGet.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const listUsersUsersGetQueryKey = (params?: ListUsersUsersGetQueryParams) => [{ url: '/users/' }, ...(params ? [params] : [])] as const

export type ListUsersUsersGetQueryKey = ReturnType<typeof listUsersUsersGetQueryKey>

/**
 * @summary List Users
 * {@link /users/}
 */
export async function listUsersUsersGet(params?: ListUsersUsersGetQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ListUsersUsersGetQueryResponse, ResponseErrorConfig<ListUsersUsersGet422>, unknown>({
    method: 'GET',
    url: `/users/`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function listUsersUsersGetQueryOptions(params?: ListUsersUsersGetQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = listUsersUsersGetQueryKey(params)
  return queryOptions<ListUsersUsersGetQueryResponse, ResponseErrorConfig<ListUsersUsersGet422>, ListUsersUsersGetQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return listUsersUsersGet(params, config)
    },
  })
}

/**
 * @summary List Users
 * {@link /users/}
 */
export function useListUsersUsersGet<
  TData = ListUsersUsersGetQueryResponse,
  TQueryData = ListUsersUsersGetQueryResponse,
  TQueryKey extends QueryKey = ListUsersUsersGetQueryKey,
>(
  params?: ListUsersUsersGetQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<ListUsersUsersGetQueryResponse, ResponseErrorConfig<ListUsersUsersGet422>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? listUsersUsersGetQueryKey(params)

  const query = useQuery({
    ...(listUsersUsersGetQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<ListUsersUsersGet422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}