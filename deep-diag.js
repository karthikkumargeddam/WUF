
const WEARUNIFAB_BASE = 'https://wearunifab.com';
const handle = 'start-up-bundles';

async function deepDiag() {
    try {
        const url = `${WEARUNIFAB_BASE}/collections/${handle}/products.json?limit=250`;
        console.log(`URL: ${url}`);
        const response = await fetch(url);
        const data = await response.json();

        console.log(`Status: ${response.status}`);
        if (!data.products) {
            console.log('No products in response:', JSON.stringify(data));
            return;
        }

        console.log(`Total Products in Shopify: ${data.products.length}`);

        const types = new Set();
        const titles = [];
        const tags = new Set();

        data.products.forEach(p => {
            types.add(p.product_type);
            titles.push(p.title);
            if (p.tags) p.tags.forEach(t => tags.add(t));
        });

        console.log('\nUnique Product Types:');
        console.log(Array.from(types));

        console.log('\nSample Titles (First 10):');
        console.log(titles.slice(0, 10));

        console.log('\nUnique Tags (Sample 10):');
        console.log(Array.from(tags).slice(0, 10));

    } catch (error) {
        console.error('Error:', error);
    }
}

deepDiag();
