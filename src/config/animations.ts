import type { Variants } from 'framer-motion';

export enum Target {
  HIDDEN = 'hidden',
  VISIBLE = 'visible',
  HOVER = 'hover',
  ACTIVE = 'active',
  FOCUS = 'focus',
}

export const xTransitionAnimations: Variants = {
  [Target.HIDDEN]: {
    opacity: 0,
    scale: 0.6,
    x: -50,
  },
  [Target.VISIBLE]: (custom: number = 0) => ({
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.2,
      delay: 0.1 * custom,
    },
  }),
};

export const yTransitionAnimations: Variants = {
  [Target.HIDDEN]: {
    opacity: 0,
    y: 50,
  },
  [Target.VISIBLE]: {
    opacity: 1,
    y: 0,
  },
};

export const widthAnimations: Variants = {
  [Target.HIDDEN]: {
    width: 0,
  },
  [Target.VISIBLE]: {
    width: '100%',
    transition: {
      delay: 0.4,
      duration: 1,
    },
  },
};

export const opacityAnimations: Variants = {
  [Target.HIDDEN]: {
    opacity: 0,
  },
  [Target.VISIBLE]: (custom: number = 1) => ({
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: custom,
    },
  }),
};
