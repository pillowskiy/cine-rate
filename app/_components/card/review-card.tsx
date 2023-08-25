import type { IReview } from '@app/types/review-types';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CalendarDays } from 'lucide-react';
import { buildImagePath } from '@/app/_libs/tmdb';

interface ReviewCardProps {
  review: IReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className='md:max-w-[600px]'>
      <CardContent className='flex  justify-between space-x-4 p-4'>
        <Avatar>
          <AvatarImage
            src={buildImagePath({ path: review.author_details.avatar_path })}
          />
          <AvatarFallback>
            {review.author
              .split(' ')
              .slice(0, 2)
              .map((str) => str[0].toUpperCase())
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div className='space-y-1'>
          <div>
            <h4 className='text-sm font-semibold leading-none'>
              {review.author}
            </h4>
            <span className='text-xs leading-none text-muted-foreground/70'>
              {review.author_details.username}
            </span>
          </div>
          <p className='text-sm'>
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
