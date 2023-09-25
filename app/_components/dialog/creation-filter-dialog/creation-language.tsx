'use client';

import type { LanguagesResponse } from '@app/types/configuration-types';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { Label } from '@ui/label';

import { useContext } from 'react';
import { FilterContext } from '.';
import { useFetch } from '@hooks/useFetch';

export function CreationLanguage() {
  const [filter, setFilter] = useContext(FilterContext);
  const { data: languages, error } = useFetch<LanguagesResponse>(
    '/api/configuration/languages'
  );

  return (
    <div className='grid w-full items-center gap-2'>
      <Label>Language</Label>
      <Select
        onValueChange={(newValue) => {
          setFilter((prev) => ({ ...prev, language: newValue }));
        }}
        defaultValue={filter.language}
      >
        <SelectTrigger disabled={!languages}>
          <SelectValue placeholder='Choose language' />
        </SelectTrigger>
        <SelectContent className='max-h-[220px]'>
          <SelectGroup>
            {languages?.map(({ iso_639_1, name, english_name }) => (
              <SelectItem key={iso_639_1} value={iso_639_1}>
                {name || english_name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
