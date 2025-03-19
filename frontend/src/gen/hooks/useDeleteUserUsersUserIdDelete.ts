import client from '@kubb/plugin-client/clients/axios'
import type {
  DeleteUserUsersUserIdDeleteMutationResponse,
  DeleteUserUsersUserIdDeletePathParams,
  DeleteUserUsersUserIdDelete422,
} from '../types/DeleteUserUsersUserIdDelete.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const deleteUserUsersUserIdDeleteMutationKey = () => [{ url: '/users/{user_id}/' }] as const

export type DeleteUserUsersUserIdDeleteMutationKey = ReturnType<typeof deleteUserUsersUserIdDeleteMutationKey>

/**
 * @summary Delete User
 * {@link /users/:user_id/}
 */
export async function deleteUserUsersUserIdDelete(
  user_id: DeleteUserUsersUserIdDeletePathParams['user_id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteUserUsersUserIdDeleteMutationResponse, ResponseErrorConfig<DeleteUserUsersUserIdDelete422>, unknown>({
    method: 'DELETE',
    url: `/users/${user_id}/`,
    ...requestConfig,
  })
  return res.data
}

/**
 * @summary Delete User
 * {@link /users/:user_id/}
 */
export function useDeleteUserUsersUserIdDelete<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeleteUserUsersUserIdDeleteMutationResponse,
      ResponseErrorConfig<DeleteUserUsersUserIdDelete422>,
      { user_id: DeleteUserUsersUserIdDeletePathParams['user_id'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteUserUsersUserIdDeleteMutationKey()

  return useMutation<
    DeleteUserUsersUserIdDeleteMutationResponse,
    ResponseErrorConfig<DeleteUserUsersUserIdDelete422>,
    { user_id: DeleteUserUsersUserIdDeletePathParams['user_id'] },
    TContext
  >({
    mutationFn: async ({ user_id }) => {
      return deleteUserUsersUserIdDelete(user_id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}