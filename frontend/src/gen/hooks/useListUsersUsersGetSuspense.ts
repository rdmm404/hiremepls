import client from '@kubb/plugin-client/clients/axios'
import type { ListUsersUsersGetQueryResponse, ListUsersUsersGetQueryParams, ListUsersUsersGet422 } from '../types/ListUsersUsersGet.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const listUsersUsersGetSuspenseQueryKey = (params?: ListUsersUsersGetQueryParams) => [{ url: '/users/' }, ...(params ? [params] : [])] as const

export type ListUsersUsersGetSuspenseQueryKey = ReturnType<typeof listUsersUsersGetSuspenseQueryKey>

/**
 * @summary List Users
 * {@link /users/}
 */
export async function listUsersUsersGetSuspense(params?: ListUsersUsersGetQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ListUsersUsersGetQueryResponse, ResponseErrorConfig<ListUsersUsersGet422>, unknown>({
    method: 'GET',
    url: `/users/`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function listUsersUsersGetSuspenseQueryOptions(params?: ListUsersUsersGetQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = listUsersUsersGetSuspenseQueryKey(params)
  return queryOptions<ListUsersUsersGetQueryResponse, ResponseErrorConfig<ListUsersUsersGet422>, ListUsersUsersGetQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return listUsersUsersGetSuspense(params, config)
    },
  })
}

/**
 * @summary List Users
 * {@link /users/}
 */
export function useListUsersUsersGetSuspense<
  TData = ListUsersUsersGetQueryResponse,
  TQueryData = ListUsersUsersGetQueryResponse,
  TQueryKey extends QueryKey = ListUsersUsersGetSuspenseQueryKey,
>(
  params?: ListUsersUsersGetQueryParams,
  options: {
    query?: Partial<UseSuspenseQueryOptions<ListUsersUsersGetQueryResponse, ResponseErrorConfig<ListUsersUsersGet422>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? listUsersUsersGetSuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(listUsersUsersGetSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<ListUsersUsersGet422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}