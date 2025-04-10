// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type { UsersGetMyUserQueryResponse } from '../../types/UsersGetMyUser.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'

export function getUsersGetMyUserUrl() {
  return `/users/me` as const
}

/**
 * @description Get the information of the current logged in user.
 * @summary Get My User
 * {@link /users/me}
 */
export async function usersGetMyUser(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UsersGetMyUserQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getUsersGetMyUserUrl().toString(),
    ...requestConfig,
  })
  return res.data
}