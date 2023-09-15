import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from '@ui/dialog';
import { ReactNode } from 'react';
import type { CreationIdentifierProps } from './common/types';
import { getCreationReviews } from '@/app/_shared/actions/getCreationReviews';
import { ReviewCard } from '../card/review-card';

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
        <div className='space-y-4 overflow-y-auto md:max-h-[400px] px-6'>
          {reviews?.results.length && reviews.results.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
