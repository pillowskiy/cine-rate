import { type BaseParams, MediaType } from '@/app/_types';
import type { IPersonDetails } from '@app/types/person-types';
import { $api } from '../api/api-interceptor';

export function getPersonDetails(personId: number, params?: BaseParams) {
  return $api.get<IPersonDetails>(`/3/${MediaType.Person}/${personId}`, {
    params,
  });
}
