'use client';

import { type ReactNode, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import type { MediaType } from '#config/enums';
import { Button } from '#ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#ui/dialog';
import { Input } from '#ui/input';
import { Label } from '#ui/label';
import { ScrollArea, ScrollBar } from '#ui/scroll-area';
import { MSeparator } from '#ui/separator';
import {
  CreationFilterContext,
  FilterDiscoverParams,
  useCreationFilterParams,
} from './common/hooks';
import { toISO } from './common/utils';
import { CreationGenres } from './creation-genres';
import { CreationLanguage } from './creation-language';

interface CreationFilterDialogProps {
  mediaType: MediaType;
  children: ReactNode;
}

export default function CreationFilterDialog({
  mediaType,
  children,
}: CreationFilterDialogProps) {
  const t = useTranslations('Creations.CreationFilterCatalog');
  const { filter, updateFilter, commitFilter } = useCreationFilterParams();

  const onFilterInputChange = useCallback(
    (filterKey: keyof FilterDiscoverParams) => {
      return (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.type) {
          case 'date':
            updateFilter({ [filterKey]: toISO(e.target.value) });
            break;
          default:
            updateFilter({ [filterKey]: e.target.value });
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <CreationFilterContext.Provider
          value={{ filter, updateFilter, commitFilter }}
        >
          <ScrollArea>
            <div className='mr-4 max-h-[460px] space-y-4 px-2'>
              <h2>{t('releaseDate.label')}</h2>
              <div className='flex justify-between gap-4'>
                <div className='grid w-full max-w-sm items-center gap-2'>
                  <Label htmlFor='realese_from'>{t('releaseDate.from')}</Label>
                  <Input
                    defaultValue={filter['primary_release_date.gte']}
                    onChange={onFilterInputChange('primary_release_date.gte')}
                    id='realese_from'
                    type='date'
                  />
                </div>
                <div className='grid w-full max-w-sm items-center gap-2'>
                  <Label htmlFor='realese_to'>{t('releaseDate.to')}</Label>
                  <Input
                    defaultValue={filter['primary_release_date.lte']}
                    onChange={onFilterInputChange('primary_release_date.lte')}
                    id='realese_to'
                    type='date'
                  />
                </div>
              </div>
              <MSeparator className='my-4' />

              <CreationLanguage />
              <CreationGenres mediaType={mediaType} />
            </div>
            <ScrollBar orientation='vertical' />
          </ScrollArea>
          <DialogFooter className='pt-4'>
            <DialogClose asChild>
              <Button onClick={commitFilter}>Search</Button>
            </DialogClose>
          </DialogFooter>
        </CreationFilterContext.Provider>
      </DialogContent>
    </Dialog>
  );
}
