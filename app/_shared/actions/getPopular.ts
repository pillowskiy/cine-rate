import type { CreationsResponse } from '@app/types/creation-types';
import type { BaseParams } from '@app/types/index';
import type { CelebritiesResponse } from '@app/types/person-types';

import type { MediaType } from '@config/enums';

import { $api } from '@api/api-interceptor';

export async function getPopular<T extends MediaType>(
  mediaType: T,
  params?: BaseParams
) {
  return $api.safeFetch<
    T extends MediaType.Person ? CelebritiesResponse : CreationsResponse
  >(`/${mediaType}/popular`, { params });
}
