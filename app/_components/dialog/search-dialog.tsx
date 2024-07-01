'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import ky from 'ky';
import { Loader, Search, X } from 'lucide-react';

import type { MultiSearchResponse } from '@app/types/search-types';

import { useDebounce } from '@hooks/useDebounce';

import { MediaType } from '@config/enums';

import { Button } from '@ui/button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@ui/dialog';

import { cn, groupBy } from '@libs/index';

import { HorizontalCreationArticle } from '../article/creation-article';
import { PersonArticle } from '../article/person-article';
import { Carousel } from '../carousel';

async function getMultipleSearch(query: string) {
  return ky
    .get('/api/search/multiple', {
      searchParams: { query },
    })
    .then((res) => res.json<MultiSearchResponse>());
}

type SearchedData = Record<MediaType, MultiSearchResponse['results']> | null;

// TEMP: The principle of single responsibility
export function SearchDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<SearchedData | null>(null);

  const [query, setQuery] = useState('');
  const debounceQuery = useDebounce(query);

  useEffect(() => {
    if (!debounceQuery) return setData(null);
    setIsLoading(true);
    getMultipleSearch(debounceQuery)
      .then((data) => {
        setData(groupBy(data.results, 'media_type'));
      })
      .catch((err) => {
        setData(null);
      })
      .finally(() => setIsLoading(false));
  }, [debounceQuery]);

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isOpen) => {
        setIsDialogOpen(isOpen);
        !isOpen && setData(null);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant='outline'
          onClick={() => setIsDialogOpen(true)}
          className={cn(
            'sm:text-muted-foreground justify-start text-sm sm:w-[260px]',
            'aspect-square p-0 sm:p-4 sm:pr-12'
          )}
        >
          <span className='hidden sm:inline-flex'>
            Search for a creation...
          </span>
          <span className='sr-only'>Search for a creation...</span>
          <Search className='m-auto size-5 sm:hidden' />
        </Button>
      </DialogTrigger>
      <DialogContent className='gap-0 rounded-md p-0'>
        <div className='z-10 mt-1 flex w-full items-center justify-between gap-2 border-b px-2 pb-1'>
          <Search className='text-foreground/70 size-4' />
          <input
            onChange={({ target }) => setQuery(target.value.toLowerCase())}
            className='grow border-none bg-transparent px-0 py-2 text-sm outline-none'
            placeholder='Type a command or search...'
          />
          <DialogClose>
            <X className='text-foreground/70 size-4 opacity-0' />
          </DialogClose>
        </div>
        <div className='relative h-[600px] space-y-4 overflow-y-auto p-2 sm:max-h-[400px] sm:min-h-[400px]'>
          {isLoading && (
            <div className='bg-background fixed inset-0 grid size-full place-items-center rounded-md'>
              <Loader className='m-auto size-16 animate-spin' />
            </div>
          )}

          {!isLoading && !!data?.person && (
            <div>
              <span className='text-foreground/70 px-2 text-sm font-semibold'>
                Most Popular Celebrities
              </span>
              <Carousel className='space-x-0'>
                {data.person
                  .sort((a, b) => b.popularity - a.popularity)
                  .map((person) => {
                    if (!('known_for' in person)) return null;

                    return (
                      <Link
                        key={person.id}
                        href={`/celebrity/${person.id}`}
                        passHref
                        legacyBehavior
                      >
                        <div
                          onClick={() => setIsDialogOpen(false)}
                          className='hover:bg-accent flex cursor-pointer gap-2 rounded-md p-2 transition-all'
                        >
                          <PersonArticle
                            className='w-[120px] min-w-[120px]'
                            celebrity={person}
                          />
                        </div>
                      </Link>
                    );
                  })}
              </Carousel>
            </div>
          )}

          {!isLoading && !!data?.movie && (
            <div>
              <span className='text-foreground/70 px-2 text-sm font-semibold'>
                Most Popular Movies
              </span>
              {data.movie
                .sort((a, b) => b.popularity - a.popularity)
                .slice(0, 3)
                .map((movie) => {
                  if ('known_for' in movie) return null;
                  return (
                    <Link
                      key={movie.id}
                      href={`/movie/${movie.id}`}
                      passHref
                      legacyBehavior
                    >
                      <HorizontalCreationArticle
                        defaultMediaType={MediaType.Movie}
                        creation={movie}
                        alt='Series Backdrop'
                        onClick={() => setIsDialogOpen(false)}
                        width={260}
                        height={190}
                      />
                    </Link>
                  );
                })}
            </div>
          )}

          {!isLoading && !!data?.tv && (
            <div>
              <span className='text-foreground/70 px-2 text-sm font-semibold'>
                Most Popular Series and Shows
              </span>
              {data.tv
                .sort((a, b) => b.popularity - a.popularity)
                .slice(0, 3)
                .map((tv) => {
                  if ('known_for' in tv) return null;
                  return (
                    <Link
                      key={tv.id}
                      href={`/tv/${tv.id}`}
                      passHref
                      legacyBehavior
                    >
                      <HorizontalCreationArticle
                        defaultMediaType={MediaType.TV}
                        creation={tv}
                        onClick={() => setIsDialogOpen(false)}
                        alt='Series Backdrop'
                        width={260}
                        height={190}
                      />
                    </Link>
                  );
                })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
