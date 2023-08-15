export enum MediaType {
  Movie = 'movie',
  TV = 'tv',
  People = 'people',
}

export enum Gender {
  WOMAN = 1,
  MAN = 2,
}

export enum CreationVideoSite {
  YOUTUBE = 'YouTube',
}

export type BaseResponse<T extends unknown> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export interface IProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface ICreationLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
