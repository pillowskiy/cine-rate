'use client';

import { cn, groupBy } from '@libs/index';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@ui/dialog';
import { Button } from '@ui/button';
import { Loader, Search, Star, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MultiSearchResponse } from '@/app/_types/search-types';
import { MediaType } from '@/app/_types';
import { ImageFromPath } from '../image/image-from-path';
import { buildImagePath } from '@/app/_libs/tmdb';
import Link from 'next/link';
import { Carousel } from '../carousel';
import { PersonArticle } from '../article/person-article';
import { useDebounce } from '@/app/_hooks/useDebounce';

function getMultipleSearch(query: string) {
  return axios.get<MultiSearchResponse>('/api/search/multiple', {
    params: { query },
  });
}

export function SearchDialog() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Record<
    MediaType,
    MultiSearchResponse['results']
  > | null>(null);
  const [query, setQuery] = useState('');
  const debounceQuery = useDebounce(query);

  useEffect(() => {
    setIsLoading(true);
    getMultipleSearch(debounceQuery)
      .then(({ data }) => {
        setData(groupBy(data.results, 'media_type'));
      })
      .catch(() => {
        setData(null);
      })
      .finally(() => setIsLoading(false));
  }, [debounceQuery]);

  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && setData(null)}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64'
          )}
        >
          <span className='hidden lg:inline-flex'>
            Search for a creation...
          </span>
          <span className='inline-flex lg:hidden'>Search...</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='gap-0 p-0'>
        <div className='mt-1 flex w-full items-center justify-between gap-2 border-b px-2 pb-1'>
          <Search className='h-4 w-4 text-foreground/70' />
          <input
            onChange={({ target }) => setQuery(target.value.toLowerCase())}
            className='flex-grow border-none px-0 py-2 text-sm outline-none'
            placeholder='Type a command or search...'
          />
          <DialogClose>
            <X className='h-4 w-4 text-foreground/70 opacity-0' />
          </DialogClose>
        </div>
        <div className='relative max-h-[90vh] space-y-4 overflow-y-auto px-2 sm:max-h-[400px] sm:min-h-[400px]'>
          {isLoading && (
            <div className='absolute left-0 top-0 grid h-full w-full place-items-center bg-background'>
              <Loader className='m-auto h-16 w-16 animate-spin' />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
