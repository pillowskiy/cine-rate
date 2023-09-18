'use client';

import { type HTMLAttributes, useEffect, useState } from 'react';
import type { IPagination } from '@app/types/index';
import type { CelebritiesResponse } from '@app/types/person-types';
import { PersonArticle } from '@components/article/person-article';
import { CatalogSkeletonGroup } from '@components/catalog-skeleton-group';
import { initialPagination } from '@config/pagination';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { cn } from '@libs/index';
import axios from 'axios';

type Celebrities = CelebritiesResponse['results'];

interface CreationCatalogProps extends HTMLAttributes<HTMLDivElement> {}

export function CelebrityCatalog({
  className,
  ...props
}: CreationCatalogProps) {
  const [items, setItems] = useState<Celebrities | null>(null);
  const [{ currentPage }, setPagination] =
    useState<IPagination>(initialPagination);

  const fetch = async () => {
    const params = {
      page: currentPage + 1,
    };
    return axios
      .get<CelebritiesResponse>('api/celebrities', { params })
      .then(({ data }) => {
        setItems((prev) => [...(prev || []), ...data.results]);
        setPagination((prev) => ({ ...prev, currentPage: data.page }));
      })
      .catch(() => setItems(null));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => void fetch(), []);
  const { canScroll } = useInfiniteScroll(fetch, currentPage);

  function handleItems() {
    if (!items) return <CatalogSkeletonGroup itemsCount={20} />;

    return items.map((celebrity) => (
      <PersonArticle
        key={celebrity.id}
        celebrity={celebrity}
        className='mb-4 w-[40%] flex-grow md:w-[260px]'
      />
    ));
  }

  return (
    <section className={cn('flex flex-wrap gap-4', className)} {...props}>
      {handleItems()}
      {!canScroll && <CatalogSkeletonGroup />}
    </section>
  );
}
