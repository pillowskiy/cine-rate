'use client';

import type { AccountStatesResponse } from '@app/types/creation-types';
import type { CreationIdentifierProps } from '../common/types';

import {
  ReactNode,
  createContext,
  useEffect,
  useState,
} from 'react';
import { MediaType } from '@config/enums';
import axios from 'axios';

import { FavoriteButton } from './favorite-button';
import { RatingButton } from './rating-button';
import { WatchlistButton } from './watchlist-button';

import { useAuth } from '@redux/hooks';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';

interface CreationStatesProps extends CreationIdentifierProps {
  children: ReactNode;
}

function getAccountStates(creationId: number, mediaType: MediaType) {
  return axios.get<AccountStatesResponse>(
    `/api/creations/${mediaType}/${creationId}/states`
  );
}

export const StatesContext = createContext<CreationIdentifierProps>({
  mediaType: MediaType.Movie,
  creationId: 0,
});

export function StatesPopover({
  creationId,
  mediaType,
  children,
}: CreationStatesProps) {
  const { user } = useAuth();
  const [states, setStates] = useState<AccountStatesResponse | null>(null);
  // TEMP: loading state
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen(open: boolean) {
    if (!user || !open) {
      setIsOpen(false);
    } else if (open && states) {
      setIsOpen(true);
    } else {
      getAccountStates(creationId, mediaType)
        .then(({ data }) => {
          setStates(data);
          setIsOpen(true);
        })
        .catch(() => {
          setStates(null);
        });
    }
  }

  return (
    <StatesContext.Provider value={{ creationId, mediaType }}>
      <Popover open={isOpen} onOpenChange={handleOpen}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className='w-fit p-1'>
          {states && (
            <div className='flex flex-col text-left'>
              <WatchlistButton
                className='justify-start'
                size='sm'
                variant='ghost'
                withText
                alreadyInList={states.watchlist}
              />
              <RatingButton
                className='justify-start'
                size='sm'
                variant='ghost'
                withText
                initialRated={states.rated}
              />
              <FavoriteButton
                className='justify-start'
                size='sm'
                variant='ghost'
                withText
                initialFavorite={states.favorite}
              />
            </div>
          )}
        </PopoverContent>
      </Popover>
    </StatesContext.Provider>
  );
}

export function CreationStatesDetailed({
  creationId,
  mediaType,
}: CreationIdentifierProps) {
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
