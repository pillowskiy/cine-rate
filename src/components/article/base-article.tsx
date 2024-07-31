'use client';

import type { ComponentProps } from 'react';
import type { ImageProps } from 'next/image';
import { HTMLMotionProps, m } from 'framer-motion';
import { Target, xTransitionAnimations } from '#config/animations';
import { Button } from '#ui/button';
import { BaseFigure } from '#components/figure/base-figure';
import { cn } from '#libs/index';

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
  src: string | null;
  aspect?: 'vertical' | 'horizontal';

  actionButtons?: ReturnType<typeof Button>[];
}

export function BaseArticleFigure({
  className,
  loading = 'lazy',
  aspect = 'vertical',
  ...props
}: BaseArticleFigureProps) {
  return (
    <BaseFigure
      className={cn(
        aspect === 'vertical' ? 'aspect-[2/3]' : 'aspect-[16/9]',
        className
      )}
      loading={loading}
      {...props}
    />
  );
}
