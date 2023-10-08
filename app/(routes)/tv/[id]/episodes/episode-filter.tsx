'use client';

import useQueryParams from '@hooks/useQueryParams';
import type { ITVDetails } from '@app/types/tv-types';
import { Button } from '@ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { ArrowDownUp, Loader } from 'lucide-react';
import { useTransition } from 'react';

interface EpisodeFilterProps {
  series: ITVDetails;
}

interface SeasonFilter {
  season?: string | undefined;
  sort: 'asc' | 'desc';
}

export default function EpisodeFilter({ series }: EpisodeFilterProps) {
  const { urlSearchParams, appendQueryParams } = useQueryParams<SeasonFilter>();
  const [isLoading, startTransition] = useTransition();

  const sorted = urlSearchParams.get('sort') || 'desc';
  const onSortChange = () => {
    startTransition(() => {
      appendQueryParams({ sort: sorted === 'desc' ? 'asc' : 'desc' });
    });
  };

  const selectedValue = urlSearchParams.get('season') || undefined;
  const onValueChange = (newValue: string) => {
    startTransition(() => {
      appendQueryParams({ season: newValue });
    });
  };

  return (
    <section className='flex items-center justify-between gap-2 rounded-md border px-2 py-1'>
      <div className='flex flex-grow items-center justify-between gap-4 overflow-auto px-2 py-1 sm:justify-start'>
        <Select
          value={selectedValue}
          onValueChange={onValueChange}
          disabled={isLoading}
        >
          <SelectTrigger className='w-[160px] truncate'>
            <SelectValue placeholder='Season' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {series.seasons.map((season) => (
                <SelectItem
                  key={season.id}
                  value={season.season_number.toString()}
                >
                  {season.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <h2>OR</h2>
        <Select
          value={selectedValue}
          onValueChange={onValueChange}
          disabled={isLoading}
        >
          <SelectTrigger className='w-[160px] truncate'>
            <SelectValue placeholder='Year' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {series.seasons.map((season) => (
                <SelectItem
                  key={season.id}
                  value={season.season_number.toString()}
                >
                  {new Date(season.air_date).getFullYear()}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className='mx-2 hidden sm:inline-block'>
        <Button size='icon' variant='outline' aria-label='episode filter' onClick={onSortChange}>
          {isLoading ? (
            <Loader className='h-5 w-5 animate-spin' />
          ) : (
            <ArrowDownUp className='h-5 w-5' />
          )}
        </Button>
      </div>
    </section>
  );
}
