import { MediaType } from '@config/enums';
import { TranslationsResponse } from '@app/types/person-types';
import { $api } from '@api/api-interceptor';

export function getPersonTranslations(personId: number) {
  return $api.safeFetch<TranslationsResponse>(
    `/${MediaType.Person}/${personId}/translations`
  );
}
