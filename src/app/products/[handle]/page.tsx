import { fetchProduct, fetchCollectionProducts } from '@/lib/api';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductMainContent from '@/components/product/ProductMainContent';
import ProductCard from '@/components/product/ProductCard';

interface Props {
    params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { handle } = await params;
    const product = await fetchProduct(handle);

    if (!product) return { title: 'Product Not Found' };

    const description = product.body_html?.replace(/<[^>]*>/g, '').slice(0, 160) || 'Premium industrial workwear';
    const image = product.images[0]?.src || '';

    return {
        title: `${product.title} - Wearunifab Replica`,
        description,
        openGraph: {
            title: product.title,
            description,
            images: [image],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: product.title,
            description,
            images: [image],
        },
    };
}

export default async function ProductPage({ params }: Props) {
    const { handle } = await params;
    const product = await fetchProduct(handle);

    if (!product) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        image: product.images.map(img => img.src),
        description: product.body_html?.replace(/<[^>]*>/g, ''),
        brand: {
            '@type': 'Brand',
            name: product.vendor,
        },
        offers: {
            '@type': 'Offer',
            price: product.variants[0]?.price,
            priceCurrency: 'GBP',
            availability: 'https://schema.org/InStock',
        },
    };

    // Logic for related products: Fetch from the same category
    // Since we don't have a direct category search by type, 
    // we'll fetch from the collection if possible or just some products.
    // For simplicity, we'll fetch general products and filter by type.
    const { products: allRelated } = await fetchCollectionProducts('all', 10);
    const relatedProducts = allRelated
        .filter(p => p.id !== product.id && p.product_type === product.product_type)
        .slice(0, 4);

    return (
        <div className="bg-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Breadcrumbs */}
            <div className="bg-zinc-50 border-b border-zinc-100 py-4 mb-8">
                <nav className="container mx-auto px-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
                    <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/products" className="hover:text-zinc-900 transition-colors">Products</Link>
                    <ChevronRight size={14} />
                    <span className="text-zinc-900 truncate max-w-[200px]">{product.title}</span>
                </nav>
            </div>

            <div className="container mx-auto px-4">
                <ProductMainContent product={product} />

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-32 mb-20">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-2xl font-black text-zinc-900 tracking-tight uppercase">You May Also Like</h2>
                            <Link href="/products" className="text-sm font-bold text-zinc-500 hover:text-zinc-900 underline underline-offset-4">
                                View Entire Catalog
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
