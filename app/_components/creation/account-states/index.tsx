'use client';

import type { AccountStatesResponse } from '@app/types/creation-types';
import type { CreationIdentifierProps } from '../common/types';

import { createContext, useEffect, useState } from 'react';
import { MediaType } from '@config/enums';
import axios from 'axios';

import { FavoriteButton } from './favorite-button';
import { RatingButton } from './rating-button';
import { WatchlistButton } from './watchlist-button';

import { useAuth } from '@redux/hooks';

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
  const { user } = useAuth();
  const [states, setStates] = useState<AccountStatesResponse | null>(null);

  useEffect(() => {
    if (!user) return;

    getAccountStates(creationId, mediaType)
      .then(({ data }) => {
        setStates(data);
      })
      .catch(() => {
        setStates(null);
      });
  }, [creationId, mediaType, user]);

  if (!states) return null;

  return (
    <StatesContext.Provider value={{ creationId, mediaType }}>
      <div className='absolute bottom-2 right-2 flex gap-2'>
        <WatchlistButton
          className='h-7 w-7 opacity-60 transition-all hover:opacity-100'
          size='icon'
          variant='outline'
          alreadyInList={states.watchlist}
        />
        <RatingButton
          className='h-7 w-7 opacity-60 transition-all hover:opacity-100'
          size='icon'
          variant='outline'
          initialRated={states.rated}
        />
        <FavoriteButton
          className='h-7 w-7 opacity-60 transition-all hover:opacity-100'
          size='icon'
          variant='outline'
          initialFavorite={states.favorite}
        />
      </div>
    </StatesContext.Provider>
  );
}

export function CreationStatesDetailed({
  creationId,
  mediaType,
}: CreationStatesProps) {
  const { user } = useAuth();
  const [states, setStates] = useState<AccountStatesResponse | null>(null);

  useEffect(() => {
    if (!user) return;

    getAccountStates(creationId, mediaType)
      .then(({ data }) => {
        setStates(data);
      })
      .catch(() => {
        setStates(null);
      });
  }, [creationId, mediaType, user]);

  if (!states) return null;

  return (
    <StatesContext.Provider value={{ creationId, mediaType }}>
      <div className='flex w-full justify-between gap-4 overflow-x-auto sm:w-fit sm:justify-start'>
        <div className='flex flex-col items-center justify-center space-y-1 text-center'>
          <span className='truncate text-xs font-semibold uppercase'>
            Favorite
          </span>
          <FavoriteButton
            className='text-lg'
            size='sm'
            variant='ghost'
            initialFavorite={states.favorite}
          />
        </div>

        <div className='flex flex-col items-center justify-center space-y-1 text-center'>
          <span className='truncate text-xs font-semibold uppercase'>
            Watchlist
          </span>
          <WatchlistButton
            className='text-lg'
            size='sm'
            variant='ghost'
            alreadyInList={states.watchlist}
          />
        </div>

        <div className='flex flex-col items-center justify-center space-y-1 text-center'>
          <span className='truncate text-xs font-semibold uppercase'>
            Your Rating
          </span>
          <RatingButton
            className='text-lg'
            size='sm'
            variant='link'
            initialRated={states.rated}
            withText
          />
        </div>
      </div>
    </StatesContext.Provider>
  );
}
