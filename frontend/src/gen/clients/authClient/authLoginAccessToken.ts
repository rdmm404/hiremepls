// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type { AuthLoginAccessTokenMutationRequest, AuthLoginAccessTokenMutationResponse, AuthLoginAccessToken422 } from '../../types/AuthLoginAccessToken.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'

export function getAuthLoginAccessTokenUrl() {
  return `/auth/login` as const
}

/**
 * @summary Login Access Token
 * {@link /auth/login}
 */
export async function authLoginAccessToken(
  data: AuthLoginAccessTokenMutationRequest,
  config: Partial<RequestConfig<AuthLoginAccessTokenMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<AuthLoginAccessTokenMutationResponse, ResponseErrorConfig<AuthLoginAccessToken422>, AuthLoginAccessTokenMutationRequest>({
    method: 'POST',
    url: getAuthLoginAccessTokenUrl().toString(),
    data,
    ...requestConfig,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...requestConfig.headers },
  })
  return res.data
}