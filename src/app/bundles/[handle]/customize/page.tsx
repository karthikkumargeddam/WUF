import { getAllProducts, getBundleByHandle } from '@/lib/data';
import BundleCustomizer from './BundleCustomizer';
import { Product } from '@/types';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ handle: string }>;
}

export default async function BundleCustomizePage({ params }: PageProps) {
    const { handle } = await params;

    // Fetch bundle configuration and products on the server
    // This avoids CORS issues and ensures the page is ready for SSR
    const [allFetchedProducts, bundleConfig] = await Promise.all([
        getAllProducts(),
        getBundleByHandle(handle)
    ]);

    console.log(`  ✅ Total fetched from Shopify: ${allFetchedProducts.length} products`);
    if (bundleConfig) {
        console.log(`  ✅ Bundle Config loaded for: ${handle} | Items: ${bundleConfig.items?.length}`);
    } else {
        console.warn(`  ❌ Bundle Config not found for: ${handle}`);
    }

    if (!bundleConfig) {
        notFound();
    }

    // Keep the mock fallback just in case the server fetch returns empty for some reason
    let products = allFetchedProducts;
    if (!products || products.length === 0) {
        console.warn("Server fetch returned 0 products, using mock fallback.");
        products = [
            {
                id: 9001,
                title: 'Premium Cotton Polo',
                handle: 'premium-cotton-polo',
                product_type: 'Polo Shirt',
                tags: ['polo', 'workwear'],
                images: [{ src: 'https://wearunifab.com/cdn/shop/files/UC101_Black_Front.jpg', alt: 'Polo' }],
                variants: [{ id: 90011, title: 'M / Black', price: '15.00', option1: 'M', option2: 'Black' }]
            },
            {
                id: 9002,
                title: 'Heavyweight Hoodie',
                handle: 'heavyweight-hoodie',
                product_type: 'Hoodie',
                tags: ['hoodie', 'warm'],
                images: [{ src: 'https://wearunifab.com/cdn/shop/files/UC502_Navy_Front.jpg', alt: 'Hoodie' }],
                variants: [{ id: 90021, title: 'L / Navy', price: '25.00', option1: 'L', option2: 'Navy' }]
            },
            {
                id: 9003,
                title: 'Hi-Vis Safety Vest',
                handle: 'hi-vis-safety-vest',
                product_type: 'Hi-Vis Vest',
                tags: ['hi-vis', 'vest', 'safety'],
                images: [{ src: 'https://wearunifab.com/cdn/shop/files/Yoko_Hiviz_Waistcoat_Yellow_Front.jpg', alt: 'Hi-Vis Vest' }],
                variants: [{ id: 90031, title: 'L / Yellow', price: '5.00', option1: 'L', option2: 'Yellow' }]
            },
            {
                id: 9004,
                title: 'Polar Fleece Jacket',
                handle: 'polar-fleece-jacket',
                product_type: 'Fleece',
                tags: ['fleece', 'jacket'],
                images: [{ src: 'https://wearunifab.com/cdn/shop/files/UC604_Black_Front.jpg', alt: 'Fleece' }],
                variants: [{ id: 90041, title: 'L / Black', price: '20.00', option1: 'L', option2: 'Black' }]
            },
            {
                id: 9005,
                title: 'Technical Softshell',
                handle: 'technical-softshell',
                product_type: 'Softshell',
                tags: ['softshell', 'jacket'],
                images: [{ src: 'https://wearunifab.com/cdn/shop/files/R231M_Black_Front.jpg', alt: 'Softshell' }],
                variants: [{ id: 90051, title: 'L / Black', price: '35.00', option1: 'L', option2: 'Black' }]
            },
            {
                id: 9006,
                title: 'Kids Classic Polo',
                handle: 'kids-classic-polo',
                product_type: 'Polo Shirt',
                tags: ['polo', 'kids', 'children', 'schoolwear'],
                images: [{ src: 'https://wearunifab.com/cdn/shop/files/UC103_Black_Front.jpg', alt: 'Kids Polo' }],
                variants: [{ id: 90061, title: '7-8 / Red', price: '8.00', option1: '7-8', option2: 'Red' }]
            },
            {
                id: 9007,
                title: 'Cuffed Beanie Hat',
                handle: 'cuffed-beanie-hat',
                product_type: 'Accessories',
                tags: ['beanie', 'hat', 'accessories', 'winter'],
                images: [{ src: 'https://wearunifab.com/cdn/shop/files/BC045_Black_Front.jpg', alt: 'Beanie' }],
                variants: [{ id: 90071, title: 'One Size / Black', price: '6.00', option1: 'One Size', option2: 'Black' }]
            },
            {
                id: 9008,
                title: 'Classic Overhead Hoodie',
                handle: 'classic-overhead-hoodie',
                product_type: 'Hoodie',
                tags: ['hoodie'],
                images: [{ src: 'https://wearunifab.com/cdn/shop/files/UC502_Black_Front.jpg', alt: 'Black Hoodie' }],
                variants: [{ id: 90081, title: 'L / Black', price: '25.00', option1: 'L', option2: 'Black' }]
            },
            {
                id: 9009,
                title: 'Premium Full Zip Fleece',
                handle: 'premium-full-zip-fleece',
                product_type: 'Fleece',
                tags: ['fleece'],
                images: [{ src: 'https://wearunifab.com/cdn/shop/files/UC601_Navy_Front.jpg', alt: 'Navy Fleece' }],
                variants: [{ id: 90091, title: 'L / Navy', price: '22.00', option1: 'L', option2: 'Navy' }]
            }
        ] as Product[];
    }

    return <BundleCustomizer initialProducts={products} bundleHandle={handle} initialBundleConfig={bundleConfig} />;
}
