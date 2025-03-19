import client from '@kubb/plugin-client/clients/axios'
import type {
  LoginAccessTokenAuthTokenPostMutationRequest,
  LoginAccessTokenAuthTokenPostMutationResponse,
  LoginAccessTokenAuthTokenPost422,
} from '../types/LoginAccessTokenAuthTokenPost.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const loginAccessTokenAuthTokenPostMutationKey = () => [{ url: '/auth/token' }] as const

export type LoginAccessTokenAuthTokenPostMutationKey = ReturnType<typeof loginAccessTokenAuthTokenPostMutationKey>

/**
 * @summary Login Access Token
 * {@link /auth/token}
 */
export async function loginAccessTokenAuthTokenPost(
  data: LoginAccessTokenAuthTokenPostMutationRequest,
  config: Partial<RequestConfig<LoginAccessTokenAuthTokenPostMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    LoginAccessTokenAuthTokenPostMutationResponse,
    ResponseErrorConfig<LoginAccessTokenAuthTokenPost422>,
    LoginAccessTokenAuthTokenPostMutationRequest
  >({ method: 'POST', url: `/auth/token`, data, ...requestConfig, headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...requestConfig.headers } })
  return res.data
}

/**
 * @summary Login Access Token
 * {@link /auth/token}
 */
export function useLoginAccessTokenAuthTokenPost<TContext>(
  options: {
    mutation?: UseMutationOptions<
      LoginAccessTokenAuthTokenPostMutationResponse,
      ResponseErrorConfig<LoginAccessTokenAuthTokenPost422>,
      { data: LoginAccessTokenAuthTokenPostMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<LoginAccessTokenAuthTokenPostMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? loginAccessTokenAuthTokenPostMutationKey()

  return useMutation<
    LoginAccessTokenAuthTokenPostMutationResponse,
    ResponseErrorConfig<LoginAccessTokenAuthTokenPost422>,
    { data: LoginAccessTokenAuthTokenPostMutationRequest },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return loginAccessTokenAuthTokenPost(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}