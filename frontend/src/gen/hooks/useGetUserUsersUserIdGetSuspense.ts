import client from '@kubb/plugin-client/clients/axios'
import type { GetUserUsersUserIdGetQueryResponse, GetUserUsersUserIdGetPathParams, GetUserUsersUserIdGet422 } from '../types/GetUserUsersUserIdGet.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getUserUsersUserIdGetSuspenseQueryKey = (user_id: GetUserUsersUserIdGetPathParams['user_id']) =>
  [{ url: '/users/:user_id/', params: { user_id: user_id } }] as const

export type GetUserUsersUserIdGetSuspenseQueryKey = ReturnType<typeof getUserUsersUserIdGetSuspenseQueryKey>

/**
 * @summary Get User
 * {@link /users/:user_id/}
 */
export async function getUserUsersUserIdGetSuspense(
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

export function getUserUsersUserIdGetSuspenseQueryOptions(
  user_id: GetUserUsersUserIdGetPathParams['user_id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getUserUsersUserIdGetSuspenseQueryKey(user_id)
  return queryOptions<GetUserUsersUserIdGetQueryResponse, ResponseErrorConfig<GetUserUsersUserIdGet422>, GetUserUsersUserIdGetQueryResponse, typeof queryKey>({
    enabled: !!user_id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getUserUsersUserIdGetSuspense(user_id, config)
    },
  })
}

/**
 * @summary Get User
 * {@link /users/:user_id/}
 */
export function useGetUserUsersUserIdGetSuspense<
  TData = GetUserUsersUserIdGetQueryResponse,
  TQueryData = GetUserUsersUserIdGetQueryResponse,
  TQueryKey extends QueryKey = GetUserUsersUserIdGetSuspenseQueryKey,
>(
  user_id: GetUserUsersUserIdGetPathParams['user_id'],
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetUserUsersUserIdGetQueryResponse, ResponseErrorConfig<GetUserUsersUserIdGet422>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getUserUsersUserIdGetSuspenseQueryKey(user_id)

  const query = useSuspenseQuery({
    ...(getUserUsersUserIdGetSuspenseQueryOptions(user_id, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetUserUsersUserIdGet422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}