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
