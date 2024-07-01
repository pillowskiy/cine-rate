import Link from 'next/link';
import type { IDetailedCollection } from '@app/types/collection-types';
import { Button } from '@ui/button';
import { cn } from '@libs/index';
import { buildImagePath } from '@libs/tmdb';
import {
  BaseArticle,
  BaseArticleFigure,
  type BaseArticleProps,
} from './base-article';

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
        <h2 className='truncate text-xl font-semibold tracking-tight sm:text-2xl'>
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
