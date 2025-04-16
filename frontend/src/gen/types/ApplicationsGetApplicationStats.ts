import type { ApplicationStats } from './ApplicationStats.ts'

/**
 * @description Successful Response
 */
export type ApplicationsGetApplicationStats200 = ApplicationStats

export type ApplicationsGetApplicationStatsQueryResponse = ApplicationsGetApplicationStats200

export type ApplicationsGetApplicationStatsQuery = {
  Response: ApplicationsGetApplicationStats200
  Errors: any
}