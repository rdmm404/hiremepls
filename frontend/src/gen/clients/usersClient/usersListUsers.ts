// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type { UsersListUsersQueryResponse, UsersListUsersQueryParams, UsersListUsers422 } from '../../types/UsersListUsers.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'

export function getUsersListUsersUrl() {
  return `/users/` as const
}

/**
 * @summary List Users
 * {@link /users/}
 */
export async function usersListUsers(params?: UsersListUsersQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UsersListUsersQueryResponse, ResponseErrorConfig<UsersListUsers422>, unknown>({
    method: 'GET',
    url: getUsersListUsersUrl().toString(),
    params,
    ...requestConfig,
  })
  return res.data
}