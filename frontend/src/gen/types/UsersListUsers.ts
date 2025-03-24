import type { HTTPValidationError } from './HTTPValidationError.ts'
import type { PaginatedResponseUser } from './PaginatedResponseUser.ts'

export type UsersListUsersQueryParams = {
  /**
   * @default 1
   * @type integer | undefined
   */
  page?: number
  /**
   * @default 10
   * @type integer | undefined
   */
  page_size?: number
}

/**
 * @description Successful Response
 */
export type UsersListUsers200 = PaginatedResponseUser

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