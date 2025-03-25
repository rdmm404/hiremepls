// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type {
  ApplicationsListApplicationsQueryResponse,
  ApplicationsListApplicationsQueryParams,
  ApplicationsListApplications422,
} from '../../types/ApplicationsListApplications.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'

export function getApplicationsListApplicationsUrl() {
  return `/applications/` as const
}

/**
 * @summary List Applications
 * {@link /applications/}
 */
export async function applicationsListApplications(
  params?: ApplicationsListApplicationsQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ApplicationsListApplicationsQueryResponse, ResponseErrorConfig<ApplicationsListApplications422>, unknown>({
    method: 'GET',
    url: getApplicationsListApplicationsUrl().toString(),
    params,
    ...requestConfig,
  })
  return res.data
}