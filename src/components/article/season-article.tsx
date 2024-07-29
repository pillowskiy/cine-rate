import type { ReactNode } from 'react';
import { Star } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import type { ISeason } from '#types/tv-types';
import {
  BaseArticle,
  BaseArticleContent,
  BaseArticleFigure,
  type BaseArticleProps,
} from '#components/article/base-article';
import { cn } from '#libs/index';
import { buildImagePath } from '#libs/tmdb';

interface SeasonArticleProps extends BaseArticleProps {
  action?: ReactNode;
  season: ISeason;
}

export function SeasonArticle({
  season,
  action,
  className,
  ...props
}: SeasonArticleProps) {
  const t = useTranslations('Articles.SeasonArticle');
  const locale = useLocale();

  return (
    <BaseArticle
      className={cn(
        'flex h-max min-h-fit w-full flex-col items-center sm:flex-row sm:gap-4',
        className
      )}
      {...props}
    >
      <BaseArticleFigure
        className='hidden min-w-[120px] sm:block sm:w-[120px]'
        src={buildImagePath({
          path: season.poster_path,
          scale: 'poster',
        })}
        aspect='vertical'
        width={120}
        height={180}
        alt='Season Poster'
      />
      <BaseArticleContent className='w-full sm:w-max'>
        <h2 className='text-xl font-semibold tracking-tight sm:text-2xl'>
          {season.name}
        </h2>
        <div className='flex items-center text-xs'>
          <Star className='mr-1 size-4 fill-yellow-300 text-yellow-400' />
          <span>{season.vote_average.toFixed(1)}</span>
          <span className='ml-auto'>
            {t('episodesCount', { episodesCount: season.episode_count })}
          </span>
        </div>

        <p className='my-4 text-sm tracking-tight sm:text-base'>
          {t('premieredOn', {
            seasonName: season.name,
            premieredOn: new Intl.DateTimeFormat(locale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(new Date(season.air_date)),
          })}
        </p>

        {!!action && action}
      </BaseArticleContent>
    </BaseArticle>
  );
}
