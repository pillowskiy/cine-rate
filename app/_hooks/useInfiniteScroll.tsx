import { useState, useEffect } from 'react';

export default function useInfiniteScroll<
  T extends (...args: any[]) => void,
>(callback: T, dependency: unknown) {
  const [canScroll, setCanScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const { innerHeight } = window;
      const { scrollTop, offsetHeight } = document.documentElement;

      const inBottom = innerHeight + scrollTop >= offsetHeight - 120;
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
