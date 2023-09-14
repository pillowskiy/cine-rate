import type { MediaType } from '@app/types/index';
import type { CreationsResponse } from '@app/types/creation-types';

// TEMP
import type { Sort as MovieSort } from './getMovies';
import type { Sort as TVSort } from './getTV';

import { $api } from '../api/api-interceptor';

/*
 * Movie discover:
 *  Reference: https://developer.themoviedb.org/reference/discover-movie
 *  Docs: https://themoviedb.api-docs.io/3/discover/movie-discover
 * 
 * Tv Discover:
 *  Reference: https://developer.themoviedb.org/reference/discover-tv
 *  Docs: https://themoviedb.api-docs.io/3/discover/tv-discover
 */
export interface GetDiscoverParams {
  region?: string;

  // use in conjunction with region
  certification?: string;
  // use in conjunction with region
  'certification.gte'?: string;
  // use in conjunction with region
  'certification.lte'?: string;

  certification_country?: string;

  include_adult?: boolean;
  include_video?: boolean;
  language?: string;
  page?: number;
  primary_release_year?: number;
  'primary_release_date.gte'?: string;
  'primary_release_date.lte'?: string;
  'release_date.gte'?: string;
  'release_date.lte'?: string;

  // TEMP
  sort_by?: MovieSort | TVSort;
  
  with_genres?: string;

  'vote_average.gte'?: number;
  'vote_average.lte'?: number;

  'vote_count.gte'?: number;
  'vote_count.lte'?: number;

  watch_region?: string;
  year?: number;
}

export function getDiscover<T extends MediaType>(
  mediaType: T,
  params?: GetDiscoverParams
) {
  return $api.get<CreationsResponse>(`/3/discover/${mediaType}/`, { params });
}
