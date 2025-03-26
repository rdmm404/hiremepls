import type { HTTPValidationError } from './HTTPValidationError.ts'
import type { SrcApplicationsModelsApplication } from './SrcApplicationsModelsApplication.ts'
import type { UpdateApplicationPartial } from './UpdateApplicationPartial.ts'

export type ApplicationsApplicationPartialUpdatePathParams = {
  /**
   * @type integer
   */
  application_id: number
}

/**
 * @description Successful Response
 */
export type ApplicationsApplicationPartialUpdate200 = SrcApplicationsModelsApplication

/**
 * @description Validation Error
 */
export type ApplicationsApplicationPartialUpdate422 = HTTPValidationError

export type ApplicationsApplicationPartialUpdateMutationRequest = UpdateApplicationPartial

export type ApplicationsApplicationPartialUpdateMutationResponse = ApplicationsApplicationPartialUpdate200

export type ApplicationsApplicationPartialUpdateMutation = {
  Response: ApplicationsApplicationPartialUpdate200
  Request: ApplicationsApplicationPartialUpdateMutationRequest
  PathParams: ApplicationsApplicationPartialUpdatePathParams
  Errors: ApplicationsApplicationPartialUpdate422
}