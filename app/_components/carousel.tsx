import type { ComponentProps } from 'react';
import { ScrollArea, ScrollBar } from '@ui/scroll-area';
import { cn } from '@libs/index';

interface CarouselProps extends ComponentProps<'div'> {}

export function Carousel({ children, className, ...props }: CarouselProps) {
  return (
    <ScrollArea>
      <section
        className={cn('flex snap-x space-x-4 pb-4 overflow-y-hidden', className)}
        {...props}
      >
        {children}
      </section>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
}
