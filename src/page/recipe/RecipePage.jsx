import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../component/cart/reducer/cartReduxReducer';
import fetchRecipe, { PAGE_SIZE, resetProductCatalog } from '../../api/fetchRecipe';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import CustomButton from '../../reusable/CustomButton';
import CustomInfiniteScroll from '../../reusable/CustomInfiniteScroll';
import CustomSearchField from '../../reusable/CustomSearchField';
import CustomSpinner from '../../reusable/CustomSpinner';
import CustomTable from '../../reusable/CustomTable';

const RecipePage = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [skip, setSkip] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    // MOCK - TO BE REMOVED: only used to show "Offline Demo Mock Mode" badge in UI.
    const [isBackendMocked, setIsBackendMocked] = useState(false);

    const skipRef = useRef(0);
    const loadingRef = useRef(false);
    const hasMoreRef = useRef(true);
    const isFirstSearchEffect = useRef(true);

    const loadProducts = useCallback(async ({ reset = false, search = '' } = {}) => {
        if (loadingRef.current) return;
        if (!reset && !hasMoreRef.current) return;

        const nextSkip = reset ? 0 : skipRef.current;

        loadingRef.current = true;
        setLoading(true);

        try {
            const data = await fetchRecipe({
                skip: nextSkip,
                limit: PAGE_SIZE,
                search,
            });

            setProducts((prev) => (reset ? data.products : [...prev, ...data.products]));

            const updatedSkip = nextSkip + data.products.length;
            skipRef.current = updatedSkip;
            setSkip(updatedSkip);
            setTotal(data.total);

            const moreAvailable = updatedSkip < data.total;
            hasMoreRef.current = moreAvailable;
            setHasMore(moreAvailable);
            // MOCK - TO BE REMOVED: remove isMocked handling when backend is always used.
            setIsBackendMocked(data.isMocked);
        } finally {
            loadingRef.current = false;
            setLoading(false);
            setInitialLoading(false);
        }
    }, []);

    const loadMore = useCallback(() => {
        loadProducts({ reset: false, search: searchQuery });
    }, [loadProducts, searchQuery]);

    const sentinelRef = useInfiniteScroll({
        onLoadMore: loadMore,
        hasMore,
        loading,
    });

    const handleRefresh = async () => {
        resetProductCatalog();
        setProducts([]);
        skipRef.current = 0;
        hasMoreRef.current = true;
        setSkip(0);
        setHasMore(true);
        setInitialLoading(true);
        await loadProducts({ reset: true, search: searchQuery });
    };

    useEffect(() => {
        loadProducts({ reset: true, search: '' });
    }, [loadProducts]);

    useEffect(() => {
        if (isFirstSearchEffect.current) {
            isFirstSearchEffect.current = false;
            return;
        }

        const timer = setTimeout(() => {
            setProducts([]);
            skipRef.current = 0;
            hasMoreRef.current = true;
            setSkip(0);
            setHasMore(true);
            setInitialLoading(true);
            loadProducts({ reset: true, search: searchQuery });
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, loadProducts]);

    const columns = [
        { header: 'Name', key: 'name', width: '30%' },
        { header: 'Description', key: 'description', width: '40%' },
        {
            header: 'Price',
            key: 'price',
            width: '15%',
            render: (row) => (
                <span className="font-bold text-gray-900">
                    {row.price.toLocaleString('vi-VN')} đ
                </span>
            ),
        },
        {
            header: 'Actions',
            key: 'action',
            width: '15%',
            render: (row) => (
                <CustomButton
                    variant="primary"
                    size="md"
                    onClick={() => dispatch(addToCart(row))}
                >
                    Add to Cart 🛒
                </CustomButton>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-8 rounded-xl border border-gray-150 shadow-sm">

                <div className="flex items-center gap-3">
                    {/* MOCK - TO BE REMOVED: hide this badge once backend pagination is live. */}
                    {isBackendMocked && (
                        <span className="bg-amber-100 text-amber-800 text-sm font-semibold px-4 py-2 rounded-full border border-amber-200">
                            ⚠️ Offline Demo Mock Mode
                        </span>
                    )}
                    <CustomButton
                        variant="outline"
                        size="md"
                        onClick={handleRefresh}
                        disabled={loading}
                    >
                        🔄 Refresh
                    </CustomButton>
                </div>
            </div>

            <CustomSearchField
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by ticket name or description..."
                size="md"
            />

            {initialLoading ? (
                <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-gray-150 shadow-sm">
                    <CustomSpinner size="md" label="Fetching products..." />
                </div>
            ) : (
                <>
                    <CustomTable
                        columns={columns}
                        data={products}
                        emptyMessage={searchQuery
                            ? 'No products match your search.'
                            : 'No products/tickets found in database.'}
                    />

                    {products.length > 0 && (
                        <CustomInfiniteScroll
                            sentinelRef={sentinelRef}
                            loading={loading}
                            hasMore={hasMore}
                            loadingLabel="Loading more products..."
                            endLabel="You have reached the end of the list."
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default RecipePage;
