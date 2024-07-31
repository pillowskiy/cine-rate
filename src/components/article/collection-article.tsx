import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { IDetailedCollection } from '#types/collection-types';
import { Button } from '#ui/button';
import { cn } from '#libs/index';
import { buildImagePath } from '#libs/tmdb';
import {
  BaseArticle,
  BaseArticleContent,
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
  const t = useTranslations('Articles.CollectionArticle');

  return (
    <BaseArticle
      className={cn('flex w-full items-center sm:gap-4', className)}
      {...props}
    >
      <BaseArticleFigure
        className='hidden w-[120px] min-w-[120px] sm:block'
        src={buildImagePath({
          path: collection.poster_path,
          scale: 'poster',
        })}
        aspect='vertical'
        width={120}
        height={180}
        alt='Collection Poster'
      />
      <BaseArticleContent className='w-full space-y-4 sm:w-max'>
        <h2 className='truncate text-xl font-semibold tracking-tight sm:text-2xl'>
          {collection.name}
        </h2>
        <p className='max-w-lg text-balance break-words text-sm md:text-base'>
          {collection.overview}
        </p>

        <Link href={`/collection/${collection.id}`} passHref legacyBehavior>
          <Button>{t('viewCollection')}</Button>
        </Link>
      </BaseArticleContent>
    </BaseArticle>
  );
}
