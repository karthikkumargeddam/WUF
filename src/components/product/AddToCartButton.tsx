"use client";

import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { Product } from "@/types";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
    product: Product;
    variantId?: number;
    className?: string;
    showIconOnly?: boolean;
    quantity?: number;
}

export default function AddToCartButton({
    product,
    variantId,
    className = "",
    showIconOnly = false,
    quantity = 1
}: AddToCartButtonProps) {
    const addItem = useCartStore((state) => state.addItem);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const router = useRouter();
    const [isAdding, setIsAdding] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { trackEvent } = useAnalytics();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!product) return null;

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (mounted && !isAuthenticated) {
            router.push(`/login?redirect=/products/${product.handle}`);
            return;
        }

        const price = product.variants?.find(v => v.id === variantId)?.price || product.variants?.[0]?.price;

        trackEvent('add_to_cart', {
            product_id: product.id,
            title: product.title,
            variant_id: variantId,
            price: price,
            quantity: quantity
        });

        setIsAdding(true);
        addItem(product, variantId, quantity);

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
            {isAdding ? "System Updating..." : (mounted && isAuthenticated ? "Initiate Procurement" : "Login to Procure")}
        </button>
    );
}
