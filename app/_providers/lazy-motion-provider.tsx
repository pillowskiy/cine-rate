'use client'

import { LazyMotion, domAnimation } from 'framer-motion';

export default function LazyMotionProvider({ children }: React.PropsWithChildren) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}