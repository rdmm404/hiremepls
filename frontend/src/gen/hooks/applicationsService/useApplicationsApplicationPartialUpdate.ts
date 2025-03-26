// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type {
  ApplicationsApplicationPartialUpdateMutationRequest,
  ApplicationsApplicationPartialUpdateMutationResponse,
  ApplicationsApplicationPartialUpdatePathParams,
  ApplicationsApplicationPartialUpdate422,
} from '../../types/ApplicationsApplicationPartialUpdate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { applicationsApplicationPartialUpdate } from '../../clients/applicationsClient/applicationsApplicationPartialUpdate.ts'
import { useMutation } from '@tanstack/react-query'

export const applicationsApplicationPartialUpdateMutationKey = () => [{ url: '/applications/{application_id}' }] as const

export type ApplicationsApplicationPartialUpdateMutationKey = ReturnType<typeof applicationsApplicationPartialUpdateMutationKey>

/**
 * @summary Application Partial Update
 * {@link /applications/:application_id}
 */
export function useApplicationsApplicationPartialUpdate<TContext>(
  options: {
    mutation?: UseMutationOptions<
      ApplicationsApplicationPartialUpdateMutationResponse,
      ResponseErrorConfig<ApplicationsApplicationPartialUpdate422>,
      { application_id: ApplicationsApplicationPartialUpdatePathParams['application_id']; data?: ApplicationsApplicationPartialUpdateMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<ApplicationsApplicationPartialUpdateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? applicationsApplicationPartialUpdateMutationKey()

  return useMutation<
    ApplicationsApplicationPartialUpdateMutationResponse,
    ResponseErrorConfig<ApplicationsApplicationPartialUpdate422>,
    { application_id: ApplicationsApplicationPartialUpdatePathParams['application_id']; data?: ApplicationsApplicationPartialUpdateMutationRequest },
    TContext
  >({
    mutationFn: async ({ application_id, data }) => {
      return applicationsApplicationPartialUpdate(application_id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}