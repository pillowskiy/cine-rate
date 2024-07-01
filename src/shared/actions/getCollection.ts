import type { CollectionDetailsResponse } from '#types/collection-types';
import type { BaseParams } from '#types/index';
import { $api } from '#api/api-interceptor';

export async function getCollection(collectionId: number, params?: BaseParams) {
  return $api.safeFetch<CollectionDetailsResponse>(
    `/collection/${collectionId}`,
    { params }
  );
}
