import { ICreation } from '#types/creation-types';
import { IMovieDetails } from '#types/movies-types';
import { ITVDetails } from '#types/tv-types';

export type AnyCreation = IMovieDetails | ITVDetails | ICreation;

export function getCreationTitle(details: AnyCreation): string {
  const { title, original_title } = details;
  const assignException =
    'original_name' in details ? details.original_name! : 'Unknown';
  return title || original_title || assignException;
}

export function getCreationReleasedDate(details: AnyCreation): string {
  const assignException =
    'first_air_date' in details ? details.first_air_date! : 'Unknown';
  return details.release_date || assignException;
}
