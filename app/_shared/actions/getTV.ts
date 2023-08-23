import type { CreationsResponse } from "@app/types/creation-types";
import { $api } from "../api/api-interceptor";

export enum Sort {
    AiringToday = 'airing_today',
    OnTheAir = 'on_the_air',
    Popular = 'popular',
    TopRated = 'top_rated',
}

export function getTV(sort: Sort = Sort.Popular) {
    return $api.get<CreationsResponse>(`/3/tv/${sort}`);
}