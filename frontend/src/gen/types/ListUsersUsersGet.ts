import type { HTTPValidationError } from './HTTPValidationError.ts'
import type { User } from './User.ts'

export type ListUsersUsersGetQueryParams = {
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
export type ListUsersUsersGet200 = User[]

/**
 * @description Validation Error
 */
export type ListUsersUsersGet422 = HTTPValidationError

export type ListUsersUsersGetQueryResponse = ListUsersUsersGet200

export type ListUsersUsersGetQuery = {
  Response: ListUsersUsersGet200
  QueryParams: ListUsersUsersGetQueryParams
  Errors: ListUsersUsersGet422
}