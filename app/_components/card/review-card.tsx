import { CalendarDays, Star } from 'lucide-react';

import type { IReview } from '@app/types/review-types';

import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { UserAvatar } from '../user-avatar';

interface ReviewCardProps {
  review: IReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card>
      <CardContent className='flex space-x-4 p-4'>
        <UserAvatar
          path={review.author_details.avatar_path}
          username={review.author}
        />
        <div className='w-full space-y-1 overflow-hidden'>
          <div>
            <h5 className='font-semibold leading-none'>{review.author}</h5>
            <span className='text-muted-foreground/70 text-xs leading-none'>
              {review.author_details.username}
            </span>
          </div>

          <p className='break-words text-sm'>
            {/* TEMP: transition to accordion component */}
            {review.content.split(' ').slice(0, 100).join(' ')}
          </p>

          <div className='text-muted-foreground/70 [&>*]: mt-auto flex items-center gap-2 truncate pt-2 text-xs'>
            {review.author_details.rating && (
              <Badge className='text-yellow-500' variant='secondary'>
                <Star className='mr-1.5 size-4 fill-yellow-500' />
                <span className='select-none pr-0.5'>
                  {review.author_details.rating.toFixed(1)}
                </span>
              </Badge>
            )}

            <div className='ml-auto flex items-center'>
              <CalendarDays className='mr-1.5 size-4' />
              <span>
                Created {new Date(review.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
