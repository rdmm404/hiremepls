import client from '@/client'
import type { AuthLogoutMutationResponse } from '../../types/AuthLogout.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'

export function getAuthLogoutUrl() {
  return `/auth/logout` as const
}

/**
 * @summary Logout
 * {@link /auth/logout}
 */
export async function authLogout(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<AuthLogoutMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'POST',
    url: getAuthLogoutUrl().toString(),
    ...requestConfig,
  })
  return res.data
}