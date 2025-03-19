import { usersCreateUser } from './usersCreateUser.ts'
import { usersDeleteUser } from './usersDeleteUser.ts'
import { usersGetMyUser } from './usersGetMyUser.ts'
import { usersGetUser } from './usersGetUser.ts'
import { usersListUsers } from './usersListUsers.ts'

export function usersService() {
  return { usersGetMyUser, usersListUsers, usersCreateUser, usersGetUser, usersDeleteUser }
}