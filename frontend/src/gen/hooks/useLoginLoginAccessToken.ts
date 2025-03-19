import client from '@kubb/plugin-client/clients/axios'
import type { LoginLoginAccessTokenMutationRequest, LoginLoginAccessTokenMutationResponse, LoginLoginAccessToken422 } from '../types/LoginLoginAccessToken.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { loginLoginAccessToken } from '../clients/loginService/loginLoginAccessToken.ts'
import { useMutation } from '@tanstack/react-query'

export const loginLoginAccessTokenMutationKey = () => [{ url: '/auth/token' }] as const

export type LoginLoginAccessTokenMutationKey = ReturnType<typeof loginLoginAccessTokenMutationKey>

/**
 * @summary Login Access Token
 * {@link /auth/token}
 */
export function useLoginLoginAccessToken<TContext>(
  options: {
    mutation?: UseMutationOptions<
      LoginLoginAccessTokenMutationResponse,
      ResponseErrorConfig<LoginLoginAccessToken422>,
      { data: LoginLoginAccessTokenMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<LoginLoginAccessTokenMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? loginLoginAccessTokenMutationKey()

  return useMutation<
    LoginLoginAccessTokenMutationResponse,
    ResponseErrorConfig<LoginLoginAccessToken422>,
    { data: LoginLoginAccessTokenMutationRequest },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return loginLoginAccessToken(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}