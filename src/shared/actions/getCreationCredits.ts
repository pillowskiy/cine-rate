import type { BaseParams } from '#types/index';
import type { CreditsResponse } from '#types/person-types';
import type { MediaType } from '#config/enums';
import { dayCacheTerm } from '#api/api-cache';
import { $api } from '#api/api-interceptor';

export const getCreationCredits = (
  creationId: number,
  mediaType: MediaType,
  params: BaseParams = {}
) => {
  return $api.safeFetch<CreditsResponse>(
    `/${mediaType}/${creationId}/credits`,
    {
      params,
      ...dayCacheTerm,
    }
  );
};
