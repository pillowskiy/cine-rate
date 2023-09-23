import type { MediaType } from '@config/enums';
import { memo } from 'react';
import { buildImagePath } from '@libs/tmdb';
import { ICreation } from '@app/types/creation-types';
import { Star } from 'lucide-react';
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
import { CreationStates } from '../creation/account-states';
import { useAuth } from '@/app/_redux/hooks';

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
          <CreationStates creationId={creation.id} mediaType={mediaType} />
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

interface HorizontalCreationArticle
  extends Omit<BaseArticleProps, 'src' | 'href'> {
  alt: string;
  width: number;
  height: number;
  creation: ICreation;
}

export const HorizontalCreationArticle = memo(
  ({
    creation,
    width,
    height,
    alt,
    className,
    ...props
  }: HorizontalCreationArticle) => {
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
          className='aspect-[16/9] w-[120px] min-w-[120px] rounded-md'
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
      </article>
    );
  }
);

HorizontalCreationArticle.displayName = 'HorizontalCreationArticle';
