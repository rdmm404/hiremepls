// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type { AuthRegisterMutationRequest, AuthRegisterMutationResponse, AuthRegister422 } from '../../types/AuthRegister.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { authRegister } from '../../clients/authClient/authRegister.ts'
import { useMutation } from '@tanstack/react-query'

export const authRegisterMutationKey = () => [{ url: '/auth/signup' }] as const

export type AuthRegisterMutationKey = ReturnType<typeof authRegisterMutationKey>

/**
 * @summary Register
 * {@link /auth/signup}
 */
export function useAuthRegister<TContext>(
  options: {
    mutation?: UseMutationOptions<AuthRegisterMutationResponse, ResponseErrorConfig<AuthRegister422>, { data: AuthRegisterMutationRequest }, TContext>
    client?: Partial<RequestConfig<AuthRegisterMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? authRegisterMutationKey()

  return useMutation<AuthRegisterMutationResponse, ResponseErrorConfig<AuthRegister422>, { data: AuthRegisterMutationRequest }, TContext>({
    mutationFn: async ({ data }) => {
      return authRegister(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}