import type { User } from './User.ts'

/**
 * @description Successful Response
 */
export type UsersGetMyUser200 = User

export type UsersGetMyUserQueryResponse = UsersGetMyUser200

export type UsersGetMyUserQuery = {
  Response: UsersGetMyUser200
  Errors: any
}