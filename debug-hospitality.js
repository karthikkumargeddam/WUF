
const BASE_URL = 'https://wearunifab.com';
async function run() {
    const res = await fetch(`${BASE_URL}/collections/hospitality-bundles/products.json?limit=5`);
    const data = await res.json();
    console.log(JSON.stringify(data.products.map(p => ({
        title: p.title,
        product_type: p.product_type,
        tags: p.tags
    })), null, 2));
}
run();
