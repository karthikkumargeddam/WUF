/**
 * Extract Product SKUs from Wearunifab Data
 * This script reads the products JSON and extracts all SKU codes
 */

import fs from 'fs';
import path from 'path';

interface ProductVariant {
    id: number;
    title: string;
    sku: string | null;
    option1?: string;
    option2?: string;
    option3?: string;
    price: string;
}

interface Product {
    id: number;
    title: string;
    handle: string;
    product_type?: string;
    tags?: string[];
    variants: ProductVariant[];
}

interface ProductsData {
    products: Product[];
}

// Read the products JSON file
const productsFilePath = path.join(process.cwd(), 'products-page1.json');
const productsData: ProductsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// Extract SKU mapping
const skuMapping: Record<number, { productTitle: string; productId: number; variantSKUs: { variantId: number; sku: string; title: string }[] }> = {};

productsData.products.forEach((product) => {
    const variantSKUs = product.variants
        .filter((variant) => variant.sku) // Only include variants with SKUs
        .map((variant) => ({
            variantId: variant.id,
            sku: variant.sku!,
            title: variant.title,
        }));

    if (variantSKUs.length > 0) {
        skuMapping[product.id] = {
            productTitle: product.title,
            productId: product.id,
            variantSKUs,
        };
    }
});

// Generate summary statistics
const totalProducts = Object.keys(skuMapping).length;
const totalVariantsWithSKU = Object.values(skuMapping).reduce(
    (sum, product) => sum + product.variantSKUs.length,
    0
);

// Get unique SKU codes
const allSKUs = Object.values(skuMapping).flatMap((product) =>
    product.variantSKUs.map((v) => v.sku)
);
const uniqueSKUs = new Set(allSKUs);

console.log('=== Wearunifab SKU Extraction Summary ===');
console.log(`Total Products with SKUs: ${totalProducts}`);
console.log(`Total Variants with SKUs: ${totalVariantsWithSKU}`);
console.log(`Unique SKU Codes: ${uniqueSKUs.size}`);
console.log('\n=== Sample SKUs ===');

// Show first 10 products with their SKUs
Object.values(skuMapping)
    .slice(0, 10)
    .forEach((product) => {
        console.log(`\n${product.productTitle} (ID: ${product.productId})`);
        product.variantSKUs.slice(0, 5).forEach((variant) => {
            console.log(`  - ${variant.sku} (${variant.title})`);
        });
        if (product.variantSKUs.length > 5) {
            console.log(`  ... and ${product.variantSKUs.length - 5} more variants`);
        }
    });

// Save to JSON file
const outputPath = path.join(process.cwd(), 'wearunifab-sku-mapping.json');
fs.writeFileSync(outputPath, JSON.stringify(skuMapping, null, 2));

console.log(`\n✅ SKU mapping saved to: ${outputPath}`);

// Also create a simple SKU list
const skuListPath = path.join(process.cwd(), 'wearunifab-sku-list.json');
const skuList = Array.from(uniqueSKUs).sort();
fs.writeFileSync(skuListPath, JSON.stringify(skuList, null, 2));

console.log(`✅ SKU list saved to: ${skuListPath}`);
