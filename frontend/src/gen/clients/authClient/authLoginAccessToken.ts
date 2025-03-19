import client from '../../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../../client.ts'
import type { AuthLoginAccessTokenMutationRequest, AuthLoginAccessTokenMutationResponse, AuthLoginAccessToken422 } from '../../types/AuthLoginAccessToken.ts'

export function getAuthLoginAccessTokenUrl() {
  return `/auth/token` as const
}

/**
 * @summary Login Access Token
 * {@link /auth/token}
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