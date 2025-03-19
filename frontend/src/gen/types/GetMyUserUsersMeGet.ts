import type { User } from './User.ts'

/**
 * @description Successful Response
 */
export type GetMyUserUsersMeGet200 = User

export type GetMyUserUsersMeGetQueryResponse = GetMyUserUsersMeGet200

export type GetMyUserUsersMeGetQuery = {
  Response: GetMyUserUsersMeGet200
  Errors: any
}