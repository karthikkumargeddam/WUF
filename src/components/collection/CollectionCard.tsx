import Link from 'next/link';
import Image from 'next/image';
import { Collection } from '@/types';
import { ArrowRight } from 'lucide-react';
import { getCategoryBackground } from '@/lib/category-backgrounds';

interface CollectionCardProps {
    collection: Collection;
}

const CollectionCard = ({ collection }: CollectionCardProps) => {
    // Use collection image, or category-specific background, or fallback
    const imageSrc = collection.image?.src || getCategoryBackground(collection.title);

    return (
        <Link href={`/collections/${collection.handle}`} prefetch={true} className="group block relative overflow-hidden rounded-[3rem] bg-zinc-950 aspect-[4/5] border-4 border-zinc-100 hover:border-zinc-900 transition-all duration-700 shadow-xl hover:shadow-2xl translate-z-0">
            <Image
                src={imageSrc}
                alt={collection.title}
                fill
                className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-in-out opacity-60 group-hover:opacity-100"
                sizes="(max-width: 768px) 100vw, 33vw"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90 transition-opacity duration-700" />

            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="space-y-3">
                    <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 border border-white/10 group-hover:bg-white group-hover:text-zinc-950 transition-all duration-500">
                        Operational Node
                    </span>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none group-hover:translate-x-2 transition-transform duration-500">
                        {collection.title}
                    </h3>
                    <div className="flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Initialize Deployment</span>
                        <ArrowRight size={14} className="text-white group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>

            {/* Border Accent */}
            <div className="absolute top-6 left-6 w-12 h-0.5 bg-white/30 group-hover:w-20 group-hover:bg-white transition-all duration-700" />
        </Link>
    );

};

export default CollectionCard;
