'use client';

import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@libs/index';
import { Button } from '@ui/button';
import { ImageFromPath } from '@components/image/image-from-path';
import { motion, HTMLMotionProps } from 'framer-motion';
import { xTransitionAnimations, Target } from '@config/animations';

export interface BaseArticleProps extends HTMLMotionProps<'article'> {}

export function BaseArticle({
  custom,
  className,
  children,
  variants = xTransitionAnimations,
  ...props
}: BaseArticleProps) {
  return (
    <motion.article
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
    </motion.article>
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
          'w-full h-auto',
          aspect === 'vertical' ? 'aspect-[2/3]' : 'aspect-[16/9]',
          className
        )}
      >
        <ImageFromPath
          className={cn(
            'h-full w-auto object-cover transition-all ease-in-out hover:scale-105'
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
