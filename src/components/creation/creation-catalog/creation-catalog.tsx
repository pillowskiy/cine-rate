'use client';

import { ComponentProps, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ky from 'ky';
import type { CreationsResponse } from '#types/creation-types';
import type { IPagination } from '#types/index';
import useInfiniteScroll from '#hooks/useInfiniteScroll';
import type { MediaType } from '#config/enums';
import { initialPagination } from '#config/pagination';
import { CatalogSkeletonGroup } from '#components/skeleton/catalog-skeleton-group';
import { cn } from '#libs/index';
import { CreationCatalogItems } from './creation-catalog-items';

interface CreationCatalogProps extends ComponentProps<'div'> {
  mediaType: MediaType;
}

export function CreationCatalog({
  mediaType,
  className,
  ...props
}: CreationCatalogProps) {
  const [items, setItems] = useState<CreationsResponse['results'] | null>(null);
  const [{ currentPage }, setPagination] =
    useState<IPagination>(initialPagination);
  const searchParamsMap = useSearchParams();
  const searchParamsObj = Object.fromEntries(searchParamsMap.entries());

  const getData = async (page: number = currentPage + 1) => {
    const searchParams = { page, ...searchParamsObj };
    return ky
      .get(`/api/${mediaType}/discover`, { searchParams })
      .then((res) => res.json<CreationsResponse>())
      .then((data) => {
        setItems((prev) => [...(prev || []), ...data.results]);
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

  const { canScroll } = useInfiniteScroll(getData, currentPage);

  return (
    <section
      className={cn(
        'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
        className
      )}
      {...props}
    >
      <CreationCatalogItems mediaType={mediaType} items={items} />
      {!!items?.length && !canScroll && <CatalogSkeletonGroup />}
    </section>
  );
}
