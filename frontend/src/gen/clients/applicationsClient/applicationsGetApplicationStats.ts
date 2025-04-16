// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type { ApplicationsGetApplicationStatsQueryResponse } from '../../types/ApplicationsGetApplicationStats.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'

export function getApplicationsGetApplicationStatsUrl() {
  return `/applications/stats` as const
}

/**
 * @description Get overview statistics of user's applications for the dashboard.Includes total count, status breakdowns, and other relevant metrics.
 * @summary Get Application Stats
 * {@link /applications/stats}
 */
export async function applicationsGetApplicationStats(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ApplicationsGetApplicationStatsQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getApplicationsGetApplicationStatsUrl().toString(),
    ...requestConfig,
  })
  return res.data
}