'use client';

import type { AccountStatesResponse } from '@app/types/creation-types';
import type { CreationIdentifierProps } from '../common/types';

import { ReactNode, createContext, useState } from 'react';
import { MediaType } from '@config/enums';

import { FavoriteButton } from './favorite-button';
import { RatingButton } from './rating-button';
import { WatchlistButton } from './watchlist-button';

import { useAuth } from '@redux/hooks';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import useFetch from '@hooks/useFetch';
import { fetch } from '@libs/common/fetch';

interface CreationStatesProps extends CreationIdentifierProps {
  children: ReactNode;
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

  if (!user) return null;

  function handleOpen(open: boolean) {
    if (!user || !open) {
      setIsOpen(false);
    } else if (open && states) {
      setIsOpen(true);
    } else {
      fetch<AccountStatesResponse>(`/api/${mediaType}/${creationId}/states`)
        .then((states) => {
          setStates(states);
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
        <PopoverContent className='w-[110px] p-1'>
          {states && (
            <div className='flex flex-col text-left'>
              <WatchlistButton
                className='h-7 justify-start'
                size='sm'
                variant='ghost'
                withText
                alreadyInList={states.watchlist}
              />
              <RatingButton
                className='h-7 justify-start'
                size='sm'
                variant='ghost'
                withText
                initialRated={states.rated}
              />
              <FavoriteButton
                className='h-7 justify-start'
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

  const { data: states } = useFetch<AccountStatesResponse>(
    `/api/${mediaType}/${creationId}/states`,
    {},
    [user]
  );

  if (!states) return null;

  return (
    <StatesContext.Provider value={{ creationId, mediaType }}>
      <div className='flex w-full justify-between gap-4 overflow-x-auto sm:w-fit sm:justify-start'>
        <div className='flex w-[120px] flex-col items-center justify-center space-y-1 text-center'>
          <span className='truncate text-xs font-semibold uppercase'>
            Favorite List
          </span>
          <FavoriteButton
            className='h-7 text-lg'
            size='sm'
            variant='link'
            initialFavorite={states.favorite}
            withText
          />
        </div>

        <div className='flex w-[120px] flex-col items-center justify-center space-y-1 text-center'>
          <span className='truncate text-xs font-semibold uppercase'>
            Your Watchlist
          </span>
          <WatchlistButton
            className='h-7 text-lg'
            size='sm'
            variant='link'
            alreadyInList={states.watchlist}
            withText
          />
        </div>

        <div className='flex w-[120px] flex-col items-center justify-center space-y-1  text-center'>
          <span className='truncate text-xs font-semibold uppercase'>
            Your Rating
          </span>
          <RatingButton
            className='h-7 text-lg'
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
