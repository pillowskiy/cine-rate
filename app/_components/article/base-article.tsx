import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@libs/index';
import Image from 'next/image';
import { Button } from '@ui/button';

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

interface BaseArticleContentProps {
  size?: 'default' | 'sm';
  height: number;
  width: number;
  alt: string;
  src: string;

  actionButtons?: ActionButton[];
}

export function BaseArticleFigure({
  className,
  height,
  width,
  alt,
  src,
  actionButtons,
}: BaseArticleContentProps) {
  return (
    <figure className='relative overflow-hidden rounded-md'>
      <Image
        className={cn(
          'object-fit h-auto w-auto transition-all ease-in-out hover:scale-105',
          className
        )}
        height={height}
        width={width}
        alt={alt}
        src={src}
      />
      <div className='absolute right-2 top-2 flex gap-2'>
        {actionButtons &&
          actionButtons.map((button, index) => (
            <Button
              key={index}
              className='h-7 w-7'
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
