'use client';

import { ScrollArea, ScrollBar } from '@ui/scroll-area';
import { cn } from '@libs/index';
import { type HTMLMotionProps, motion } from 'framer-motion';
import { Target } from '@config/animations';

interface CarouselProps extends HTMLMotionProps<'div'> {}

export function Carousel({ children, className, ...props }: CarouselProps) {
  return (
    <ScrollArea>
      <motion.section
        viewport={{ once: true, amount: 0.2 }}
        initial={Target.HIDDEN}
        whileInView={Target.VISIBLE}
        className={cn(
          'flex snap-x space-x-4 overflow-y-hidden pb-4',
          className
        )}
        {...props}
      >
        {children}
      </motion.section>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
}
