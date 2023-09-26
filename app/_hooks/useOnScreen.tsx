import { type MutableRefObject, useState, useEffect } from "react";

export default function useOnScreen(ref: MutableRefObject<HTMLVideoElement | null>) {
  const [isIntersecting, setIntersecting] = useState(false);
  const observer = typeof window !== 'undefined' ? new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  ) : null;

  useEffect(() => {
    if (!ref.current || !observer) return;
    observer.observe(ref.current);
    return () => void observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isIntersecting;
}
