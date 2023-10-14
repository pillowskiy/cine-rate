'use client';

import { type ComponentProps, useEffect, useState, useMemo } from 'react';
import type { CreationsResponse } from '@app/types/creation-types';
import type { IPagination } from '@app/types/index';
import type { MediaType } from '@config/enums';
import { CreationArticle } from '@components/article/creation-article';
import { CatalogSkeletonGroup } from '@components/skeleton/catalog-skeleton-group';
import { NotFound } from '@components/not-found';
import { cn } from '@libs/index';
import { initialPagination } from '@config/pagination';
import { useSearchParams } from 'next/navigation';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import ky from 'ky';

interface CreationCatalogProps extends ComponentProps<'div'> {
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
  const searchParamsMap = useSearchParams();
  const searchParamsObj = useMemo(
    () => Object.fromEntries(searchParamsMap.entries()),
    [searchParamsMap]
  );

  const getData = async (page: number = currentPage + 1) => {
    const searchParams = {
      mediaType,
      page,
      ...searchParamsObj,
    };
    return ky
      .get('api/discover', { searchParams, cache: 'force-cache' })
      .then((res) => res.json<CreationsResponse>())
      .then((data) => {
        setItems((prev) => [...(prev || []), ...data.results]);
        setPagination((prev) => ({ ...prev, currentPage: data.page }));
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => void getData(), [searchParamsObj]);
  const { canScroll } = useInfiniteScroll(getData, currentPage);

  function handleItems() {
    if (!items) return <CatalogSkeletonGroup itemsCount={20} />;
    if (!items.length) return <NotFound />;

    return items.map((movie) => (
      <CreationArticle
        variants={{}}
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
