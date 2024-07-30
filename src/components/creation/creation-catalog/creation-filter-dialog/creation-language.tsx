'use client';

import { useTranslations } from 'next-intl';
import type { LanguagesResponse } from '#types/configuration-types';
import useFetch from '#hooks/useFetch';
import { Label } from '#ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#ui/select';
import { useCreationFilterContext } from './common/hooks';

export function CreationLanguage() {
  const t = useTranslations('Creations.CreationFilterCatalog');
  const { filter, updateFilter } = useCreationFilterContext();
  const { data: languages } = useFetch<LanguagesResponse>(
    '/api/configuration/languages'
  );

  return (
    <div className='grid w-full items-center gap-2'>
      <Label>{t('language')}</Label>
      <Select
        onValueChange={(newValue) => updateFilter({ language: newValue })}
        defaultValue={filter.language}
      >
        <SelectTrigger disabled={!languages}>
          <SelectValue placeholder={t('chooseLanguage')} />
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
