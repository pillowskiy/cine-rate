import type { CreationIdentifierProps } from '../common/types';
import { Heading } from '@components/heading';
import { MSeparator } from '@ui/separator';
import { CreationReviewsPagination } from './creation-reviews-pagination';
import { CreationReviewsCatalog } from './creation-reviews.catalog';

interface CreationReviewsProps extends CreationIdentifierProps {
  page: number;
}

export default function CreationReviews({
  page,
  creationId,
  mediaType,
}: CreationReviewsProps) {
  return (
    <section>
      <Heading
        title='Creation Reviews'
        description='Craft reviews, inspire others'
      />
      <MSeparator className='my-4' />

      <CreationReviewsCatalog
        creationId={creationId}
        mediaType={mediaType}
        page={page}
      />
      <CreationReviewsPagination />
    </section>
  );
}
