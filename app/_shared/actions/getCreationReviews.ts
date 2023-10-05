import type { ReviewResponse } from '@app/types/review-types';
import type { BaseParams } from '@app/types/index';
import type { MediaType } from '@config/enums';
import { $api } from '@api/api-interceptor';

export function getCreationReviews(
  creationId: number,
  mediaType: MediaType,
  params?: BaseParams
) {
  return $api.fetch<ReviewResponse>(`/3/${mediaType}/${creationId}/reviews`, {
    params,
  });
}
