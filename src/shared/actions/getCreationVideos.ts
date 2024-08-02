import type { CreationVideosResponse } from '#types/creation-types';
import type { BaseParams } from '#types/index';
import type { MediaType } from '#config/enums';
import { dayCacheTerm } from '#api/api-cache';
import { $api } from '#api/api-interceptor';

export function getCreationVideos(
  creationId: number,
  mediaType: MediaType,
  params: BaseParams = {}
) {
  return $api.safeFetch<CreationVideosResponse>(
    `/${mediaType}/${creationId}/videos`,
    { params, ...dayCacheTerm }
  );
}
