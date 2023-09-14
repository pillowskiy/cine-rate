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

import { useContext, useEffect, useState } from 'react';
import { FilterContext } from '.';
import axios from 'axios';

export function CreationLanguage() {
  const [languages, setLanguages] = useState<LanguagesResponse | null>(null);
  const [filter, setFilter] = useContext(FilterContext);

  useEffect(() => {
    axios
      .get<LanguagesResponse>('/api/configuration/languages')
      .then(({ data }) => {
        setLanguages(data);
      })
      .catch(() => {
        setLanguages(null);
      });
  }, []);

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
