import { ComponentProps } from 'react';
import { cn } from '@/app/_libs';
import { BaseArticleFigureProps } from '../article/base-article';
import { Skeleton } from '../ui/skeleton';

export interface SkeletonArticleProps extends ComponentProps<'article'> {
  aspect?: BaseArticleFigureProps['aspect'];
}

export function SkeletonArticle({
  className,
  aspect = 'vertical',
  ...props
}: SkeletonArticleProps) {
  return (
    <article className={cn('space-y-2', className)} {...props}>
      <Skeleton
        className={cn(
          'h-auto w-full',
          aspect === 'vertical' ? 'aspect-[2/3]' : 'aspect-[16/9]'
        )}
      />
      <div className='space-y-1'>
        <Skeleton className='h-5' />
        <div className='flex items-center justify-between gap-4'>
          <Skeleton className='h-4 w-[32px]' />
          <Skeleton className='h-4 w-[96px]' />
        </div>
      </div>
    </article>
  );
}
