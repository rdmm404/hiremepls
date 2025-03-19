import client from '@kubb/plugin-client/clients/axios'
import type { GetUserUsersUserIdGetQueryResponse, GetUserUsersUserIdGetPathParams, GetUserUsersUserIdGet422 } from '../types/GetUserUsersUserIdGet.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getUserUsersUserIdGetQueryKey = (user_id: GetUserUsersUserIdGetPathParams['user_id']) =>
  [{ url: '/users/:user_id/', params: { user_id: user_id } }] as const

export type GetUserUsersUserIdGetQueryKey = ReturnType<typeof getUserUsersUserIdGetQueryKey>

/**
 * @summary Get User
 * {@link /users/:user_id/}
 */
export async function getUserUsersUserIdGet(
  user_id: GetUserUsersUserIdGetPathParams['user_id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetUserUsersUserIdGetQueryResponse, ResponseErrorConfig<GetUserUsersUserIdGet422>, unknown>({
    method: 'GET',
    url: `/users/${user_id}/`,
    ...requestConfig,
  })
  return res.data
}

export function getUserUsersUserIdGetQueryOptions(
  user_id: GetUserUsersUserIdGetPathParams['user_id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getUserUsersUserIdGetQueryKey(user_id)
  return queryOptions<GetUserUsersUserIdGetQueryResponse, ResponseErrorConfig<GetUserUsersUserIdGet422>, GetUserUsersUserIdGetQueryResponse, typeof queryKey>({
    enabled: !!user_id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getUserUsersUserIdGet(user_id, config)
    },
  })
}

/**
 * @summary Get User
 * {@link /users/:user_id/}
 */
export function useGetUserUsersUserIdGet<
  TData = GetUserUsersUserIdGetQueryResponse,
  TQueryData = GetUserUsersUserIdGetQueryResponse,
  TQueryKey extends QueryKey = GetUserUsersUserIdGetQueryKey,
>(
  user_id: GetUserUsersUserIdGetPathParams['user_id'],
  options: {
    query?: Partial<QueryObserverOptions<GetUserUsersUserIdGetQueryResponse, ResponseErrorConfig<GetUserUsersUserIdGet422>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getUserUsersUserIdGetQueryKey(user_id)

  const query = useQuery({
    ...(getUserUsersUserIdGetQueryOptions(user_id, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetUserUsersUserIdGet422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}