import 'server-only';

import type { BaseParams } from "@app/types/index";
import type { SafeFetchedData, RequestConfig } from ".";
import { handleData, nextFetch } from "./next-fetch";

type Callback<T> = (value: T) => void;

export function createFetchInterceptor(baseUrl?: string, config: RequestConfig = {}) {
    const request = interceptor<RequestConfig>();
    const response = interceptor<Response>();

    async function safeFetch<Data = unknown, Params extends BaseParams = BaseParams>(
        input: URL | string, config: RequestConfig<Params> = {}
    ): Promise<SafeFetchedData<Data>> {
        const fetchConfig = Object.assign(structuredClone(config), config);
        request.intercept(fetchConfig);
        const url = new URL(input, baseUrl);
        const result = await nextFetch(url.href, fetchConfig);

        if (!result.ok) {
            return [null, result];
        }

        response.intercept(result);
        const data: Data = await result.json();
        return [data, null];
    }

    async function fetch<Data = unknown, Params extends BaseParams = BaseParams>(
        input: URL | string, init: RequestConfig<Params> = {}
    ): Promise<Data> {
        const fetchConfig = Object.assign(structuredClone(config), init);
        request.intercept(fetchConfig);
        const url = new URL(input, baseUrl);
        const result = await nextFetch(url.href, fetchConfig);
        return handleData<Data>(result);
    }

    return { fetch, safeFetch, request, response };
}

function interceptor<T>(initial?: T) {
    const middlewares: Callback<T>[] = [];

    const intercept = (value: T) => {
        if (initial && value !== initial) {
            throw Error('The interceptor cannot intercept values that are not the original');
        }
        middlewares.forEach(middleware => middleware(value));
    }

    const use = (cb: Callback<T>) => {
        middlewares.push(cb);
        if (initial) intercept(initial);
    }

    return { intercept, use };
}