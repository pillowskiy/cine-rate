import type { CreationsResponse } from "@app/types/creation-types";
import { ResourceType } from "@config/enums";
import ky from "ky";

interface WatchlistParams extends Record<string, string | number | boolean> {
    page: number;
}

export async function getWatchlist(resourceType: ResourceType, searchParams?: WatchlistParams) {
    return ky
        .get(`/api/account/${resourceType}/watchlist`, { searchParams })
        .then(res => res.json<CreationsResponse>());
}