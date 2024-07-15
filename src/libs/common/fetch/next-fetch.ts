import type { BaseParams, IApiReject } from '#types/index';
import type { RequestConfig, SafeFetchedData } from '.';

const baseFetch = global.fetch;

export async function nextFetch<Params extends BaseParams = BaseParams>(
  input: URL | string,
  { params, ...init }: RequestConfig<Params> = {}
): Promise<Response> {
  const url = new URL(input, process.env.NEXT_PUBLIC_API_URL);
  if (params) {
    const paramsArray = Object.entries(params)
      .filter(([key, value]) => key && value)
      .map(([key, value]) => [key, value!.toString()]);
    url.search = new URLSearchParams(paramsArray).toString();
  }

  return baseFetch(url.href, init);
}

export async function fetch<
  Data = unknown,
  Params extends BaseParams = BaseParams,
>(input: URL | string, config: RequestConfig<Params> = {}): Promise<Data> {
  const response = await nextFetch(input, config);
  const data = await response.json();
  if (!response.ok) {
    const { status, statusText, url } = response;
    throw new FetchError({ ...data, status, statusText, url });
  }
  return data;
}

export async function safeFetch<
  Data = unknown,
  Params extends BaseParams = BaseParams,
>(
  input: URL | string,
  config: RequestConfig<Params> = {}
): Promise<SafeFetchedData<Data>> {
  const result = await nextFetch(input, config);
  if (!result.ok) {
    // TEMP
    return [null, result];
  }
  return [await result.json(), null];
}

// TEMP: weird thing
type FetchErrorOptions = IApiReject & object;
export class FetchError extends Error {
  constructor(private readonly _options: FetchErrorOptions) {
    super(_options.message);
  }

  json() {
    return this._options;
  }
}
