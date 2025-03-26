import type { ApplicationStatus } from './ApplicationStatus.ts'
import type { HTTPValidationError } from './HTTPValidationError.ts'

export type ApplicationsGetAllowedStatusesForUpdateQueryParams = {
  /**
   * @type string
   */
  status: ApplicationStatus
}

/**
 * @description Successful Response
 */
export type ApplicationsGetAllowedStatusesForUpdate200 = ApplicationStatus[]

/**
 * @description Validation Error
 */
export type ApplicationsGetAllowedStatusesForUpdate422 = HTTPValidationError

export type ApplicationsGetAllowedStatusesForUpdateQueryResponse = ApplicationsGetAllowedStatusesForUpdate200

export type ApplicationsGetAllowedStatusesForUpdateQuery = {
  Response: ApplicationsGetAllowedStatusesForUpdate200
  QueryParams: ApplicationsGetAllowedStatusesForUpdateQueryParams
  Errors: ApplicationsGetAllowedStatusesForUpdate422
}