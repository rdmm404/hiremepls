import {
  RequestConfig as OriginalRequestConfig,
  ResponseConfig as OriginalResponseConfig,
  ResponseErrorConfig as OriginalResponseErrorConfig,
  getConfig,
} from "@kubb/plugin-client/clients/fetch.ts";

const getBaseURL = (): string => {
  return import.meta.env.VITE_BACKEND_URL || "localhost:8765";
};

function formatBody<TVariables>(config: RequestConfig<TVariables>): string {
  const contentType = (config.headers as Record<string, string>)?.[
    "Content-Type"
  ]?.toLowerCase();

  if (contentType === "application/x-www-form-urlencoded") {
    const params = new URLSearchParams();
    for (const key in config.data) {
      if (Object.prototype.hasOwnProperty.call(config.data, key)) {
        const value = (config.data as Record<string, any>)[key];
        params.append(key, value.toString()); // Ensure value is a string
      }
    }
    return params.toString();
  }

  return JSON.stringify(config.data);
}

export const client = async <TData, _TError = unknown, TVariables = unknown>(
  paramsConfig: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> => {
  const normalizedParams = new URLSearchParams();

  const globalConfig = getConfig();
  const config = { ...globalConfig, ...paramsConfig };

  Object.entries(config.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : value.toString());
    }
  });

  let targetUrl = `${getBaseURL()}${config.url}`;

  if (config.params) {
    targetUrl += `?${normalizedParams}`;
  }

  const response = await fetch(targetUrl, {
    credentials: config.credentials || "same-origin",
    method: config.method.toUpperCase(),
    body: formatBody(config),
    signal: config.signal,
    headers: config.headers,
  });

  const data =
    [204, 205, 304].includes(response.status) || !response.body
      ? {}
      : await response.json();

  return {
    data: data as TData,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers as Headers,
  };
};

export default client;

export type RequestConfig<TVariables = unknown> =
  OriginalRequestConfig<TVariables>;
export type ResponseConfig<TData = unknown> = OriginalResponseConfig<TData>;
export type ResponseErrorConfig<TData = unknown> =
  OriginalResponseErrorConfig<TData>;
