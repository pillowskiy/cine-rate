import type { ReviewResponse } from '@app/types/review-types';
import { $api } from '../api/api-interceptor';

export function getReviews(mediaType: 'movie' | 'tv' | 'person', creationId: number) {
  return $api.get<ReviewResponse>(`/3/${mediaType}/${creationId}/reviews`);
}
