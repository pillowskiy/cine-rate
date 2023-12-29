import type { CreationsResponse } from '@app/types/creation-types';
import type { MediaType } from '@config/enums';
import type { BaseParams } from '@app/types/index';
import { $api } from '@api/api-interceptor';

interface GetSimilarOptions extends BaseParams {
  language?: string;
  page?: string;
}

export const getSimilar = (
  movieId: number,
  mediaType: MediaType,
  params?: GetSimilarOptions
) => {
  return $api.safeFetch<CreationsResponse>(`/${mediaType}/${movieId}/similar`, {
    params,
  });
};
