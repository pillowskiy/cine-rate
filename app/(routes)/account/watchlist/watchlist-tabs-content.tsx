'use client';

import { useEffect, useMemo, useState } from 'react';

import type { IPagination } from '@app/types/index';
import type { CreationsResponse } from '@app/types/creation-types';
import type { ResourceType } from '@config/enums';

import { TabsContent } from '@ui/tabs';
import { HorizontalCreationArticle } from '@components/article/creation-article';
import { CatalogSkeletonGroup } from '@components/skeleton/catalog-skeleton-group';
import { NotFound } from '@components/not-found';


import { getWatchlist } from './action';
import { useSearchParams } from 'next/navigation';
import { initialPagination } from '@config/pagination';
import useInfiniteScroll from '@hooks/useInfiniteScroll';

type Items = CreationsResponse['results'] | null;

interface WatchlistTabsContentProps {
  resourceType: ResourceType;
}

// TEMP
function HandleItems({ items }: { items: Items }) {
  if (!items) return <CatalogSkeletonGroup itemsCount={20} />;
  if (!items.length) return <NotFound />;

  return items.map((movie) => (
    <HorizontalCreationArticle
      className='border'
      key={movie.id}
      creation={movie}
      alt='Series Backdrop'
      width={260}
      height={190}
    />
  ));
}

export default function WatchlistTabsContent({
  resourceType,
}: WatchlistTabsContentProps) {
  const [items, setItems] = useState<Items>(null);
  const [{ currentPage, totalPages }, setPagination] =
    useState<IPagination>(initialPagination);

  const searchParamsMap = useSearchParams();
  const searchParamsObj = useMemo(
    () => Object.fromEntries(searchParamsMap.entries()),
    [searchParamsMap]
  );

  const fetch = async (page: number = currentPage) => {
    return getWatchlist(resourceType, {
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
      <HandleItems items={items} />
      {!!items?.length && !canScroll && <CatalogSkeletonGroup />}
    </TabsContent>
  );
}
