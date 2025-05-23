// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type { UsersGetMyUserQueryResponse } from '../../types/UsersGetMyUser.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { usersGetMyUser } from '../../clients/usersClient/usersGetMyUser.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const usersGetMyUserSuspenseQueryKey = () => [{ url: '/users/me' }] as const

export type UsersGetMyUserSuspenseQueryKey = ReturnType<typeof usersGetMyUserSuspenseQueryKey>

export function usersGetMyUserSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = usersGetMyUserSuspenseQueryKey()
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
export function useUsersGetMyUserSuspense<
  TData = UsersGetMyUserQueryResponse,
  TQueryData = UsersGetMyUserQueryResponse,
  TQueryKey extends QueryKey = UsersGetMyUserSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<UsersGetMyUserQueryResponse, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? usersGetMyUserSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(usersGetMyUserSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}