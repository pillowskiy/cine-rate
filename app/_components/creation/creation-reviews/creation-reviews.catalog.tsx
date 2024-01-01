import { getCreationReviews } from '@actions/getCreationReviews';
import { ReviewCard } from '@components/card/review-card';
import type { CreationIdentifierProps } from '../common/types';
import { NotFound } from '@components/not-found';

interface CreationReviewsCatalogProps extends CreationIdentifierProps {
  page: number;
}

export async function CreationReviewsCatalog({
  creationId,
  mediaType,
  page = 1,
}: CreationReviewsCatalogProps) {
  const [reviews, error] = await getCreationReviews(creationId, mediaType, {
    page,
  });

  if (error) return null;

  if (!reviews?.results.length) {
    return <NotFound />;
  }

  return (
    <section className='space-y-4'>
      {reviews.results.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </section>
  );
}
