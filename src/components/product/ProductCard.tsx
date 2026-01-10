"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { Eye, ShieldCheck, Truck, Heart, Share2 } from 'lucide-react';
import AddToCartButton from './AddToCartButton';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useWishlistStore } from '@/store/wishlistStore';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { trackEvent } = useAnalytics();
    const { isInWishlist, toggleItem } = useWishlistStore();
    const isWishlisted = isInWishlist(product.id);

    const firstVariant = product.variants?.[0];
    const price = parseFloat(firstVariant?.price || '0');
    const image = product.images?.[0]?.src;

    const handleProductClick = () => {
        trackEvent('product_click', {
            product_id: product.id,
            title: product.title,
            price: price,
            position: 'collection_grid'
        });
    };

    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const shareUrl = window.location.origin + `/products/${product.handle}`;
        const shareText = `Check out ${product.title} on WearUnifab`;

        if (navigator.share) {
            navigator.share({
                title: product.title,
                text: shareText,
                url: shareUrl,
            }).catch((error) => console.log('Error sharing', error));
        } else {
            // Fallback to WhatsApp
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
            window.open(whatsappUrl, '_blank');
        }
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleItem(product.id);
    };

    return (
        <div className="group relative bg-white dark:bg-gradient-to-b dark:from-zinc-900 dark:to-black rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 p-4 transition-all duration-500 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)_inset] overflow-hidden">
            {/* Action Overlay */}
            <div className="absolute top-6 right-6 z-10 flex flex-col gap-3 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <button
                    onClick={handleWishlist}
                    className={`p-3 rounded-xl shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border ${isWishlisted ? 'bg-red-600 text-white border-red-600' : 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700'}`}
                >
                    <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                </button>

                <AddToCartButton product={product} showIconOnly />

                <Link
                    href={`/products/${product.handle}`}
                    prefetch={true}
                    className="p-3 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-xl shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                >
                    <Eye size={18} />
                </Link>

                <button
                    onClick={handleShare}
                    className="p-3 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-xl shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                >
                    <Share2 size={18} />
                </button>
            </div>

            {/* Badges */}
            <div className="absolute top-8 left-8 z-10 flex flex-col gap-2">
                {price > 500 && (
                    <span className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                        <Truck size={10} className="text-zinc-400 dark:text-zinc-600" /> Priority Freight
                    </span>
                )}
            </div>

            {/* Product Image Container */}
            <Link href={`/products/${product.handle}`} prefetch={true} className="block" onClick={handleProductClick}>
                <div className="relative aspect-square rounded-[2rem] bg-zinc-100 dark:bg-gradient-to-br dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 border-2 border-transparent dark:border-zinc-700/50 group-hover:border-zinc-200 dark:group-hover:border-zinc-600 dark:group-hover:shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] transition-all duration-500 p-6 overflow-hidden">

                    {/* Tech Grid Pattern (Subtle) */}
                    <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '16px 16px' }}
                    />

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
                        <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.2em]">Null Asset Data</div>
                    )}
                </div>

                {/* Content */}
                <div className="mt-8 px-2 pb-2">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] italic">{product.vendor}</p>
                        <div className="flex gap-1 text-zinc-300 dark:text-zinc-600">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 bg-current rounded-full" />
                            ))}
                        </div>
                    </div>

                    <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-tight line-clamp-1 mb-4 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                        {product.title}
                    </h3>

                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">Procurement Cost</p>
                            <p className="text-2xl font-black text-zinc-900 dark:text-white tracking-tighter leading-none italic">
                                <span className="text-sm align-top mr-1">£</span>
                                {price.toFixed(2)}
                            </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                            <ShieldCheck size={12} /> Secure
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
