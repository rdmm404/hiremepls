// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import client from '@/client'
import type { AuthRegisterMutationRequest, AuthRegisterMutationResponse, AuthRegister422 } from '../../types/AuthRegister.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/client'

export function getAuthRegisterUrl() {
  return `/auth/signup` as const
}

/**
 * @summary Register
 * {@link /auth/signup}
 */
export async function authRegister(
  data: AuthRegisterMutationRequest,
  config: Partial<RequestConfig<AuthRegisterMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<AuthRegisterMutationResponse, ResponseErrorConfig<AuthRegister422>, AuthRegisterMutationRequest>({
    method: 'POST',
    url: getAuthRegisterUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}