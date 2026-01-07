import { Bundle, BundleItem, LogoCustomization } from '@/types';

/**
 * Calculate the total price of a bundle including all items and logo customizations
 */
export const TAX_RATE = 0.20; // 20% VAT
export const LOGO_PRICE = 5.95; // Per logo placement

/**
 * Calculate the total price of a bundle including all items and logo customizations
 */
export function calculateBundlePrice(bundle: Bundle): number {
    const itemsTotal = bundle.items.reduce((total, item) => {
        return total + (item.price || 0);
    }, 0);

    // Add logo customization costs if not free
    // Logic: Free logo included usually means 1 logo per item is free
    // Additional placements would cost extra
    const logoTotal = bundle.items.reduce((total, item) => {
        if (item.logoCustomization && item.logoCustomization.type !== 'none' && item.logoCustomization.placement) {
            const count = item.logoCustomization.placement.length;
            // Subtract free logos if included (1 per item)
            const billableCount = bundle.freeLogoIncluded
                ? Math.max(0, count - 1)
                : count;
            return total + (billableCount * LOGO_PRICE);
        }
        return total;
    }, 0);

    return itemsTotal + logoTotal;
}

export const calculateTax = (subtotal: number): number => {
    return subtotal * TAX_RATE;
};

/**
 * Validate that a bundle customization is complete and valid
 */
export function validateBundleCustomization(bundle: Bundle): {
    isValid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    if (!bundle.items || bundle.items.length === 0) {
        errors.push('Bundle must have at least one item');
    }

    bundle.items.forEach((item, index) => {
        if (!item.productId) {
            errors.push(`Item ${index + 1}: Product not selected`);
        }
        if (!item.variantId) {
            errors.push(`Item ${index + 1}: Variant not selected`);
        }
        if (!item.size) {
            errors.push(`Item ${index + 1}: Size not selected`);
        }
        if (!item.color) {
            errors.push(`Item ${index + 1}: Color not selected`);
        }
        if (!item.logoCustomization || item.logoCustomization.type === 'none') {
            errors.push(`Item ${index + 1}: Logo customization required`);
        } else {
            if (item.logoCustomization.placement.length === 0) {
                errors.push(`Item ${index + 1}: Logo placement not selected`);
            }
            if (item.logoCustomization.type === 'text' && !item.logoCustomization.text) {
                errors.push(`Item ${index + 1}: Logo text is required`);
            }
            if (item.logoCustomization.type === 'upload' && !item.logoCustomization.fileUrl) {
                errors.push(`Item ${index + 1}: Logo file not uploaded`);
            }
        }
    });

    return {
        isValid: errors.length === 0,
        errors,
    };
}

/**
 * Generate a human-readable summary of the bundle customization
 */
export function generateBundleSummary(bundle: Bundle): string {
    const lines: string[] = [];

    lines.push(`Bundle: ${bundle.name}`);
    lines.push(`Items: ${bundle.items.length}`);
    lines.push('');

    bundle.items.forEach((item, index) => {
        lines.push(`Item ${index + 1}: ${item.categoryLabel}`);
        if (item.productTitle) {
            lines.push(`  Product: ${item.productTitle}`);
        }
        if (item.size && item.color) {
            lines.push(`  Size: ${item.size}, Color: ${item.color}`);
        }
        if (item.logoCustomization) {
            const logo = item.logoCustomization;
            lines.push(`  Logo: ${logo.type}`);
            if (logo.type === 'text' && logo.text) {
                lines.push(`    Text: "${logo.text}"`);
            }
            if (logo.placement.length > 0) {
                lines.push(`    Placement: ${logo.placement.join(', ')}`);
            }
        }
        lines.push('');
    });

    lines.push(`Total Price: £${calculateBundlePrice(bundle).toFixed(2)}`);

    return lines.join('\n');
}

/**
 * Upload a logo file and return the URL
 * In production, this would upload to cloud storage (S3, Cloudinary, etc.)
 */
export async function uploadLogoFile(file: File): Promise<{
    url: string;
    fileName: string;
    fileSize: number;
}> {
    // Validate file
    const maxSize = 8 * 1024 * 1024; // 8MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'application/pdf'];

    if (file.size > maxSize) {
        throw new Error('File size must be less than 8MB');
    }

    if (!allowedTypes.includes(file.type)) {
        throw new Error('File must be JPG, PNG, SVG, or PDF');
    }

    // For now, create a local object URL
    // In production, upload to cloud storage
    const url = URL.createObjectURL(file);

    return {
        url,
        fileName: file.name,
        fileSize: file.size,
    };
}

/**
 * Get available logo placement options for a category
 */
export function getLogoPlacementOptions(category: string): {
    value: string;
    label: string;
    description: string;
}[] {
    const commonPlacements = [
        { value: 'left-chest', label: 'Left Chest', description: 'Standard left chest position' },
        { value: 'right-chest', label: 'Right Chest', description: 'Right chest position' },
        { value: 'back', label: 'Back', description: 'Center back, below neck' },
    ];

    const categorySpecific: Record<string, typeof commonPlacements> = {
        'polo-shirts': [
            ...commonPlacements,
            { value: 'sleeve', label: 'Sleeve', description: 'Left or right sleeve' },
        ],
        'hoodies': [
            ...commonPlacements,
            { value: 'sleeve', label: 'Sleeve', description: 'Left or right sleeve' },
            { value: 'hood', label: 'Hood', description: 'Back of hood' },
        ],
        'jackets': [
            ...commonPlacements,
            { value: 'sleeve', label: 'Sleeve', description: 'Left or right sleeve' },
        ],
        'softshell': [
            ...commonPlacements,
            { value: 'sleeve', label: 'Sleeve', description: 'Left or right sleeve' },
        ],
    };

    return categorySpecific[category] || commonPlacements;
}

/**
 * Create a default bundle item
 */
export function createDefaultBundleItem(
    category: string,
    categoryLabel: string
): BundleItem {
    return {
        id: `${category}-${Date.now()}`,
        category,
        categoryLabel,
        logoCustomization: {
            type: 'none',
            placement: [],
        },
    };
}
