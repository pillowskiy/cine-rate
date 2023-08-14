import type { CreationVideosResponse } from '@app/types/creation-types';
import { $api } from '../api/api-interceptor';

export function getVideos(creationId: number) {
  return $api.get<CreationVideosResponse>(`/3/movie/${creationId}/videos`);
}
