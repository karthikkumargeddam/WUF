
const BASE_URL = 'https://wearunifab.com';

// Exact keywords from BundleCustomizer.tsx
const allowedKeywords = ['apron', 'tabard', 'chef', 'tunic', 'hospitality', 'catering', 'waistcoat'];

async function checkProducts() {
    console.log("Fetching first 3 pages of products...");
    let allProducts = [];

    // Fetch 3 pages like the real app
    for (let page = 1; page <= 3; page++) {
        const res = await fetch(`${BASE_URL}/products.json?limit=250&page=${page}`);
        const data = await res.json();
        allProducts = [...allProducts, ...data.products];
        console.log(`Page ${page}: fetched ${data.products.length} products`);
    }

    console.log(`Total fetched: ${allProducts.length}`);

    // Mimic the filtering logic
    const matches = allProducts.filter(p => {
        const handleLower = p.handle.toLowerCase();
        const titleLower = p.title.toLowerCase();
        const typeLower = p.product_type.toLowerCase();

        return allowedKeywords.some(keyword => {
            const keywordLower = keyword.toLowerCase();
            return (
                handleLower.includes(keywordLower) ||
                titleLower.includes(keywordLower) ||
                typeLower.includes(keywordLower) ||
                (p.tags && p.tags.some(tag => tag.toLowerCase().includes(keywordLower)))
            );
        });
    });

    console.log(`Found ${matches.length} matching products.`);
    if (matches.length > 0) {
        console.log("First 5 matches:");
        console.log(JSON.stringify(matches.slice(0, 5).map(p => ({
            id: p.id,
            title: p.title,
            type: p.product_type,
            tags: p.tags
        })), null, 2));
    } else {
        console.log("No matches found! Checking for potential candidates manually...");
        // Look for anything that might be relevant but missed
        const potential = allProducts.filter(p =>
            p.product_type.toLowerCase().includes('wear') ||
            p.title.toLowerCase().includes('wear')
        ).slice(0, 5);
        console.log("Potential candidates (missed):", JSON.stringify(potential.map(p => p.title), null, 2));
    }
}

checkProducts();
