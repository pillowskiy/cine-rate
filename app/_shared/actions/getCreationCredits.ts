import type { CreditsResponse } from '@app/types/celebrity-types';
import type { BaseParams, MediaType } from '@app/types/index';
import { $api } from '../api/api-interceptor';

export const getCreationCredits = (
  creationId: number,
  mediaType: MediaType,
  params?: BaseParams
) => {
  return $api.get<CreditsResponse>(`/3/${mediaType}/${creationId}/credits`, {
    params,
  });
};
