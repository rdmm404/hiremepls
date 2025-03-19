import type { HTTPValidationError } from './HTTPValidationError.ts'

export type DeleteUserUsersUserIdDeletePathParams = {
  /**
   * @type integer
   */
  user_id: number
}

/**
 * @description Successful Response
 */
export type DeleteUserUsersUserIdDelete200 = any

/**
 * @description Validation Error
 */
export type DeleteUserUsersUserIdDelete422 = HTTPValidationError

export type DeleteUserUsersUserIdDeleteMutationResponse = DeleteUserUsersUserIdDelete200

export type DeleteUserUsersUserIdDeleteMutation = {
  Response: DeleteUserUsersUserIdDelete200
  PathParams: DeleteUserUsersUserIdDeletePathParams
  Errors: DeleteUserUsersUserIdDelete422
}