// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type { UsersCreateUserMutationRequest, UsersCreateUserMutationResponse, UsersCreateUser422 } from '../../types/UsersCreateUser.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { usersCreateUser } from '../../clients/usersClient/usersCreateUser.ts'
import { useMutation } from '@tanstack/react-query'

export const usersCreateUserMutationKey = () => [{ url: '/users/' }] as const

export type UsersCreateUserMutationKey = ReturnType<typeof usersCreateUserMutationKey>

/**
 * @summary Create User
 * {@link /users/}
 */
export function useUsersCreateUser<TContext>(
  options: {
    mutation?: UseMutationOptions<UsersCreateUserMutationResponse, ResponseErrorConfig<UsersCreateUser422>, { data: UsersCreateUserMutationRequest }, TContext>
    client?: Partial<RequestConfig<UsersCreateUserMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? usersCreateUserMutationKey()

  return useMutation<UsersCreateUserMutationResponse, ResponseErrorConfig<UsersCreateUser422>, { data: UsersCreateUserMutationRequest }, TContext>({
    mutationFn: async ({ data }) => {
      return usersCreateUser(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}