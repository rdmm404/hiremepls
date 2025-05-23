// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type {
  ApplicationsCreateFromJobUrlMutationRequest,
  ApplicationsCreateFromJobUrlMutationResponse,
  ApplicationsCreateFromJobUrl422,
} from '../../types/ApplicationsCreateFromJobUrl.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'

export function getApplicationsCreateFromJobUrlUrl() {
  return `/applications/url` as const
}

/**
 * @summary Create From Job Url
 * {@link /applications/url}
 */
export async function applicationsCreateFromJobUrl(
  data: ApplicationsCreateFromJobUrlMutationRequest,
  config: Partial<RequestConfig<ApplicationsCreateFromJobUrlMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    ApplicationsCreateFromJobUrlMutationResponse,
    ResponseErrorConfig<ApplicationsCreateFromJobUrl422>,
    ApplicationsCreateFromJobUrlMutationRequest
  >({ method: 'POST', url: getApplicationsCreateFromJobUrlUrl().toString(), data, ...requestConfig })
  return res.data
}