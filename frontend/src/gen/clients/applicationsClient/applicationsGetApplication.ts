import client from '@/client'
import type {
  ApplicationsGetApplicationQueryResponse,
  ApplicationsGetApplicationPathParams,
  ApplicationsGetApplication422,
} from '../../types/ApplicationsGetApplication.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'

export function getApplicationsGetApplicationUrl(application_id: ApplicationsGetApplicationPathParams['application_id']) {
  return `/applications/${application_id}` as const
}

/**
 * @summary Get Application
 * {@link /applications/:application_id}
 */
export async function applicationsGetApplication(
  application_id: ApplicationsGetApplicationPathParams['application_id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ApplicationsGetApplicationQueryResponse, ResponseErrorConfig<ApplicationsGetApplication422>, unknown>({
    method: 'GET',
    url: getApplicationsGetApplicationUrl(application_id).toString(),
    ...requestConfig,
  })
  return res.data
}