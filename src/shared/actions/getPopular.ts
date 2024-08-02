import type { CreationsResponse } from '#types/creation-types';
import type { BaseParams } from '#types/index';
import type { CelebritiesResponse } from '#types/person-types';
import type { MediaType } from '#config/enums';
import { dayCacheTerm } from '#api/api-cache';
import { $api } from '#api/api-interceptor';

export async function getPopular<T extends MediaType>(
  mediaType: T,
  params: BaseParams = {}
) {
  return $api.safeFetch<
    T extends MediaType.Person ? CelebritiesResponse : CreationsResponse
  >(`/${mediaType}/popular`, { params, ...dayCacheTerm });
}
