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
            className="relative p-2 text-zinc-600 hover:text-zinc-900 transition-colors"
        >
            <ShoppingCart size={24} />
            {count > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                    {count}
                </span>
            )}
        </button>
    );
}
