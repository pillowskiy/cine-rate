import type { Variants } from "framer-motion";

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
        x: -100,
    },
    [Target.VISIBLE]: (custom: number = 0) => ({
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.2,
            delay: 0.1 * (custom % 5),
        },
    })
}

export const yTransitionAnimations: Variants = {
    [Target.HIDDEN]: {
        opacity: 0,
        y: 100,
    },
    [Target.VISIBLE]: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            delay: 0.6,
        },
    }
}

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
}