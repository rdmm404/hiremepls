import client from '@kubb/plugin-client/clients/axios'
import type { GetMyUserUsersMeGetQueryResponse } from '../types/GetMyUserUsersMeGet.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getMyUserUsersMeGetQueryKey = () => [{ url: '/users/me' }] as const

export type GetMyUserUsersMeGetQueryKey = ReturnType<typeof getMyUserUsersMeGetQueryKey>

/**
 * @summary Get My User
 * {@link /users/me}
 */
export async function getMyUserUsersMeGet(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetMyUserUsersMeGetQueryResponse, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/users/me`, ...requestConfig })
  return res.data
}

export function getMyUserUsersMeGetQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getMyUserUsersMeGetQueryKey()
  return queryOptions<GetMyUserUsersMeGetQueryResponse, ResponseErrorConfig<Error>, GetMyUserUsersMeGetQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getMyUserUsersMeGet(config)
    },
  })
}

/**
 * @summary Get My User
 * {@link /users/me}
 */
export function useGetMyUserUsersMeGet<
  TData = GetMyUserUsersMeGetQueryResponse,
  TQueryData = GetMyUserUsersMeGetQueryResponse,
  TQueryKey extends QueryKey = GetMyUserUsersMeGetQueryKey,
>(
  options: {
    query?: Partial<QueryObserverOptions<GetMyUserUsersMeGetQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getMyUserUsersMeGetQueryKey()

  const query = useQuery({
    ...(getMyUserUsersMeGetQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}