import { ICreation } from './creation-types';

export interface ICollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface IDetailedCollection extends ICollection {
  overview: string;
  parts: ICreation[];
}

export type CollectionDetailsResponse = IDetailedCollection;
