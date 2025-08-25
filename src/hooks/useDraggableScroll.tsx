'use client';

import { useEffect, useRef } from 'react';

interface DraggableOptions {
  sharpness?: number;
  orientation?: 'horizontal' | 'vertical';
}

const orientationMappings = {
  horizontal: {
    clientSize: 'clientWidth',
    scrollSize: 'scrollWidth',
    scrollPosition: 'scrollLeft',
  },
  vertical: {
    clientSize: 'clientHeight',
    scrollSize: 'scrollHeight',
    scrollPosition: 'scrollTop',
  },
} as const;

export function useDraggable<T extends HTMLElement>({
  sharpness = 0.8,
  orientation = 'horizontal',
}: DraggableOptions = {}): React.RefObject<T | null> {
  const draggableRef = useRef<T>(null);
  const isMouseDown = useRef(false);
  const prevPos = useRef(0);

  useEffect(() => {
    const draggableEl = draggableRef.current;
    if (!draggableEl) return;

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      isMouseDown.current = true;
    };

    const onMouseLeave = () => {
      isMouseDown.current = false;
      prevPos.current = 0;
    };

    const onMouseMove = (e: MouseEvent) => {
      const draggableEl = draggableRef.current;
      const hasCursorMoved = prevPos.current !== e.clientX;
      if (!isMouseDown.current || !draggableEl || !hasCursorMoved) return;

      e.preventDefault();

      if (prevPos.current) {
        const orientationKeys = orientationMappings[orientation];
        const scrollSize = draggableEl[orientationKeys.scrollSize];
        const clientSize = draggableEl[orientationKeys.clientSize];

        const scrollRatio = scrollSize / clientSize;
        draggableEl.scrollLeft -=
          (e.clientX - prevPos.current) * scrollRatio * sharpness;
      }
      prevPos.current = e.clientX;
    };

    draggableEl.addEventListener('mousedown', onMouseDown);
    draggableEl.addEventListener('mouseleave', onMouseLeave);
    draggableEl.addEventListener('mousemove', onMouseMove);
    draggableEl.addEventListener('mouseup', onMouseLeave);

    return () => {
      draggableEl.removeEventListener('mousedown', onMouseDown);
      draggableEl.removeEventListener('mouseleave', onMouseLeave);
      draggableEl.removeEventListener('mouseup', onMouseLeave);
      draggableEl.removeEventListener('mousemove', onMouseMove);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return draggableRef;
}
