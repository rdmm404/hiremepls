import client from '../../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../../client.ts'
import type { UsersCreateUserMutationRequest, UsersCreateUserMutationResponse, UsersCreateUser422 } from '../../types/UsersCreateUser.ts'

export function getUsersCreateUserUrl() {
  return `/users/` as const
}

/**
 * @summary Create User
 * {@link /users/}
 */
export async function usersCreateUser(
  data: UsersCreateUserMutationRequest,
  config: Partial<RequestConfig<UsersCreateUserMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UsersCreateUserMutationResponse, ResponseErrorConfig<UsersCreateUser422>, UsersCreateUserMutationRequest>({
    method: 'POST',
    url: getUsersCreateUserUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}