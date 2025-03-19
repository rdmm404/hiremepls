import type { HTTPValidationError } from './HTTPValidationError.ts'

export type UsersDeleteUserPathParams = {
  /**
   * @type integer
   */
  user_id: number
}

/**
 * @description Successful Response
 */
export type UsersDeleteUser200 = any

/**
 * @description Validation Error
 */
export type UsersDeleteUser422 = HTTPValidationError

export type UsersDeleteUserMutationResponse = UsersDeleteUser200

export type UsersDeleteUserMutation = {
  Response: UsersDeleteUser200
  PathParams: UsersDeleteUserPathParams
  Errors: UsersDeleteUser422
}