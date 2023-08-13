import type { TrendingCreationsResponse } from '@app/types/creation-types';
import { $api } from '../api/api-interceptor';

interface GetUpcomingOptions {
  language?: string;
}

export const getUpcoming = ({ language = 'es-US' }: GetUpcomingOptions) => {
  return $api.get<TrendingCreationsResponse>('/3/movie/upcoming', {
    params: { language },
  });
};
