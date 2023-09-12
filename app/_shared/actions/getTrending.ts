import type { CreationsResponse } from '@app/types/creation-types';
import { $api } from '../api/api-interceptor';

interface GetTrendingOptions {
  language?: string;
  periodParam?: 'day' | 'week';
}

export function getTrending({
  language = 'es-US',
  periodParam = 'day',
}: GetTrendingOptions = {}) {
  return $api.get<CreationsResponse>(`/3/trending/all/${periodParam}`, {
    params: { language },
  });
}
