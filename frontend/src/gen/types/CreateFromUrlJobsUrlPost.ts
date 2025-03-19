import type { CreateJobByUrl } from './CreateJobByUrl.ts'
import type { HTTPValidationError } from './HTTPValidationError.ts'
import type { Job } from './Job.ts'

/**
 * @description Successful Response
 */
export type CreateFromUrlJobsUrlPost200 = Job

/**
 * @description Validation Error
 */
export type CreateFromUrlJobsUrlPost422 = HTTPValidationError

export type CreateFromUrlJobsUrlPostMutationRequest = CreateJobByUrl

export type CreateFromUrlJobsUrlPostMutationResponse = CreateFromUrlJobsUrlPost200

export type CreateFromUrlJobsUrlPostMutation = {
  Response: CreateFromUrlJobsUrlPost200
  Request: CreateFromUrlJobsUrlPostMutationRequest
  Errors: CreateFromUrlJobsUrlPost422
}