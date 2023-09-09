'use client';

import { cn, groupBy } from '@libs/index';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@ui/dialog';
import { Button } from '@ui/button';
import { Loader, Search, X } from 'lucide-react';
import { type ChangeEvent, useState } from 'react';
import axios from 'axios';
import { MultiSearchResponse } from '@/app/_types/search-types';
import { MediaType } from '@/app/_types';

function getMultipleSearch(query: string) {
  return axios.get<MultiSearchResponse>('api/search/multiple', {
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

  const handleQuery = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setQuery(target.value.toLowerCase());
    setIsLoading(true);
    getMultipleSearch(query)
      .then(({ data }) => {
        console.time();
        setData(groupBy(data.results, 'media_type'));
        console.timeEnd();
      })
      .catch((err) => {
        console.log(err.response);
        setData(null);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64'
          )}
        >
          <span className='hidden lg:inline-flex'>Search documentation...</span>
          <span className='inline-flex lg:hidden'>Search...</span>
          <kbd className='pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
            <span className='text-xs'>⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className='gap-0 p-0'>
        <div className='mt-1 flex w-full items-center justify-between gap-2 border-b px-2 pb-1'>
          <Search className='h-4 w-4 text-foreground/70' />
          <input
            onChange={handleQuery}
            className='flex-grow border-none px-0 py-2 text-sm outline-none'
            placeholder='Type a command or search...'
          />
          <DialogClose>
            <X className='h-4 w-4 text-foreground/70 opacity-0' />
          </DialogClose>
        </div>
        <div className='relative max-h-[400px] min-h-[400px] space-y-4 overflow-y-auto px-2'>
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
