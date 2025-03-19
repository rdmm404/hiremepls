import type { HTTPValidationError } from './HTTPValidationError.ts'
import type { User } from './User.ts'

export type UsersGetUserPathParams = {
  /**
   * @type integer
   */
  user_id: number
}

/**
 * @description Successful Response
 */
export type UsersGetUser200 = User

/**
 * @description Validation Error
 */
export type UsersGetUser422 = HTTPValidationError

export type UsersGetUserQueryResponse = UsersGetUser200

export type UsersGetUserQuery = {
  Response: UsersGetUser200
  PathParams: UsersGetUserPathParams
  Errors: UsersGetUser422
}