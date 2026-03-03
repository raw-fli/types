import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

let _baseURL = '';
let _getToken: (() => string | null | undefined) | undefined;

export function configureApiClient(options: {
  baseURL: string;
  getToken?: () => string | null | undefined;
}) {
  _baseURL = options.baseURL;
  _getToken = options.getToken;
}

export const customAxiosInstance = <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  const token = _getToken?.();
  return axios({
    ...config,
    baseURL: _baseURL,
    headers: {
      ...config.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }).then((res: AxiosResponse<T>) => res.data);
};