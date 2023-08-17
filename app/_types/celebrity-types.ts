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

export interface ICredit extends ICelebrity {
    credit_id: number;
    cast_id: number;
    character: number;
    original_name: string;

    name: never;
    known_for: never;
}

export type CelebritiesResponse = BaseResponse<ICelebrity>;
export type CreditsResponse = {
    id: number;
    cast: ICredit[];
}