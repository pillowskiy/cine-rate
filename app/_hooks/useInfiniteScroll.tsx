import { useState, useRef, useEffect } from 'react';

export default function useInfiniteScroll<
  T extends (...args: unknown[]) => unknown,
>(callback: T, dependency: unknown) {
  const [canScroll, setCanScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const { innerHeight } = window;
      const { scrollTop, offsetHeight } = document.documentElement;

      const inBottom = innerHeight + scrollTop === offsetHeight;
      if (canScroll && inBottom) {
        callback();
        setCanScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [canScroll, callback]);

  useEffect(() => {
    setCanScroll(true);
  }, [dependency]);

  return { canScroll };
}
