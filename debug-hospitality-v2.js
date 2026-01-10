
const BASE_URL = 'https://wearunifab.com';
const keywords = ['apron', 'chef', 'hospitality', 'waiter'];

async function search(query) {
    // We can't search directly via this API easily without fetching all products or using a known collection.
    // Let's try to fetch a few pages and search in them.
    console.log(`Searching for products matching: ${keywords.join(', ')}`);

    let found = [];
    for (let page = 1; page <= 3; page++) {
        const res = await fetch(`${BASE_URL}/products.json?limit=250&page=${page}`);
        const data = await res.json();
        const products = data.products || [];

        products.forEach(p => {
            const str = (p.title + ' ' + p.product_type + ' ' + (p.tags || []).join(' ')).toLowerCase();
            if (keywords.some(k => str.includes(k))) {
                found.push({
                    id: p.id,
                    title: p.title,
                    type: p.product_type,
                    tags: p.tags
                });
            }
        });
        if (found.length > 10) break;
    }

    console.log(JSON.stringify(found, null, 2));
}

search();
