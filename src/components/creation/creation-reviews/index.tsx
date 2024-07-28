'use client';

import { useTranslations } from 'next-intl';
import { TitledSection } from '#components/section/titled';
import type { CreationIdentifierProps } from '../common/types';
import { PaginationContext, usePaginationReducer } from './common/hooks';
import { CreationReviewsCatalog } from './creation-reviews-catalog';
import { CreationReviewsPagination } from './creation-reviews-pagination';

export default function CreationReviews({
  creationId,
  mediaType,
}: CreationIdentifierProps) {
  const t = useTranslations('Creations.CreationReviews');
  const reducer = usePaginationReducer();

  return (
    <TitledSection title={t('title')} subTitle={t('description')}>
      <PaginationContext.Provider value={reducer}>
        <CreationReviewsCatalog creationId={creationId} mediaType={mediaType} />
        <CreationReviewsPagination />
      </PaginationContext.Provider>
    </TitledSection>
  );
}
