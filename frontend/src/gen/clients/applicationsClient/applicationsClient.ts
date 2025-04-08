// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { applicationsApplicationPartialUpdate } from './applicationsApplicationPartialUpdate.ts'
import { applicationsCreateFromJobUrl } from './applicationsCreateFromJobUrl.ts'
import { applicationsDeleteApplication } from './applicationsDeleteApplication.ts'
import { applicationsGetAllowedStatusesForUpdate } from './applicationsGetAllowedStatusesForUpdate.ts'
import { applicationsGetApplication } from './applicationsGetApplication.ts'
import { applicationsListApplications } from './applicationsListApplications.ts'

export function applicationsClient() {
  return {
    applicationsCreateFromJobUrl,
    applicationsGetAllowedStatusesForUpdate,
    applicationsGetApplication,
    applicationsApplicationPartialUpdate,
    applicationsDeleteApplication,
    applicationsListApplications,
  }
}