import type { CreationVideosResponse } from '@app/types/creation-types';
import type { BaseParams, MediaType } from '@app/types/index';
import { $api } from '../api/api-interceptor';

export function getCreationVideos(
  creationId: number,
  mediaType: MediaType,
  params?: BaseParams
) {
  return $api.get<CreationVideosResponse>(
    `/3/${mediaType}/${creationId}/videos`,
    { params }
  );
}
