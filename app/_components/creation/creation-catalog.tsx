'use client';

import { type HTMLAttributes, useEffect, useState } from 'react';
import type { CreationsResponse } from '@app/types/creation-types';
import type { MediaType } from '@app/types/index';
import { Loader } from 'lucide-react';
import { CreationArticle } from '@components/article/creation-article';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { cn } from '@libs/index';
import axios from 'axios';

interface CreationCatalogProps extends HTMLAttributes<HTMLDivElement> {
  mediaType: MediaType;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
}

const initialPagination = {
  currentPage: 0,
  totalPages: 0,
};

export default function CreationCatalog({
  mediaType,
  className,
  ...props
}: CreationCatalogProps) {
  const [items, setItems] = useState<CreationsResponse['results']>([]);
  const [pagination, setPagination] = useState<Pagination>(initialPagination);

  const fetch = async () => {
    const params = {
      mediaType,
      page: pagination.currentPage + 1,
    };
    return axios
      .get<CreationsResponse>('api/discover', { params })
      .then(({ data }) => {
        setItems((prev) => [...prev, ...data.results]);
        setPagination((prev) => ({ ...prev, currentPage: data.page }));
      });
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { ref, canScroll } = useInfiniteScroll(fetch, pagination.currentPage);

  // TEMP
  if (!items.length) return null;

  return (
    <section ref={ref} className={cn('flex gap-4', className)} {...props}>
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
