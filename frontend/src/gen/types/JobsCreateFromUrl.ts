import type { CreateJobByUrl } from './CreateJobByUrl.ts'
import type { HTTPValidationError } from './HTTPValidationError.ts'
import type { Job } from './Job.ts'

/**
 * @description Successful Response
 */
export type JobsCreateFromUrl200 = Job

/**
 * @description Validation Error
 */
export type JobsCreateFromUrl422 = HTTPValidationError

export type JobsCreateFromUrlMutationRequest = CreateJobByUrl

export type JobsCreateFromUrlMutationResponse = JobsCreateFromUrl200

export type JobsCreateFromUrlMutation = {
  Response: JobsCreateFromUrl200
  Request: JobsCreateFromUrlMutationRequest
  Errors: JobsCreateFromUrl422
}