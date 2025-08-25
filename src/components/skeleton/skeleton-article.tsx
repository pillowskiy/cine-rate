import { ComponentProps } from 'react';
import { cn } from '#libs/index';
import { BaseArticleFigureProps } from '../article/base-article';
import { Skeleton } from '../ui/skeleton';

export interface SkeletonArticleProps extends ComponentProps<'article'> {
  aspect?: BaseArticleFigureProps['aspect'];
  withText?: boolean;
}

export function SkeletonArticle({
  className,
  aspect = 'vertical',
  withText = true,
  ...props
}: SkeletonArticleProps) {
  return (
    <article className={cn('space-y-2', className)} {...props}>
      <Skeleton
        className={cn(
          'h-auto w-full',
          aspect === 'vertical' ? 'aspect-2/3' : 'aspect-video'
        )}
      />
      {withText && (
        <>
          <Skeleton
            style={{ width: `${Math.random() * 100}%` }}
            className='mb-1 h-5 min-w-[96px]'
          />
          <div className='flex items-center justify-between gap-4'>
            <Skeleton className='h-4 w-[32px]' />
            <Skeleton className='h-4 w-[96px]' />
          </div>
        </>
      )}
    </article>
  );
}
