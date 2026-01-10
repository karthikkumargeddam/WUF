// src/lib/shopify.ts
// Using built-in fetch (available in Node.js >=18 or Next.js runtime)

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN; // e.g. myshop.myshopify.com
const SHOPIFY_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN; // Admin API token

export async function fetchAllProducts(): Promise<any[]> {
    const limit = 250; // max per request

    if (!SHOPIFY_DOMAIN) {
        throw new Error('NEXT_PUBLIC_SHOPIFY_DOMAIN is not defined');
    }
    if (!SHOPIFY_TOKEN) {
        throw new Error('SHOPIFY_ADMIN_TOKEN is not defined');
    }

    let pageInfo: string | null = null;
    const allProducts: any[] = [];
    do {
        const url = new URL(`https://${SHOPIFY_DOMAIN}/admin/api/2024-04/products.json`);
        url.searchParams.set('limit', limit.toString());
        if (pageInfo) url.searchParams.set('page_info', pageInfo);
        const headers = new Headers();
        if (SHOPIFY_TOKEN) {
            headers.append('X-Shopify-Access-Token', SHOPIFY_TOKEN);
        }
        headers.append('Content-Type', 'application/json');
        const res = await fetch(url.toString(), { headers });
        if (!res.ok) {
            throw new Error(`Shopify fetch failed: ${res.status}`);
        }
        const data = await res.json();
        allProducts.push(...data.products);
        const linkHeader = res.headers.get('link');
        const match = linkHeader?.match(/<([^>]+)>; rel="next"/);
        pageInfo = match ? new URL(match[1]).searchParams.get('page_info') : null;
    } while (pageInfo);
    return allProducts;
}
