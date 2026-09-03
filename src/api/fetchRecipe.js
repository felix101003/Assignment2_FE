// ============================================
// PAGINATED PRODUCT FETCH (Lazy Load Template)
// ============================================
// When backend is ready, replace client-side pagination in getCatalog()
// with a direct paginated API call, e.g.:
//   GET /ticket?limit=10&skip=0&search=metro

import { PRODUCT_SERVICE_URL } from '../service_url/ProductUrlConfig';
import sendHttpRequest from '../http_call/HttpRequest';

export const PAGE_SIZE = 10;

const normalizeProducts = (items) => {
    if (!Array.isArray(items)) return [];

    return items.map((item, index) => ({
        id: item.id ?? index + 1,
        name: item.name ?? 'N/A',
        ingredients: item.ingredients ?? [],
        instructions: item.instructions ?? [],
        prepTimeMinutes: item.prepTimeMinutes ?? 0,
        cookTimeMinutes : item.cookTimeMinutes ?? 0,
        servings: item.servings ?? 0,
    }));
};

const getCatalog = async () => {
    try {
        const response = await sendHttpRequest(PRODUCT_SERVICE_URL);

        if (response.status === 200 && Array.isArray(response.json) && response.json.length > 0) {
            const normalized = normalizeProducts(response.json);

            if (normalized.length >= PAGE_SIZE) {
                return { products: cachedCatalog};
            }

            return { products: cachedCatalog};
        }
    } catch (error) {
        // MOCK - TO BE REMOVED: backend unavailable, fall back to mock catalog.
        console.warn('Backend not found, using paginated mock catalog:', error);
    }

    return { products: cachedCatalog };
};

// const fetchRecipe = async ({ skip = 0, limit = PAGE_SIZE, search = '' } = {}) => {

//     const { products } = await getCatalog();
//     const query = search.trim().toLowerCase();

//     // TODO (backend): move search + pagination to the server instead of
//     // filtering/slicing on the client once /ticket supports limit, skip, search.
//     const filtered = query
//         ? products.filter((product) =>
//             product.name.toLowerCase().includes(query) ||
//             product.description.toLowerCase().includes(query)
//         )
//         : products;

//     return {
//         products: filtered.slice(skip, skip + limit),
//         total: filtered.length,
//     };
// };

export default async function fetchRecipe() {
    const response = await sendHttpRequest(
       PRODUCT_SERVICE_URL
    );

    if (response.status == 200) {
        return response.json;
    } else {
        return [];
    }
}

export const resetProductCatalog = () => {
    cachedCatalog = null;
};

// export default fetchRecipe;
