import type { TrendingCreationsResponse } from '@/app/_types/creation-types';
import { $api } from '../api/api-interceptor';

interface GetTrendingOptions {
  language?: string;
  periodParam?: 'day' | 'week';
}

export const getTrending = ({
  language = 'es-US',
  periodParam = 'week',
}: GetTrendingOptions) => {
  return $api.get<TrendingCreationsResponse>(`/3/trending/all/${periodParam}`, {
    params: { language },
  });
};
