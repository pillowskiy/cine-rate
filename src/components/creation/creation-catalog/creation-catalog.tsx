'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ky, { SearchParamsOption } from 'ky';
import type { CreationsResponse } from '#types/creation-types';
import type { IPagination } from '#types/index';
import useInfiniteScroll from '#hooks/useInfiniteScroll';
import type { MediaType } from '#config/enums';
import { initialPagination } from '#config/pagination';
import { CatalogSkeletonGroup } from '#components/skeleton/catalog-skeleton-group';
import { cn } from '#libs/index';
import { CreationCatalogItems } from './creation-catalog-items';

interface CreationCatalogProps extends React.ComponentProps<'div'> {
  mediaType: MediaType;
}

async function getCreationDiscover(
  mediaType: MediaType,
  searchParams: SearchParamsOption
) {
  return ky
    .get(`/api/${mediaType}/discover`, { searchParams })
    .json<CreationsResponse>();
}

export function CreationCatalog({
  mediaType,
  className,
  ...props
}: CreationCatalogProps) {
  const [items, setItems] = useState<CreationsResponse['results'] | null>(null);
  const [pagination, setPagination] = useState<IPagination>(initialPagination);
  const searchParamsMap = useSearchParams();
  const searchParamsObj = Object.fromEntries(searchParamsMap.entries());

  const getData = async (page: number = pagination.currentPage + 1) => {
    const searchParams = { page, ...searchParamsObj };
    return getCreationDiscover(mediaType, searchParams).then((data) => {
      setItems((prev) => [...(prev ?? []), ...data.results]);
      setPagination((prev) => ({ ...prev, currentPage: data.page }));
    });
  };

  useEffect(() => {
    setPagination(initialPagination);
    setItems([]);
    window.scrollTo(0, 0);
    getData(initialPagination.currentPage + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsMap]);

  const { canScroll } = useInfiniteScroll(getData, pagination.currentPage);

  return (
    <section
      className={cn(
        'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
        className
      )}
      {...props}
    >
      <CreationCatalogItems mediaType={mediaType} items={items} />
      {!canScroll && <CatalogSkeletonGroup />}
    </section>
  );
}
