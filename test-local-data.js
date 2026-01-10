
const WEARUNIFAB_BASE = 'https://wearunifab.com';

async function testLocalData() {
    try {
        let allProducts = [];
        let page = 1;
        while (page <= 5) {
            const response = await fetch(`${WEARUNIFAB_BASE}/products.json?limit=250&page=${page}`);
            const data = await response.json();
            if (data.products && data.products.length > 0) {
                allProducts = [...allProducts, ...data.products];
                page++;
            } else {
                break;
            }
        }

        console.log(`Total Products: ${allProducts.length}`);
        const startupBundles = allProducts.filter(p => {
            const type = (p.product_type || '').toLowerCase();
            const title = (p.title || '').toLowerCase();
            return type.includes('bundle') || title.includes('bundle');
        });

        console.log(`Bundle Products Found: ${startupBundles.length}`);
        if (startupBundles.length > 0) {
            console.log('Bundle handles:', startupBundles.map(p => p.handle).slice(0, 5));
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

testLocalData();
