import type { ReactNode } from 'react';
import type { CreationIdentifierProps } from './common/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from '@ui/dialog';
import { ReviewCard } from '@components/card/review-card';
import { NotFound } from '@components/not-found';
import { getCreationReviews } from '@/app/_shared/actions/getCreationReviews';

interface CreationReviewsDialog extends CreationIdentifierProps {
  children: ReactNode;
}

export async function CreationReviewsDialog({
  children,
  creationId,
  mediaType,
}: CreationReviewsDialog) {
  const { data: reviews } = await getCreationReviews(
    creationId,
    mediaType
  ).catch(() => ({ data: null }));

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='px-0'>
        <DialogHeader className='px-6'>
          <DialogTitle>Reviews</DialogTitle>
          <DialogDescription>Feedback from our users.</DialogDescription>
        </DialogHeader>
        <div className='min-h-[300px] space-y-4 overflow-y-auto px-6 md:max-h-[400px]'>
          {!!reviews?.results.length ? (
            reviews.results.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <NotFound />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
