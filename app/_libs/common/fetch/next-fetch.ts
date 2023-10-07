import type { BaseParams, IApiReject } from "@app/types/index";
import type { RequestConfig, SafeFetchedData } from ".";

const baseFetch = global.fetch;

export async function nextFetch<Params extends BaseParams = BaseParams>(
    input: URL | string, { params, ...init }: RequestConfig<Params> = {}
): Promise<Response> {
    const url = new URL(input, 'http://localhost:3000/');
    if (params) {
        const paramsArray = Object.entries(params).map(([key, value]) => (
            [key, value?.toString() || 'undefined']
        ));
        url.search = (new URLSearchParams(paramsArray)).toString();
    }

    return baseFetch(url.href, init);
}

export async function fetch<Data = unknown, Params extends BaseParams = BaseParams>(
    input: URL | string, config: RequestConfig<Params> = {}
): Promise<Data> {
    const result = await nextFetch(input, config);
    return handleData<Data>(result);
}

// TEMP: FUCK THIS!!!!
export async function handleData<Data = unknown>(response: Response): Promise<Data> {
    const data = await response.json();
    if (!response.ok) {
        const { status, statusText, url } = response;
        throw new FetchError({ ...data, status, statusText, url });
    }
    return data;
}

export async function safeFetch<Data = unknown, Params extends BaseParams = BaseParams>(
    input: URL | string, config: RequestConfig<Params> = {}
): Promise<SafeFetchedData<Data>> {
    const result = await nextFetch(input, config);
    if (!result.ok) {
        // TEMP
        return [null, result];
    }
    return [await result.json(), null];
}

type FetchErrorOptions = IApiReject & object;
export class FetchError extends Error {
    constructor(private readonly _options: FetchErrorOptions) {
        super(_options.message);
    }

    json() {
        return this._options;
    }
}
