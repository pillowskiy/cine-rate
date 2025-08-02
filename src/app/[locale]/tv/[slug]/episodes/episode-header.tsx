import { memo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { ITVDetails } from '#types/tv-types';
import { CreationStates } from '#components/creation/creation-states';
import { ImageFromPath } from '#components/image/image-from-path';
import { buildImagePath, getCreationTitle } from '#libs/tmdb';

interface EpisodeHeaderProps {
  series: ITVDetails;
}

const EpisodeHeader = memo(({ series }: EpisodeHeaderProps) => {
  const t = useTranslations('EpisodesPage.EpisodeHeader');

  return (
    <header className='flex w-full flex-col items-center gap-4 overflow-hidden rounded-md border p-4 sm:flex-row'>
      <div className='w-full sm:w-fit'>
        <ImageFromPath
          className='block aspect-video w-full min-w-[160px] rounded-md sm:w-[160px]'
          alt='Series Poster'
          src={buildImagePath({
            path: series.backdrop_path,
            scale: 'backdrop',
          })}
          width={160}
          height={90}
        />
      </div>
      <div className='flex grow flex-col items-center justify-between gap-4 sm:flex-row'>
        <div className='text-center sm:text-left'>
          <div className='flex items-center gap-1.5'>
            <Link
              className='text-xl text-blue-500 transition-all hover:underline'
              href={`/tv/${series.id}`}
            >
              {getCreationTitle(series)}
            </Link>
            <span className='text-foreground/70 text-sm'>
              ({new Date(series.first_air_date).getFullYear()})
            </span>
          </div>
          <h2 className='text-2xl font-semibold'>{t('title')}</h2>
        </div>
        <CreationStates details={series} />
      </div>
    </header>
  );
});

EpisodeHeader.displayName = 'EpisodeHeader';

export default EpisodeHeader;
