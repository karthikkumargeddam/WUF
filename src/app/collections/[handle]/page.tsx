import { getAllProducts } from '@/lib/data';
import { fetchCollectionProducts } from '@/lib/api';
import ProductCard from '@/components/product/ProductCard';
import { Metadata } from 'next';
import { Product } from '@/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getCategoryBackground } from '@/lib/category-backgrounds';
import Pagination from '@/components/ui/Pagination';

interface Props {
    params: Promise<{ handle: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { handle } = await params;
    const title = handle.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return { title: `${title} - Wearunifab Replica` };
}

const HANDLE_TO_PRODUCT_TYPES: Record<string, string[]> = {
    'hoodies': ['Hood', 'Sweatshirt'],
    'men-hoodies': ['Hood', 'Sweatshirt'],
    'women-hoodies': ['Hood', 'Sweatshirt'],
    'kids-hoodies': ['Hood', 'Sweatshirt'],
    'polos': ['Polo', 'Polos'],
    'men-polo-shirts': ['Polo', 'Polos'],
    'women-polo-shirts': ['Polo', 'Polos'],
    'kids-polo-shirts': ['Polo', 'Polos'],
    't-shirts': ['T-Shirt', 'T-Shirts'],
    'men-t-shirts': ['T-Shirt', 'T-Shirts'],
    'women-t-shirts': ['T-Shirt', 'T-Shirts'],
    'kids-t-shirts': ['T-Shirt', 'T-Shirts'],
    'hi-viz': ['Waistcoat'],
    'high-visibility-gear': ['Waistcoat', 'Jacket'],
    'jackets': ['Jacket', 'Jackets', 'Soft Shell', 'Fleece', 'Gilet'],
    'men-jackets': ['Jacket', 'Jackets', 'Soft Shell', 'Fleece', 'Gilet'],
    'women-jackets': ['Jacket', 'Jackets', 'Soft Shell', 'Fleece', 'Gilet'],
    'kids-jackets': ['Jacket', 'Jackets', 'Soft Shell', 'Fleece', 'Gilet'],
    'knitwear': ['Jumper', 'Cardigan'],
    'men-sweatshirts': ['Sweatshirt', 'Jumper'],
    'women-sweatshirts': ['Sweatshirt', 'Jumper'],
    'kids-sweatshirts': ['Sweatshirt', 'Jumper'],
    'trousers': ['Trousers'],
    'hospitality': ['Tunic', 'Apron', 'Tabard'],
    'chefswear-catering': ['Apron', 'Tabard'],
    'health-salon-beauty': ['Tunic', 'Tabard'],
    'headwear': ['Headwear'],
    'workwear': ['Jacket', 'Trousers', 'Waistcoat', 'Soft Shell'],
    'fleece-bundles-embroidery-only': ['Fleece', 'Bundle'],
    'hoodie-bundles': ['Hood', 'Sweatshirt', 'Bundle'],
    'hospitality-bundles': ['Tunic', 'Apron', 'Tabard', 'Bundle'],
    'high-visibility-bundles': ['Waistcoat', 'Bundle'],
    'polo-bundles': ['Polo', 'Bundle'],
    'premium-bundles-embroidery-only': ['Polo', 'Bundle'],
    'salon-and-beauty-bundles': ['Tunic', 'Bundle'],
    'start-up-bundles': ['Polo', 'T-Shirt', 'Bundle', 'Starter'],
    't-shirt-bundles': ['T-Shirt', 'Bundle'],
    'winter-bundles': ['Jacket', 'Fleece', 'Bundle'],
};

export default async function CollectionPage({ params, searchParams }: Props) {
    const { handle } = await params;
    const resolvedSearchParams = await searchParams;
    const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1;
    const limit = 250;

    const normalizedHandle = handle.toLowerCase();
    let products: Product[] = [];
    let source = 'unknown';

    console.log(`\n--- COLLECTION REQUEST: ${handle} ---`);

    // 1. Try fetching directly from Shopify Collection API first
    try {
        console.log(`🔍 Shopify API fetch for: ${handle}`);
        const response = await fetchCollectionProducts(handle, page, limit);
        if (response.products && response.products.length > 0) {
            products = response.products;
            source = 'shopify';
            console.log(`✅ Shopify API found ${products.length} products`);
        } else {
            console.log(`⚠️ Shopify API returned 0 products for handle: ${handle}`);
        }
    } catch (error) {
        console.error(`❌ Shopify API error for ${handle}:`, error);
    }

    // 2. Fallback to manual filtering
    if (products.length === 0) {
        console.log(`🔄 Manual filtering fallback for: ${handle}`);
        const allProducts = await getAllProducts();
        console.log(`Total products available for filtering: ${allProducts.length}`);

        products = allProducts.filter(product => {
            const prodType = (product.product_type || '').toUpperCase();
            const prodTitle = (product.title || '').toUpperCase();
            const prodTags = (product.tags || []).map(t => t.toUpperCase());

            // 2a. Check mapping table (types or titles)
            const mappedKeywords = HANDLE_TO_PRODUCT_TYPES[normalizedHandle] || [];
            const isMapped = mappedKeywords.some((keyword: string) => {
                const upperK = keyword.toUpperCase();
                return prodType.includes(upperK) || prodTitle.includes(upperK);
            });
            if (isMapped) return true;

            // 2b. Direct handle match logic
            const slugifiedTitle = (product.title || '').toLowerCase().replace(/\s+/g, '-');
            if (slugifiedTitle.includes(normalizedHandle)) return true;

            // 2c. Generic Bundle Check
            if (normalizedHandle.includes('bundle')) {
                if (prodType.includes('BUNDLE') || prodTitle.includes('BUNDLE') || prodTags.includes('BUNDLE')) {
                    // Try to match specific words from the handle in the title
                    const handleWords = normalizedHandle.split('-').filter(w => w !== 'bundles' && w !== 'bundle');
                    if (handleWords.length === 0) return true; // generic bundles handle
                    return handleWords.some(word =>
                        prodTitle.includes(word.toUpperCase()) ||
                        prodType.includes(word.toUpperCase())
                    );
                }
            }

            return false;
        });
        source = 'manual';
        console.log(`✅ Manual filtering found ${products.length} products for ${handle}`);
        if (products.length === 0) {
            console.log('Sample of first 3 products available:', allProducts.slice(0, 3).map(p => ({ title: p.title, type: p.product_type })));
        }
    }

    // Mock collection object for title display
    const collection = {
        id: 'collection-' + handle,
        title: handle.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        handle: handle,
        description: `Collection of ${handle.replace(/-/g, ' ')}`,
        products_count: products.length,
    };

    if (products.length === 0 && handle !== 'all') {
        notFound();
    }

    const categoryBackground = getCategoryBackground(collection?.title || handle);

    return (
        <div className="bg-slate-50 min-h-screen relative overflow-hidden">
            {/* Cinematic 3D Motion Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-white via-slate-200 to-transparent rounded-full blur-[120px] opacity-80 animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-gradient-to-tl from-zinc-300 via-slate-100 to-transparent rounded-full blur-[100px] opacity-60" />
                <div className="absolute top-[30%] left-[20%] w-[40%] h-[40%] bg-gradient-to-r from-slate-200 to-zinc-100 rounded-full blur-[150px] opacity-40 animate-pulse" style={{ animationDuration: '7s' }} />
            </div>

            {/* Hero Section */}
            <div className="relative h-[40vh] min-h-[300px] overflow-hidden z-10 shadow-2xl">
                <Image
                    src={categoryBackground}
                    alt={collection?.title || handle}
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/50 to-slate-50" />

                <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-end pb-12">
                    <div className="space-y-4">
                        <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white border border-white/20">
                            Collection Node • {source === 'shopify' ? 'Direct Sync' : 'System Filtered'}
                            {products.length === 0 && ' (EMPTY)'}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-none">
                            {collection?.title || handle.replace(/-/g, ' ')}
                        </h1>


                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 py-16 relative z-10">
                {products.length > 0 ? (
                    <>
                        <div className="mb-10 flex items-center justify-between">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                                {products.length} Assets Found
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {products.length >= limit && (
                            <Pagination
                                currentPage={page}
                                hasNextPage={true}
                                baseUrl={`/collections/${handle}`}
                            />
                        )}
                    </>
                ) : (
                    <div className="text-center py-32 bg-white/50 backdrop-blur-sm rounded-[3rem] border-4 border-dashed border-zinc-200">
                        <p className="text-xl font-black text-zinc-400 uppercase tracking-widest">No Assets Found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
