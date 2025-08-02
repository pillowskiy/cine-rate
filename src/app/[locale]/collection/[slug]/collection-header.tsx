import { useLocale, useTranslations } from 'next-intl';
import type { IDetailedCollection } from '#types/collection-types';
import { BaseFigure } from '#components/figure/base-figure';
import { formatToLocaleLongDate } from '#libs/i18n';
import { buildImagePath } from '#libs/tmdb';

interface CollectionHeaderProps {
  details: IDetailedCollection;
}

export default function CollectionHeader({ details }: CollectionHeaderProps) {
  const locale = useLocale();
  const t = useTranslations('CollectionPage.CollectionHeader');
  const lastRelease = details.parts.findLast((el) => !!el.release_date);

  return (
    <header className='flex w-full flex-col items-center gap-4 overflow-hidden rounded-md border p-4 sm:flex-row'>
      <BaseFigure
        className='block aspect-video w-full min-w-[160px] rounded-md sm:w-[160px]'
        alt='Series Poster'
        src={buildImagePath({ path: details.backdrop_path, scale: 'backdrop' })}
        width={160}
        height={90}
      />
      <div className='flex grow flex-col items-center justify-between gap-4 sm:flex-row'>
        <div className='text-center sm:max-w-[80%] sm:text-left'>
          <h3 className='text-xl'>{details.name}</h3>
          <p className='text-foreground/70 text-sm'>{details.overview}</p>
        </div>

        <div className='h-full'>
          <p className='truncate text-sm'>
            <b>{t('numberOfMovies')}:</b> {details.parts.length}
          </p>
          {!!lastRelease && (
            <p className='truncate text-sm'>
              <b>{t('lastRelease')}:</b>{' '}
              {formatToLocaleLongDate(
                locale,
                lastRelease.release_date || lastRelease.first_air_date || 'N/A'
              )}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
