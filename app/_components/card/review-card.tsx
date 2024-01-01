import type { IReview } from '@app/types/review-types';
import { Card, CardContent } from '../ui/card';
import { CalendarDays } from 'lucide-react';
import { UserAvatar } from '../user-avatar';

interface ReviewCardProps {
  review: IReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className='md:max-w-[600px]'>
      <CardContent className='flex space-x-4 p-4'>
        <UserAvatar
          path={review.author_details.avatar_path}
          username={review.author}
        />
        <div className='space-y-1 overflow-hidden'>
          <div>
            <h4 className='text-sm font-semibold leading-none'>
              {review.author}
            </h4>
            <span className='text-xs leading-none text-muted-foreground/70'>
              {review.author_details.username}
            </span>
          </div>
          <p className='break-words text-sm'>
            {review.content.split(' ').slice(0, 30).join(' ')}
          </p>

          <div className='mt-auto flex items-center pt-2 text-xs text-muted-foreground/70'>
            <CalendarDays className='mr-2 h-4 w-4' />
            <span>
              Created {new Date(review.created_at).toLocaleDateString()}
            </span>
            {review.updated_at !== review.created_at && (
              <span className='ml-auto'>edited</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
