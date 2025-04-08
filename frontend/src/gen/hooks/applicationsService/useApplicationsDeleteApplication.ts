// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type {
  ApplicationsDeleteApplicationMutationResponse,
  ApplicationsDeleteApplicationPathParams,
  ApplicationsDeleteApplication422,
} from '../../types/ApplicationsDeleteApplication.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { applicationsDeleteApplication } from '../../clients/applicationsClient/applicationsDeleteApplication.ts'
import { useMutation } from '@tanstack/react-query'

export const applicationsDeleteApplicationMutationKey = () => [{ url: '/applications/{application_id}' }] as const

export type ApplicationsDeleteApplicationMutationKey = ReturnType<typeof applicationsDeleteApplicationMutationKey>

/**
 * @summary Delete Application
 * {@link /applications/:application_id}
 */
export function useApplicationsDeleteApplication<TContext>(
  options: {
    mutation?: UseMutationOptions<
      ApplicationsDeleteApplicationMutationResponse,
      ResponseErrorConfig<ApplicationsDeleteApplication422>,
      { application_id: ApplicationsDeleteApplicationPathParams['application_id'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? applicationsDeleteApplicationMutationKey()

  return useMutation<
    ApplicationsDeleteApplicationMutationResponse,
    ResponseErrorConfig<ApplicationsDeleteApplication422>,
    { application_id: ApplicationsDeleteApplicationPathParams['application_id'] },
    TContext
  >({
    mutationFn: async ({ application_id }) => {
      return applicationsDeleteApplication(application_id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}