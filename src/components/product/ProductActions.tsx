"use client";

import { useCartStore } from "@/store/cartStore";
import { Product, ProductVariant } from "@/types";
import { useState } from "react";
import { Minus, Plus, Sparkles } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";

interface ProductActionsProps {
    product: Product;
    selectedVariant?: ProductVariant;
}

export default function ProductActions({ product, selectedVariant }: ProductActionsProps) {
    const { addItem, openCart } = useCartStore();
    const [quantity, setQuantity] = useState(1);

    const variantToUse = selectedVariant || product.variants[0];

    const handleAddToCart = () => {
        addItem(product, variantToUse?.id || 0, quantity);
        openCart();
    };

    return (
        <div className="space-y-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Quantity</span>
                <div className="flex items-center border-2 border-zinc-200 rounded-lg bg-white">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 text-zinc-600 hover:bg-zinc-50 disabled:opacity-50"
                        disabled={quantity <= 1}
                    >
                        <Minus size={18} />
                    </button>
                    <span className="w-12 text-center font-bold text-zinc-900">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 text-zinc-600 hover:bg-zinc-50"
                    >
                        <Plus size={18} />
                    </button>
                </div>
            </div>

            <div className="flex gap-4">
                {/* Replaced original Add to Cart button with new component */}
                <AddToCartButton
                    product={product}
                    variantId={selectedVariant?.id}
                    className="w-full"
                    quantity={quantity}
                />
                <button
                    onClick={handleAddToCart}
                    className="px-8 py-4 border-2 border-zinc-200 hover:bg-zinc-50 rounded-xl font-bold text-zinc-700 transition-colors"
                >
                    Buy Now
                </button>
            </div>

            {/* Customize with Logo Button - Only for Bundles */}
            {/* Customize with Logo Button - Only for Bundles */}
            {(() => {
                const tags = product.tags;
                const hasBundleTag = Array.isArray(tags)
                    ? tags.some(tag => tag.toLowerCase().includes('bundle'))
                    : typeof tags === 'string'
                        ? (tags as string).toLowerCase().includes('bundle')
                        : false;

                const isBundle = product.product_type?.toLowerCase().includes('bundle') || hasBundleTag;

                return isBundle && (
                    <Link
                        href={`/bundles/${product.handle}/customize`}
                        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black uppercase tracking-widest text-xs py-5 px-8 rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl mt-4"
                    >
                        <Sparkles size={18} />
                        Customize with Logo
                    </Link>
                );
            })()}

            <p className="text-[10px] text-zinc-500 text-center mt-3 font-medium italic">
                Add embroidery or printing to this product • Free design proof included
            </p>
        </div>
    );
}
