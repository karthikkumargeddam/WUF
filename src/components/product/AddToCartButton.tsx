"use client";

import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
    product: Product;
    variantId?: number;
    className?: string;
    showIconOnly?: boolean;
}

export default function AddToCartButton({
    product,
    variantId,
    className,
    showIconOnly = false
}: AddToCartButtonProps) {
    const { addItem } = useCartStore();
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsAdding(true);
        addItem(product, variantId);

        // Brief delay for visual feedback
        setTimeout(() => setIsAdding(false), 500);
    };

    if (showIconOnly) {
        return (
            <button
                onClick={handleAdd}
                disabled={isAdding}
                className={`p-3 bg-zinc-950 text-white rounded-xl shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 ${className}`}
                aria-label="Add to cart"
            >
                <ShoppingCart size={18} className={isAdding ? "animate-bounce" : ""} />
            </button>
        );
    }

    return (
        <button
            onClick={handleAdd}
            disabled={isAdding}
            className={`flex items-center justify-center gap-3 bg-zinc-950 text-white font-black uppercase tracking-widest text-xs py-5 px-8 rounded-2xl shadow-2xl hover:bg-zinc-800 hover:scale-[1.02] active:scale-95 transition-all duration-300 ${className}`}
        >
            <ShoppingCart size={18} className={isAdding ? "animate-bounce" : ""} />
            {isAdding ? "System Updating..." : "Initiate Procurement"}
        </button>
    );
}
