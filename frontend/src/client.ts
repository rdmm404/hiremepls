import {
  client as originalClient,
  RequestConfig as OriginalRequestConfig,
  ResponseConfig as OriginalResponseConfig,
  ResponseErrorConfig as OriginalResponseErrorConfig,
} from "@kubb/plugin-client/clients/fetch.ts";

const getBaseURL = (): string => {
  return process.env.BACKEND_URL || "localhost:8765";
};

export const client = async <TData, _TError = unknown, TVariables = unknown>(
  paramsConfig: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> => {
  const baseURL = getBaseURL();
  const config = {
    ...paramsConfig,
    baseURL: paramsConfig.baseURL || baseURL,
  };

  return originalClient<TData, _TError, TVariables>(config);
};

client.getConfig = originalClient.getConfig;
client.setConfig = originalClient.setConfig;

export default client;

export type RequestConfig<TVariables = unknown> =
  OriginalRequestConfig<TVariables>;
export type ResponseConfig<TData = unknown> = OriginalResponseConfig<TData>;
export type ResponseErrorConfig<TData = unknown> =
  OriginalResponseErrorConfig<TData>;
