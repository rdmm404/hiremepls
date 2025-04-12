// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { authLoginAccessToken } from './authLoginAccessToken.ts'
import { authLogout } from './authLogout.ts'
import { authRegister } from './authRegister.ts'

export function authClient() {
  return { authRegister, authLoginAccessToken, authLogout }
}