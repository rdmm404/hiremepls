import client from '@kubb/plugin-client/clients/axios'
import type { UsersDeleteUserMutationResponse, UsersDeleteUserPathParams, UsersDeleteUser422 } from '../types/UsersDeleteUser.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { usersDeleteUser } from '../clients/usersService/usersDeleteUser.ts'
import { useMutation } from '@tanstack/react-query'

export const usersDeleteUserMutationKey = () => [{ url: '/users/{user_id}/' }] as const

export type UsersDeleteUserMutationKey = ReturnType<typeof usersDeleteUserMutationKey>

/**
 * @summary Delete User
 * {@link /users/:user_id/}
 */
export function useUsersDeleteUser<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UsersDeleteUserMutationResponse,
      ResponseErrorConfig<UsersDeleteUser422>,
      { user_id: UsersDeleteUserPathParams['user_id'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? usersDeleteUserMutationKey()

  return useMutation<UsersDeleteUserMutationResponse, ResponseErrorConfig<UsersDeleteUser422>, { user_id: UsersDeleteUserPathParams['user_id'] }, TContext>({
    mutationFn: async ({ user_id }) => {
      return usersDeleteUser(user_id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}