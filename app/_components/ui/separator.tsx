'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/app/_libs';
import { motion } from 'framer-motion';
import { Target, widthAnimations } from '@config/animations';

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

interface MSeparatorProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

const MSeparator = ({
  className,
  orientation = 'horizontal',
}: MSeparatorProps) => {
  return (
    <motion.div
      viewport={{ once: true }}
      initial={Target.HIDDEN}
      whileInView={Target.VISIBLE}
      variants={widthAnimations}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
    />
  );
};

export { Separator, MSeparator };
