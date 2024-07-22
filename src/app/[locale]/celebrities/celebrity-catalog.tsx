'use client';

import { ComponentProps, useEffect, useState } from 'react';
import ky from 'ky';
import type { IPagination } from '#types/index';
import type { CelebritiesResponse } from '#types/person-types';
import useInfiniteScroll from '#hooks/useInfiniteScroll';
import { initialPagination } from '#config/pagination';
import { CatalogSkeletonGroup } from '#components/skeleton/catalog-skeleton-group';
import { cn } from '#libs/index';
import { CelebrityCatalogItems } from './celebrity-catalog-items';

type Celebrities = CelebritiesResponse['results'];

interface CreationCatalogProps extends ComponentProps<'div'> {}

export function CelebrityCatalog({
  className,
  ...props
}: CreationCatalogProps) {
  const [items, setItems] = useState<Celebrities | null>(null);
  const [{ currentPage }, setPagination] =
    useState<IPagination>(initialPagination);

  const getData = async () => {
    const searchParams = {
      page: currentPage + 1,
    };
    return ky
      .get('/api/celebrities', { searchParams, cache: 'force-cache' })
      .then((res) => res.json<CelebritiesResponse>())
      .then((data) => {
        setItems((prev) => [...(prev || []), ...data.results]);
        setPagination((prev) => ({ ...prev, currentPage: data.page }));
      })
      .catch(() => setItems(null));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => void getData(), []);
  const { canScroll } = useInfiniteScroll(getData, currentPage);

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
