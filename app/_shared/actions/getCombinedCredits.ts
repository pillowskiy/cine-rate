import { MediaType, type BaseParams } from '@app/types/index';
import type { CombinedCreditsResponse } from '@app/types/person-types';
import { $api } from '../api/api-interceptor';

export function getCombinedCredits(personId: number, params?: BaseParams) {
  return $api.get<CombinedCreditsResponse>(
    `/3/${MediaType.Person}/${personId}/combined_credits`,
    {
      params,
    }
  );
}
