'use client';

import { m } from 'framer-motion';
import { Target, yTransitionAnimations } from '#config/animations';
import { Badge } from '#ui/badge';

interface HeadingProps {
  title: string;
  description?: string;
  badges?: string[];
}

export function Heading({ title, description, badges }: HeadingProps) {
  return (
    <m.div
      viewport={{ once: true }}
      initial={Target.HIDDEN}
      whileInView={Target.VISIBLE}
      variants={yTransitionAnimations}
      className='space-y-1'
    >
      <div className='flex items-start gap-2'>
        <h2 className='text-2xl font-semibold leading-[110%] tracking-tight'>
          {title}
        </h2>
        <div className='flex select-none flex-wrap'>
          {!!badges &&
            badges.map((badge, index) => (
              <Badge variant='secondary' key={index}>
                {badge}
              </Badge>
            ))}
        </div>
      </div>
      {description && (
        <p className='text-sm text-muted-foreground'>{description}</p>
      )}
    </m.div>
  );
}
