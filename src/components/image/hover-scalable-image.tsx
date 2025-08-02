'use client';

import { useCallback, useState } from 'react';
import { cn } from '#libs/index';

interface Proportion {
  x: number;
  y: number;
  scale: number;
}

const initialProportion: Proportion = {
  x: 0,
  y: 0,
  scale: 1,
};

interface HoverScalableImageProps {
  src: string;
}

export default function HoverScalableImage({ src }: HoverScalableImageProps) {
  const [proportion, setProportion] = useState<Proportion>(initialProportion);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();

      const targetRect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - targetRect.x) / targetRect.width) * 100;
      const y = ((event.clientY - targetRect.y) / targetRect.height) * 100;

      setProportion({
        x,
        y,
        scale: 2,
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setProportion(initialProportion);
  }, []);

  return (
    <div
      className='relative aspect-2/3 h-auto w-full cursor-zoom-in overflow-hidden rounded-md'
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className='z-10 size-full bg-black object-cover will-change-contents'
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: `${proportion.scale * 100}%`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: `${proportion.x}% ${proportion.y}%`,
        }}
      />
      <div
        className={cn(
          'absolute left-0 top-0 z-20 size-[64px]',
          '-translate-x-1/2 -translate-y-1/2',
          'bg-background/30 cursor-none rounded-md border',
          !(proportion.x && proportion.y) && 'hidden'
        )}
        style={{
          top: `${proportion.y}%`,
          left: `${proportion.x}%`,
        }}
      />
    </div>
  );
}
