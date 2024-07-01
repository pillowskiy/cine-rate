import type { CreationImagesResponse } from '#types/creation-types';
import type { BaseParams } from '#types/index';
import type { MediaType } from '#config/enums';
import { $api } from '#api/api-interceptor';

export function getCreationImages(
  creationId: number,
  mediaType: MediaType,
  params?: BaseParams
) {
  return $api.safeFetch<CreationImagesResponse>(
    `/${mediaType}/${creationId}/images`,
    { params }
  );
}
