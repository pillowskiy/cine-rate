'use client';

import { useReducer } from 'react';
import type { CreationIdentifierProps } from '../common/types';
import { Heading } from '@components/heading';
import { MSeparator } from '@ui/separator';
import { CreationReviewsPagination } from './creation-reviews-pagination';
import { CreationReviewsCatalog } from './creation-reviews-catalog';
import {
  PaginationContext,
  initialPaginationState,
  paginationReducer,
} from './common/utils';

export default function CreationReviews({
  creationId,
  mediaType,
}: CreationIdentifierProps) {
  const reducer = useReducer(paginationReducer, initialPaginationState);

  return (
    <section className='space-y-4'>
      <Heading
        title='Creation Reviews'
        description='Craft reviews, inspire others'
      />
      <MSeparator />

      <PaginationContext.Provider value={reducer}>
        <CreationReviewsCatalog
          creationId={creationId}
          mediaType={mediaType}
        />
        <CreationReviewsPagination />
      </PaginationContext.Provider>
    </section>
  );
}
