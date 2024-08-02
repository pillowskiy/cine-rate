import type { CollectionDetailsResponse } from '#types/collection-types';
import type { BaseParams } from '#types/index';
import { dayCacheTerm } from '#api/api-cache';
import { $api } from '#api/api-interceptor';

export async function getCollection(
  collectionId: number,
  params: BaseParams = {}
) {
  return $api.safeFetch<CollectionDetailsResponse>(
    `/collection/${collectionId}`,
    { params, ...dayCacheTerm }
  );
}
