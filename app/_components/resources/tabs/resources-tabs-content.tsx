'use client';

import { useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import type { CreationsResponse } from '@app/types/creation-types';
import type { IPagination } from '@app/types/index';

import useInfiniteScroll from '@hooks/useInfiniteScroll';

import { MediaType, ResourceTarget, ResourceType } from '@config/enums';
import { initialPagination } from '@config/pagination';

import { TabsContent } from '@ui/tabs';

import { HorizontalCreationArticle } from '@components/article/creation-article';
import { NotFound } from '@components/not-found';
import { CatalogSkeletonGroup } from '@components/skeleton/catalog-skeleton-group';

import { getResources } from './action';

type Items = CreationsResponse['results'] | null;

interface ResourcesTabsContentProps {
  resourceType: ResourceType;
  target: ResourceTarget;
}

const mediaTypes = {
  [ResourceType.Movie]: MediaType.Movie,
  [ResourceType.TV]: MediaType.TV,
} as const;

// TEMP
function HandleItems({
  items,
  defaultMediaType,
}: {
  items: Items;
  defaultMediaType: MediaType;
}) {
  if (!items) return <CatalogSkeletonGroup itemsCount={20} />;
  if (!items.length) return <NotFound />;

  return items.map(
    (creation) =>
      defaultMediaType && (
        <Link
          key={creation.id}
          href={`/${defaultMediaType}/${creation.id}`}
          legacyBehavior
          passHref
        >
          <HorizontalCreationArticle
            defaultMediaType={defaultMediaType}
            className='border'
            creation={creation}
            alt='Series Backdrop'
            width={260}
            height={190}
            withStates
          />
        </Link>
      )
  );
}

export default function ResourcesTabsContent({
  resourceType,
  target,
}: ResourcesTabsContentProps) {
  const [items, setItems] = useState<Items>(null);
  const [{ currentPage, totalPages }, setPagination] =
    useState<IPagination>(initialPagination);

  const searchParamsMap = useSearchParams();
  const searchParamsObj = useMemo(
    () => Object.fromEntries(searchParamsMap.entries()),
    [searchParamsMap]
  );

  const fetch = async (page: number = currentPage) => {
    return getResources(resourceType, target, {
      page: page + 1,
      ...searchParamsObj,
    }).then((data) => {
      setItems((prev) => [...(prev || []), ...data.results]);
      setPagination((prev) => ({ ...prev, currentPage: data.page }));
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => void fetch(), []);

  const stopped = currentPage && currentPage >= totalPages;
  const { canScroll } = useInfiniteScroll(fetch, currentPage, !!stopped);

  return (
    <TabsContent className='flex flex-wrap gap-4' value={resourceType}>
      <HandleItems defaultMediaType={mediaTypes[resourceType]} items={items} />
      {!!items?.length && !canScroll && <CatalogSkeletonGroup />}
    </TabsContent>
  );
}
