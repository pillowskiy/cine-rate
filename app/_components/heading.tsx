'use client';

import { Badge } from '@ui/badge';
import { Target, yTransitionAnimations } from '@config/animations';
import { motion } from 'framer-motion';

interface HeadingProps {
  title: string;
  description: string;
  badges?: string[];
}

const headingAnimation = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export function Heading({ title, description, badges }: HeadingProps) {
  return (
    <motion.div
      viewport={{ once: true }}
      initial={Target.HIDDEN}
      whileInView={Target.VISIBLE}
      variants={yTransitionAnimations}
      className='space-y-1'
    >
      <div className='flex items-start gap-2'>
        <h2 className='text-2xl font-semibold tracking-tight'>{title}</h2>
        <div className='flex select-none flex-wrap'>
          {!!badges &&
            badges.map((badge, index) => (
              <Badge variant='secondary' key={index}>
                {badge}
              </Badge>
            ))}
        </div>
      </div>
      <p className='text-sm text-muted-foreground'>{description}</p>
    </motion.div>
  );
}
