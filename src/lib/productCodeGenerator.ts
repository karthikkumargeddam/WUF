/**
 * Product Code Generator
 * Generates unique product codes (SKUs) for all products
 * Format: WUF-[CATEGORY]-[NUMBER]
 * Example: WUF-POLO-001, WUF-HOOD-M-042
 */

interface Product {
    id: number;
    title: string;
    product_type?: string;
    tags?: string[];
}

/**
 * Generate a product code based on product type and ID
 */
export function generateProductCode(product: Product): string {
    const prefix = 'WUF';

    // Determine category code from product type or tags
    const categoryCode = getCategoryCode(product);

    // Generate unique number (padded to 3 digits)
    const productNumber = String(product.id).padStart(6, '0').slice(-3);

    return `${prefix}-${categoryCode}-${productNumber}`;
}

/**
 * Get category code from product
 */
function getCategoryCode(product: Product): string {
    const productType = product.product_type?.toLowerCase() || '';
    const title = product.title.toLowerCase();

    // Map product types to category codes
    if (productType.includes('polo') || title.includes('polo')) return 'POLO';
    if (productType.includes('hoodie') || title.includes('hoodie')) return 'HOOD';
    if (productType.includes('t-shirt') || productType.includes('tshirt') || title.includes('t-shirt')) return 'TSHT';
    if (productType.includes('sweatshirt') || title.includes('sweatshirt')) return 'SWSH';
    if (productType.includes('jacket') || title.includes('jacket')) return 'JACK';
    if (productType.includes('fleece') || title.includes('fleece')) return 'FLCE';
    if (productType.includes('hi-vis') || productType.includes('high visibility') || title.includes('hi-vis')) return 'HVIS';
    if (productType.includes('cap') || productType.includes('hat') || productType.includes('beanie')) return 'HEAD';
    if (productType.includes('trouser') || productType.includes('pant')) return 'TRSR';
    if (productType.includes('vest') || title.includes('vest')) return 'VEST';
    if (productType.includes('apron') || title.includes('apron')) return 'APRN';
    if (productType.includes('chef') || title.includes('chef')) return 'CHEF';

    // Default to PROD for unknown types
    return 'PROD';
}

/**
 * Generate bundle product code
 */
export function generateBundleCode(bundleName: string, bundleId: number): string {
    const prefix = 'WUF-BDL';

    // Determine bundle type
    let bundleType = 'GEN'; // General

    const name = bundleName.toLowerCase();
    if (name.includes('fleece')) bundleType = 'FLC';
    if (name.includes('hoodie')) bundleType = 'HOD';
    if (name.includes('hospitality')) bundleType = 'HSP';
    if (name.includes('high visibility') || name.includes('hi-vis')) bundleType = 'HVS';
    if (name.includes('polo')) bundleType = 'PLO';
    if (name.includes('premium')) bundleType = 'PRM';
    if (name.includes('salon') || name.includes('beauty')) bundleType = 'SLN';
    if (name.includes('start-up') || name.includes('startup')) bundleType = 'STU';
    if (name.includes('t-shirt') || name.includes('tshirt')) bundleType = 'TSH';
    if (name.includes('winter')) bundleType = 'WNT';
    if (name.includes('workwear')) bundleType = 'WRK';

    const bundleNumber = String(bundleId).padStart(3, '0');

    return `${prefix}-${bundleType}-${bundleNumber}`;
}

/**
 * Batch generate product codes for multiple products
 */
export function batchGenerateProductCodes(products: Product[]): Map<number, string> {
    const productCodes = new Map<number, string>();

    products.forEach(product => {
        const code = generateProductCode(product);
        productCodes.set(product.id, code);
    });

    return productCodes;
}

/**
 * Export product codes to JSON
 */
export function exportProductCodesToJSON(productCodes: Map<number, string>): string {
    const codesObject: Record<number, string> = {};

    productCodes.forEach((code, id) => {
        codesObject[id] = code;
    });

    return JSON.stringify(codesObject, null, 2);
}
