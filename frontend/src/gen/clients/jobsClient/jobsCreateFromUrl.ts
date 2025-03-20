import client from '@kubb/plugin-client/clients/axios'
import type { JobsCreateFromUrlMutationRequest, JobsCreateFromUrlMutationResponse, JobsCreateFromUrl422 } from '../../types/JobsCreateFromUrl.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getJobsCreateFromUrlUrl() {
  return `/jobs/url` as const
}

/**
 * @summary Create From Url
 * {@link /jobs/url}
 */
export async function jobsCreateFromUrl(
  data: JobsCreateFromUrlMutationRequest,
  config: Partial<RequestConfig<JobsCreateFromUrlMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<JobsCreateFromUrlMutationResponse, ResponseErrorConfig<JobsCreateFromUrl422>, JobsCreateFromUrlMutationRequest>({
    method: 'POST',
    url: getJobsCreateFromUrlUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}