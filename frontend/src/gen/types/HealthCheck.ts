/**
 * @description Successful Response
 */
export type HealthCheck200 = {
  [key: string]: string
}

export type HealthCheckQueryResponse = HealthCheck200

export type HealthCheckQuery = {
  Response: HealthCheck200
  Errors: any
}