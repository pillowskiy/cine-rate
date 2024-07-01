import type { BaseParams } from '@app/types/index';
import type { ReviewResponse } from '@app/types/review-types';

import type { MediaType } from '@config/enums';

import { $api } from '@api/api-interceptor';

export function getCreationReviews(
  creationId: number,
  mediaType: MediaType,
  params?: BaseParams
) {
  return $api.fetch<ReviewResponse>(`/${mediaType}/${creationId}/reviews`, {
    params,
    cache: 'force-cache',
  });
}
