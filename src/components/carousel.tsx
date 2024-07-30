'use client';

import { type HTMLMotionProps, m } from 'framer-motion';
import { useDraggable } from '#hooks/useDraggableScroll';
import { Target } from '#config/animations';
import { ScrollAreaRoot, ScrollAreaViewport, ScrollBar } from '#ui/scroll-area';
import { cn } from '#libs/index';

interface CarouselProps extends HTMLMotionProps<'div'> {}

export function Carousel({ children, className, ...props }: CarouselProps) {
  const draggableRef = useDraggable<HTMLDivElement>();

  return (
    <ScrollAreaRoot>
      <ScrollAreaViewport ref={draggableRef}>
        <m.div
          viewport={{ once: true, amount: 0.2 }}
          initial={Target.HIDDEN}
          whileInView={Target.VISIBLE}
          className={cn('flex gap-x-4 pb-4', className)}
          {...props}
        >
          {children}
        </m.div>
      </ScrollAreaViewport>
      <ScrollBar orientation='horizontal' />
    </ScrollAreaRoot>
  );
}
