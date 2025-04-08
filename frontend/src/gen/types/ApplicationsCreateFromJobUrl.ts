import type { CreateApplicationByJobUrl } from './CreateApplicationByJobUrl.ts'
import type { HTTPValidationError } from './HTTPValidationError.ts'
import type { WebApplicationsApiSchemaApplication } from './WebApplicationsApiSchemaApplication.ts'

/**
 * @description Successful Response
 */
export type ApplicationsCreateFromJobUrl200 = WebApplicationsApiSchemaApplication

/**
 * @description Validation Error
 */
export type ApplicationsCreateFromJobUrl422 = HTTPValidationError

export type ApplicationsCreateFromJobUrlMutationRequest = CreateApplicationByJobUrl

export type ApplicationsCreateFromJobUrlMutationResponse = ApplicationsCreateFromJobUrl200

export type ApplicationsCreateFromJobUrlMutation = {
  Response: ApplicationsCreateFromJobUrl200
  Request: ApplicationsCreateFromJobUrlMutationRequest
  Errors: ApplicationsCreateFromJobUrl422
}