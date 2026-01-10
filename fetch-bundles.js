
const BASE_URL = 'https://wearunifab.com';

async function fetchBundleDetails() {
    try {
        console.log("Fetching collections to find bundles...");
        // 1. Fetch all collections to find the ones matching the user's query
        const res = await fetch(`${BASE_URL}/collections.json?limit=250`);
        const data = await res.json();

        const targets = [
            'fleece', 'hi-vis', 'hoodie', 'hospitality', 'polo', 'premium', 'salon', 'start-up', 't-shirt', 'winter', 'workwear'
        ];

        const relevantCollections = data.collections.filter(c =>
            targets.some(t => c.handle.includes(t) || c.title.toLowerCase().includes(t))
        );

        console.log(`Found ${relevantCollections.length} relevant collections.`);

        // 2. For each collection, we might need to see if it's a "Bundle" product or just a collection of bundles.
        // Actually, usually "Bundles" are products. Let's look for PRODUCTS with "Bundle" in the title.

        console.log("Fetching products to find specific Bundles...");
        const pRes = await fetch(`${BASE_URL}/products.json?limit=250`); // Fetch page 1
        const pData = await pRes.json();

        const bundleProducts = pData.products.filter(p => p.title.toLowerCase().includes('bundle'));

        console.log(`Found ${bundleProducts.length} bundle products.`);

        bundleProducts.forEach(p => {
            console.log(`\n--- BUNDLE: ${p.title} ---`);
            console.log(`Handle: ${p.handle}`);
            console.log(`Tags: ${p.tags}`);
            console.log(`Body (Snippet): ${p.body_html.substring(0, 100).replace(/\n/g, '')}...`);
            // Try to guess items from description if possible, though it's hard with HTML.
        });

    } catch (e) {
        console.error(e);
    }
}

fetchBundleDetails();
