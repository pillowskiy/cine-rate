import type { BaseResponse, Gender } from ".";
import type { ICreation } from "./creation-types";

export interface ICelebrity {
    adult: boolean;
    gender: Gender;
    id: number;
    known_for: ICreation[];
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string;
}

export type CelebritiesResponse = BaseResponse<ICelebrity>;