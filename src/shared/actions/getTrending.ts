import type { CreationsResponse } from '#types/creation-types';
import type { BaseParams } from '#types/index';
import { dayCacheTerm, weekCacheTerm } from '#api/api-cache';
import { $api } from '#api/api-interceptor';

export function getTrending(
  periodParam: 'day' | 'week' = 'day',
  params: BaseParams = {}
) {
  return $api.safeFetch<CreationsResponse>(`/trending/all/${periodParam}`, {
    params,
    ...(periodParam === 'day' ? dayCacheTerm : weekCacheTerm),
  });
}
