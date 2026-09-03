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

const ProductPage = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [skip, setSkip] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const skipRef = useRef(0);
    const loadingRef = useRef(false);
    const hasMoreRef = useRef(true);
    const isFirstSearchEffect = useRef(true);

    const getFullRecipe = async () => {
        const result = await fetchRecipe();
        if (result != []) {
            setProducts(result);
        }
    }
    

    useEffect(() => {
        getFullRecipe();
    }, []);

    // const loadProducts = useCallback(async ({ reset = false, search = '' } = {}) => {
    //     if (loadingRef.current) return;
    //     if (!reset && !hasMoreRef.current) return;

    //     const nextSkip = reset ? 0 : skipRef.current;

    //     loadingRef.current = true;
    //     setLoading(true);

    //     try {
    //         const data = await fetchRecipe();
    //         console.log(data)
    //     } finally {
    //         loadingRef.current = false;
    //         setLoading(false);
    //         setInitialLoading(false);
    //     }
    // }, []);

    // const loadMore = useCallback(() => {
    //     loadProducts({ reset: false, search: searchQuery });
    // }, [loadProducts, searchQuery]);

    // const sentinelRef = useInfiniteScroll({
    //     onLoadMore: loadMore,
    //     hasMore,
    //     loading,
    // });

    // const handleRefresh = async () => {
    //     resetProductCatalog();
    //     setProducts([]);
    //     skipRef.current = 0;
    //     hasMoreRef.current = true;
    //     setSkip(0);
    //     setHasMore(true);
    //     setInitialLoading(true);
    //     await loadProducts({ reset: true, search: searchQuery });
    // };

    // useEffect(() => {
    //     loadProducts({ reset: true, search: '' });
    // }, [loadProducts]);

    // useEffect(() => {
    //     if (isFirstSearchEffect.current) {
    //         isFirstSearchEffect.current = false;
    //         return;
    //     }

    //     const timer = setTimeout(() => {
    //         setProducts([]);
    //         skipRef.current = 0;
    //         hasMoreRef.current = true;
    //         setSkip(0);
    //         setHasMore(true);
    //         setInitialLoading(true);
    //         loadProducts({ reset: true, search: searchQuery });
    //     }, 300);

    //     return () => clearTimeout(timer);
    // }, [searchQuery, loadProducts]);

    const columns = [
        { header: 'Image', key: 'image', width: '30%' },
        { header: 'Name', key: 'name', width: '30%' },
        { header: 'Difficulty', key: 'difficulty', width: '10%' },
        { header: 'Time', key: 'time', width: '10%' },
        { header: 'Cuisine', key: 'cuisine', width: '10%' },
    ];

    return (
        <div className="space-y-6">

            <CustomSearchField
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Find Recipes by Name"
                size="md"
            />

            {/* {initialLoading ? (
                <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-gray-150 shadow-sm">
                    <CustomSpinner size="md" label="Fetching products..." />
                </div>
            ) : (
                <> */}
                    <CustomTable
                        columns={columns}
                        data={products}
                        emptyMessage={searchQuery
                            ? 'No products match your search.'
                            : 'No products/tickets found in database.'}
                    />

                    {/* {products.length > 0 && (
                        <CustomInfiniteScroll
                            sentinelRef={sentinelRef}
                            loading={loading}
                            hasMore={hasMore}
                            loadingLabel="Loading more products..."
                            endLabel="You have reached the end of the list."
                        />
                    )} */}
                {/* </>
            )} */}
        </div>
    );
};

export default ProductPage;
