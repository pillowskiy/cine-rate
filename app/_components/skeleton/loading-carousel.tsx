import { ScrollArea, ScrollBar } from '@ui/scroll-area';
import { SkeletonArticle, type SkeletonArticleProps } from './skeleton-article';
import { HeadingSkeleton } from './heading-skeleton';
import { cn } from '@libs/index';

interface LoadingCarouselProps extends SkeletonArticleProps {
  withHeading?: boolean;
}

export function LoadingCarousel({
  withHeading = true,
  className,
  aspect,
  ...props
}: LoadingCarouselProps) {
  return (
    <section>
      {withHeading && <HeadingSkeleton />}
      <ScrollArea>
        <section className={cn('flex snap-x space-x-4 pb-4', className)}>
          {Array.from({ length: 10 }, (_, index) => (
            <SkeletonArticle
              className={cn(
                aspect === 'horizontal' ? 'w-[260px]' : 'w-[160px] sm:w-[260px]'
              )}
              key={index}
              aspect={aspect}
              {...props}
            />
          ))}
        </section>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </section>
  );
}
