'use client';

import { ICreation } from '#types/creation-types';
import { MediaType } from '#config/enums';
import { CreationArticle } from '#components/article/creation-article';
import { NotFound } from '#components/not-found';
import { CatalogSkeletonGroup } from '#components/skeleton/catalog-skeleton-group';

interface CreationCatalogItemsProps {
  mediaType: MediaType;
  items: ICreation[] | null;
}

export function CreationCatalogItems({
  mediaType,
  items,
}: CreationCatalogItemsProps) {
  if (!items) return <CatalogSkeletonGroup itemsCount={20} />;
  if (!items.length) return <NotFound className='col-span-full' />;

  return items.map((creation) => (
    <CreationArticle
      variants={{}}
      defaultMediaType={mediaType}
      key={creation.id}
      creation={creation}
      className='mb-4'
      autoScale={false}
    />
  ));
}
