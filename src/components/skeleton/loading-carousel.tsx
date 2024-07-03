import { ScrollArea, ScrollBar } from '#ui/scroll-area';
import { cn } from '#libs/index';
import { SkeletonArticle, type SkeletonArticleProps } from './skeleton-article';

interface LoadingCarouselProps extends SkeletonArticleProps {}

export function LoadingCarousel({
  className,
  aspect,
  ...props
}: LoadingCarouselProps) {
  return (
    <ScrollArea>
      <div className={cn('flex gap-x-4 pb-4', className)}>
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
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
}
