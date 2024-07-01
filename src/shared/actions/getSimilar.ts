import type { CreationsResponse } from '#types/creation-types';
import type { BaseParams } from '#types/index';
import type { MediaType } from '#config/enums';
import { $api } from '#api/api-interceptor';

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
