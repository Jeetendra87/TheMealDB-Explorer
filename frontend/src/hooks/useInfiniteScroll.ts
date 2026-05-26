import { useCallback, useEffect, useRef } from 'react';

export const useInfiniteScroll = (onLoadMore: () => void, enabled: boolean) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry?.isIntersecting && enabled) {
        onLoadMore();
      }
    },
    [enabled, onLoadMore]
  );

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '200px'
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [handleIntersection]);

  return sentinelRef;
};
