
import { db } from './firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { Bundle, Product } from '@/types';

const WEARUNIFAB_BASE = 'https://wearunifab.com';

const MOCK_BUNDLES: Record<string, Bundle> = {
    '6-item-kickstarter': {
        id: '6-item-kickstarter',
        name: 'Kickstarter Pack',
        description: '2 Polo Shirts, 2 Hoodies, 2 Beanie Hats',
        handle: '6-item-kickstarter',
        basePrice: 99.00,
        totalPrice: 99.00,
        freeLogoIncluded: true,
        maxItems: 6,
        items: [
            { id: 'item-1', category: 'polo-shirts', categoryLabel: 'Polo Shirt 1' },
            { id: 'item-2', category: 'polo-shirts', categoryLabel: 'Polo Shirt 2' },
            { id: 'item-3', category: 'hoodies', categoryLabel: 'Hoodie 1' },
            { id: 'item-4', category: 'hoodies', categoryLabel: 'Hoodie 2' },
            { id: 'item-5', category: 'accessories', categoryLabel: 'Beanie 1' },
            { id: 'item-6', category: 'accessories', categoryLabel: 'Beanie 2' },
        ]
    },
    '10-item-professional': {
        id: '10-item-professional',
        name: 'Pro Pack',
        description: '5 Polos, 3 Sweatshirts, 2 Fleeces',
        handle: '10-item-professional',
        basePrice: 185.00,
        totalPrice: 185.00,
        freeLogoIncluded: true,
        maxItems: 10,
        items: [
            { id: 'p-1', category: 'polo-shirts', categoryLabel: 'Polo Shirt 1' },
            { id: 'p-2', category: 'polo-shirts', categoryLabel: 'Polo Shirt 2' },
            { id: 'p-3', category: 'polo-shirts', categoryLabel: 'Polo Shirt 3' },
            { id: 'p-4', category: 'polo-shirts', categoryLabel: 'Polo Shirt 4' },
            { id: 'p-5', category: 'polo-shirts', categoryLabel: 'Polo Shirt 5' },
            { id: 's-1', category: 'sweatshirts', categoryLabel: 'Sweatshirt 1' },
            { id: 's-2', category: 'sweatshirts', categoryLabel: 'Sweatshirt 2' },
            { id: 's-3', category: 'sweatshirts', categoryLabel: 'Sweatshirt 3' },
            { id: 'f-1', category: 'fleeces', categoryLabel: 'Fleece 1' },
            { id: 'f-2', category: 'fleeces', categoryLabel: 'Fleece 2' },
        ]
    },
    '15-item-enterprise': {
        id: '15-item-enterprise',
        name: 'Enterprise Pack',
        description: '7 Polos, 5 Hoodies, 3 Softshell Jackets',
        handle: '15-item-enterprise',
        basePrice: 299.00,
        totalPrice: 299.00,
        freeLogoIncluded: true,
        maxItems: 15,
        items: [
            ...Array(7).fill(null).map((_, i) => ({ id: `p-${i}`, category: 'polo-shirts', categoryLabel: `Polo Shirt ${i + 1}` })),
            ...Array(5).fill(null).map((_, i) => ({ id: `h-${i}`, category: 'hoodies', categoryLabel: `Hoodie ${i + 1}` })),
            ...Array(3).fill(null).map((_, i) => ({ id: `s-${i}`, category: 'softshell', categoryLabel: `Softshell ${i + 1}` })),
        ]
    },
    'polo-bundle': {
        id: 'polo-bundle',
        name: '5 Pack Polos',
        description: '5 Premium Polo Shirts',
        handle: 'polo-bundle',
        basePrice: 65.00,
        totalPrice: 65.00,
        freeLogoIncluded: true,
        maxItems: 5,
        items: Array(5).fill(null).map((_, i) => ({ id: `p-${i}`, category: 'polo-shirts', categoryLabel: `Polo ${i + 1}` }))
    },
    'hoodies-bundle': {
        id: 'hoodies-bundle',
        name: '5 Pack Hoodies',
        description: '5 Heavyweight Hoodies',
        handle: 'hoodies-bundle',
        basePrice: 110.00,
        totalPrice: 110.00,
        freeLogoIncluded: true,
        maxItems: 5,
        items: Array(5).fill(null).map((_, i) => ({ id: `h-${i}`, category: 'hoodies', categoryLabel: `Hoodie ${i + 1}` }))
    },
    // Add other specialized bundles similarly if needed...
    'hi-visibility-bundle': {
        id: 'hi-visibility-bundle',
        name: 'Hi-Vis Safety Pack',
        description: '5 Hi-Vis Vests/Jackets',
        handle: 'hi-visibility-bundle',
        basePrice: 45.00,
        totalPrice: 45.00,
        freeLogoIncluded: true,
        maxItems: 5,
        items: Array(5).fill(null).map((_, i) => ({ id: `hv-${i}`, category: 'hi-vis', categoryLabel: `Hi-Vis ${i + 1}` }))
    },
    'fleece-bundle-just-embroidery': {
        id: 'fleece-bundle-just-embroidery',
        name: 'Fleece Warmth Pack',
        description: '5 Polar Fleeces',
        handle: 'fleece-bundle-just-embroidery',
        basePrice: 85.00,
        totalPrice: 85.00,
        freeLogoIncluded: true,
        maxItems: 5,
        items: Array(5).fill(null).map((_, i) => ({ id: `f-${i}`, category: 'fleeces', categoryLabel: `Fleece ${i + 1}` }))
    },
    'autumn-uneek-bundle': {
        id: 'autumn-uneek-bundle',
        name: 'Autumn Uneek Bundle',
        description: 'Perfect for the colder months. Includes hoodies, fleece, and beanies.',
        handle: 'autumn-uneek-bundle',
        basePrice: 130.00,
        totalPrice: 130.00,
        freeLogoIncluded: true,
        maxItems: 8,
        items: [
            { id: 'h-1', category: 'hoodies', categoryLabel: 'Hoodie 1' },
            { id: 'h-2', category: 'hoodies', categoryLabel: 'Hoodie 2' },
            { id: 'h-3', category: 'hoodies', categoryLabel: 'Hoodie 3' },
            { id: 'f-1', category: 'fleeces', categoryLabel: 'Fleece 1' },
            { id: 'f-2', category: 'fleeces', categoryLabel: 'Fleece 2' },
            { id: 'b-1', category: 'accessories', categoryLabel: 'Beanie 1' },
            { id: 'b-2', category: 'accessories', categoryLabel: 'Beanie 2' },
            { id: 'b-3', category: 'accessories', categoryLabel: 'Beanie 3' },
        ]
    },
    'kids-school-bundle': {
        id: 'kids-school-bundle',
        name: 'Kids School Pack',
        description: 'VAT Free - Essential schoolwear pack.',
        handle: 'kids-school-bundle',
        basePrice: 45.00,
        totalPrice: 45.00,
        freeLogoIncluded: true,
        maxItems: 5,
        items: Array(5).fill(null).map((_, i) => ({ id: `k-${i}`, category: 'polo-shirts', categoryLabel: `Kids Polo ${i + 1}` }))
    },
    't-shirt-bundle': {
        id: 't-shirt-bundle',
        name: '10 Pack T-Shirts',
        description: '10 Premium T-Shirts',
        handle: 't-shirt-bundle',
        basePrice: 75.00,
        totalPrice: 75.00,
        freeLogoIncluded: true,
        maxItems: 10,
        items: Array(10).fill(null).map((_, i) => ({ id: `t-${i}`, category: 't-shirts', categoryLabel: `T-Shirt ${i + 1}` }))
    }
};

