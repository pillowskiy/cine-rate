import { useState, useRef, useEffect } from 'react';

export default function useInfiniteScroll<
  T extends (...args: unknown[]) => unknown,
>(callback: T, dependency: unknown) {
  const [canScroll, setCanScroll] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = ref.current;
    if (!parent) return;

    const handleScroll = () => {
      const { innerHeight } = window;
      const { scrollTop, offsetHeight } = document.documentElement;

      const inBottom = innerHeight + scrollTop === offsetHeight;
      console.log(inBottom, scrollTop, innerHeight, offsetHeight);
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

  return { canScroll, ref };
}
