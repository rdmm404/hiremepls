import type { BodyAuthLoginAccessToken } from './BodyAuthLoginAccessToken.ts'
import type { HTTPValidationError } from './HTTPValidationError.ts'
import type { Token } from './Token.ts'

/**
 * @description Successful Response
 */
export type AuthLoginAccessToken200 = Token

/**
 * @description Validation Error
 */
export type AuthLoginAccessToken422 = HTTPValidationError

export type AuthLoginAccessTokenMutationRequest = BodyAuthLoginAccessToken

export type AuthLoginAccessTokenMutationResponse = AuthLoginAccessToken200

export type AuthLoginAccessTokenMutation = {
  Response: AuthLoginAccessToken200
  Request: AuthLoginAccessTokenMutationRequest
  Errors: AuthLoginAccessToken422
}