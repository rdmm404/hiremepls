import client from '@/client'
import type { UsersListUsersQueryResponse, UsersListUsersQueryParams, UsersListUsers422 } from '../../types/UsersListUsers.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { usersListUsers } from '../../clients/usersClient/usersListUsers.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const usersListUsersQueryKey = (params?: UsersListUsersQueryParams) => [{ url: '/users/' }, ...(params ? [params] : [])] as const

export type UsersListUsersQueryKey = ReturnType<typeof usersListUsersQueryKey>

export function usersListUsersQueryOptions(params?: UsersListUsersQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = usersListUsersQueryKey(params)
  return queryOptions<UsersListUsersQueryResponse, ResponseErrorConfig<UsersListUsers422>, UsersListUsersQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return usersListUsers(params, config)
    },
  })
}

/**
 * @summary List Users
 * {@link /users/}
 */
export function useUsersListUsers<
  TData = UsersListUsersQueryResponse,
  TQueryData = UsersListUsersQueryResponse,
  TQueryKey extends QueryKey = UsersListUsersQueryKey,
>(
  params?: UsersListUsersQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<UsersListUsersQueryResponse, ResponseErrorConfig<UsersListUsers422>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? usersListUsersQueryKey(params)

  const query = useQuery({
    ...(usersListUsersQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<UsersListUsers422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}