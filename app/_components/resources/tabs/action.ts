import type { CreationsResponse } from "@app/types/creation-types";
import { ResourceTarget, ResourceType } from "@config/enums";
import ky from "ky";

interface WatchlistParams extends Record<string, string | number | boolean> {
    page: number;
}

export async function getResources(resourceType: ResourceType, target: ResourceTarget, searchParams?: WatchlistParams) {
    return ky
        .get(`/api/account/${resourceType}/${target}`, { searchParams })
        .then(res => res.json<CreationsResponse>());
}