import { ComponentProps } from 'react';
import { Skeleton } from '@ui/skeleton';
import { cn } from '@libs/index';

interface TextSkeletonProps extends ComponentProps<'section'> {
  blocksCount?: number;
}

function getRandomWidth() {
  return Math.random() * 50 + '%';
}

export function TextSkeleton({
  blocksCount = 10,
  className,
  ...props
}: TextSkeletonProps) {
  return (
    <section className={cn('flex flex-wrap gap-2', className)} {...props}>
      {Array.from({ length: blocksCount }, (_, i) => (
        <Skeleton
          key={i}
          className='h-4 sm:h-5'
          style={{ minWidth: getRandomWidth() }}
        />
      ))}
    </section>
  );
}
