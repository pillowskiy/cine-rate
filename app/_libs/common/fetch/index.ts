export type FetchedData<T> = [T | null, Response | null];
const { fetch: nextFetch } = global;

export async function fetch<Data = unknown>(input: RequestInfo | URL, init?: RequestInit): Promise<FetchedData<Data>> {
    const result = await nextFetch(input, init);
    if (!result.ok) {
        return [null, result];
    }
    return [await result.json(), null]
}

export * from './fetch-interceptor';