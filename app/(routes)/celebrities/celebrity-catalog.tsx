'use client';

import { type ComponentProps, useEffect, useState } from 'react';
import type { IPagination } from '@app/types/index';
import type { CelebritiesResponse } from '@app/types/person-types';
import { PersonArticle } from '@components/article/person-article';
import { CatalogSkeletonGroup } from '@components/skeleton/catalog-skeleton-group';
import { initialPagination } from '@config/pagination';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { cn } from '@libs/index';
import { fetch } from '@libs/common/fetch';

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
    const params = {
      page: currentPage + 1,
    };
    return fetch<CelebritiesResponse>('api/celebrities', { params })
      .then((data) => {
        setItems((prev) => [...(prev || []), ...data.results]);
        setPagination((prev) => ({ ...prev, currentPage: data.page }));
      })
      .catch(() => setItems(null));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => void getData(), []);
  const { canScroll } = useInfiniteScroll(getData, currentPage);

  function handleItems() {
    if (!items) return <CatalogSkeletonGroup itemsCount={20} />;

    return items.map((celebrity, i) => (
      <PersonArticle
        custom={i}
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
