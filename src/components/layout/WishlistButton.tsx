"use client";

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useEffect, useState } from 'react';

export default function WishlistButton() {
    const { wishlist } = useWishlistStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="relative p-2 text-zinc-900 dark:text-white">
                <Heart size={24} />
            </div>
        );
    }

    return (
        <Link href="/wishlist" className="relative p-2 text-zinc-900 dark:text-white hover:text-red-600 dark:hover:text-red-500 transition-all duration-300 hover:scale-110 group">
            <Heart size={24} className="group-hover:fill-red-500 drop-shadow-lg transition-all" />

            {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-zinc-900 shadow-lg animate-pulse">
                    {wishlist.length}
                </span>
            )}
        </Link>
    );
}
