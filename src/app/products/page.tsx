import { getAllProducts } from '@/lib/data';
import ProductCard from '@/components/product/ProductCard';
import Pagination from '@/components/ui/Pagination';
import ProductFilters from '@/components/product/ProductFilters';
import Link from 'next/link';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'All Products - Wearunifab Replica',
    description: 'Shop our complete catalog of workwear and uniforms.',
};

interface Props {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: Props) {
    const params = await searchParams;
    const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
    const categoryFilter = typeof params.category === 'string' ? params.category : null;
    const vendorFilter = typeof params.vendor === 'string' ? params.vendor : null;
    const sortFilter = typeof params.sort === 'string' ? params.sort : 'newest';

    // Fetch all products directly from Shopify
    const allProducts = await getAllProducts();

    // Get unique categories and vendors for filters from the full list
    const categories = Array.from(new Set(allProducts.map(p => p.product_type))).sort();
    const vendors = Array.from(new Set(allProducts.map(p => p.vendor))).sort();

    // Apply Filters
    let filteredProducts = [...allProducts];

    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(p => p.product_type === categoryFilter);
    }

    if (vendorFilter) {
        filteredProducts = filteredProducts.filter(p => p.vendor === vendorFilter);
    }

    // Apply Sorting
    switch (sortFilter) {
        case 'price-asc':
            filteredProducts.sort((a, b) => parseFloat(a.variants[0]?.price || '0') - parseFloat(b.variants[0]?.price || '0'));
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => parseFloat(b.variants[0]?.price || '0') - parseFloat(a.variants[0]?.price || '0'));
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            // "newest" is default order from API usually
            break;
    }

    // Pagination (Client-side simulation of server data for UI)
    const displayLimit = 40;
    const totalFiltered = filteredProducts.length;
    const paginatedProducts = filteredProducts.slice((page - 1) * displayLimit, page * displayLimit);
    const hasNextPage = totalFiltered > page * displayLimit;

    return (
        <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="flex flex-col lg:flex-row gap-20">
                {/* Sidebar */}
                <aside className="lg:w-80 shrink-0">
                    <Suspense fallback={<div className="w-full lg:w-80 space-y-12 flex-shrink-0"><div className="bg-zinc-100 p-8 rounded-[2.5rem] h-64 animate-pulse" /></div>}>
                        <ProductFilters categories={categories} vendors={vendors} />
                    </Suspense>
                </aside>

                {/* Content */}
                <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-2 block">Asset Registry</span>
                            <h1 className="text-5xl md:text-7xl font-black text-zinc-950 tracking-tighter uppercase italic leading-none">
                                All <span className="text-gradient">Assets.</span>
                            </h1>
                            <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mt-4">{totalFiltered} Units in Operational Registry</p>
                        </div>
                    </div>

                    {paginatedProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 stagger-entry">
                            {paginatedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 bg-zinc-50 rounded-[3rem] border-4 border-dashed border-zinc-200">
                            <p className="text-xl font-black text-zinc-400 uppercase tracking-widest">No matching assets found</p>
                            <Link href="/products" className="text-zinc-950 font-black border-b-2 border-zinc-950 hover:text-zinc-600 transition-colors uppercase tracking-widest text-xs mt-4 inline-block">Reset Filtration Protocol</Link>
                        </div>
                    )}

                    <div className="mt-20 pt-10 border-t border-zinc-100">
                        <Pagination
                            currentPage={page}
                            hasNextPage={hasNextPage}
                            baseUrl="/products"
                            extraParams={{
                                category: categoryFilter || undefined,
                                vendor: vendorFilter || undefined,
                                sort: sortFilter !== 'newest' ? sortFilter : undefined
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

}
