import type { HTTPValidationError } from './HTTPValidationError.ts'
import type { User } from './User.ts'

export type UsersListUsersQueryParams = {
  /**
   * @default 10
   * @type integer | undefined
   */
  limit?: number
  /**
   * @default 0
   * @type integer | undefined
   */
  offset?: number
}

/**
 * @description Successful Response
 */
export type UsersListUsers200 = User[]

/**
 * @description Validation Error
 */
export type UsersListUsers422 = HTTPValidationError

export type UsersListUsersQueryResponse = UsersListUsers200

export type UsersListUsersQuery = {
  Response: UsersListUsers200
  QueryParams: UsersListUsersQueryParams
  Errors: UsersListUsers422
}