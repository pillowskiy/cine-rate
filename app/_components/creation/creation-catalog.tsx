'use client';

import { type HTMLAttributes, useEffect, useState, useMemo } from 'react';
import type { CreationsResponse } from '@app/types/creation-types';
import type { IPagination, MediaType } from '@app/types/index';
import { Loader } from 'lucide-react';
import { CreationArticle } from '@components/article/creation-article';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { cn } from '@libs/index';
import axios from 'axios';
import { initialPagination } from '@/app/_config/pagination';
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
  const [pagination, setPagination] = useState<IPagination>(initialPagination);
  const searchParams = useSearchParams();
  const searchParamsObj = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);

  const fetch = async (page: number = pagination.currentPage + 1) => {
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
  const { canScroll } = useInfiniteScroll(fetch, pagination.currentPage);

  // TEMP
  if (!items) return null;

  return (
    <section className={cn('flex flex-wrap gap-4', className)} {...props}>
      {items.map((movie) => (
        <CreationArticle
          key={movie.id}
          creation={movie}
          className='mb-4 w-[40%] flex-grow md:w-[260px]'
          width={260}
          height={390}
        />
      ))}
      {!canScroll && (
        <div className='p-4 w-full grid place-items-center'>
            <Loader className='w-16 h-16 animate-spin' />
        </div>
      )}
    </section>
  );
}
