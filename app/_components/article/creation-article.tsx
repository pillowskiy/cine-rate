import type { MediaType } from '@config/enums';
import { type ComponentProps, memo } from 'react';
import { buildImagePath } from '@libs/tmdb';
import { ICreation } from '@app/types/creation-types';
import { Info, Star } from 'lucide-react';
import {
  BaseArticleProps,
  BaseArticle,
  BaseArticleContent,
  BaseArticleFigure,
  BaseArticleFigureProps,
} from './base-article';
import Link from 'next/link';
import { ImageFromPath } from '@components/image/image-from-path';
import { cn } from '@libs/index';
import { Button } from '@ui/button';
import {
  CreationStatesDetailed,
  StatesPopover,
} from '@components/creation/account-states';

interface CreationArticleProps extends Omit<BaseArticleProps, 'src' | 'href'> {
  size?: 'default' | 'sm';
  width: number;
  height: number;
  creation: ICreation;
  aspect?: BaseArticleFigureProps['aspect'];
  defaultMediaType?: MediaType;
}

export const CreationArticle = memo(
  ({
    creation,
    size = 'default',
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
        <div className='relative'>
          <Link href={`/${mediaType}/${creation.id}`}>
            <BaseArticleFigure
              src={buildImagePath(
                size === 'default'
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
              className='absolute right-2 top-2 h-7 w-7'
              variant='outline'
              size='icon'
              aria-label='creation info'
            >
              <Info className='h-5 w-5' />
            </Button>
          </StatesPopover>
        </div>
        <BaseArticleContent>
          <h2
            className='text-md truncate font-semibold tracking-tight'
            title={creationTitle}
          >
            {creationTitle}
          </h2>
          <div className='flex items-center justify-between text-xs'>
            <div className='flex items-center space-x-1.5'>
              <Star className='h-4 w-4 fill-yellow-300 text-yellow-400' />
              <span>{creation.vote_average.toFixed(1)}</span>
            </div>
            <span>({creation.vote_count} reviews)</span>
          </div>
        </BaseArticleContent>
      </BaseArticle>
    );
  }
);

CreationArticle.displayName = 'CreationArticle';

interface HorizontalCreationArticle extends ComponentProps<'article'> {
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
  }: HorizontalCreationArticle) => {
    const mediaType = defaultMediaType || creation.media_type;
    if (!mediaType) return null;

    const { title, original_title, original_name } = creation;
    const displayTitle = title || original_title || original_name;
    return (
      <article
        className={cn(
          'flex w-full cursor-pointer gap-2 rounded-md p-2 transition-all hover:bg-accent',
          className
        )}
        {...props}
      >
        <ImageFromPath
          className='aspect-[16/9] max-w-[120px] min-w-[120px] rounded-md'
          src={buildImagePath({
            path: creation.backdrop_path,
            scale: 'backdrop',
          })}
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
              <Star className='h-4 w-4 fill-yellow-300 text-yellow-400' />
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
            className='hidden md:flex ml-auto'
            creationId={creation.id}
            mediaType={mediaType}
          />
        )}
      </article>
    );
  }
);

HorizontalCreationArticle.displayName = 'HorizontalCreationArticle';
