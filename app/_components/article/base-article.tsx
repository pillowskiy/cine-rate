'use client';

import type { ComponentProps } from 'react';

import type { ImageProps } from 'next/image';

import { HTMLMotionProps, m } from 'framer-motion';

import { Target, xTransitionAnimations } from '@config/animations';

import { Button } from '@ui/button';

import { ImageFromPath } from '@components/image/image-from-path';

import { cn } from '@libs/index';

export interface BaseArticleProps extends HTMLMotionProps<'article'> {}

export function BaseArticle({
  custom,
  className,
  children,
  variants = xTransitionAnimations,
  ...props
}: BaseArticleProps) {
  return (
    <m.article
      viewport={{ once: true }}
      initial={Target.HIDDEN}
      whileInView={Target.VISIBLE}
      variants={variants}
      className={cn(
        'relative snap-center space-y-2 group-hover:opacity-0',
        className
      )}
      {...props}
    >
      {children}
    </m.article>
  );
}

interface BaseArticleContentProps extends ComponentProps<'div'> {}

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

export interface BaseArticleFigureProps extends Omit<ImageProps, 'src'> {
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
  loading = 'lazy',
  aspect = 'vertical',
  ...props
}: BaseArticleFigureProps) {
  return (
    <figure className='relative overflow-hidden rounded-md'>
      <div
        className={cn(
          'h-full w-auto',
          aspect === 'vertical' ? 'aspect-[2/3]' : 'aspect-[16/9]',
          className
        )}
      >
        <ImageFromPath
          className='h-auto w-full object-cover transition-all ease-in-out hover:scale-105'
          height={height}
          width={width}
          alt={alt}
          src={src}
          loading={loading}
          {...props}
        />
      </div>
    </figure>
  );
}
