import type { BaseParams } from '@app/types/index';
import type { MediaType } from '@config/enums';
import type { CelebritiesResponse } from '@app/types/person-types';
import type { CreationsResponse } from '@app/types/creation-types';
import { $api } from '../api/api-interceptor';

export async function getPopular<T extends MediaType>(
  mediaType: T,
  params?: BaseParams
) {
  return $api.get<
    T extends MediaType.Person ? CelebritiesResponse : CreationsResponse
  >(`/3/${mediaType}/popular`, { params });
}
