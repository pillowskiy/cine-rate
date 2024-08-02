import type { BaseParams } from '#types/index';
import type { ReviewResponse } from '#types/review-types';
import type { MediaType } from '#config/enums';
import { dayCacheTerm } from '#api/api-cache';
import { $api } from '#api/api-interceptor';

export function getCreationReviews(
  creationId: number,
  mediaType: MediaType,
  params: BaseParams = {}
) {
  return $api.fetch<ReviewResponse>(`/${mediaType}/${creationId}/reviews`, {
    params,
    ...dayCacheTerm,
  });
}
