"use client";

import { Product, ProductVariant } from "@/types";
import { useState } from "react";
import ProductGallery from "./ProductGallery";
import ProductOptions from "./ProductOptions";
import ProductActions from "./ProductActions";
import { Shield, Check, Truck } from "lucide-react";

interface ProductMainContentProps {
    product: Product;
}

export default function ProductMainContent({ product }: ProductMainContentProps) {
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
    const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'shipping'>('description');

    // Calculate scale based on size (assumes Option1 is size, which is standard for Shopify)
    const getSizeScale = (variant: ProductVariant) => {
        const size = variant.option1?.toLowerCase().trim() || '';

        // Exact matches for abbreviations or keywords
        if (size === 's' || size === 'xs' || size.includes('small')) return 0.85;
        if (size === 'm' || size.includes('medium')) return 1;
        if (size === 'l' || size.includes('large')) return 1.1;
        if (size === 'xl' || size.includes('x-large')) return 1.2;
        if (size === '2xl' || size.includes('xxl')) return 1.3;
        if (size === '3xl' || size.includes('xxxl')) return 1.4;
        if (size === '4xl' || size.includes('xxxxl')) return 1.5;

        // Detailed fallback for "X Months", "X Years" (Kids)
        if (size.includes('month') || size.includes('year')) return 0.7;

        return 1;
    };

    const currentScale = getSizeScale(selectedVariant);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 py-12 md:py-20">
            {/* Left: Gallery */}
            <div className="lg:col-span-7">
                <ProductGallery
                    images={product.images}
                    title={product.title}
                    variantImageId={selectedVariant?.image_id}
                    scale={currentScale}
                />
            </div>

            {/* Right: Info & Actions */}
            <div className="lg:col-span-5 flex flex-col">
                <div className="mb-4">
                    {product.vendor && (
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 block mb-2">Original Manufacturer</span>
                    )}
                    <div className="flex items-center gap-2">
                        <span className="h-0.5 w-8 bg-zinc-950"></span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-950 italic">{product.product_type}</span>
                    </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-zinc-950 leading-[0.9] mb-8 tracking-tighter uppercase italic">
                    {product.title}
                </h1>

                <div className="flex items-baseline gap-4 mb-10">
                    <span className="text-5xl font-black text-zinc-950 tracking-tighter italic">
                        <span className="text-gradient">£{selectedVariant?.price || '0.00'}</span>
                    </span>
                    {selectedVariant?.compare_at_price && (
                        <span className="text-2xl text-zinc-300 line-through font-black italic">
                            £{selectedVariant.compare_at_price}
                        </span>
                    )}
                    <span className="text-zinc-400 font-black text-xs uppercase tracking-widest">Global Credit</span>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-4 mb-10">
                    <div className="flex items-center text-zinc-950 bg-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border-2 border-zinc-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <Check size={14} className="mr-2" /> Operational Status: In Stock
                    </div>
                    <div className="flex items-center text-white bg-zinc-950 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border-2 border-zinc-950 shadow-xl">
                        <Truck size={14} className="mr-2" /> Global Freight: Priority
                    </div>
                </div>

                {/* Options Selection */}
                <div className="mb-10">
                    <ProductOptions
                        product={product}
                        onVariantChange={setSelectedVariant}
                    />
                </div>

                {/* Cart Actions */}
                <div className="bg-zinc-50 p-8 rounded-[2.5rem] border-2 border-zinc-100 shadow-inner mb-12">
                    <ProductActions product={product} selectedVariant={selectedVariant} />
                    <div className="flex items-center justify-center gap-6 mt-6 opacity-30 grayscale contrast-150">
                        {/* Technical Icons Simulation */}
                        <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-tighter"><Shield size={12} /> Secure Nodes</div>
                        <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-tighter"><Truck size={12} /> Air Logistics</div>
                    </div>
                </div>

                {/* Tabbed Info */}
                <div className="mt-auto">
                    <div className="flex gap-10 border-b-2 border-zinc-100 mb-8 overflow-x-auto no-scrollbar pb-0.5">
                        {(['description', 'specs', 'shipping'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative whitespace-nowrap ${activeTab === tab ? 'text-zinc-950' : 'text-zinc-400 hover:text-zinc-600'
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute bottom-[-2px] left-0 right-0 h-1 bg-zinc-950 rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="min-h-[250px]">
                        {activeTab === 'description' && (
                            <div
                                className="prose prose-sm prose-zinc max-w-none text-zinc-600 leading-loose font-medium"
                                dangerouslySetInnerHTML={{ __html: product.body_html }}
                            />
                        )}
                        {activeTab === 'specs' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 py-3 border-b border-zinc-100">
                                    <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">System Classification</span>
                                    <span className="text-zinc-900 text-xs font-black uppercase tracking-tight">{product.product_type}</span>
                                </div>
                                <div className="grid grid-cols-2 py-3 border-b border-zinc-100">
                                    <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">Deployment Vendor</span>
                                    <span className="text-zinc-900 text-xs font-black uppercase tracking-tight">{product.vendor}</span>
                                </div>
                                <div className="grid grid-cols-2 py-3 border-b border-zinc-100">
                                    <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">Deployment SKU</span>
                                    <span className="text-zinc-900 text-xs font-black uppercase tracking-tight">{selectedVariant?.sku || 'NULL-ID'}</span>
                                </div>
                                {product.tags.length > 0 && (
                                    <div className="grid grid-cols-2 py-3">
                                        <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">Metadata Tags</span>
                                        <div className="flex flex-wrap gap-2">
                                            {(typeof product.tags === 'string'
                                                ? (product.tags as string).split(',').map(t => t.trim())
                                                : Array.isArray(product.tags) ? product.tags : []
                                            ).slice(0, 8).map(tag => (
                                                <span key={tag} className="text-[9px] font-black border border-zinc-200 text-zinc-500 px-2 py-0.5 rounded-lg uppercase tracking-widest">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab === 'shipping' && (
                            <div className="space-y-6 text-zinc-600 text-sm leading-relaxed font-medium">
                                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-800 mb-2">Freight Protocols</h4>
                                    <p className="text-emerald-900/70">Standardized fleet deployment initiates within 24-48 hours. Enterprise priority available.</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-zinc-100 rounded-xl">
                                        <Shield size={20} className="text-zinc-900" />
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-900 mb-1">Integrity Assurance</h4>
                                        <p className="text-xs text-zinc-500">Every asset undergoes rigorous quality validation before deployment to ensure field reliability.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

}
