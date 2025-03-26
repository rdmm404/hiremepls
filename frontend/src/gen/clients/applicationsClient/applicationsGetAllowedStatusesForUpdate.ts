// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type {
  ApplicationsGetAllowedStatusesForUpdateQueryResponse,
  ApplicationsGetAllowedStatusesForUpdateQueryParams,
  ApplicationsGetAllowedStatusesForUpdate422,
} from '../../types/ApplicationsGetAllowedStatusesForUpdate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'

export function getApplicationsGetAllowedStatusesForUpdateUrl() {
  return `/applications/status_flow` as const
}

/**
 * @summary Get Allowed Statuses For Update
 * {@link /applications/status_flow}
 */
export async function applicationsGetAllowedStatusesForUpdate(
  params: ApplicationsGetAllowedStatusesForUpdateQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ApplicationsGetAllowedStatusesForUpdateQueryResponse, ResponseErrorConfig<ApplicationsGetAllowedStatusesForUpdate422>, unknown>({
    method: 'GET',
    url: getApplicationsGetAllowedStatusesForUpdateUrl().toString(),
    params,
    ...requestConfig,
  })
  return res.data
}