import client from '@kubb/plugin-client/clients/axios'
import type { UsersGetUserQueryResponse, UsersGetUserPathParams, UsersGetUser422 } from '../types/UsersGetUser.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { usersGetUser } from '../clients/usersService/usersGetUser.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const usersGetUserSuspenseQueryKey = (user_id: UsersGetUserPathParams['user_id']) => [{ url: '/users/:user_id/', params: { user_id: user_id } }] as const

export type UsersGetUserSuspenseQueryKey = ReturnType<typeof usersGetUserSuspenseQueryKey>

export function usersGetUserSuspenseQueryOptions(user_id: UsersGetUserPathParams['user_id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = usersGetUserSuspenseQueryKey(user_id)
  return queryOptions<UsersGetUserQueryResponse, ResponseErrorConfig<UsersGetUser422>, UsersGetUserQueryResponse, typeof queryKey>({
    enabled: !!user_id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return usersGetUser(user_id, config)
    },
  })
}

/**
 * @summary Get User
 * {@link /users/:user_id/}
 */
export function useUsersGetUserSuspense<
  TData = UsersGetUserQueryResponse,
  TQueryData = UsersGetUserQueryResponse,
  TQueryKey extends QueryKey = UsersGetUserSuspenseQueryKey,
>(
  user_id: UsersGetUserPathParams['user_id'],
  options: {
    query?: Partial<UseSuspenseQueryOptions<UsersGetUserQueryResponse, ResponseErrorConfig<UsersGetUser422>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? usersGetUserSuspenseQueryKey(user_id)

  const query = useSuspenseQuery({
    ...(usersGetUserSuspenseQueryOptions(user_id, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<UsersGetUser422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}