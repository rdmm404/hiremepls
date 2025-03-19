import client from '@kubb/plugin-client/clients/axios'
import type { UsersListUsersQueryResponse, UsersListUsersQueryParams, UsersListUsers422 } from '../types/UsersListUsers.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { usersListUsers } from '../clients/usersService/usersListUsers.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const usersListUsersSuspenseQueryKey = (params?: UsersListUsersQueryParams) => [{ url: '/users/' }, ...(params ? [params] : [])] as const

export type UsersListUsersSuspenseQueryKey = ReturnType<typeof usersListUsersSuspenseQueryKey>

export function usersListUsersSuspenseQueryOptions(params?: UsersListUsersQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = usersListUsersSuspenseQueryKey(params)
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
export function useUsersListUsersSuspense<
  TData = UsersListUsersQueryResponse,
  TQueryData = UsersListUsersQueryResponse,
  TQueryKey extends QueryKey = UsersListUsersSuspenseQueryKey,
>(
  params?: UsersListUsersQueryParams,
  options: {
    query?: Partial<UseSuspenseQueryOptions<UsersListUsersQueryResponse, ResponseErrorConfig<UsersListUsers422>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? usersListUsersSuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(usersListUsersSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<UsersListUsers422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}