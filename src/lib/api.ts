import { ProductsResponse, CollectionsResponse, Product } from '@/types';

const BASE_URL = 'https://wearunifab.com';

export async function fetchProducts(page: number = 1, limit: number = 250): Promise<ProductsResponse> {
    try {
        const res = await fetch(`${BASE_URL}/products.json?limit=${limit}&page=${page}`, {
            next: { revalidate: 21600 }, // Cache for 6 hours (increased from 1 hour)
            cache: 'force-cache',
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return { products: [] };
    }
}

export async function fetchCollections(): Promise<CollectionsResponse> {
    try {
        const res = await fetch(`${BASE_URL}/collections.json`, {
            next: { revalidate: 172800 }, // Cache for 48 hours (increased from 24 hours)
            cache: 'force-cache',
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch collections: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Error fetching collections:', error);
        return { collections: [] };
    }
}

export async function fetchCollectionProducts(handle: string, limit: number = 250): Promise<ProductsResponse> {
    try {
        const res = await fetch(`${BASE_URL}/collections/${handle}/products.json?limit=${limit}`, {
            next: { revalidate: 21600 }, // Cache for 6 hours
            cache: 'force-cache',
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch collection products: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error(`Error fetching products for collection ${handle}:`, error);
        return { products: [] };
    }
}

export async function fetchProduct(handle: string): Promise<Product | null> {
    try {
        const res = await fetch(`${BASE_URL}/products/${handle}.json`, {
            next: { revalidate: 21600 }, // Cache for 6 hours
            cache: 'force-cache',
        });

        if (!res.ok) {
            // If standard endpoint fails, we could try fetching all products and filtering, but that's expensive.
            // We'll return null for now.
            return null;
        }

        const data = await res.json();
        return data.product;
    } catch (error) {
        console.error(`Error fetching product ${handle}:`, error);
        return null;
    }
}

export async function searchProducts(query: string): Promise<Product[]> {
    try {
        // Fetch a large batch of products to filter client-side (or server-side here)
        // Since we don't have a direct search endpoint, we'll fetch widely and filter.
        const { products } = await fetchProducts(1, 250);

        const lowerQuery = query.toLowerCase();
        return products.filter(product =>
            product.title.toLowerCase().includes(lowerQuery) ||
            product.product_type.toLowerCase().includes(lowerQuery) ||
            (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
        );
    } catch (error) {
        console.error(`Error searching products for ${query}:`, error);
        return [];
    }
}