export async function getBundleByHandle(handle: string): Promise<Bundle | null> {
    // Check mock data first (Case Insensitive)
    const mockKey = Object.keys(MOCK_BUNDLES).find(k => k.toLowerCase() === handle.toLowerCase());
    if (mockKey) {
        console.log(`✅ Returning mock bundle for: ${handle} (matched ${mockKey})`);
        const bundle = JSON.parse(JSON.stringify(MOCK_BUNDLES[mockKey]));
        return bundle;
    }

    try {
        const docRef = doc(db, 'bundle_configs', handle);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.items && data.items.length > 0) {
                return { ...data, id: docSnap.id } as Bundle;
            }
            console.warn(`Firestore bundle ${handle} had 0 items, falling back to dynamic.`);
        }

        const q = query(collection(db, 'bundle_configs'), where('handle', '==', handle));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const data = querySnapshot.docs[0].data();
            if (data.items && data.items.length > 0) {
                return { ...data, id: querySnapshot.docs[0].id } as Bundle;
            }
        }

        console.log(`🔄 Attempting dynamic fetch for bundle: ${handle}`);
        const response = await fetch(`${WEARUNIFAB_BASE}/products/${handle}.json`, {
            cache: 'no-store'
        });

        if (response.ok) {
            const data = await response.json();
            const product = data.product;

            if (product) {
                console.log(`✅ Found product on remote: ${product.title}`);

                const titleLower = product.title.toLowerCase();
                const titleClean = titleLower.replace(/-/g, ' ').trim();
                let itemCount = 1;

                // 1. Check for number at start (e.g., "10 Polo Bundle")
                const numAtStart = titleClean.match(/^(\d+)/);
                if (numAtStart) {
                    itemCount = parseInt(numAtStart[1]);
                } else {
                    // 2. Robust Number Matching with optional words in between
                    // "5 pack", "5 item", "5 polo pack", etc.
                    const numBefore = titleClean.match(/(\d+(\.\d+)?)\s*(?:[\w-]+\s+)?(pack|item|bundle|piece)/i);
                    const numAfter = titleClean.match(/(pack|item|bundle|piece)\s*(?:[\w-]+\s+)?(\d+(\.\d+)?)/i);

                    if (numBefore) {
                        itemCount = Math.floor(parseFloat(numBefore[1]));
                    } else if (numAfter) {
                        itemCount = Math.floor(parseFloat(numAfter[2]));
                    } else if (titleClean.includes('bundle')) {
                        if (titleClean.includes('hi vis')) itemCount = 5;
                        else if (titleClean.includes('pack')) itemCount = 5;
                    }
                }

                if (isNaN(itemCount) || itemCount < 1) itemCount = 1;

                let category = 'workwear';
                let categoryLabel = 'Item';

                // Determine category
                if (titleClean.includes('hoodie')) { category = 'hoodies'; categoryLabel = 'Hoodie'; }
                else if (titleClean.includes('polo')) { category = 'polo-shirts'; categoryLabel = 'Polo'; }
                else if (titleClean.includes('t shirt') || titleClean.includes('tee')) { category = 't-shirts'; categoryLabel = 'T-Shirt'; }
                else if (titleClean.includes('fleece')) { category = 'fleeces'; categoryLabel = 'Fleece'; }
                else if (titleClean.includes('hi vis') || titleClean.includes('vest') || titleClean.includes('waistcoat')) { category = 'hi-viz'; categoryLabel = 'Hi-Vis'; }
                else if (titleClean.includes('trousers') || titleClean.includes('pants')) { category = 'workwear'; categoryLabel = 'Trousers'; }

                const generatedItems = Array.from({ length: itemCount }).map((_, i) => ({
                    id: `gen-${i}`,
                    category,
                    categoryLabel: `${categoryLabel} ${i + 1}`
                }));

                const dynamicBundle: Bundle = {
                    id: product.id.toString(),
                    name: product.title,
                    description: (product.body_html || '').replace(/<[^>]*>?/gm, '').slice(0, 150) + '...',
                    handle: handle,
                    basePrice: parseFloat(product.variants[0]?.price || '0'),
                    totalPrice: parseFloat(product.variants[0]?.price || '0'),
                    freeLogoIncluded: true,
                    maxItems: itemCount,
                    items: generatedItems
                };

                console.log(`✨ Generated dynamic bundle with ${itemCount} items of type ${category}`);
                return dynamicBundle;
            }
        }

        console.warn(`No bundle found for handle: ${handle}`);
        return null;

    } catch (error) {
        console.error("Error fetching bundle:", error);
        return null;
    }
}

