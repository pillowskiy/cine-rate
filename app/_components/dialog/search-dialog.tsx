'use client';

import { cn, groupBy } from '@libs/index';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@ui/dialog';
import { Button } from '@ui/button';
import { Loader, Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { MultiSearchResponse } from '@app/types/search-types';
import type { MediaType } from '@config/enums';
import Link from 'next/link';
import { Carousel } from '../carousel';
import { PersonArticle } from '../article/person-article';
import { useDebounce } from '@hooks/useDebounce';
import { HorizontalCreationArticle } from '../article/creation-article';
import ky from 'ky';

async function getMultipleSearch(query: string) {
  return ky.get('/api/search/multiple', {
    searchParams: { query },
  }).then(res => res.json<MultiSearchResponse>());
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
            'justify-start text-sm sm:w-[260px] sm:text-muted-foreground',
            'aspect-square p-0 sm:px-4 sm:py-4 sm:pr-12'
          )}
        >
          <span className='hidden sm:inline-flex'>
            Search for a creation...
          </span>
          <Search className='m-auto h-5 w-5 sm:hidden' />
        </Button>
      </DialogTrigger>
      <DialogContent className='gap-0 rounded-md p-0'>
        <div className='z-10 mt-1 flex w-full items-center justify-between gap-2 border-b px-2 pb-1'>
          <Search className='h-4 w-4 text-foreground/70' />
          <input
            onChange={({ target }) => setQuery(target.value.toLowerCase())}
            className='flex-grow border-none bg-transparent px-0 py-2 text-sm outline-none'
            placeholder='Type a command or search...'
          />
          <DialogClose>
            <X className='h-4 w-4 text-foreground/70 opacity-0' />
          </DialogClose>
        </div>
        <div className='relative h-[600px] space-y-4 overflow-y-auto p-2 sm:max-h-[400px] sm:min-h-[400px]'>
          {isLoading && (
            <div className='fixed inset-0 grid h-full w-full place-items-center rounded-md bg-background'>
              <Loader className='m-auto h-16 w-16 animate-spin' />
            </div>
          )}

          {!isLoading && !!data?.person && (
            <div>
              <span className='px-2 text-sm font-semibold text-foreground/70'>
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
                          className='flex cursor-pointer gap-2 rounded-md p-2 transition-all hover:bg-accent'
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
              <span className='px-2 text-sm font-semibold text-foreground/70'>
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
              <span className='px-2 text-sm font-semibold text-foreground/70'>
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
