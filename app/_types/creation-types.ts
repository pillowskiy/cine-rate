import type { MediaType, BaseResponse, CreationVideoSite } from '.';
import type { IMediaResource } from './media-types';

export interface ICreation {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title?: string;
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string;
  media_type: MediaType;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ICreationVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: CreationVideoSite;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export type TrendingCreationsResponse = BaseResponse<ICreation>;
export type CreationVideosResponse = {
  id: number;
  results: ICreationVideo[];
};
export type CreationImagesResponse = {
  id: number;
  backdrops: IMediaResource[];
  logos: IMediaResource[];
  posters: IMediaResource[];
};
