import { BaseParams } from "@/app/_types";
import { $api } from "../api/api-interceptor";
import { IEpisodeDetails } from "@/app/_types/tv-types";

export function getEpisodeDetails(
    seriesId: number,
    seasonNumber: number,
    episodeNumber: number,
    params?: BaseParams
) {
    return $api.get<IEpisodeDetails>(
        `/3/tv/${seriesId}` +
        `/season/${seasonNumber}` +
        `/episode/${episodeNumber}`,
        { params }
    );
}