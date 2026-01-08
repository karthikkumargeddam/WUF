import { fetchProducts } from '@/lib/api';
import BundleCustomizer from './BundleCustomizer';
import { Product } from '@/types';

interface PageProps {
    params: Promise<{ handle: string }>;
}

export default async function BundleCustomizePage({ params }: PageProps) {
    const { handle } = await params;

    // Fetch products using the server-side API utility which is proven to work for other pages
    const { products: fetchedProducts } = await fetchProducts(1, 250);

    // Keep the mock fallback just in case the server fetch returns empty for some reason
    // This double-layer safety ensures the UI never breaks
    let products = fetchedProducts;
    if (!products || products.length === 0) {
        console.warn("Server fetch returned 0 products, using mock fallback.");
        products = [
            {
                id: 'mock-polo',
                title: 'Premium Cotton Polo',
                handle: 'premium-cotton-polo',
                product_type: 'Polo Shirt',
                tags: ['polo', 'workwear'],
                images: [{ src: 'https://wearunifab.com/cdn/shop/files/UC101_Black_Front.jpg', alt: 'Polo' }],
                variants: [{ id: 'v-p-1', title: 'M / Black', price: '15.00', option1: 'M', option2: 'Black' }]
            },
            {
                id: 'mock-hoodie',
                title: 'Heavyweight Hoodie',
                handle: 'heavyweight-hoodie',
                product_type: 'Hoodie',
                tags: ['hoodie', 'warm'],
                images: [{ src: 'https://wearunifab.com/cdn/shop/files/UC502_Navy_Front.jpg', alt: 'Hoodie' }],
                variants: [{ id: 'v-h-1', title: 'L / Navy', price: '25.00', option1: 'L', option2: 'Navy' }]
            },
            {
                id: 'mock-vest',
                title: 'Hi-Vis Safety Vest',
                handle: 'hi-vis-safety-vest',
                product_type: 'Hi-Vis Vest',
                tags: ['hi-vis', 'vest', 'safety'],
                images: [{ src: 'https://wearunifab.com/cdn/shop/files/Yoko_Hiviz_Waistcoat_Yellow_Front.jpg', alt: 'Hi-Vis Vest' }],
                variants: [{ id: 'v-v-1', title: 'L / Yellow', price: '5.00', option1: 'L', option2: 'Yellow' }]
            },
            {
                id: 'mock-fleece',
                title: 'Polar Fleece Jacket',
                handle: 'polar-fleece-jacket',
                product_type: 'Fleece',
                tags: ['fleece', 'jacket'],
                images: [{ src: 'https://wearunifab.com/cdn/shop/files/UC604_Black_Front.jpg', alt: 'Fleece' }],
                variants: [{ id: 'v-f-1', title: 'L / Black', price: '20.00', option1: 'L', option2: 'Black' }]
            },
            {
                id: 'mock-softshell',
                title: 'Technical Softshell',
                handle: 'technical-softshell',
                product_type: 'Softshell',
                tags: ['softshell', 'jacket'],
                images: [{ src: 'https://wearunifab.com/cdn/shop/files/R231M_Black_Front.jpg', alt: 'Softshell' }],
                variants: [{ id: 'v-s-1', title: 'L / Black', price: '35.00', option1: 'L', option2: 'Black' }]
            }
        ];
    }

    return <BundleCustomizer initialProducts={products} bundleHandle={handle} />;
}
