import { fetchCollections } from '@/lib/api';
import CollectionCard from '@/components/collection/CollectionCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'All Collections - Wearunifab Replica',
    description: 'Browse all our premium workwear collections.',
};

export default async function CollectionsPage() {
    const { collections } = await fetchCollections();

    return (
        <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-4xl mb-24">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 mb-4 block">Navigation Matrix</span>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-zinc-950 uppercase italic leading-[0.9] mb-8">
                    Operational <br />
                    <span className="text-gradient">Nodes.</span>
                </h1>
                <p className="text-xl md:text-2xl text-zinc-500 font-medium leading-relaxed max-w-2xl">
                    Access specialized product clusters engineered for specific industrial environments and fleet requirements.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {collections.map((collection) => (
                    <CollectionCard key={collection.id} collection={collection} />
                ))}
            </div>
        </div>
    );

}
