import 'server-only';
import type { BaseParams } from '@app/types/index';
import type { RequestConfig, SafeFetchedData } from '.';
import { handleData, nextFetch } from './next-fetch';

type Callback<T> = (value: T) => void;

export function createFetchInterceptor(
  baseUrl?: string | URL,
  config: RequestConfig = {}
) {
  const request = interceptor<RequestConfig>();
  const response = interceptor<Response>();
  const { assignPathname } = createConfigURL(baseUrl);

  async function safeFetch<
    Data = unknown,
    Params extends BaseParams = BaseParams,
  >(
    input: URL | string,
    init: RequestConfig<Params> = {}
  ): Promise<SafeFetchedData<Data>> {
    const fetchConfig = Object.assign(init, config);
    request.intercept(fetchConfig);
    const url = assignPathname(input);
    const result = await nextFetch(url, fetchConfig);

    if (!result.ok) {
      return [null, result];
    }

    response.intercept(result);
    const data: Data = await result.json();
    return [data, null];
  }

  async function fetch<Data = unknown, Params extends BaseParams = BaseParams>(
    input: URL | string,
    init: RequestConfig<Params> = {}
  ): Promise<Data> {
    const fetchConfig = Object.assign(init, config);
    request.intercept(fetchConfig);
    const url = assignPathname(input);
    const result = await nextFetch(url, fetchConfig);
    return handleData<Data>(result);
  }

  return { fetch, safeFetch, request, response };
}

function interceptor<T>(initial?: T) {
  const middlewares: Callback<T>[] = [];

  const intercept = (value: T) => {
    if (initial && value !== initial) {
      throw Error(
        'The interceptor cannot intercept values that are not the original'
      );
    }
    middlewares.forEach((middleware) => middleware(value));
  };

  const use = (cb: Callback<T>) => {
    middlewares.push(cb);
    if (initial) intercept(initial);
  };

  return { intercept, use };
}

function createConfigURL(url?: string | URL) {
  const assignPathname = (input: string | URL) => {
    const stringifyPathname = input.toString();
    if (!url) return stringifyPathname;
    return new URL(configUrl.pathname + stringifyPathname, configUrl.origin);
  };
  if (!url) return { url: '', assignPathname };
  const configUrl = url instanceof URL ? url : new URL(url);
  return { url: configUrl.toString(), assignPathname };
}
