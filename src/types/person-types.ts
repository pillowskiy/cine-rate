import type { Gender, MediaType } from '#config/enums';
import type { BaseResponse, ITranslation } from '.';
import type { ICreation } from './creation-types';

export interface ICelebrity {
  adult: boolean;
  gender: Gender;
  id: number;
  media_type: MediaType;
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string;
}

export interface ICredit extends ICelebrity {
  credit_id: number;
  cast_id: number;
  character: string;
  original_name: string;
}

export type CrewDepartments =
  | 'Art'
  | 'Camera'
  | 'Crew'
  | 'Costume & Make-Up'
  | 'Editing'
  | 'Lighting'
  | 'Production'
  | 'Sound'
  | 'Visual Effects';

export interface ICrew extends Omit<ICredit, 'character' | 'cast_id'> {
  job: string;
  department: CrewDepartments;
}

export interface ICombinedCredits extends ICreation {
  credit_id: number;
  department: string;
  job: string;
}

export interface IPersonDetails extends ICelebrity {
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  homepage: string | null;
  imdb_id: string;
  place_of_birth: string;

  known_for: never;
}

export type CelebritiesResponse = BaseResponse<ICelebrity>;
export type CreditsResponse = {
  id: number;
  cast: ICredit[];
  crew: ICrew[];
};
export type CombinedCreditsResponse = {
  id: number;
  cast: ICombinedCredits[];
};
export type TranslationsResponse = {
  id: number;
  translations: ITranslation<{ biography: IPersonDetails['biography'] }>[];
};
