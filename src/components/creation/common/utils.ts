import type { CreationDetails } from './types';

export function getTitle(details: CreationDetails): string {
  const { title, original_title } = details;
  const assignException =
    'original_name' in details ? details.original_name : 'Unknown';
  return title || original_title || assignException;
}

export function getRealesedDate(details: CreationDetails): string {
  const assignException =
    'first_air_date' in details ? details.first_air_date : 'Unknown';
  return details.release_date || assignException;
}
