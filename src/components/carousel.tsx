'use client';

import { type HTMLMotionProps, m } from 'framer-motion';
import { Target } from '#config/animations';
import { ScrollArea, ScrollBar } from '#ui/scroll-area';
import { cn } from '#libs/index';

interface CarouselProps extends HTMLMotionProps<'div'> {}

export function Carousel({ children, className, ...props }: CarouselProps) {
  return (
    <ScrollArea>
      <m.div
        viewport={{ once: true, amount: 0.2 }}
        initial={Target.HIDDEN}
        whileInView={Target.VISIBLE}
        className={cn('flex gap-x-4 pb-4', className)}
        {...props}
      >
        {children}
      </m.div>
      <div className='to-background absolute right-0 top-0 hidden h-[calc(100%-16px)] w-[120px] translate-x-px bg-gradient-to-r from-transparent sm:block' />
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
}
