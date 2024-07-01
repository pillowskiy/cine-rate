'use client';

import { type HTMLMotionProps, m } from 'framer-motion';
import { SearchX } from 'lucide-react';

import { useClientReady } from '@hooks/useClientReady';

import { Target, opacityAnimations } from '@config/animations';

import { cn } from '@libs/index';

interface NotFoundProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  title?: string;
  description?: string;
}

const descriptions = [
  "Where Stuff Goes to Hide: The Mystery of 'There are no items yet.'",
  'The Museum of Nothingness: A Tour of the Void',
  "The Ultimate Minimalist Experience: 'There are no items yet.'",
  'The Great Inventory Vanishing Act: A Comedy in Progress',
  "When Items Play Hide and Seek: 'There are no items yet.' Chronicles",
];

export function NotFound({
  className,
  title,
  description,
  ...props
}: NotFoundProps) {
  const isClientReady = useClientReady();

  /*
   * As one of the ways to fix hydrating errors
   * https://stackoverflow.com/questions/75726866
   */
  if (!isClientReady) return null;

  return (
    <m.div
      viewport={{ once: true, amount: 0.2 }}
      initial={Target.HIDDEN}
      whileInView={Target.VISIBLE}
      variants={opacityAnimations}
      className={cn(
        'relative mt-8 grid min-h-[200px] w-full select-none place-items-center gap-4 rounded-md p-8',
        className
      )}
      {...props}
    >
      <SearchX className='size-10 shadow-red-500 drop-shadow-md' />
      <div className='text-center'>
        <h2 className='text-xl font-semibold tracking-tight sm:text-2xl'>
          {title || 'There are no items yet ;('}
        </h2>
        <p className='text-muted-foreground text-xs sm:text-sm'>
          {description || descriptions[~~(Math.random() * descriptions.length)]}
        </p>
      </div>

      <div className='absolute inset-0 -z-10 size-full'>
        <div className='absolute left-[47%] top-1/4 size-[24px] -translate-x-[50%] animate-pulse rounded-full bg-orange-400 blur-xl sm:size-[32px]' />
        <div className='absolute left-[50%] top-[15%] size-[48px] -translate-x-[50%] animate-pulse rounded-full bg-red-600 blur-xl sm:size-[64px]' />
        <div className='absolute left-[52%] top-[20%] size-[32px] -translate-x-[50%] animate-pulse rounded-full bg-yellow-500 blur-xl sm:size-[48px]' />
      </div>
    </m.div>
  );
}
