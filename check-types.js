
const WEARUNIFAB_BASE = 'https://wearunifab.com';

async function checkProductTypes() {
    try {
        let allProducts = [];
        let page = 1;

        console.log('Fetching products...');
        while (page <= 3) {
            const response = await fetch(`${WEARUNIFAB_BASE}/products.json?limit=250&page=${page}`);
            const data = await response.json();
            if (data.products && data.products.length > 0) {
                allProducts = [...allProducts, ...data.products];
                page++;
            } else {
                break;
            }
        }

        const typeDistribution = allProducts.reduce((acc, p) => {
            const type = p.product_type || 'Unknown';
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});

        console.log('Product Type Distribution:');
        console.log(JSON.stringify(typeDistribution, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
}

checkProductTypes();
