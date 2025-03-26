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

export function getApplicationsApplicationPartialUpdateUrl(application_id: ApplicationsApplicationPartialUpdatePathParams['application_id']) {
  return `/applications/${application_id}` as const
}

/**
 * @summary Application Partial Update
 * {@link /applications/:application_id}
 */
export async function applicationsApplicationPartialUpdate(
  application_id: ApplicationsApplicationPartialUpdatePathParams['application_id'],
  data?: ApplicationsApplicationPartialUpdateMutationRequest,
  config: Partial<RequestConfig<ApplicationsApplicationPartialUpdateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    ApplicationsApplicationPartialUpdateMutationResponse,
    ResponseErrorConfig<ApplicationsApplicationPartialUpdate422>,
    ApplicationsApplicationPartialUpdateMutationRequest
  >({ method: 'PATCH', url: getApplicationsApplicationPartialUpdateUrl(application_id).toString(), data, ...requestConfig })
  return res.data
}