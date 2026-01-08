import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CollectionCard from '@/components/collection/CollectionCard';
import { fetchCollections } from '@/lib/api';

export default async function FeaturedCollections() {
    const { collections } = await fetchCollections();
    const featuredCollections = collections.slice(0, 4);

    return (
        <section className="py-24 md:py-32 bg-transparent">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-2">Navigation Matrix</p>
                        <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic">Operational Nodes</h2>
                    </div>
                    <Link href="/collections" className="bg-zinc-900 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-zinc-800 transition-all flex items-center self-start md:self-auto border border-zinc-800 shadow-lg">
                        View All Nodes <ArrowRight size={16} className="ml-2" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-entry">
                    {featuredCollections.map(collection => (
                        <CollectionCard key={collection.id} collection={collection} />
                    ))}
                </div>
            </div>
        </section>
    );
}
