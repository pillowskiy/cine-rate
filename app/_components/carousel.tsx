import { HTMLAttributes } from 'react';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { cn } from '../_libs';

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {}

export function Carousel({ children, className, ...props }: CarouselProps) {
  return (
    <ScrollArea>
      <section
        className={cn('flex snap-x space-x-4 pb-4', className)}
        {...props}
      >
        {children}
      </section>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
}
