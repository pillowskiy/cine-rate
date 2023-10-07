import type { BaseParams } from "@app/types/index";
import type { CollectionDetailsResponse } from "@app/types/collection-types";
import { $api } from "@api/api-interceptor";

export async function getCollection(collectionId: number, params?: BaseParams) {
    return $api
        .safeFetch<CollectionDetailsResponse>(`/3/collection/${collectionId}`, { params })
}