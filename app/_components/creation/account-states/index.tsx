'use client';

import type { AccountStatesResponse } from '@app/types/creation-types';
import type { CreationIdentifierProps } from '../common/types';

import { createContext, useEffect, useState } from 'react';
import { MediaType } from '@config/enums';
import axios from 'axios';

import { FavoriteButton } from './favorite-button';
import { RatingButton } from './rating-button';
import { WatchlistButton } from './watchlist-button';

interface CreationStatesProps extends CreationIdentifierProps {}

function getAccountStates(creationId: number, mediaType: MediaType) {
  return axios.get<AccountStatesResponse>(
    `/api/creations/${mediaType}/${creationId}/states`
  );
}

export const StatesContext = createContext<CreationIdentifierProps>({
  mediaType: MediaType.Movie,
  creationId: 0,
});

export function CreationStates({ creationId, mediaType }: CreationStatesProps) {
  const [states, setStates] = useState<AccountStatesResponse | null>(null);

  useEffect(() => {
    getAccountStates(creationId, mediaType)
      .then(({ data }) => {
        setStates(data);
      })
      .catch(() => {
        setStates(null);
      });
  }, [creationId, mediaType]);

  if (!states) return null;

  return (
    <StatesContext.Provider value={{ creationId, mediaType }}>
      <div className='absolute bottom-2 right-2 flex gap-2'>
        <WatchlistButton alreadyInList={states.watchlist} />
        <RatingButton initialRated={states.rated} />
        <FavoriteButton initialFavorite={states.favorite} />
      </div>
    </StatesContext.Provider>
  );
}
