import type { CreationImagesResponse } from '#types/creation-types';
import type { BaseParams } from '#types/index';
import type { MediaType } from '#config/enums';
import { $api } from '#api/api-interceptor';

export function getCreationImages(
  creationId: number,
  mediaType: MediaType,
  params?: BaseParams
) {
  // TEMP: Empty string is required, because api interceptor set language automatically
  // and tmdb api result depends on it, so we have to remove language from query
  // also we can use include_image_language query, but i wanna be sure, that user gets all known images
  (params ||= {}).language = '';
  return $api.safeFetch<CreationImagesResponse>(
    `/${mediaType}/${creationId}/images`,
    { params, next: { revalidate: 24 * 3600 } }
  );
}
