import client from '@kubb/plugin-client/clients/axios'
import type { UsersGetMyUserQueryResponse } from '../../types/UsersGetMyUser.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { usersGetMyUser } from '../../clients/usersClient/usersGetMyUser.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const usersGetMyUserQueryKey = () => [{ url: '/users/me' }] as const

export type UsersGetMyUserQueryKey = ReturnType<typeof usersGetMyUserQueryKey>

export function usersGetMyUserQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = usersGetMyUserQueryKey()
  return queryOptions<UsersGetMyUserQueryResponse, ResponseErrorConfig<Error>, UsersGetMyUserQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return usersGetMyUser(config)
    },
  })
}

/**
 * @description Get the information of the current logged in user.
 * @summary Get My User
 * {@link /users/me}
 */
export function useUsersGetMyUser<
  TData = UsersGetMyUserQueryResponse,
  TQueryData = UsersGetMyUserQueryResponse,
  TQueryKey extends QueryKey = UsersGetMyUserQueryKey,
>(
  options: {
    query?: Partial<QueryObserverOptions<UsersGetMyUserQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? usersGetMyUserQueryKey()

  const query = useQuery({
    ...(usersGetMyUserQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}