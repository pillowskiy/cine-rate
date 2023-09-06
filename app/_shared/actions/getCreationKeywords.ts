import type { BaseParams, MediaType } from '@app/types/index';
import type { CreationKeywordsResponse } from '@app/types/creation-types';
import { $api } from '../api/api-interceptor';

export function getCreationKeywords(
  creationId: number,
  mediaType: MediaType,
  params?: BaseParams
) {
  return $api.get<CreationKeywordsResponse>(
    `/3/${mediaType}/${creationId}/keywords`,
    {
      params,
    }
  );
}
