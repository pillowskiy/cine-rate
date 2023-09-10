'use client';

import { type HTMLAttributes, useEffect, useState } from 'react';
import type { IPagination } from '@app/types/index';
import type { CelebritiesResponse } from '@app/types/person-types';
import { PersonArticle } from '@components/article/person-article';
import { initialPagination } from '@config/pagination';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { cn } from '@libs/index';
import axios from 'axios';
import { Loader } from 'lucide-react';

type Celebrities = CelebritiesResponse['results'];

interface CreationCatalogProps extends HTMLAttributes<HTMLDivElement> {}

export function CelebrityCatalog({
  className,
  ...props
}: CreationCatalogProps) {
  const [items, setItems] = useState<Celebrities | null>(null);
  const [pagination, setPagination] = useState<IPagination>(initialPagination);

  const fetch = async () => {
    const params = {
      page: pagination.currentPage + 1,
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
  const { canScroll } = useInfiniteScroll(fetch, pagination.currentPage);

  // TEMP
  if (!items) return null;

  return (
    <section className={cn('flex flex-wrap gap-4', className)} {...props}>
      {items.map((celebrity) => (
        <PersonArticle
          key={celebrity.id}
          celebrity={celebrity}
          className='mb-4 w-[40%] flex-grow md:w-[260px]'
        />
      ))}
      {!canScroll && (
        <div className='grid w-full place-items-center p-4'>
          <Loader className='h-16 w-16 animate-spin' />
        </div>
      )}
    </section>
  );
}
