import client from '@kubb/plugin-client/clients/axios'
import type {
  ApplicationsCreateFromJobUrlMutationRequest,
  ApplicationsCreateFromJobUrlMutationResponse,
  ApplicationsCreateFromJobUrl422,
} from '../../types/ApplicationsCreateFromJobUrl.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { applicationsCreateFromJobUrl } from '../../clients/applicationsClient/applicationsCreateFromJobUrl.ts'
import { useMutation } from '@tanstack/react-query'

export const applicationsCreateFromJobUrlMutationKey = () => [{ url: '/applications/url' }] as const

export type ApplicationsCreateFromJobUrlMutationKey = ReturnType<typeof applicationsCreateFromJobUrlMutationKey>

/**
 * @summary Create From Job Url
 * {@link /applications/url}
 */
export function useApplicationsCreateFromJobUrl<TContext>(
  options: {
    mutation?: UseMutationOptions<
      ApplicationsCreateFromJobUrlMutationResponse,
      ResponseErrorConfig<ApplicationsCreateFromJobUrl422>,
      { data: ApplicationsCreateFromJobUrlMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<ApplicationsCreateFromJobUrlMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? applicationsCreateFromJobUrlMutationKey()

  return useMutation<
    ApplicationsCreateFromJobUrlMutationResponse,
    ResponseErrorConfig<ApplicationsCreateFromJobUrl422>,
    { data: ApplicationsCreateFromJobUrlMutationRequest },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return applicationsCreateFromJobUrl(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}