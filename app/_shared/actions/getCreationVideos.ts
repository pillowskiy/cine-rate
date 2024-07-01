import type { CreationVideosResponse } from '@app/types/creation-types';
import type { BaseParams } from '@app/types/index';

import type { MediaType } from '@config/enums';

import { $api } from '@api/api-interceptor';

export function getCreationVideos(
  creationId: number,
  mediaType: MediaType,
  params?: BaseParams
) {
  return $api.safeFetch<CreationVideosResponse>(
    `/${mediaType}/${creationId}/videos`,
    { params }
  );
}
