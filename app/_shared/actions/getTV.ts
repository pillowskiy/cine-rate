import type { CreationsResponse } from "@app/types/creation-types";
import { $api } from "../api/api-interceptor";

export enum Sort {
    TopRated = 'top_rated',
    AiringToday = 'airing_today',
    OnTheAir = 'on_the_air',
    Popular = 'popular',
}

export function getTV(sort: Sort = Sort.Popular) {
    return $api.get<CreationsResponse>(`/3/tv/${sort}`);
}