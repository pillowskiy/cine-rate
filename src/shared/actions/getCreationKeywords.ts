import type { CreationKeywordsResponse } from '#types/creation-types';
import type { BaseParams } from '#types/index';
import type { MediaType } from '#config/enums';
import { $api } from '#api/api-interceptor';

export function getCreationKeywords(
  creationId: number,
  mediaType: MediaType,
  params?: BaseParams
) {
  return $api.safeFetch<CreationKeywordsResponse>(
    `/${mediaType}/${creationId}/keywords`,
    {
      params,
    }
  );
}
