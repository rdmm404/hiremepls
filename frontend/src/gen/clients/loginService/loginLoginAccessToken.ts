import client from '../../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../../client.ts'
import type {
  LoginLoginAccessTokenMutationRequest,
  LoginLoginAccessTokenMutationResponse,
  LoginLoginAccessToken422,
} from '../../types/LoginLoginAccessToken.ts'

export function getLoginLoginAccessTokenUrl() {
  return `/auth/token` as const
}

/**
 * @summary Login Access Token
 * {@link /auth/token}
 */
export async function loginLoginAccessToken(
  data: LoginLoginAccessTokenMutationRequest,
  config: Partial<RequestConfig<LoginLoginAccessTokenMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<LoginLoginAccessTokenMutationResponse, ResponseErrorConfig<LoginLoginAccessToken422>, LoginLoginAccessTokenMutationRequest>({
    method: 'POST',
    url: getLoginLoginAccessTokenUrl().toString(),
    data,
    ...requestConfig,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...requestConfig.headers },
  })
  return res.data
}