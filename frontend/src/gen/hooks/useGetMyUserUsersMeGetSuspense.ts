import client from '@kubb/plugin-client/clients/axios'
import type { GetMyUserUsersMeGetQueryResponse } from '../types/GetMyUserUsersMeGet.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getMyUserUsersMeGetSuspenseQueryKey = () => [{ url: '/users/me' }] as const

export type GetMyUserUsersMeGetSuspenseQueryKey = ReturnType<typeof getMyUserUsersMeGetSuspenseQueryKey>

/**
 * @summary Get My User
 * {@link /users/me}
 */
export async function getMyUserUsersMeGetSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetMyUserUsersMeGetQueryResponse, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/users/me`, ...requestConfig })
  return res.data
}

export function getMyUserUsersMeGetSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getMyUserUsersMeGetSuspenseQueryKey()
  return queryOptions<GetMyUserUsersMeGetQueryResponse, ResponseErrorConfig<Error>, GetMyUserUsersMeGetQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getMyUserUsersMeGetSuspense(config)
    },
  })
}

/**
 * @summary Get My User
 * {@link /users/me}
 */
export function useGetMyUserUsersMeGetSuspense<
  TData = GetMyUserUsersMeGetQueryResponse,
  TQueryData = GetMyUserUsersMeGetQueryResponse,
  TQueryKey extends QueryKey = GetMyUserUsersMeGetSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetMyUserUsersMeGetQueryResponse, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getMyUserUsersMeGetSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(getMyUserUsersMeGetSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}