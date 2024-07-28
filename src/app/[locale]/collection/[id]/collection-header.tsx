import { useTranslations } from 'next-intl';
import type { IDetailedCollection } from '#types/collection-types';
import { BaseFigure } from '#components/figure/base-figure';

interface CollectionHeaderProps {
  details: IDetailedCollection;
}

export default function CollectionHeader({ details }: CollectionHeaderProps) {
  const t = useTranslations('CollectionPage.CollectionHeader');
  const lastRealese = details.parts.findLast((el) => !!el.release_date);

  return (
    <header className='flex w-full flex-col items-center gap-4 overflow-hidden rounded-md border p-4 sm:flex-row'>
      <BaseFigure
        className='block aspect-[16/9] w-full min-w-[160px] rounded-md sm:w-[160px]'
        alt='Series Poster'
        path={details.backdrop_path}
        scale='backdrop'
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
          {!!lastRealese && (
            <p className='truncate text-sm'>
              <b>{t('lastRelease')}:</b>{' '}
              {new Date(lastRealese.release_date).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
