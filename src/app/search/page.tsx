import { searchProducts } from '@/lib/api';
import ProductCard from '@/components/product/ProductCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Search Results - Wearunifab Replica',
    description: 'Search results for your query.',
};

interface Props {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: Props) {
    const params = await searchParams;
    const query = typeof params.q === 'string' ? params.q : '';

    const products = query ? await searchProducts(query) : [];

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                    {query ? `Search Results for \u0022${query}\u0022` : 'Search Our Catalog'}
                </h1>
                <p className="text-zinc-500 mt-2">
                    {products.length} {products.length === 1 ? 'result' : 'results'} found
                </p>
            </div>

            {products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-zinc-50 rounded-lg border border-dashed border-zinc-300">
                    <p className="text-lg text-zinc-600 mb-2">No matches found for &quot;{query}&quot;</p>
                    <p className="text-sm text-zinc-400">Try checking your spelling or using different keywords.</p>
                </div>
            )}
        </div>
    );
}
