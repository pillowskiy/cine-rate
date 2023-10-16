'use client';

import type { AccountStatesResponse } from '@app/types/creation-types';
import type { CreationIdentifierProps } from '../common/types';

import { ComponentProps, ReactNode, useState } from 'react';
import { StatesContext, useStatesReducer, StatesAction } from './utils';

import { FavoriteButton } from './favorite-button';
import { RatingButton } from './rating-button';
import { WatchlistButton } from './watchlist-button';

import { useAuth } from '@redux/hooks';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import useFetch from '@hooks/useFetch';
import ky from 'ky';
import { cn } from '@libs/index';

interface CreationStatesProps extends CreationIdentifierProps {
  children: ReactNode;
}

export function StatesPopover({
  creationId,
  mediaType,
  children,
}: CreationStatesProps) {
  const { user } = useAuth();
  const [states, dispatch] = useStatesReducer();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  function handleOpen(open: boolean) {
    if (!user || !open) {
      setIsOpen(false);
    } else if (open && states) {
      setIsOpen(true);
    } else {
      ky.get(`/api/${mediaType}/${creationId}/states`, { cache: 'no-cache' })
        .then((res) => res.json<AccountStatesResponse>())
        .then((data) => {
          dispatch({
            type: StatesAction.SET_STATE,
            payload: { ...data, mediaType },
          });
          setIsOpen(true);
        })
        .catch(() => {
          dispatch({ type: StatesAction.SET_STATE, payload: null });
        });
    }
  }

  return (
    <StatesContext.Provider value={[states, dispatch]}>
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
              />
              <RatingButton
                className='h-7 justify-start'
                size='sm'
                variant='ghost'
                withText
              />
              <FavoriteButton
                className='h-7 justify-start'
                size='sm'
                variant='ghost'
                withText
              />
            </div>
          )}
        </PopoverContent>
      </Popover>
    </StatesContext.Provider>
  );
}

interface StatesDetailedProps
  extends CreationIdentifierProps,
    ComponentProps<'div'> {}

export function CreationStatesDetailed({
  creationId,
  mediaType,
  className,
  ...props
}: StatesDetailedProps) {
  const { user } = useAuth();
  const [states, dispatch] = useStatesReducer();

  const { data } = useFetch<AccountStatesResponse>(
    `/api/${mediaType}/${creationId}/states`,
    { cache: 'no-cache' },
    [user]
  );

  dispatch({
    type: StatesAction.SET_STATE,
    payload: data ? { ...data, mediaType } : null,
  });

  if (!states) return null;

  return (
    <StatesContext.Provider value={[states, dispatch]}>
      <div
        className={cn(
          'flex w-full justify-between gap-4 overflow-x-auto sm:w-fit sm:justify-start',
          className
        )}
        {...props}
      >
        <div className='flex w-[120px] flex-col items-center justify-center space-y-1 text-center'>
          <span className='truncate text-xs font-semibold uppercase'>
            Favorite List
          </span>
          <FavoriteButton
            className='h-7 text-lg'
            size='sm'
            variant='link'
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
            withText
          />
        </div>
      </div>
    </StatesContext.Provider>
  );
}
