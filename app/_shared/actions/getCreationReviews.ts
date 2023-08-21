import type { ReviewResponse } from '@app/types/review-types';
import type { BaseParams, MediaType } from '@app/types/index';
import { $api } from '../api/api-interceptor';

export function getCreationReviews(
  creationId: number,
  mediaType: MediaType,
  params?: BaseParams
) {
  return $api.get<ReviewResponse>(`/3/${mediaType}/${creationId}/reviews`, {
    params,
  });
}
