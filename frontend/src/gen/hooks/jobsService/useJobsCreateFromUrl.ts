// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type { JobsCreateFromUrlMutationRequest, JobsCreateFromUrlMutationResponse, JobsCreateFromUrl422 } from '../../types/JobsCreateFromUrl.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { jobsCreateFromUrl } from '../../clients/jobsClient/jobsCreateFromUrl.ts'
import { useMutation } from '@tanstack/react-query'

export const jobsCreateFromUrlMutationKey = () => [{ url: '/jobs/url' }] as const

export type JobsCreateFromUrlMutationKey = ReturnType<typeof jobsCreateFromUrlMutationKey>

/**
 * @summary Create From Url
 * {@link /jobs/url}
 */
export function useJobsCreateFromUrl<TContext>(
  options: {
    mutation?: UseMutationOptions<
      JobsCreateFromUrlMutationResponse,
      ResponseErrorConfig<JobsCreateFromUrl422>,
      { data: JobsCreateFromUrlMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<JobsCreateFromUrlMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? jobsCreateFromUrlMutationKey()

  return useMutation<JobsCreateFromUrlMutationResponse, ResponseErrorConfig<JobsCreateFromUrl422>, { data: JobsCreateFromUrlMutationRequest }, TContext>({
    mutationFn: async ({ data }) => {
      return jobsCreateFromUrl(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}