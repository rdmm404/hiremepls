import type { HTTPValidationError } from './HTTPValidationError.ts'
import type { RegistrationResponse } from './RegistrationResponse.ts'
import type { UserRegistration } from './UserRegistration.ts'

/**
 * @description Successful Response
 */
export type AuthRegister200 = RegistrationResponse

/**
 * @description Validation Error
 */
export type AuthRegister422 = HTTPValidationError

export type AuthRegisterMutationRequest = UserRegistration

export type AuthRegisterMutationResponse = AuthRegister200

export type AuthRegisterMutation = {
  Response: AuthRegister200
  Request: AuthRegisterMutationRequest
  Errors: AuthRegister422
}