"use client";

import { useState } from 'react';
import { Product } from '@/types';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { colorMap, getColorHex, sortSizes } from '@/lib/colors';

interface BundleItemSelectorProps {
    category: string;
    categoryLabel: string;
    products: Product[];
    onSelect: (product: Product, variant: any, size: string, color: string) => void;
    selectedProduct?: Product;
}

export default function BundleItemSelector({
    category,
    categoryLabel,
    products,
    onSelect,
    selectedProduct,
}: BundleItemSelectorProps) {
    const [selected, setSelected] = useState<Product | null>(selectedProduct || null);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [isConfirmed, setIsConfirmed] = useState(false);

    // Improved product filtering with multiple strategies
    const filterProducts = () => {
        if (!products || products.length === 0) return [];

        const categoryLower = category.toLowerCase();

        return products.filter(p => {
            const productTypeLower = p.product_type.toLowerCase();
            const titleLower = p.title.toLowerCase();

            // Direct matches
            if (productTypeLower.includes(categoryLower)) return true;
            if (titleLower.includes(categoryLower)) return true;

            // Tag matches
            if (p.tags && p.tags.some(tag => tag.toLowerCase().includes(categoryLower))) return true;

            // Specific category mappings
            if (categoryLower.includes('polo')) {
                if (productTypeLower.includes('polo') || productTypeLower.includes('shirt')) return true;
            }
            if (categoryLower.includes('hoodie')) {
                if (productTypeLower.includes('hoodie') || productTypeLower.includes('sweatshirt')) return true;
            }
            if (categoryLower.includes('jacket') || categoryLower.includes('softshell')) {
                if (productTypeLower.includes('jacket') || productTypeLower.includes('softshell') || productTypeLower.includes('coat')) return true;
            }

            return false;
        });
    };

    const categoryProducts = filterProducts();
    const displayProducts = categoryProducts.length > 0 ? categoryProducts : products.slice(0, 12);

    // Get available sizes and colors from variants
    // const sizes = selected ? sortSizes(Array.from(new Set(
    //     selected.variants.map(v => v.option1).filter(Boolean)
    // ))) : [];
    const sizes = selected
        ? sortSizes(
            Array.from(
                new Set(
                    selected.variants
                        .map(v => v.option1)
                        .filter((v): v is string => typeof v === "string")
                )
            )
        )
        : [];


    const colors = selected ? Array.from(new Set(
        selected.variants.map(v => v.option2).filter(Boolean)
    )) : [];

    const handleProductSelect = (product: Product) => {
        setSelected(product);
        setSelectedSize('');
        setSelectedColor('');
        setIsConfirmed(false);
    };

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);
        setIsConfirmed(false);
    };

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        setIsConfirmed(false);
    };

    const handleConfirm = () => {
        if (selected && selectedSize && selectedColor) {
            const variant = selected.variants.find(v =>
                v.option1 === selectedSize && v.option2 === selectedColor
            );

            if (variant) {
                onSelect(selected, variant, selectedSize, selectedColor);
                setIsConfirmed(true);
            }
        }
    };

    const isComplete = selected && selectedSize && selectedColor;

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-zinc-900 mb-2">
                    Select {categoryLabel}
                </h3>
                <p className="text-sm text-zinc-600">
                    Choose a product from our {categoryLabel.toLowerCase()} collection
                </p>
                {categoryProducts.length === 0 && products.length > 0 && (
                    <p className="text-xs text-amber-600 mt-2 font-medium">
                        ⚠️ No exact matches found. Showing all products.
                    </p>
                )}
            </div>

            {/* Product Grid */}
            {displayProducts.length === 0 ? (
                <div className="text-center py-12 bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200">
                    <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">
                        No products available
                    </p>
                    <p className="text-xs text-zinc-500">
                        Products are still loading. Please wait...
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {displayProducts.slice(0, 12).map((product) => (
                        <button
                            key={product.id}
                            onClick={() => handleProductSelect(product)}
                            className={`relative group text-left bg-white rounded-2xl border-2 transition-all overflow-hidden ${selected?.id === product.id
                                ? 'border-zinc-950 shadow-lg'
                                : 'border-zinc-200 hover:border-zinc-400'
                                }`}
                        >
                            {/* Image */}
                            <div className="relative aspect-square bg-zinc-50">
                                {product.images[0] && (
                                    <Image
                                        src={product.images[0].src}
                                        alt={product.title}
                                        fill
                                        className="object-contain p-4"
                                        sizes="(max-width: 768px) 50vw, 33vw"
                                    />
                                )}
                                {selected?.id === product.id && (
                                    <div className="absolute top-2 right-2 p-2 bg-zinc-950 rounded-full">
                                        <Check size={16} className="text-white" />
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">
                                    {product.product_type}
                                </p>
                                <p className="text-xs font-bold text-zinc-900 line-clamp-2 mb-2">
                                    {product.title}
                                </p>
                                <p className="text-lg font-black text-zinc-950">
                                    £{product.variants[0]?.price}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Size & Color Selection */}
            {selected && (
                <div className="space-y-6 p-8 bg-zinc-50 rounded-2xl border-2 border-zinc-100">
                    <h4 className="text-sm font-black uppercase tracking-widest text-zinc-900">
                        Customize Your Selection
                    </h4>

                    {/* Size */}
                    {sizes.length > 0 && (
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-zinc-600 mb-3">
                                Select Size
                            </label>
                            <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => handleSizeSelect(size || '')}
                                        className={`py-3 px-4 rounded-xl font-black text-sm transition-all ${selectedSize === size
                                            ? 'bg-zinc-950 text-white'
                                            : 'bg-white border-2 border-zinc-200 hover:border-zinc-400'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Color */}
                    {colors.length > 0 && (
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-zinc-600 mb-3">
                                Select Color
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => handleColorSelect(color || '')}
                                        className={`py-3 px-4 rounded-xl font-bold text-sm transition-all text-left ${selectedColor === color
                                            ? 'bg-zinc-950 text-white'
                                            : 'bg-white border-2 border-zinc-200 hover:border-zinc-400'
                                            }`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Confirm Button */}
                    <button
                        onClick={handleConfirm}
                        disabled={!isComplete}
                        className={`w-full py-4 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all duration-300 ${isConfirmed
                            ? 'bg-green-600 hover:bg-green-700 shadow-lg'
                            : 'bg-zinc-950 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed'
                            }`}
                    >
                        {isConfirmed ? (
                            <div className="flex items-center justify-center gap-2">
                                <Check size={18} />
                                Confirmed
                            </div>
                        ) : (
                            isComplete ? 'Confirm Selection' : 'Select Size & Color'
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
