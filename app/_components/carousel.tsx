'use client';

import { ScrollArea, ScrollBar } from '@ui/scroll-area';
import { cn } from '@libs/index';
import { type HTMLMotionProps, m } from 'framer-motion';
import { Target } from '@config/animations';

interface CarouselProps extends HTMLMotionProps<'div'> {}

export function Carousel({ children, className, ...props }: CarouselProps) {
  return (
    <ScrollArea>
      <m.section
        viewport={{ once: true, amount: 0.2 }}
        initial={Target.HIDDEN}
        whileInView={Target.VISIBLE}
        className={cn('flex space-x-4 pb-4', className)}
        {...props}
      >
        {children}
      </m.section>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
}
