export type BaseParams = Record<string, string | number | boolean | undefined>;

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
  searchParams: Record<string, string>;
  params: Record<string, string | number | symbol>;
}

export interface IApiReject {
  message: string;
  status: number;
}

export interface IRibbon {
  name: string;
  color: string;
}
