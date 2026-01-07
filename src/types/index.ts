export interface ProductImage {
    id: number;
    product_id: number;
    position: number;
    created_at: string;
    updated_at: string;
    alt: string | null;
    width: number;
    height: number;
    src: string;
    variant_ids: number[];
}

export interface ProductVariant {
    id: number;
    product_id: number;
    title: string;
    price: string;
    sku: string;
    position: number;
    inventory_policy: string;
    compare_at_price: string | null;
    fulfillment_service: string;
    inventory_management: string | null;
    option1: string | null;
    option2: string | null;
    option3: string | null;
    created_at: string;
    updated_at: string;
    taxable: boolean;
    barcode: string | null;
    grams: number;
    image_id: number | null;
    weight: number;
    weight_unit: string;
    inventory_item_id: number;
    quantity_rule: {
        min: number | null;
        max: number | null;
        increment: number | null;
    };
    requires_shipping: boolean;
}

export interface ProductOption {
    id: number;
    product_id: number;
    name: string;
    position: number;
    values: string[];
}

export interface Product {
    id: number;
    title: string;
    handle: string;
    body_html: string;
    published_at: string;
    created_at: string;
    updated_at: string;
    vendor: string;
    product_type: string;
    tags: string[];
    variants: ProductVariant[];
    images: ProductImage[];
    options: ProductOption[];
}

export interface Collection {
    id: number;
    handle: string;
    title: string;
    updated_at: string;
    body_html: string;
    published_at: string;
    sort_order: string;
    template_suffix: string | null;
    products_count: number;
    collection_type: string;
    published_scope: string;
    admin_graphql_api_id: string;
    image?: {
        created_at: string;
        alt: string | null;
        width: number;
        height: number;
        src: string;
    };
}

export interface ProductsResponse {
    products: Product[];
}

export interface CollectionsResponse {
    collections: Collection[];
}

// Bundle Customization Types
export interface LogoCustomization {
    type: 'existing' | 'text' | 'upload' | 'none';
    placement: string[]; // ["left-chest", "back", "sleeve", "right-chest"]
    // For text logos
    text?: string;
    font?: string;
    color?: string;
    // For uploaded logos
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
    // For existing logos
    existingLogoId?: string;
}

export interface BundleItem {
    id: string;
    category: string; // "polo-shirts", "hoodies", "jackets", "softshell"
    categoryLabel: string; // Display name
    productId?: number;
    productHandle?: string;
    productTitle?: string;
    productImage?: string;
    variantId?: number;
    size?: string;
    color?: string;
    price?: number;
    logoCustomization?: LogoCustomization;
}

export interface Bundle {
    id: string;
    name: string;
    description: string;
    handle: string;
    items: BundleItem[];
    basePrice: number;
    totalPrice: number;
    freeLogoIncluded: boolean;
    maxItems: number;
}

export interface BundleConfiguration {
    bundleId: string;
    items: BundleItem[];
    completedSteps: number;
    totalSteps: number;
}
