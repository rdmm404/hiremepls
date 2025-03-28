// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type { UsersGetUserQueryResponse, UsersGetUserPathParams, UsersGetUser422 } from '../../types/UsersGetUser.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'

export function getUsersGetUserUrl(user_id: UsersGetUserPathParams['user_id']) {
  return `/users/${user_id}/` as const
}

/**
 * @summary Get User
 * {@link /users/:user_id/}
 */
export async function usersGetUser(user_id: UsersGetUserPathParams['user_id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UsersGetUserQueryResponse, ResponseErrorConfig<UsersGetUser422>, unknown>({
    method: 'GET',
    url: getUsersGetUserUrl(user_id).toString(),
    ...requestConfig,
  })
  return res.data
}