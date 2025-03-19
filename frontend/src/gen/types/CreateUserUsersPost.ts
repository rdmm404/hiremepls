import type { HTTPValidationError } from './HTTPValidationError.ts'
import type { User } from './User.ts'
import type { UserCreate } from './UserCreate.ts'

/**
 * @description Successful Response
 */
export type CreateUserUsersPost200 = User

/**
 * @description Validation Error
 */
export type CreateUserUsersPost422 = HTTPValidationError

export type CreateUserUsersPostMutationRequest = UserCreate

export type CreateUserUsersPostMutationResponse = CreateUserUsersPost200

export type CreateUserUsersPostMutation = {
  Response: CreateUserUsersPost200
  Request: CreateUserUsersPostMutationRequest
  Errors: CreateUserUsersPost422
}