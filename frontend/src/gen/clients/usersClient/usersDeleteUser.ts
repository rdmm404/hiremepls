import client from '@/client'
import type { UsersDeleteUserMutationResponse, UsersDeleteUserPathParams, UsersDeleteUser422 } from '../../types/UsersDeleteUser.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'

export function getUsersDeleteUserUrl(user_id: UsersDeleteUserPathParams['user_id']) {
  return `/users/${user_id}/` as const
}

/**
 * @summary Delete User
 * {@link /users/:user_id/}
 */
export async function usersDeleteUser(user_id: UsersDeleteUserPathParams['user_id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UsersDeleteUserMutationResponse, ResponseErrorConfig<UsersDeleteUser422>, unknown>({
    method: 'DELETE',
    url: getUsersDeleteUserUrl(user_id).toString(),
    ...requestConfig,
  })
  return res.data
}