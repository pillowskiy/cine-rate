import { NextResponse } from 'next/server';
import type { BaseParams, IApiReject } from '#types/index';
import { FetchError } from './next-fetch';

export type SafeFetchedData<T> = [T, null] | [null, Response];

export interface RequestConfig<Params extends BaseParams = BaseParams>
  extends RequestInit {
  params?: Params;
}

export function rejectFetch(err: unknown): IApiReject {
  if (err instanceof FetchError) {
    return err.json();
  }
  return { message: 'Unhandled error occurred', status: 500 };
}

export function fetchErrorResponse(err: unknown): NextResponse<IApiReject> {
  const { message, status } = rejectFetch(err);
  return NextResponse.json({ message, status }, { status });
}

export * from './fetch-interceptor';
export { fetch, safeFetch } from './next-fetch';
