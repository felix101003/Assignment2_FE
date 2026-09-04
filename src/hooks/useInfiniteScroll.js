// ============================================
// INFINITE SCROLL HOOK (Intersection Observer)
// ============================================
//
// Usage:
//   const sentinelRef = useInfiniteScroll({ onLoadMore, hasMore, loading });
//   return (
//     <>
//       {items.map(...)}
//       <div ref={sentinelRef} />
//     </>
//   );
///
import { useEffect, useRef } from 'react';

const useInfiniteScroll = ({
    onLoadMore,
    hasMore = true,
    loading = false,
    rootMargin = '200px',
    threshold = 0.1,
}) => {
    const sentinelRef = useRef(null);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel || !hasMore || loading) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    onLoadMore();
                }
            },
            { rootMargin, threshold }
        );

        observer.observe(sentinel);

        return () => {
            observer.unobserve(sentinel);
        };
    }, [onLoadMore, hasMore, loading, rootMargin, threshold]);

    return sentinelRef;
};

export default useInfiniteScroll;
