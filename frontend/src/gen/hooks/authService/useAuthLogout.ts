import client from '@/client'
import type { AuthLogoutMutationResponse } from '../../types/AuthLogout.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { authLogout } from '../../clients/authClient/authLogout.ts'
import { useMutation } from '@tanstack/react-query'

export const authLogoutMutationKey = () => [{ url: '/auth/logout' }] as const

export type AuthLogoutMutationKey = ReturnType<typeof authLogoutMutationKey>

/**
 * @summary Logout
 * {@link /auth/logout}
 */
export function useAuthLogout<TContext>(
  options: {
    mutation?: UseMutationOptions<AuthLogoutMutationResponse, ResponseErrorConfig<Error>, undefined, TContext>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? authLogoutMutationKey()

  return useMutation<AuthLogoutMutationResponse, ResponseErrorConfig<Error>, undefined, TContext>({
    mutationFn: async () => {
      return authLogout(config)
    },
    mutationKey,
    ...mutationOptions,
  })
}