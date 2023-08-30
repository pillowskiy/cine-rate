import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@libs/index';
import Image from 'next/image';
import { Button } from '@ui/button';
import { Image as FallbackIcon } from 'lucide-react';
import { ImageFromPath } from '../image/ImageFromPath';

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

  actionButtons?: ActionButton[];
}

export function BaseArticleFigure({
  className,
  height,
  width,
  alt,
  src,
  aspect = 'vertical',
  actionButtons,
}: BaseArticleFigureProps) {
  return (
    <figure className={cn('relative overflow-hidden rounded-md')}>
      <div
        className={cn(
          'w-full',
          aspect === 'vertical' ? 'aspect-[2/3]' : 'aspect-[16/9]'
        )}
      >
        <ImageFromPath
          className={cn(
            'h-full w-auto object-cover transition-all ease-in-out hover:scale-105',
            className
          )}
          height={height}
          width={width}
          alt={alt}
          src={src}
        />
      </div>
      <div className='absolute bottom-2 right-2 flex gap-2'>
        {actionButtons &&
          actionButtons.map((button, index) => (
            <Button
              key={index}
              className='h-7 w-7 opacity-60 transition-all hover:opacity-100'
              size='icon'
              variant='outline'
            >
              {button.Image}
            </Button>
          ))}
      </div>
    </figure>
  );
}
