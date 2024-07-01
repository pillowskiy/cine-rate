'use client';

import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { ReviewResponse } from '@/app/_types/review-types';
import ky from 'ky';

import { ReviewCard } from '@components/card/review-card';
import { NotFound } from '@components/not-found';

import type { CreationIdentifierProps } from '../common/types';
import { PaginationActionType, PaginationContext } from './common/utils';

export function CreationReviewsCatalog({
  creationId,
  mediaType,
}: CreationIdentifierProps) {
  const [data, setData] = useState<ReviewResponse | null>(null);
  const [state, dispatch] = useContext(PaginationContext);
  const catalogRef = useRef<HTMLDivElement>(null);

  const scrollToCatalog = useCallback(() => {
    const offsetTop = catalogRef.current?.offsetTop;
    if (offsetTop)
      window.scrollTo({ top: offsetTop - 150, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    ky.get(`/api/${mediaType}/${creationId}/reviews`, {
      searchParams: {
        page: state.page,
      },
      cache: 'force-cache',
    })
      .then((res) => res.json<ReviewResponse>())
      .then((data) => {
        if (!state.totalPages) {
          dispatch({
            type: PaginationActionType.SetTotalPages,
            payload: data.total_pages,
          });
        }
        setData(data);
        scrollToCatalog();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.page]);

  // TEMP: transition to loading component
  if (!data) return null;

  if (!data.results?.length) {
    return <NotFound />;
  }

  return (
    <section ref={catalogRef} className='space-y-4'>
      {data.results.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </section>
  );
}
