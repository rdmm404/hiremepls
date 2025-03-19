import type { HTTPValidationError } from './HTTPValidationError.ts'
import type { User } from './User.ts'
import type { UserCreate } from './UserCreate.ts'

/**
 * @description Successful Response
 */
export type UsersCreateUser200 = User

/**
 * @description Validation Error
 */
export type UsersCreateUser422 = HTTPValidationError

export type UsersCreateUserMutationRequest = UserCreate

export type UsersCreateUserMutationResponse = UsersCreateUser200

export type UsersCreateUserMutation = {
  Response: UsersCreateUser200
  Request: UsersCreateUserMutationRequest
  Errors: UsersCreateUser422
}