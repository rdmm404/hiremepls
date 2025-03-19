import type { BodyLoginAccessTokenAuthTokenPost } from './BodyLoginAccessTokenAuthTokenPost.ts'
import type { HTTPValidationError } from './HTTPValidationError.ts'
import type { Token } from './Token.ts'

/**
 * @description Successful Response
 */
export type LoginAccessTokenAuthTokenPost200 = Token

/**
 * @description Validation Error
 */
export type LoginAccessTokenAuthTokenPost422 = HTTPValidationError

export type LoginAccessTokenAuthTokenPostMutationRequest = BodyLoginAccessTokenAuthTokenPost

export type LoginAccessTokenAuthTokenPostMutationResponse = LoginAccessTokenAuthTokenPost200

export type LoginAccessTokenAuthTokenPostMutation = {
  Response: LoginAccessTokenAuthTokenPost200
  Request: LoginAccessTokenAuthTokenPostMutationRequest
  Errors: LoginAccessTokenAuthTokenPost422
}