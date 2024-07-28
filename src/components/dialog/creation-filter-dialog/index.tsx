'use client';

import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useState,
} from 'react';
import { useTranslations } from 'next-intl';
import useQueryParams from '#hooks/useQueryParams';
import type { GetDiscoverParams } from '#actions/getDiscover';
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
import { CreationGenres } from './creation-genres';
import { CreationLanguage } from './creation-language';

interface CreationFilterDialogProps {
  mediaType: MediaType;
  children: ReactNode;
}

type FilterDiscoverParams = Partial<GetDiscoverParams>;

export const FilterContext = createContext<
  [FilterDiscoverParams, Dispatch<SetStateAction<FilterDiscoverParams>>]
>([{}, () => null]);

function toISO(stringDate: string) {
  if (!stringDate) return undefined;
  return new Date(stringDate).toISOString().split('T')[0];
}

export function CreationFilterDialog({
  mediaType,
  children,
}: CreationFilterDialogProps) {
  const t = useTranslations('Creations.CreationFilterCatalog');
  const { setQueryParams, urlSearchParams } = useQueryParams();
  const searchParamsObj = Object.fromEntries(urlSearchParams.entries());
  const [filter, setFilter] = useState<FilterDiscoverParams>(searchParamsObj);

  const updateFilter = (params: FilterDiscoverParams) => {
    return setFilter((prev) => ({ ...prev, ...params }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <FilterContext.Provider value={[filter, setFilter]}>
          <ScrollArea>
            <div className='mr-4 max-h-[460px] space-y-4 px-2'>
              <h2>{t('releaseDate.label')}</h2>
              <div className='flex justify-between gap-4'>
                <div className='grid w-full max-w-sm items-center gap-2'>
                  <Label htmlFor='realese_from'>{t('releaseDate.from')}</Label>
                  <Input
                    defaultValue={filter['primary_release_date.gte']}
                    onChange={({ target }) =>
                      updateFilter({
                        'primary_release_date.gte': toISO(target.value),
                      })
                    }
                    id='realese_from'
                    type='date'
                  />
                </div>
                <div className='grid w-full max-w-sm items-center gap-2'>
                  <Label htmlFor='realese_to'>{t('releaseDate.to')}</Label>
                  <Input
                    defaultValue={filter['primary_release_date.lte']}
                    onChange={({ target }) =>
                      updateFilter({
                        'primary_release_date.lte': toISO(target.value),
                      })
                    }
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
              <Button onClick={() => setQueryParams(filter)}>Search</Button>
            </DialogClose>
          </DialogFooter>
        </FilterContext.Provider>
      </DialogContent>
    </Dialog>
  );
}
