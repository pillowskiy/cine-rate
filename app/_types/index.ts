export enum MediaType {
  Movie = 'movie',
  TV = 'tv',
  Person = 'person',
}

export enum Gender {
  Unknown = 0,
  Woman = 1,
  Man = 2,
  NonBinary = 3,
}

export enum CreationVideoSite {
  YOUTUBE = 'YouTube',
}

export enum MediaTypes {
  Movie = 'movie',
  TV = 'tv',
  Person = 'person',
}

export type BaseParams = Record<string, string>;

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

export interface ITranslation<T extends object> {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: T;
}

export interface IPagination {
  currentPage: number;
  totalPages: number;
}

export interface INextPageParams {
  searchParams?: Record<string, string>
  params?: Record<string, string | number | symbol>
}

export interface IApiReject {
  message: string;
  status: number;
}
