import type { CreationsResponse } from "@app/types/creation-types";
import type { BaseParams } from "@app/types/index";
import { $api } from "@api/api-interceptor";
import { TVSort } from "@config/enums";

export function getTV(sort: TVSort, params?: BaseParams) {
    return $api.safeFetch<CreationsResponse>(`/3/tv/${sort}`, { params });
}