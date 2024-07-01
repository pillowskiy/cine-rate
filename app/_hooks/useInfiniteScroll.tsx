import { useEffect, useState } from 'react';

export default function useInfiniteScroll<T extends (...args: any[]) => void>(
  callback: T,
  dependency: unknown,
  stopped?: boolean
) {
  const [canScroll, setCanScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const { innerHeight } = window;
      const { scrollTop, offsetHeight } = document.documentElement;

      const inBottom = innerHeight + scrollTop >= offsetHeight - 60;
      if (canScroll && inBottom) {
        callback();
        setCanScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    if (stopped) {
      window.removeEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [canScroll, callback, stopped]);

  useEffect(() => {
    setCanScroll(true);
  }, [dependency]);

  return { canScroll };
}
