import { memo } from 'react';
import Link from 'next/link';
import { Info, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '#ui/button';
import {
  BaseArticle,
  BaseArticleContent,
  BaseArticleFigure,
  type BaseArticleFigureProps,
  BaseArticleProps,
} from '#components/article/base-article';
import { StatesPopover } from '#components/creation/account-states';
import { cn } from '#libs/index';
import { buildImagePath } from '#libs/tmdb';
import { tmdbSlugify } from '#libs/tmdb/slugify';
import { BaseCreationArticleProps } from './common/types';
import CreationRibbon from './creation-ribbon';

interface CreationArticleProps
  extends BaseCreationArticleProps,
    Omit<BaseArticleProps, 'src' | 'href'> {
  aspect?: BaseArticleFigureProps['aspect'];
  autoScale?: boolean;
}

const aspectRatioImageProps = {
  vertical: {
    width: 260,
    height: 390,
    //            TEMP: magic numbers
    sizes: '(max-width: 640px) 160px, 260px',
  },
  horizontal: {
    width: 260,
    height: 140,
  },
} as const;

export const CreationArticle = memo(
  ({
    creation,
    defaultMediaType,
    aspect = 'vertical',
    className,
    autoScale = true,
    ...props
  }: CreationArticleProps) => {
    const t = useTranslations('Articles.CreationArticle');
    const mediaType = creation.media_type || defaultMediaType;
    if (!mediaType) return null;

    const { title, original_title, original_name } = creation;
    const creationTitle = title || original_title || original_name;

    return (
      <BaseArticle
        className={cn(
          autoScale &&
            (aspect === 'vertical' ? 'w-[160px] sm:w-[260px]' : 'w-[260px]'),
          className
        )}
        {...props}
      >
        <div className='relative overflow-hidden p-px'>
          <Link href={`/${mediaType}/${tmdbSlugify(creation)}`}>
            <BaseArticleFigure
              src={buildImagePath(
                aspect === 'vertical'
                  ? { path: creation.poster_path, scale: 'poster' }
                  : { path: creation.backdrop_path, scale: 'backdrop' }
              )}
              aspect={aspect}
              {...aspectRatioImageProps[aspect]}
              alt='Creation Image'
            />
          </Link>
          <StatesPopover creationId={creation.id} mediaType={mediaType}>
            <Button
              className='absolute right-2 top-2 size-7'
              variant='outline'
              size='icon'
              aria-label='creation info'
            >
              <Info className='size-5' />
            </Button>
          </StatesPopover>

          <CreationRibbon creation={creation} />
        </div>
        <BaseArticleContent>
          <h2
            className='text-md truncate font-semibold tracking-tight'
            title={creationTitle}
          >
            {creationTitle}
          </h2>
          <div className='flex items-center text-xs'>
            <Star className='mr-1 size-4 fill-yellow-300 text-yellow-400' />
            <span>{(creation.vote_average ?? 0).toFixed(1)}</span>
            <span className='ml-auto'>
              {t('reviewsCount', {
                reviewsCount: creation.vote_count,
              })}
            </span>
          </div>
        </BaseArticleContent>
      </BaseArticle>
    );
  }
);

CreationArticle.displayName = 'CreationArticle';
