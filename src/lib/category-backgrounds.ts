/**
 * Category Background Images Mapping
 * Maps product categories to their corresponding background images
 */

export interface CategoryBackground {
    image: string;
    fallback: string;
}

// Category name mappings (case-insensitive matching)
const categoryMap: Record<string, string> = {
    // Workwear & Uniforms
    'workwear': '/category-backgrounds/workwear.png',
    'uniforms': '/category-backgrounds/workwear.png',
    'work wear': '/category-backgrounds/workwear.png',

    // Safety Equipment
    'safety': '/category-backgrounds/safety.png',
    'safety equipment': '/category-backgrounds/safety.png',
    'protective gear': '/category-backgrounds/safety.png',
    'ppe': '/category-backgrounds/safety.png',

    // T-Shirts
    't-shirts': '/category-backgrounds/tshirts.png',
    'tshirts': '/category-backgrounds/tshirts.png',
    't shirts': '/category-backgrounds/tshirts.png',
    'tees': '/category-backgrounds/tshirts.png',

    // Hoodies
    'hoodies': '/category-backgrounds/hoodies.png',
    'hoodie': '/category-backgrounds/hoodies.png',
    'sweatshirts': '/category-backgrounds/hoodies.png',

    // Jackets
    'jackets': '/category-backgrounds/jackets.png',
    'jacket': '/category-backgrounds/jackets.png',
    'coats': '/category-backgrounds/jackets.png',
    'outerwear': '/category-backgrounds/jackets.png',

    // Pants & Trousers
    'pants': '/category-backgrounds/pants.png',
    'trousers': '/category-backgrounds/pants.png',
    'bottoms': '/category-backgrounds/pants.png',
    'work pants': '/category-backgrounds/pants.png',
};

// Default fallback image
const DEFAULT_BACKGROUND = '/category-backgrounds/workwear.png';

/**
 * Get background image for a category
 * @param category - Category name or product type
 * @returns Path to the background image
 */
export function getCategoryBackground(category: string | null | undefined): string {
    if (!category) return DEFAULT_BACKGROUND;

    const normalized = category.toLowerCase().trim();

    // Direct match
    if (categoryMap[normalized]) {
        return categoryMap[normalized];
    }

    // Partial match - check if category contains any key
    for (const [key, value] of Object.entries(categoryMap)) {
        if (normalized.includes(key) || key.includes(normalized)) {
            return value;
        }
    }

    return DEFAULT_BACKGROUND;
}

/**
 * Get all available category backgrounds
 */
export function getAllCategoryBackgrounds(): string[] {
    return Array.from(new Set(Object.values(categoryMap)));
}
