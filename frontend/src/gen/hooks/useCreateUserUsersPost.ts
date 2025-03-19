import client from '@kubb/plugin-client/clients/axios'
import type { CreateUserUsersPostMutationRequest, CreateUserUsersPostMutationResponse, CreateUserUsersPost422 } from '../types/CreateUserUsersPost.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const createUserUsersPostMutationKey = () => [{ url: '/users/' }] as const

export type CreateUserUsersPostMutationKey = ReturnType<typeof createUserUsersPostMutationKey>

/**
 * @summary Create User
 * {@link /users/}
 */
export async function createUserUsersPost(
  data: CreateUserUsersPostMutationRequest,
  config: Partial<RequestConfig<CreateUserUsersPostMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateUserUsersPostMutationResponse, ResponseErrorConfig<CreateUserUsersPost422>, CreateUserUsersPostMutationRequest>({
    method: 'POST',
    url: `/users/`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * @summary Create User
 * {@link /users/}
 */
export function useCreateUserUsersPost<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CreateUserUsersPostMutationResponse,
      ResponseErrorConfig<CreateUserUsersPost422>,
      { data: CreateUserUsersPostMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<CreateUserUsersPostMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createUserUsersPostMutationKey()

  return useMutation<CreateUserUsersPostMutationResponse, ResponseErrorConfig<CreateUserUsersPost422>, { data: CreateUserUsersPostMutationRequest }, TContext>({
    mutationFn: async ({ data }) => {
      return createUserUsersPost(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}