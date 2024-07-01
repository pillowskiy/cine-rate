import type { IMovieDetails } from '#types/movies-types';
import type { ITVDetails } from '#types/tv-types';
import type { MediaType } from '#config/enums';

export type CreationDetails = IMovieDetails | ITVDetails;

export interface CreationDetailsProps {
  details: CreationDetails;
}

export interface CreationIdentifierProps {
  creationId: number;
  mediaType: MediaType;
}
