import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { Eye, ShieldCheck, Truck } from 'lucide-react';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const firstVariant = product.variants[0];
    const price = parseFloat(firstVariant?.price || '0');
    const image = product.images[0]?.src;

    return (
        <div className="group relative bg-white rounded-[2.5rem] border-2 border-zinc-100 p-4 transition-all duration-500 hover:border-zinc-950 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden">
            {/* Action Overlay */}
            <div className="absolute top-6 right-6 z-10 flex flex-col gap-3 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <AddToCartButton product={product} showIconOnly />
                <Link
                    href={`/products/${product.handle}`}
                    prefetch={true}
                    className="p-3 bg-white text-zinc-950 rounded-xl shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border border-zinc-100"
                >
                    <Eye size={18} />
                </Link>
            </div>

            {/* Badges */}
            <div className="absolute top-8 left-8 z-10 flex flex-col gap-2">
                {price > 500 && (
                    <span className="bg-zinc-950 text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                        <Truck size={10} className="text-zinc-400" /> Priority Freight
                    </span>
                )}
            </div>

            {/* Product Image Container */}
            <Link href={`/products/${product.handle}`} prefetch={true} className="block">
                <div className="relative aspect-square rounded-[2rem] bg-zinc-50 border-2 border-transparent group-hover:border-zinc-100 transition-all duration-500 p-6 overflow-hidden">
                    {image ? (
                        <Image
                            src={image}
                            alt={product.title}
                            fill
                            className="object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            loading="eager"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em]">Null Asset Data</div>
                    )}
                </div>

                {/* Content */}
                <div className="mt-8 px-2 pb-2">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] italic">{product.vendor}</p>
                        <div className="flex gap-1 text-zinc-300">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 bg-current rounded-full" />
                            ))}
                        </div>
                    </div>

                    <h3 className="text-sm font-black text-zinc-950 uppercase tracking-tight line-clamp-1 mb-4 group-hover:text-zinc-800 transition-colors">
                        {product.title}
                    </h3>

                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Procurement Cost</p>
                            <p className="text-2xl font-black text-zinc-950 tracking-tighter leading-none italic">
                                <span className="text-sm align-top mr-1">£</span>
                                {price.toFixed(2)}
                            </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                            <ShieldCheck size={12} /> Secure
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
