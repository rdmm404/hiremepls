import client from '@kubb/plugin-client/clients/axios'
import type { UsersGetUserQueryResponse, UsersGetUserPathParams, UsersGetUser422 } from '../types/UsersGetUser.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { usersGetUser } from '../clients/usersService/usersGetUser.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const usersGetUserQueryKey = (user_id: UsersGetUserPathParams['user_id']) => [{ url: '/users/:user_id/', params: { user_id: user_id } }] as const

export type UsersGetUserQueryKey = ReturnType<typeof usersGetUserQueryKey>

export function usersGetUserQueryOptions(user_id: UsersGetUserPathParams['user_id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = usersGetUserQueryKey(user_id)
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
export function useUsersGetUser<TData = UsersGetUserQueryResponse, TQueryData = UsersGetUserQueryResponse, TQueryKey extends QueryKey = UsersGetUserQueryKey>(
  user_id: UsersGetUserPathParams['user_id'],
  options: {
    query?: Partial<QueryObserverOptions<UsersGetUserQueryResponse, ResponseErrorConfig<UsersGetUser422>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? usersGetUserQueryKey(user_id)

  const query = useQuery({
    ...(usersGetUserQueryOptions(user_id, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<UsersGetUser422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}