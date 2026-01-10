"use client";

import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartButton() {
    const { toggleCart, getItemCount } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    const count = mounted ? getItemCount() : 0;

    return (
        <button
            onClick={toggleCart}
            className="relative p-2 text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-500 transition-all duration-300 hover:scale-110"
        >
            <ShoppingCart size={24} className="drop-shadow-lg transition-all" />
            {count > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-900 shadow-lg animate-pulse">
                    {count}
                </span>
            )}
        </button>
    );
}
