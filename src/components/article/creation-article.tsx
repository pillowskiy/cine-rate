import { type ComponentProps, memo } from 'react';
import Link from 'next/link';
import { Info, Star } from 'lucide-react';
import type { ICreation } from '#types/creation-types';
import type { MediaType } from '#config/enums';
import { Button } from '#ui/button';
import {
  CreationStatesDetailed,
  StatesPopover,
} from '#components/creation/account-states';
import { BaseFigure } from '#components/figure/base-figure';
import { cn } from '#libs/index';
import { buildImagePath } from '#libs/tmdb';
import { CreationRibbon } from '../creation/creation-ribbon';
import {
  BaseArticle,
  BaseArticleContent,
  BaseArticleFigure,
  type BaseArticleFigureProps,
  BaseArticleProps,
} from './base-article';

interface CreationArticleProps extends Omit<BaseArticleProps, 'src' | 'href'> {
  width: number;
  height: number;
  creation: ICreation;
  aspect?: BaseArticleFigureProps['aspect'];
  defaultMediaType?: MediaType;
}

export const CreationArticle = memo(
  ({
    creation,
    width,
    height,
    defaultMediaType,
    aspect = 'vertical',
    ...props
  }: CreationArticleProps) => {
    const mediaType = creation.media_type || defaultMediaType;
    if (!mediaType) return null;

    const { title, original_title, original_name } = creation;
    const creationTitle = title || original_title || original_name;

    return (
      <BaseArticle {...props}>
        <div className='relative overflow-hidden p-px'>
          <Link href={`/${mediaType}/${creation.id}`}>
            <BaseArticleFigure
              src={buildImagePath(
                aspect === 'vertical'
                  ? { path: creation.poster_path, scale: 'poster' }
                  : { path: creation.backdrop_path, scale: 'backdrop' }
              )}
              aspect={aspect}
              width={width}
              height={height}
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
            <span className='ml-auto'>({creation.vote_count} reviews)</span>
          </div>
        </BaseArticleContent>
      </BaseArticle>
    );
  }
);

CreationArticle.displayName = 'CreationArticle';

interface HorizontalCreationArticleProps extends ComponentProps<'article'> {
  alt: string;
  width: number;
  height: number;
  creation: ICreation;
  defaultMediaType: MediaType;
  withStates?: boolean;
}

export const HorizontalCreationArticle = memo(
  ({
    creation,
    width,
    height,
    alt,
    className,
    withStates,
    defaultMediaType,
    ...props
  }: HorizontalCreationArticleProps) => {
    const mediaType = defaultMediaType || creation.media_type;
    if (!mediaType) return null;

    const { title, original_title, original_name } = creation;
    const displayTitle = title || original_title || original_name;
    return (
      <article
        className={cn(
          'hover:bg-accent flex w-full cursor-pointer gap-2 rounded-md p-2 transition-all',
          className
        )}
        {...props}
      >
        <BaseFigure
          className='aspect-[16/9] min-w-[120px] max-w-[120px] rounded-md'
          path={creation.backdrop_path}
          scale='backdrop'
          alt={alt}
          width={width}
          height={height}
        />

        <div className='overflow-hidden'>
          <h2 className='truncate text-lg font-semibold' title={displayTitle}>
            {displayTitle}
          </h2>
          <div className='flex items-center gap-2 text-xs'>
            <div className='flex items-center space-x-1.5'>
              <Star className='size-4 fill-yellow-300 text-yellow-400' />
              <span>{creation.vote_average.toFixed(1)}</span>
            </div>
            <span>({creation.vote_count} reviews)</span>
          </div>
          <span className='text-xs'>
            Realese Date: {new Date(creation.release_date).toDateString()}
          </span>
        </div>

        {withStates && (
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

HorizontalCreationArticle.displayName = 'HorizontalCreationArticle';
