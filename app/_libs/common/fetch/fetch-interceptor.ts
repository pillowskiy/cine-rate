import type { BaseParams } from "@app/types/index";
import type { FetchedData } from ".";
type Callback<T> = (value: T) => void;

interface RequestInterceptorInit<Params extends BaseParams = BaseParams> extends RequestInit {
    params?: Params;
}

const { fetch: nextFetch } = global;

export function createFetchInterceptor(baseUrl?: string, config: RequestInterceptorInit = {}) {
    const clonedConfig = structuredClone(config);
    const request = interceptor<RequestInterceptorInit>(clonedConfig);
    const response = interceptor<Response>();

    async function fetch<Data = unknown, Params extends BaseParams = BaseParams>(
        input: URL | string, { params, ...init }: RequestInterceptorInit<Params> = {}
    ): Promise<FetchedData<Data>> {
        const fetchConfig = Object.assign(clonedConfig, init);
        const url = new URL(input, baseUrl);
        if (params) {
            url.search = (new URLSearchParams(params)).toString();
        }

        const result = await nextFetch(url.href, fetchConfig);

        if (!result.ok) {
            return [null, result];
        }

        const data: Data = await result.json();
        response.intercept(result);
        return [data, null];
    }

    return { fetch, request, response };
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