import type { CreationImagesResponse } from '@app/types/creation-types';
import { $api } from '../api/api-interceptor';

export function getImages(mediaType: 'movie' | 'tv' | 'person', creationId: number) {
  return $api.get<CreationImagesResponse>(`/3/${mediaType}/${creationId}/images`);
}
