import type { HTTPValidationError } from './HTTPValidationError.ts'

export type ApplicationsDeleteApplicationPathParams = {
  /**
   * @type integer
   */
  application_id: number
}

/**
 * @description Successful Response
 */
export type ApplicationsDeleteApplication204 = any

/**
 * @description Validation Error
 */
export type ApplicationsDeleteApplication422 = HTTPValidationError

export type ApplicationsDeleteApplicationMutationResponse = ApplicationsDeleteApplication204

export type ApplicationsDeleteApplicationMutation = {
  Response: ApplicationsDeleteApplication204
  PathParams: ApplicationsDeleteApplicationPathParams
  Errors: ApplicationsDeleteApplication422
}