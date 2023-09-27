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
import { ArrowDownUp } from 'lucide-react';
import { startTransition } from 'react';

interface EpisodeFilterProps {
  series: ITVDetails;
}

interface SeasonFilter {
  year?: string | undefined;
  season?: string | undefined;
}

export default function EpisodeFilter({ series }: EpisodeFilterProps) {
  const { urlSearchParams, setQueryParams } = useQueryParams<SeasonFilter>();

  const selectValue = urlSearchParams.get('season') || undefined;
  const onValueChange = (newValue: string) => {
    startTransition(() => {
      setQueryParams({ season: newValue });
    });
  };

  return (
    <section className='flex items-center justify-between gap-2 rounded-md border px-2 py-1'>
      <div className='flex flex-grow items-center justify-between gap-4 overflow-auto sm:justify-start px-2 py-1'>
        <Select
          value={selectValue}
          onValueChange={onValueChange}
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
          value={selectValue}
          onValueChange={onValueChange}
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

      <div className='hidden sm:inline-block mx-2'>
        <Button size='icon' variant='outline'>
          <ArrowDownUp className='h-5 w-5' />
        </Button>
      </div>
    </section>
  );
}