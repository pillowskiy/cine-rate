import type { BaseParams } from '@app/types/index';
import type { IPersonDetails } from '@app/types/person-types';
import { MediaType } from '@config/enums';
import { $api } from '../api/api-interceptor';

export function getPersonDetails(personId: number, params?: BaseParams) {
  return $api.get<IPersonDetails>(`/3/${MediaType.Person}/${personId}`, {
    params,
  });
}
