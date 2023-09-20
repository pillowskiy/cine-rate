import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@libs/index';
import { Button } from '@ui/button';
import { ImageFromPath } from '../image/image-from-path';

export interface BaseArticleProps extends HTMLAttributes<HTMLDivElement> {}

export function BaseArticle({
  className,
  children,
  ...props
}: BaseArticleProps) {
  return (
    <article
      className={cn(
        'relative snap-center space-y-2 group-hover:opacity-0',
        className
      )}
      {...props}
    >
      {children}
    </article>
  );
}

interface BaseArticleContentProps extends HTMLAttributes<HTMLDivElement> {}

export function BaseArticleContent({
  children,
  ...props
}: BaseArticleContentProps) {
  return (
    <div className='space-y-1' {...props}>
      {children}
    </div>
  );
}

interface ActionButton {
  Image: ReactNode;
}

export interface BaseArticleFigureProps {
  className?: string;
  size?: 'default' | 'sm';
  height: number;
  width: number;
  alt: string;
  src: string | null;

  aspect?: 'vertical' | 'horizontal';

  actionButtons?: ReturnType<typeof Button>[];
}

export function BaseArticleFigure({
  className,
  height,
  width,
  alt,
  src,
  aspect = 'vertical',
}: BaseArticleFigureProps) {
  return (
    <figure className='relative overflow-hidden rounded-md'>
      <div
        className={cn(
          'w-full',
          aspect === 'vertical' ? 'aspect-[2/3]' : 'aspect-[16/9]',
          className
        )}
      >
        <ImageFromPath
          className={cn(
            'h-full w-auto object-cover transition-all ease-in-out hover:scale-105',
          )}
          height={height}
          width={width}
          alt={alt}
          src={src}
        />
      </div>
    </figure>
  );
}
