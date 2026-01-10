"use client";

import { useState, useEffect } from 'react';
import { Product, BundleItem } from '@/types';
import Image from 'next/image';
import { Check, ChevronLeft, Shirt, Sparkles, Filter, SlidersHorizontal } from 'lucide-react';
import { sortSizes } from '@/lib/colors';

interface CategoryStepProps {
    category: string;
    categoryLabel: string;
    items: BundleItem[];
    products: Product[];
    onUpdateItem: (itemId: string, updates: Partial<BundleItem>) => void;
    onComplete: () => void;
    isEmbedded?: boolean;
}

export default function CategoryStep({
    category,
    categoryLabel,
    items,
    products,
    onUpdateItem,
    onComplete,
    isEmbedded
}: CategoryStepProps) {
    // track which item is currently choosing a product style
    const [pickingForId, setPickingForId] = useState<string | null>(null);

    const handleProductSelect = (itemId: string, product: Product) => {
        const firstVariant = product.variants[0];
        onUpdateItem(itemId, {
            productId: product.id,
            productHandle: product.handle,
            productTitle: product.title,
            productImage: product.images[0]?.src,
            variantId: firstVariant?.id,
            size: firstVariant?.option1,
            color: firstVariant?.option2,
            price: parseFloat(firstVariant?.price || '0'),
            productSku: firstVariant?.sku,
        });
        setPickingForId(null);
    };

    const handleVariantUpdate = (itemId: string, productId: string | number, size: string, color: string) => {
        const product = products.find(p => String(p.id) === String(productId));
        if (!product) return;

        const variant = product.variants.find(v => v.option1 === size && v.option2 === color);
        if (variant) {
            onUpdateItem(itemId, {
                variantId: variant.id,
                size,
                color,
                price: parseFloat(variant.price),
                productSku: variant.sku,
            });
        }
    };

    const isStepComplete = items.every(item => item.productId && item.variantId);

    // Filtered products for this category
    const categoryProducts = products;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header with Title - Darker text */}
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
                <div className="space-y-1">
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                        {categoryLabel} <span className="text-blue-600">Selection</span>
                    </h3>
                    <p className="text-[11px] font-bold text-gray-600 uppercase tracking-widest">
                        Configure each item individually
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {items.map((item, index) => {
                    const itemProduct = products.find(p => String(p.id) === String(item.productId));
                    const isPicking = pickingForId === item.id;

                    return (
                        <div key={item.id} className="relative">
                            <div className={`bg-white rounded-3xl p-5 md:p-6 border transition-all duration-300 shadow-sm ${item.variantId ? 'border-gray-200' : 'border-blue-100 bg-blue-50/10'
                                }`}>
                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                    {/* Item Number & Mini Thumbnail */}
                                    <div className="flex items-center gap-4 md:w-48 shrink-0">
                                        <div className="w-10 h-10 rounded-2xl bg-gray-900 text-white flex items-center justify-center font-black text-sm shadow-lg">
                                            {index + 1}
                                        </div>
                                        <div className="min-w-0">
                                            {itemProduct ? (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 p-1 shrink-0 relative">
                                                        <Image src={item.productImage || ''} fill alt="" className="object-contain p-0.5" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-[10px] font-bold text-gray-900 uppercase tracking-wide truncate">{itemProduct.vendor}</p>
                                                        <p className="text-xs font-black text-gray-900 uppercase tracking-tight truncate line-clamp-1">{item.productTitle}</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-0.5">
                                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Style Required</p>
                                                    <p className="text-xs font-bold text-gray-600 uppercase tracking-tight">Slot {index + 1}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Main Actions Area */}
                                    <div className="flex-1 w-full">
                                        {!itemProduct ? (
                                            <button
                                                onClick={() => setPickingForId(isPicking ? null : item.id)}
                                                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-xs transition-all shadow-md group"
                                            >
                                                <Shirt size={16} className="group-hover:scale-120 transition-transform" />
                                                Choose Style for Slot {index + 1}
                                            </button>
                                        ) : (
                                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-900">Style</label>
                                                    <button
                                                        onClick={() => setPickingForId(item.id)}
                                                        className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white hover:border-blue-500 text-xs font-black text-gray-900 uppercase tracking-tight flex items-center justify-between transition-all"
                                                    >
                                                        Change <ChevronLeft size={14} className="rotate-270" />
                                                    </button>
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-900">Size</label>
                                                    <select
                                                        className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white focus:border-black focus:ring-1 focus:ring-black outline-none text-xs font-black text-gray-900 uppercase tracking-tight transition-all cursor-pointer"
                                                        value={item.size || ''}
                                                        onChange={(e) => handleVariantUpdate(item.id, item.productId!, e.target.value, item.color || '')}
                                                    >
                                                        <option value="" disabled>Size...</option>
                                                        {sortSizes(Array.from(new Set(itemProduct.variants.map(v => v.option1 as string).filter(Boolean)))).map(s => (
                                                            <option key={s} value={s}>{s}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="space-y-1 col-span-2 lg:col-span-1">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-900">Color</label>
                                                    <select
                                                        className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white focus:border-black focus:ring-1 focus:ring-black outline-none text-xs font-black text-gray-900 uppercase tracking-tight transition-all cursor-pointer"
                                                        value={item.color || ''}
                                                        onChange={(e) => handleVariantUpdate(item.id, item.productId!, item.size || '', e.target.value)}
                                                    >
                                                        <option value="" disabled>Color...</option>
                                                        {Array.from(new Set(itemProduct.variants.map(v => v.option2 as string).filter(Boolean))).map(c => (
                                                            <option key={c} value={c}>{c}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Status Icon */}
                                    <div className="shrink-0 hidden md:block">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm ${item.variantId ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-300'
                                            }`}>
                                            {item.variantId ? <Check size={20} className="stroke-[3]" /> : <div className="w-2 h-2 rounded-full bg-gray-400" />}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Product Picking Grid Overlay (Inline) */}
                            {isPicking && (
                                <div className="mt-4 bg-gray-50 rounded-3xl p-6 border border-gray-200 shadow-inner animate-in fade-in zoom-in-95 duration-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Select Style for Slot {index + 1}</h4>
                                        <button onClick={() => setPickingForId(null)} className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline">Cancel</button>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                        {categoryProducts.map(product => (
                                            <button
                                                key={product.id}
                                                onClick={() => handleProductSelect(item.id, product)}
                                                className={`group bg-white p-3 rounded-2xl border transition-all hover:border-blue-600 text-left ${String(item.productId) === String(product.id) ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-100'
                                                    }`}
                                            >
                                                <div className="aspect-square relative mb-2 bg-gray-50 rounded-xl overflow-hidden p-1">
                                                    <Image src={product.images[0]?.src || ''} fill alt="" className="object-contain group-hover:scale-110 transition-transform" />
                                                </div>
                                                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-wide truncate">{product.vendor}</p>
                                                <p className="text-[10px] font-black text-gray-900 uppercase tracking-tight truncate leading-tight">{product.title}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Batch Apply & Completion */}
            <div className="flex flex-col md:flex-row items-center gap-4 pt-6">
                {items[0]?.productId && (
                    <button
                        onClick={() => {
                            const firstItem = items[0];
                            const firstProduct = products.find(p => String(p.id) === String(firstItem.productId));
                            if (!firstProduct) return;

                            items.forEach((it, idx) => {
                                if (idx === 0) return;
                                onUpdateItem(it.id, {
                                    productId: firstProduct.id,
                                    productHandle: firstProduct.handle,
                                    productTitle: firstProduct.title,
                                    productImage: firstProduct.images[0]?.src,
                                    variantId: firstProduct.variants[0]?.id,
                                    size: firstProduct.variants[0]?.option1,
                                    color: firstProduct.variants[0]?.option2,
                                    price: parseFloat(firstProduct.variants[0]?.price || '0'),
                                    productSku: firstProduct.variants[0]?.sku,
                                });
                            });
                        }}
                        className="px-6 h-12 bg-white border border-gray-200 text-gray-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-2"
                    >
                        <Sparkles size={14} className="text-blue-600" /> Apply Style 1 to All
                    </button>
                )}

                <div className="md:ml-auto">
                    {!isEmbedded && (
                        <button
                            onClick={onComplete}
                            disabled={!isStepComplete}
                            className="group flex items-center gap-3 px-10 py-5 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Confirm Content <Check size={14} className="text-green-400" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
