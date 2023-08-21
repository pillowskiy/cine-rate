import type { CreationImagesResponse } from '@app/types/creation-types';
import type { BaseParams, MediaType } from '@app/types/index';
import { $api } from '../api/api-interceptor';

export function getCreationImages(
  creationId: number,
  mediaType: MediaType,
  params?: BaseParams
) {
  return $api.get<CreationImagesResponse>(
    `/3/${mediaType}/${creationId}/images`,
    { params }
  );
}
