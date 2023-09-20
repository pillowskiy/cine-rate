import type { CreationsResponse } from '@app/types/creation-types';
import { $api } from '../api/api-interceptor';
import { MediaType } from '@config/enums';

interface GetSimilarOptions {
  language?: string;
  page?: string;
}

export const getSimilar = (
  movieId: number,
  mediaType: MediaType,
  params?: GetSimilarOptions
) => {
  return $api.get<CreationsResponse>(`/3/${mediaType}/${movieId}/similar`, {
    params,
  });
};
