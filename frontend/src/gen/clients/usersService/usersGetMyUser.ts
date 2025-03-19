import client from '../../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../../client.ts'
import type { UsersGetMyUserQueryResponse } from '../../types/UsersGetMyUser.ts'

export function getUsersGetMyUserUrl() {
  return `/users/me` as const
}

/**
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