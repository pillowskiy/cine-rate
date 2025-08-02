import { ComponentProps, memo } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { CreationStatesDetailed } from '#components/creation/account-states';
import { BaseFigure } from '#components/figure/base-figure';
import { formatToLocaleShortDate } from '#libs/i18n';
import { cn } from '#libs/index';
import { buildImagePath, getCreationReleasedDate } from '#libs/tmdb';
import { tmdbSlugify } from '#libs/tmdb/slugify';
import { BaseCreationArticleProps } from './common/types';

interface CreationHorizontalArticleProps
  extends BaseCreationArticleProps,
    ComponentProps<'article'> {
  alt: string;
  withStates?: boolean;
}

export const CreationHorizontalArticle = memo(
  ({
    creation,
    alt,
    className,
    withStates,
    defaultMediaType,
    ...props
  }: CreationHorizontalArticleProps) => {
    const t = useTranslations('Articles.CreationArticle');
    const locale = useLocale();
    const mediaType = defaultMediaType || creation.media_type;
    const releaseDate = getCreationReleasedDate(creation);
    if (!mediaType) return null;

    const { title, original_title, original_name } = creation;
    const displayTitle = title || original_title || original_name;
    return (
      <article
        className={cn(
          'hover:bg-accent flex w-full gap-2 rounded-md p-2 transition-all',
          className
        )}
        {...props}
      >
        <Link href={`/${mediaType}/${tmdbSlugify(creation)}`}>
          <BaseFigure
            className='aspect-video min-w-[120px] max-w-[120px] rounded-md'
            src={buildImagePath({
              path: creation.backdrop_path,
              scale: 'backdrop',
            })}
            alt={alt}
            width={260}
            height={190}
          />
        </Link>
        <div className='overflow-hidden'>
          <Link
            href={`/${mediaType}/${tmdbSlugify(creation)}`}
            className='truncate text-lg font-semibold transition-all hover:underline'
            title={displayTitle}
          >
            {displayTitle}
          </Link>
          <div className='flex items-center text-xs'>
            <Star className='mr-1.5 size-4 fill-yellow-300 text-yellow-400' />
            <span>{creation.vote_average.toFixed(1)}</span>
            <span className='ml-2'>
              {t('reviewsCount', {
                reviewsCount: creation.vote_count,
              })}
            </span>
          </div>
          <span className='text-xs'>
            {t('releaseDate', {
              releaseDate: releaseDate
                ? formatToLocaleShortDate(locale, releaseDate)
                : 'N/A',
            })}
          </span>
        </div>

3        {withStates && (
          <CreationStatesDetailed
            className='ml-auto hidden md:flex'
            creationId={creation.id}
            mediaType={mediaType}
          />
        )}
      </article>
    );
  }
);

CreationHorizontalArticle.displayName = 'HorizontalCreationArticle';
