import type { Application } from './Application.ts'
import type { CreateApplicationByJobUrl } from './CreateApplicationByJobUrl.ts'
import type { HTTPValidationError } from './HTTPValidationError.ts'

/**
 * @description Successful Response
 */
export type CreateFromJobUrlApplicationsUrlPost200 = Application

/**
 * @description Validation Error
 */
export type CreateFromJobUrlApplicationsUrlPost422 = HTTPValidationError

export type CreateFromJobUrlApplicationsUrlPostMutationRequest = CreateApplicationByJobUrl

export type CreateFromJobUrlApplicationsUrlPostMutationResponse = CreateFromJobUrlApplicationsUrlPost200

export type CreateFromJobUrlApplicationsUrlPostMutation = {
  Response: CreateFromJobUrlApplicationsUrlPost200
  Request: CreateFromJobUrlApplicationsUrlPostMutationRequest
  Errors: CreateFromJobUrlApplicationsUrlPost422
}