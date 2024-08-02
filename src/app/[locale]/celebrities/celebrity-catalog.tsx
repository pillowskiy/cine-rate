'use client';

import { ComponentProps, useEffect, useState } from 'react';
import ky, { SearchParamsOption } from 'ky';
import type { IPagination } from '#types/index';
import type { CelebritiesResponse } from '#types/person-types';
import useInfiniteScroll from '#hooks/useInfiniteScroll';
import { initialPagination } from '#config/pagination';
import { CatalogSkeletonGroup } from '#components/skeleton/catalog-skeleton-group';
import { cn } from '#libs/index';
import { CelebrityCatalogItems } from './celebrity-catalog-items';

type Celebrities = CelebritiesResponse['results'];

function getCelebrities(searchParams: SearchParamsOption) {
  return ky
    .get('/api/celebrities', { searchParams, cache: 'force-cache' })
    .json<CelebritiesResponse>();
}

interface CreationCatalogProps extends ComponentProps<'div'> {}

export function CelebrityCatalog({
  className,
  ...props
}: CreationCatalogProps) {
  const [items, setItems] = useState<Celebrities | null>(null);
  const [pagination, setPagination] = useState<IPagination>(initialPagination);

  const getData = async () => {
    const searchParams = {
      page: pagination.currentPage + 1,
    };
    return getCelebrities(searchParams)
      .then((data) => {
        setItems((prev) => [...(prev || []), ...data.results]);
        setPagination((prev) => ({ ...prev, currentPage: data.page }));
      })
      .catch(() => setItems(null));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => void getData(), []);
  const { canScroll } = useInfiniteScroll(getData, pagination.currentPage);

  return (
    <section
      className={cn(
        'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
        className
      )}
      {...props}
    >
      <CelebrityCatalogItems items={items} />
      {!!items?.length && !canScroll && <CatalogSkeletonGroup />}
    </section>
  );
}
