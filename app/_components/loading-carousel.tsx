import { ScrollArea, ScrollBar } from '@ui/scroll-area';
import { Separator } from '@ui/separator';
import { Skeleton } from '@ui/skeleton';
import {
  SkeletonArticle,
  type SkeletonArticleProps,
} from './article/skeleton-article';
import { cn } from '@libs/index';

interface LoadingCarouselProps extends SkeletonArticleProps {
  withHeading?: boolean;
}

export function LoadingCarousel({
  withHeading = true,
  className,
  ...props
}: LoadingCarouselProps) {
  return (
    <section>
      {withHeading && (
        <>
          <div className='space-y-2'>
            <Skeleton className='h-8 w-[60%] sm:w-[220px]' />
            <Skeleton className='h-5 w-[90%] sm:w-[360px]' />
          </div>
          <Separator className='my-4' />
        </>
      )}
      <ScrollArea>
        <section className={cn('flex snap-x space-x-4 pb-4', className)}>
          {Array.from({ length: 10 }, (_, index) => (
            <SkeletonArticle
              className='w-[260px]'
              key={index}
              {...props}
            />
          ))}
        </section>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </section>
  );
}
