import { IApiReject } from '@app/types/index';

export type FetchedData<T> = [T, null] | [null, Response];
const { fetch: nextFetch } = global;

export async function fetch<Data = unknown>(input: RequestInfo | URL, init?: RequestInit): Promise<FetchedData<Data>> {
    const result = await nextFetch(input, init);
    if (!result.ok) {
        return [null, result];
    }
    return [await result.json(), null]
}

export function rejectFetch(err: Response): IApiReject {
    const { statusText, status } = err;
    return { message: statusText, status };
}

export * from './fetch-interceptor';