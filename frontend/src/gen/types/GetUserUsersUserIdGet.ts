import type { HTTPValidationError } from './HTTPValidationError.ts'
import type { User } from './User.ts'

export type GetUserUsersUserIdGetPathParams = {
  /**
   * @type integer
   */
  user_id: number
}

/**
 * @description Successful Response
 */
export type GetUserUsersUserIdGet200 = User

/**
 * @description Validation Error
 */
export type GetUserUsersUserIdGet422 = HTTPValidationError

export type GetUserUsersUserIdGetQueryResponse = GetUserUsersUserIdGet200

export type GetUserUsersUserIdGetQuery = {
  Response: GetUserUsersUserIdGet200
  PathParams: GetUserUsersUserIdGetPathParams
  Errors: GetUserUsersUserIdGet422
}