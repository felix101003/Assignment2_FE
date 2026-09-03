// ============================================
// INFINITE SCROLL SENTINEL (Reusable Template)
// ============================================
// Place at the bottom of any scrollable list to auto-load more items.
//
import CustomSpinner from './CustomSpinner';

const CustomInfiniteScroll = ({
    sentinelRef,
    loading = false,
    hasMore = true,
    loadingLabel = 'Loading more items...',
    endLabel = 'No more items to load.',
    className = '',
}) => {
    return (
        <div ref={sentinelRef} className={`py-6 ${className}`}>
            {loading && (
                <CustomSpinner size="sm" label={loadingLabel} />
            )}

            {!loading && !hasMore && (
                <p className="text-center text-gray-400 text-base">{endLabel}</p>
            )}
        </div>
    );
};

export default CustomInfiniteScroll;
