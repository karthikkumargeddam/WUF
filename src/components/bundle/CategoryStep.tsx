"use client";

import { useState, useEffect } from 'react';
import { Product, BundleItem } from '@/types';
import Image from 'next/image';
import { Check, ChevronLeft, Shirt } from 'lucide-react';
import { sortSizes } from '@/lib/colors';

interface CategoryStepProps {
    category: string;
    categoryLabel: string;
    items: BundleItem[]; // The items in this bundle that belong to this category
    products: Product[]; // Available products for this category
    onUpdateItem: (itemId: string, updates: Partial<BundleItem>) => void;
    onComplete: () => void;
}

export default function CategoryStep({
    category,
    categoryLabel,
    items,
    products,
    onUpdateItem,
    onComplete
}: CategoryStepProps) {
    // State to track which product style is being used for the slots
    // In a simple flow, user picks one style for all slots in this step.
    // If they want to mix, we could allow clearing a slot.
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Auto-select product if all items already have the same product
    useEffect(() => {
        const firstProductId = items[0]?.productId;
        if (firstProductId && items.every(i => i.productId === firstProductId)) {
            const product = products.find(p => p.id === firstProductId);
            if (product) setSelectedProduct(product);
        }
    }, [items, products]);

    // Derived state for filtered products
    const displayProducts = products.filter(p => {
        const catLower = category.toLowerCase();
        const typeLower = p.product_type.toLowerCase();
        // Basic filter logic matching BundleItemSelector
        const matchesCategory = typeLower.includes(catLower) ||
            p.tags.some(t => t.toLowerCase().includes(catLower));

        // Expanded fuzzy matching for common mismatches
        const matchesFuzzy =
            (catLower.includes('polo') && typeLower.includes('shirt')) ||
            (catLower.includes('hi-vis') && (typeLower.includes('vest') || typeLower.includes('safety') || p.tags.some(t => t.toLowerCase().includes('vest')))) ||
            (catLower.includes('fleece') && typeLower.includes('jacket'));

        return matchesCategory || matchesFuzzy;
    });

    // Fallback: If strict filtering returns nothing, show everything (better than empty screen)
    // especially for fallback categories like 'workwear'
    const finalDisplayProducts = displayProducts.length > 0 ? displayProducts : products;

    const handleProductSelect = (product: Product) => {
        setSelectedProduct(product);
        // Pre-fill empty items with this product
        items.forEach(item => {
            if (!item.productId) {
                onUpdateItem(item.id, {
                    productId: product.id,
                    productHandle: product.handle,
                    productTitle: product.title,
                    productImage: product.images[0]?.src,
                });
            }
        });
    };

    const handleVariantUpdate = (itemId: string, size: string, color: string) => {
        if (!selectedProduct) return;

        // Find variant matching size/color
        const variant = selectedProduct.variants.find(v =>
            v.option1 === size && v.option2 === color
        );

        if (variant) {
            onUpdateItem(itemId, {
                variantId: variant.id,
                size,
                color,
                price: parseFloat(variant.price),
                // Ensure product details are consistent (in case mixed)
                productId: selectedProduct.id,
                productHandle: selectedProduct.handle,
                productTitle: selectedProduct.title,
                productImage: selectedProduct.images[0]?.src,
            });
        }
    };

    const isStepComplete = items.every(item => item.productId && item.variantId);

    // View: Product Selection Grid
    if (!selectedProduct) {
        return (
            <div className="space-y-6">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                        Select {categoryLabel} Style
                    </h3>
                    <p className="text-zinc-500">
                        Choose a style for your {items.length} {categoryLabel.toLowerCase()}
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {finalDisplayProducts.map(product => (
                        <button
                            key={product.id}
                            onClick={() => handleProductSelect(product)}
                            className="group relative bg-white border-2 border-zinc-100 rounded-2xl p-4 text-left hover:border-zinc-900 hover:shadow-xl transition-all"
                        >
                            <div className="aspect-square relative mb-4 bg-zinc-50 rounded-xl overflow-hidden">
                                {product.images[0] && (
                                    <Image
                                        src={product.images[0].src}
                                        alt={product.title}
                                        fill
                                        className="object-contain p-2 group-hover:scale-110 transition-transform"
                                    />
                                )}
                            </div>
                            <h4 className="font-bold text-sm text-zinc-900 leading-tight mb-1">{product.title}</h4>
                            <p className="text-xs text-zinc-500">{product.variants.length} Options</p>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // View: Variant Selection (Size/Color for each slot)
    const sizes = sortSizes(Array.from(new Set(selectedProduct.variants.map(v => v.option1 as string).filter(Boolean))));
    const colors = Array.from(new Set(selectedProduct.variants.map(v => v.option2 as string).filter(Boolean)));

    return (
        <div className="space-y-8">
            {/* Header / Back */}
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-zinc-50 rounded-lg p-2 border border-zinc-200">
                        {selectedProduct.images[0] && (
                            <Image
                                src={selectedProduct.images[0].src}
                                width={64}
                                height={64}
                                alt={selectedProduct.title}
                                className="object-contain w-full h-full"
                            />
                        )}
                    </div>
                    <div>
                        <h3 className="font-black text-lg text-zinc-900">{selectedProduct.title}</h3>
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="text-xs font-bold text-zinc-500 hover:text-zinc-900 underline flex items-center gap-1"
                        >
                            <ChevronLeft size={12} /> Change Style
                        </button>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Required</p>
                    <p className="text-2xl font-black text-zinc-900">{items.length} Items</p>
                </div>
            </div>

            {/* Slots Configuration */}
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={item.id} className="bg-zinc-50 rounded-xl p-4 border-2 border-zinc-100 flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <div className="flex items-center gap-3 w-32 shrink-0">
                            <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-sm">
                                {index + 1}
                            </div>
                            <span className="font-bold text-sm text-zinc-900">{categoryLabel} #{index + 1}</span>
                        </div>

                        <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                            {/* Size Selector */}
                            <div className="relative">
                                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Size</label>
                                <select
                                    className="w-full h-10 px-3 rounded-lg border border-zinc-300 text-sm font-bold bg-white focus:ring-2 focus:ring-zinc-900 outline-none appearance-none text-zinc-900"
                                    value={item.size || ''}
                                    onChange={(e) => handleVariantUpdate(item.id, e.target.value, item.color || colors[0])}
                                >
                                    <option value="">Select...</option>
                                    {sizes.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            {/* Color Selector */}
                            <div className="relative">
                                <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Color</label>
                                <select
                                    className="w-full h-10 px-3 rounded-lg border border-zinc-300 text-sm font-bold bg-white focus:ring-2 focus:ring-zinc-900 outline-none appearance-none text-zinc-900"
                                    value={item.color || ''}
                                    onChange={(e) => handleVariantUpdate(item.id, item.size || sizes[0], e.target.value)}
                                >
                                    <option value="">Select...</option>
                                    {colors.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Status Icon */}
                        <div className="shrink-0 pt-4 md:pt-0">
                            {item.variantId ? (
                                <Check className="text-green-500" size={24} />
                            ) : (
                                <div className="w-6 h-6 rounded-full border-2 border-dashed border-zinc-300" />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Complete Action */}
            <div className="pt-6 border-t border-zinc-100">
                <button
                    onClick={onComplete}
                    disabled={!isStepComplete}
                    className="w-full py-4 bg-zinc-950 text-white rounded-xl font-black uppercase tracking-widest text-sm hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    Continue to Next Step
                </button>
            </div>
        </div>
    );
}
