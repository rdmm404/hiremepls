import type { BodyLoginLoginAccessToken } from './BodyLoginLoginAccessToken.ts'
import type { HTTPValidationError } from './HTTPValidationError.ts'
import type { Token } from './Token.ts'

/**
 * @description Successful Response
 */
export type LoginLoginAccessToken200 = Token

/**
 * @description Validation Error
 */
export type LoginLoginAccessToken422 = HTTPValidationError

export type LoginLoginAccessTokenMutationRequest = BodyLoginLoginAccessToken

export type LoginLoginAccessTokenMutationResponse = LoginLoginAccessToken200

export type LoginLoginAccessTokenMutation = {
  Response: LoginLoginAccessToken200
  Request: LoginLoginAccessTokenMutationRequest
  Errors: LoginLoginAccessToken422
}