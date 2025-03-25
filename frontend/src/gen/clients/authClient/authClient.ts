// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { authLoginAccessToken } from './authLoginAccessToken.ts'
import { authLogout } from './authLogout.ts'

export function authClient() {
  return { authLoginAccessToken, authLogout }
}