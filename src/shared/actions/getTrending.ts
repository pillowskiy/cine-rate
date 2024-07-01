import type { CreationsResponse } from '#types/creation-types';
import type { BaseParams } from '#types/index';
import { $api } from '#api/api-interceptor';

const REVALIDATE_DAY = 60 * 24;
const REVALIDATE_WEEK = REVALIDATE_DAY * 7;

export function getTrending(
  periodParam: 'day' | 'week' = 'day',
  params?: BaseParams
) {
  return $api.safeFetch<CreationsResponse>(`/trending/all/${periodParam}`, {
    params,
    next: {
      revalidate: periodParam === 'day' ? REVALIDATE_DAY : REVALIDATE_WEEK,
    },
  });
}
