import type { IDetailedCollection } from '@app/types/collection-types';
import type { ReactNode } from 'react';
import { Button } from '@ui/button';
import {
  BaseArticle,
  BaseArticleFigure,
  type BaseArticleProps,
} from './base-article';
import { buildImagePath } from '@libs/tmdb';
import { cn } from '@libs/index';
import Link from 'next/link';

interface CollectionArticle extends BaseArticleProps {
  collection: IDetailedCollection;
}

export function CollectionArticle({
  collection,
  className,
  ...props
}: CollectionArticle) {
  return (
    <BaseArticle
      className={cn('flex w-full items-center sm:gap-4', className)}
      {...props}
    >
      <div>
        <BaseArticleFigure
          className='hidden w-[120px] min-w-[120px] sm:block'
          src={buildImagePath({
            path: collection.poster_path,
            scale: 'poster',
          })}
          aspect='vertical'
          width={320}
          height={550}
          alt='Collection Poster'
        />
      </div>
      <div className='w-full space-y-4 sm:w-max'>
        <h2 className='text-2xl font-semibold tracking-tight'>
          {collection.name}
        </h2>
        <p className='break-words text-sm md:text-base'>
          {collection.overview}
        </p>

        <Link href={`/collection/${collection.id}`} passHref legacyBehavior>
          <Button>View the collection</Button>
        </Link>
      </div>
    </BaseArticle>
  );
}
