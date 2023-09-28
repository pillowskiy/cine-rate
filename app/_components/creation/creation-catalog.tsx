'use client';

import { type HTMLAttributes, useEffect, useState, useMemo } from 'react';
import type { CreationsResponse } from '@app/types/creation-types';
import type { IPagination } from '@app/types/index';
import type { MediaType } from '@config/enums';
import { CreationArticle } from '@components/article/creation-article';
import { CatalogSkeletonGroup } from '@components/catalog-skeleton-group';
import { NotFound } from '@components/not-found';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { cn } from '@libs/index';
import axios from 'axios';
import { initialPagination } from '@config/pagination';
import { useSearchParams } from 'next/navigation';

interface CreationCatalogProps extends HTMLAttributes<HTMLDivElement> {
  mediaType: MediaType;
}

export default function CreationCatalog({
  mediaType,
  className,
  ...props
}: CreationCatalogProps) {
  const [items, setItems] = useState<CreationsResponse['results'] | null>(null);
  const [{ currentPage }, setPagination] =
    useState<IPagination>(initialPagination);
  const searchParams = useSearchParams();
  const searchParamsObj = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  const fetch = async (page: number = currentPage + 1) => {
    const params = {
      mediaType,
      page,
      ...searchParamsObj,
    };
    return axios
      .get<CreationsResponse>('api/discover', { params })
      .then(({ data }) => {
        setItems((prev) => [...(prev || []), ...data.results]);
        setPagination((prev) => ({ ...prev, currentPage: data.page }));
      });
  };

  useEffect(() => {
    setItems(null);
    void fetch(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsObj]);
  const { canScroll } = useInfiniteScroll(fetch, currentPage);

  function handleItems() {
    if (!items) return <CatalogSkeletonGroup itemsCount={20} />;
    if (!items.length) return <NotFound />;

    return items.map((movie) => (
      <CreationArticle
        defaultMediaType={mediaType}
        key={movie.id}
        creation={movie}
        className='mb-4 w-[40%] flex-grow md:w-[260px]'
        width={260}
        height={390}
      />
    ));
  }

  return (
    <section className={cn('flex flex-wrap gap-4', className)} {...props}>
      {handleItems()}
      {!!items?.length && !canScroll && <CatalogSkeletonGroup />}
    </section>
  );
}
