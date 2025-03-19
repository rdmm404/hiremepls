import client from '@kubb/plugin-client/clients/axios'
import type {
  CreateFromJobUrlApplicationsUrlPostMutationRequest,
  CreateFromJobUrlApplicationsUrlPostMutationResponse,
  CreateFromJobUrlApplicationsUrlPost422,
} from '../types/CreateFromJobUrlApplicationsUrlPost.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const createFromJobUrlApplicationsUrlPostMutationKey = () => [{ url: '/applications/url' }] as const

export type CreateFromJobUrlApplicationsUrlPostMutationKey = ReturnType<typeof createFromJobUrlApplicationsUrlPostMutationKey>

/**
 * @summary Create From Job Url
 * {@link /applications/url}
 */
export async function createFromJobUrlApplicationsUrlPost(
  data: CreateFromJobUrlApplicationsUrlPostMutationRequest,
  config: Partial<RequestConfig<CreateFromJobUrlApplicationsUrlPostMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    CreateFromJobUrlApplicationsUrlPostMutationResponse,
    ResponseErrorConfig<CreateFromJobUrlApplicationsUrlPost422>,
    CreateFromJobUrlApplicationsUrlPostMutationRequest
  >({ method: 'POST', url: `/applications/url`, data, ...requestConfig })
  return res.data
}

/**
 * @summary Create From Job Url
 * {@link /applications/url}
 */
export function useCreateFromJobUrlApplicationsUrlPost<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CreateFromJobUrlApplicationsUrlPostMutationResponse,
      ResponseErrorConfig<CreateFromJobUrlApplicationsUrlPost422>,
      { data: CreateFromJobUrlApplicationsUrlPostMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<CreateFromJobUrlApplicationsUrlPostMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createFromJobUrlApplicationsUrlPostMutationKey()

  return useMutation<
    CreateFromJobUrlApplicationsUrlPostMutationResponse,
    ResponseErrorConfig<CreateFromJobUrlApplicationsUrlPost422>,
    { data: CreateFromJobUrlApplicationsUrlPostMutationRequest },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return createFromJobUrlApplicationsUrlPost(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}