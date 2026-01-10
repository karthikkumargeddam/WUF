/**
 * VAT Calculation Utilities
 * UK VAT: 20% standard rate, 0% for children's clothing
 */

export const VAT_RATES = {
    STANDARD: 0.20, // 20%
    ZERO_RATED: 0.00, // 0% for kids products
} as const;

/**
 * Check if a product is VAT-free (kids product)
 */
export function isKidsProduct(tags: string[] | null | undefined = []): boolean {
    if (!Array.isArray(tags)) return false;

    const kidsKeywords = ['kids', 'children', 'child', 'kids no vat'];
    return tags.some(tag =>
        tag && kidsKeywords.some(keyword =>
            tag.toLowerCase().includes(keyword)
        )
    );
}

/**
 * Calculate VAT amount for a price
 */
export function calculateVAT(
    price: number,
    tags: string[] = []
): {
    netPrice: number;
    vatRate: number;
    vatAmount: number;
    grossPrice: number;
} {
    const vatRate = isKidsProduct(tags) ? VAT_RATES.ZERO_RATED : VAT_RATES.STANDARD;
    const netPrice = price;
    const vatAmount = netPrice * vatRate;
    const grossPrice = netPrice + vatAmount;

    return {
        netPrice,
        vatRate,
        vatAmount,
        grossPrice,
    };
}

/**
 * Calculate total with VAT for cart
 * Formula: (Subtotal + Delivery) + VAT = Total
 */
export function calculateCartTotal(
    items: Array<{ price: number; quantity: number; tags?: string[] }>,
    deliveryFee: number = 0
): {
    subtotal: number;
    delivery: number;
    vatBreakdown: {
        standardRateItems: number;
        zeroRatedItems: number;
        totalVAT: number;
    };
    total: number;
} {
    let subtotal = 0;
    let standardRateItemsTotal = 0;
    let zeroRatedItemsTotal = 0;

    // Calculate subtotal and categorize items
    items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        if (isKidsProduct(item.tags)) {
            zeroRatedItemsTotal += itemTotal;
        } else {
            standardRateItemsTotal += itemTotal;
        }
    });

    // Calculate VAT on subtotal + delivery
    const taxableBase = subtotal + deliveryFee;

    // VAT only applies to standard rate items + delivery
    const vatOnStandardItems = standardRateItemsTotal * VAT_RATES.STANDARD;
    const vatOnDelivery = deliveryFee * VAT_RATES.STANDARD;
    const totalVAT = vatOnStandardItems + vatOnDelivery;

    const total = taxableBase + totalVAT;

    return {
        subtotal,
        delivery: deliveryFee,
        vatBreakdown: {
            standardRateItems: standardRateItemsTotal,
            zeroRatedItems: zeroRatedItemsTotal,
            totalVAT,
        },
        total,
    };
}

/**
 * Format price with currency
 */
export function formatPrice(amount: number, currency: string = 'GBP'): string {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency,
    }).format(amount);
}

/**
 * Format VAT rate as percentage
 */
export function formatVATRate(rate: number): string {
    return `${(rate * 100).toFixed(0)}%`;
}
