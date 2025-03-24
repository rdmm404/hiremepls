import type { HTTPValidationError } from './HTTPValidationError.ts'
import type { PaginatedResponseApplicationSummary } from './PaginatedResponseApplicationSummary.ts'

export type ApplicationsListApplicationsQueryParams = {
  /**
   * @default 1
   * @type integer | undefined
   */
  page?: number
  /**
   * @default 10
   * @type integer | undefined
   */
  page_size?: number
}

/**
 * @description Successful Response
 */
export type ApplicationsListApplications200 = PaginatedResponseApplicationSummary

/**
 * @description Validation Error
 */
export type ApplicationsListApplications422 = HTTPValidationError

export type ApplicationsListApplicationsQueryResponse = ApplicationsListApplications200

export type ApplicationsListApplicationsQuery = {
  Response: ApplicationsListApplications200
  QueryParams: ApplicationsListApplicationsQueryParams
  Errors: ApplicationsListApplications422
}