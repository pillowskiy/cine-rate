'use client';

import type { ICelebrity } from '#types/person-types';
import { PersonArticle } from '#components/article/person-article';
import { NotFound } from '#components/not-found';
import { CatalogSkeletonGroup } from '#components/skeleton/catalog-skeleton-group';

interface CelebrityCatalogItemsProps {
  items: ICelebrity[] | null;
}

export function CelebrityCatalogItems({ items }: CelebrityCatalogItemsProps) {
  if (!items) return <CatalogSkeletonGroup itemsCount={20} />;
  if (!items.length) return <NotFound className='col-span-full' />;

  return items.map((celebrity, i) => (
    <PersonArticle
      custom={i}
      key={celebrity.id}
      person={celebrity}
      className='mb-4'
      autoScale={false}
    />
  ));
}
