
const WEARUNIFAB_BASE = 'https://wearunifab.com';
const handle = 'start-up-bundles';

async function testCollectionFetch() {
    try {
        const url = `${WEARUNIFAB_BASE}/collections/${handle}/products.json?limit=250&page=1`;
        console.log(`Fetching from: ${url}`);
        const response = await fetch(url);
        const data = await response.json();
        console.log(`Status: ${response.status}`);
        if (data.products) {
            console.log(`Products Found: ${data.products.length}`);
            if (data.products.length > 0) {
                data.products.slice(0, 3).forEach(p => {
                    console.log(` - Product: ${p.title} (Handle: ${p.handle})`);
                });
            }
        } else {
            console.log('Response body:', JSON.stringify(data).substring(0, 500));
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

testCollectionFetch();
