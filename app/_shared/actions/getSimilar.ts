import type { CreationsResponse } from '@app/types/creation-types';
import { $api } from '../api/api-interceptor';

interface GetSimilarOptions {
  language?: string;
  page?: string;
}

export const getSimilar = (movieId: number, params?: GetSimilarOptions) => {
  return $api.get<CreationsResponse>(`/3/movie/${movieId}/similar`, {
    params,
  });
};