export async function getAllBundles(): Promise<Bundle[]> {
    try {
        const querySnapshot = await getDocs(collection(db, 'bundle_configs'));
        const bundles: Bundle[] = [];
        querySnapshot.forEach((doc) => {
            bundles.push({ ...doc.data(), id: doc.id } as Bundle);
        });
        return bundles;
    } catch (error) {
        console.error("Error fetching bundles:", error);
        return [];
    }
}

export async function getAllProducts(): Promise<Product[]> {
    try {
        console.log('🔄 Fetching products directly from Wearunifab...');

        let allProducts: Product[] = [];
        let page = 1;
        let hasMore = true;

        while (hasMore && page <= 10) { // Load up to 2500 products
            const response = await fetch(`${WEARUNIFAB_BASE}/products.json?limit=250&page=${page}`, {
                cache: 'no-store'
            });
            if (!response.ok) {
                console.error(`❌ Page ${page} fetch failed: ${response.status}`);
                break;
            }

            const data = await response.json();
            if (data.products && data.products.length > 0) {
                allProducts = [...allProducts, ...data.products];
                page++;
            } else {
                hasMore = false;
            }
        }

        return allProducts;
    } catch (error) {
        console.error("Error fetching products from Shopify:", error);
        return [];
    }
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
    try {
        const response = await fetch(`${WEARUNIFAB_BASE}/products/${handle}.json`, {
            cache: 'no-store'
        });
        if (!response.ok) return null;
        const data = await response.json();
        return data.product || null;
    } catch (error) {
        console.error(`Error fetching product by handle (${handle}):`, error);
        return null;
    }
}
