import type { ICreationLanguage, IProductionCountry } from '.';
import type { ICollection } from './collection-types';
import type { IPartialCompany } from './company-types';
import type { IPartialGenre } from './genre-types';

export interface IMovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | ICollection;
  budget: number;
  genres: IPartialGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IPartialCompany[];
  production_countries: IProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ICreationLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
