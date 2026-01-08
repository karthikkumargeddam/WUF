import { fetchCollectionProducts, fetchCollections } from '@/lib/api';
import ProductCard from '@/components/product/ProductCard';
import { Metadata } from 'next';
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

export default async function CollectionPage({ params, searchParams }: Props) {
    const { handle } = await params;
    const resolvedSearchParams = await searchParams;
    const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1;
    const limit = 15;

    const { products } = await fetchCollectionProducts(handle, page, limit);

    // ... (existing logic for collection/background)
    const { collections } = await fetchCollections();
    const collection = collections.find(c => c.handle === handle);

    if (!collection && products.length === 0) {
        // ... (existing notFound logic)
        notFound();
    }

    const categoryBackground = getCategoryBackground(collection?.title || handle);

    return (
        <div className="bg-slate-50 min-h-screen relative overflow-hidden">
            {/* Cinematic 3D Motion Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Orb 1: Top Left - Lighting Source */}
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-white via-slate-200 to-transparent rounded-full blur-[120px] opacity-80 animate-pulse" style={{ animationDuration: '4s' }} />

                {/* Orb 2: Bottom Right - Depth Shadow */}
                <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-gradient-to-tl from-zinc-300 via-slate-100 to-transparent rounded-full blur-[100px] opacity-60" />

                {/* Orb 3: Floating Accent - Tech Blue/Silver */}
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
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/50 to-slate-50" />

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
            <div className="container mx-auto px-4 py-16 relative z-10">
                {products.length > 0 ? (
                    <>
                        <div className="mb-10 flex items-center justify-between">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                                Page {page} • {products.length} Assets
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <Pagination
                            currentPage={page}
                            hasNextPage={products.length === limit}
                            baseUrl={`/collections/${handle}`}
                        />
                    </>
                ) : (
                    <div className="text-center py-32 bg-white/50 backdrop-blur-sm rounded-[3rem] border-4 border-dashed border-zinc-200">
                        <p className="text-xl font-black text-zinc-400 uppercase tracking-widest">No Assets Found on Page {page}</p>
                        {page > 1 && (
                            <div className="mt-4">
                                <Pagination
                                    currentPage={page}
                                    hasNextPage={false}
                                    baseUrl={`/collections/${handle}`}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
