import type { HTTPValidationError } from './HTTPValidationError.ts'
import type { WebApplicationsApiSchemaApplication } from './WebApplicationsApiSchemaApplication.ts'

export type ApplicationsGetApplicationPathParams = {
  /**
   * @type integer
   */
  application_id: number
}

/**
 * @description Successful Response
 */
export type ApplicationsGetApplication200 = WebApplicationsApiSchemaApplication

/**
 * @description Validation Error
 */
export type ApplicationsGetApplication422 = HTTPValidationError

export type ApplicationsGetApplicationQueryResponse = ApplicationsGetApplication200

export type ApplicationsGetApplicationQuery = {
  Response: ApplicationsGetApplication200
  PathParams: ApplicationsGetApplicationPathParams
  Errors: ApplicationsGetApplication422
}