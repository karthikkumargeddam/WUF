"use client";

import { useWishlistStore } from '@/store/wishlistStore';
import { useEffect, useState } from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import { Heart, ArrowRight, Loader2 } from 'lucide-react';
import { fetchProducts } from '@/lib/api';

export default function WishlistPage() {
    const { wishlist } = useWishlistStore();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadWishlistProducts = async () => {
            if (wishlist.length === 0) {
                setLoading(false);
                setProducts([]);
                return;
            }

            setLoading(true);
            try {
                // Since we don't have a batch ID fetch endpoint yet, we'll fetch all products (cached) 
                // and filter. In a real app with thousands of products, we'd make a specific API endpoint.
                const { products: allProducts } = await fetchProducts(1, 250);
                const wishlistedProducts = allProducts.filter(p => wishlist.includes(p.id));
                setProducts(wishlistedProducts);
            } catch (error) {
                console.error("Failed to load wishlist", error);
            } finally {
                setLoading(false);
            }
        };

        loadWishlistProducts();
    }, [wishlist]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50">
                <Loader2 className="animate-spin text-zinc-900" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900">
            <div className="container mx-auto px-4 py-20">
                <div className="flex items-center gap-4 mb-12">
                    <div className="p-4 bg-red-100 rounded-2xl text-red-600">
                        <Heart size={32} fill="currentColor" />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-950">My Wishlist</h1>
                        <p className="text-zinc-500 font-medium">{wishlist.length} Items Saved</p>
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-12 text-center border-2 border-dashed border-zinc-200">
                        <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart size={40} className="text-zinc-300" />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4">Your List is Empty</h2>
                        <p className="text-zinc-500 max-w-md mx-auto mb-8">
                            Start saving your favorite industrial gear for later. Look for the heart icon on any product card.
                        </p>
                        <Link href="/products" className="inline-flex items-center px-8 py-4 bg-zinc-950 text-white font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform">
                            Browse Catalog <ArrowRight size={20} className="ml-2" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
