import { MediaType } from '@app/types/index';
import { ReviewCard } from '@components/card/review-card';
import { Separator } from '@ui/separator';
import { getCreationReviews } from '@actions/getCreationReviews';

interface CreationReviewsProps {
  creationId: number;
}

export default async function CreationReviews({
  creationId,
}: CreationReviewsProps) {
  const { data: reviews } = await getCreationReviews(
    creationId,
    MediaType.Movie
  );

  return (
    <section>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Reviews</h2>
          <p className='text-sm text-muted-foreground'>
            Feedback from our users.
          </p>
        </div>
      </div>
      <Separator className='my-4' />
      <div className='space-y-4'>
        {reviews.results.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
