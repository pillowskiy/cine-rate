import type { BaseParams } from '@app/types/index';
import type { MediaType } from '@config/enums';
import type { CreationKeywordsResponse } from '@app/types/creation-types';
import { $api } from '@api/api-interceptor';

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
