import client from '@/client'
import type { AuthLoginAccessTokenMutationRequest, AuthLoginAccessTokenMutationResponse, AuthLoginAccessToken422 } from '../../types/AuthLoginAccessToken.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { authLoginAccessToken } from '../../clients/authClient/authLoginAccessToken.ts'
import { useMutation } from '@tanstack/react-query'

export const authLoginAccessTokenMutationKey = () => [{ url: '/auth/login' }] as const

export type AuthLoginAccessTokenMutationKey = ReturnType<typeof authLoginAccessTokenMutationKey>

/**
 * @summary Login Access Token
 * {@link /auth/login}
 */
export function useAuthLoginAccessToken<TContext>(
  options: {
    mutation?: UseMutationOptions<
      AuthLoginAccessTokenMutationResponse,
      ResponseErrorConfig<AuthLoginAccessToken422>,
      { data: AuthLoginAccessTokenMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<AuthLoginAccessTokenMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? authLoginAccessTokenMutationKey()

  return useMutation<
    AuthLoginAccessTokenMutationResponse,
    ResponseErrorConfig<AuthLoginAccessToken422>,
    { data: AuthLoginAccessTokenMutationRequest },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return authLoginAccessToken(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}