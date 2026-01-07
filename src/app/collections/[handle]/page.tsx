import { fetchCollectionProducts, fetchCollections } from '@/lib/api';
import ProductCard from '@/components/product/ProductCard';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getCategoryBackground } from '@/lib/category-backgrounds';

interface Props {
    params: Promise<{ handle: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { handle } = await params;

    // We might want to fetch collection details here for title, but API separation might make it tricky without extra call.
    // For now, capitalize handle.
    const title = handle.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    return {
        title: `${title} - Wearunifab Replica`,
    };
}

export default async function CollectionPage({ params }: Props) {
    const { handle } = await params;
    const { products } = await fetchCollectionProducts(handle);

    // Get collection details to show title/description if possible.
    // We can fetch all collections and find the one matching handle (since fetchCollections is cached).
    const { collections } = await fetchCollections();
    const collection = collections.find(c => c.handle === handle);

    if (!collection && products.length === 0) {
        // If no valid collection and no products, maybe 404?
        // But products.json might return empty if no products but valid handle?
        // We'll proceed if we have products, or if we found a collection.
        // If neither, 404.
        notFound();
    }

    const categoryBackground = getCategoryBackground(collection?.title || handle);

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section with Category Background */}
            <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
                <Image
                    src={categoryBackground}
                    alt={collection?.title || handle}
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/50 to-white" />

                {/* Content */}
                <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-end pb-12">
                    <div className="space-y-4">
                        <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white border border-white/20">
                            Collection Node
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-none">
                            {collection?.title || handle.replace(/-/g, ' ')}
                        </h1>
                        {collection?.body_html && (
                            <div
                                className="prose prose-invert max-w-2xl text-zinc-300 font-medium"
                                dangerouslySetInnerHTML={{ __html: collection.body_html }}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 py-16">
                {products.length > 0 ? (
                    <>
                        <div className="mb-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                                {products.length} Assets Available
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-32 bg-zinc-50 rounded-[3rem] border-4 border-dashed border-zinc-200">
                        <p className="text-xl font-black text-zinc-400 uppercase tracking-widest">No Assets Found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
