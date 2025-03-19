import client from '@kubb/plugin-client/clients/axios'
import type {
  CreateFromUrlJobsUrlPostMutationRequest,
  CreateFromUrlJobsUrlPostMutationResponse,
  CreateFromUrlJobsUrlPost422,
} from '../types/CreateFromUrlJobsUrlPost.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const createFromUrlJobsUrlPostMutationKey = () => [{ url: '/jobs/url' }] as const

export type CreateFromUrlJobsUrlPostMutationKey = ReturnType<typeof createFromUrlJobsUrlPostMutationKey>

/**
 * @summary Create From Url
 * {@link /jobs/url}
 */
export async function createFromUrlJobsUrlPost(
  data: CreateFromUrlJobsUrlPostMutationRequest,
  config: Partial<RequestConfig<CreateFromUrlJobsUrlPostMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    CreateFromUrlJobsUrlPostMutationResponse,
    ResponseErrorConfig<CreateFromUrlJobsUrlPost422>,
    CreateFromUrlJobsUrlPostMutationRequest
  >({ method: 'POST', url: `/jobs/url`, data, ...requestConfig })
  return res.data
}

/**
 * @summary Create From Url
 * {@link /jobs/url}
 */
export function useCreateFromUrlJobsUrlPost<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CreateFromUrlJobsUrlPostMutationResponse,
      ResponseErrorConfig<CreateFromUrlJobsUrlPost422>,
      { data: CreateFromUrlJobsUrlPostMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<CreateFromUrlJobsUrlPostMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createFromUrlJobsUrlPostMutationKey()

  return useMutation<
    CreateFromUrlJobsUrlPostMutationResponse,
    ResponseErrorConfig<CreateFromUrlJobsUrlPost422>,
    { data: CreateFromUrlJobsUrlPostMutationRequest },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return createFromUrlJobsUrlPost(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}