// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type {
  ApplicationsDeleteApplicationMutationResponse,
  ApplicationsDeleteApplicationPathParams,
  ApplicationsDeleteApplication422,
} from '../../types/ApplicationsDeleteApplication.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'

export function getApplicationsDeleteApplicationUrl(application_id: ApplicationsDeleteApplicationPathParams['application_id']) {
  return `/applications/${application_id}` as const
}

/**
 * @summary Delete Application
 * {@link /applications/:application_id}
 */
export async function applicationsDeleteApplication(
  application_id: ApplicationsDeleteApplicationPathParams['application_id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ApplicationsDeleteApplicationMutationResponse, ResponseErrorConfig<ApplicationsDeleteApplication422>, unknown>({
    method: 'DELETE',
    url: getApplicationsDeleteApplicationUrl(application_id).toString(),
    ...requestConfig,
  })
  return res.data
}