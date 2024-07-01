import type { BaseParams } from '#types/index';
import type { IPersonDetails } from '#types/person-types';
import { MediaType } from '#config/enums';
import { $api } from '#api/api-interceptor';

export function getPersonDetails(personId: number, params?: BaseParams) {
  return $api.safeFetch<IPersonDetails>(`/${MediaType.Person}/${personId}`, {
    params,
    cache: 'force-cache',
  });
}
