"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBundleStore } from '@/store/bundleStore';
import { Bundle, BundleItem, Product } from '@/types';
import { calculateBundlePrice } from '@/lib/bundle-utils';
import BundleSummary from '@/components/bundle/BundleSummary';
import { useCartStore } from '@/store/cartStore';
import { useAnalytics } from '@/hooks/useAnalytics';
import CategoryStep from '@/components/bundle/CategoryStep';
import BrandingStep from '@/components/bundle/BrandingStep';
import { Loader2, AlertCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface BundleCustomizerProps {
    initialProducts: Product[];
    bundleHandle: string;
    initialBundleConfig: Bundle;
}

export default function BundleCustomizer({ initialProducts, bundleHandle, initialBundleConfig }: BundleCustomizerProps) {
    const router = useRouter();
    const { currentBundle, initializeBundle, updateBundleItem, resetBundle } = useBundleStore();
    const { addItem } = useCartStore();
    const { trackEvent } = useAnalytics();

    const [currentStep, setCurrentStep] = useState(1);
    const [products] = useState<Product[]>(initialProducts);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Clear previous state and initialize with server-fetched config
        resetBundle();

        if (initialBundleConfig) {
            console.log("Bundle initializing with:", initialBundleConfig.name);
            console.log("Items count:", initialBundleConfig.items?.length);

            // Safety check for 0 items - if this happens, we need to know why
            if (!initialBundleConfig.items || initialBundleConfig.items.length === 0) {
                console.error("CRITICAL: initialBundleConfig has 0 items for", bundleHandle);
            }

            initializeBundle(initialBundleConfig);
            trackEvent('bundle_start', {
                bundle_id: initialBundleConfig.id,
                bundle_name: initialBundleConfig.name,
            });
        }

        setIsLoading(false);
    }, [bundleHandle, initialBundleConfig, resetBundle, initializeBundle, trackEvent]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-black animate-spin" />
            </div>
        );
    }

    if (!currentBundle) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Bundle Not Found</h1>
                <p className="text-gray-600 mb-6">The requested bundle configuration could not be loaded.</p>
                <button
                    onClick={() => router.push('/bundles')}
                    className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                    Return to Bundles
                </button>
            </div>
        );
    }

    const categories = Array.from(new Set(currentBundle.items.map(i => i.category)));

    const handleUpdateAll = (updateFn: (item: BundleItem) => BundleItem) => {
        currentBundle.items.forEach(item => {
            const updated = updateFn(item);
            updateBundleItem(item.id, updated);
        });
    };

    const handleComplete = () => {
        let addedCount = 0;
        currentBundle.items.forEach(item => {
            if (item.productId && item.variantId) {
                const product = products.find(p => String(p.id).trim() === String(item.productId).trim());
                if (product) {
                    addItem(product, item.variantId);
                    addedCount++;
                }
            }
        });

        if (addedCount > 0) {
            trackEvent('bundle_complete', { bundle: currentBundle.id });
            router.push('/cart');
        }
    };

    const isBundleConfigured = currentBundle.items.every(i => i.productId && i.variantId);

    // Filter products logic
    const filterProductsByCategory = (category: string): Product[] => {
        const normalizedCat = category.toLowerCase().replace(/\s+/g, '-');

        if (currentBundle.allowedProducts?.[category]?.length) {
            const allowedKeywords = currentBundle.allowedProducts[category];
            return products.filter(p => {
                const searchStr = `${p.handle || ''} ${p.title || ''} ${p.product_type || ''} ${(p.tags || []).join(' ')}`.toLowerCase();
                return allowedKeywords.some(k => searchStr.includes(k.toLowerCase()));
            });
        }

        const categoryMappings: Record<string, string[]> = {
            'polo-shirts': ['Polo', 'Top'],
            'hoodies': ['Hood', 'Sweatshirt'],
            'sweatshirts': ['Sweatshirt', 'Hood', 'Jumper'],
            'fleeces': ['Fleece'],
            'softshell': ['Soft Shell', 'Softshell'],
            'hi-viz': ['Waistcoat', 'Jacket', 'Vest', 'Hi-Vis'],
            'workwear': ['Jacket', 'Trousers', 'Waistcoat', 'Soft Shell'],
            'hospitality': ['Tunic', 'Apron', 'Tabard'],
            'aprons': ['Apron', 'Tabard'],
            'beauty': ['Tunic', 'Tabard'],
            't-shirts': ['T-Shirt', 'T-Shirts', 'Tee'],
            'knitwear': ['Jumper', 'Cardigan'],
            'jackets': ['Jacket', 'Jackets', 'Soft Shell', 'Fleece', 'Gilet'],
            'accessories': ['Beanie', 'Hat', 'Cap'],
        };

        const filtered = products.filter(p => {
            const typeUpper = (p.product_type || '').toUpperCase();
            const mappedTypes = categoryMappings[normalizedCat] || [];
            if (mappedTypes.some(mt => typeUpper.includes(mt.toUpperCase()))) return true;
            const searchStr = `${p.title} ${p.handle} ${(p.tags || []).join(' ')}`.toLowerCase();
            return [normalizedCat, category.toLowerCase()].some(k => searchStr.includes(k));
        });

        return filtered.length > 0 ? filtered : products;
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Sticky Mobile Header/Footer for Price */}
            <div className="lg:hidden sticky top-0 z-50 bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm">
                <div>
                    <h2 className="text-sm font-bold text-gray-900 truncate max-w-[200px]">{currentBundle.name}</h2>
                    <p className="text-xs text-blue-600 font-bold">£{calculateBundlePrice(currentBundle).toFixed(2)}</p>
                </div>
                <button
                    onClick={handleComplete}
                    disabled={!isBundleConfigured}
                    className="px-4 py-2 bg-black text-white text-xs font-bold rounded-lg disabled:opacity-50"
                >
                    Add to Cart
                </button>
            </div>

            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Configuration Sections */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Header Info */}
                        <div className="mb-8">
                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-4">
                                {currentBundle.name}
                            </h1>
                            <p className="text-gray-500 text-lg font-medium max-w-2xl">
                                {currentBundle.description} Configure all items below and add your custom branding in one place.
                            </p>
                        </div>

                        {/* Branding Section First */}
                        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-gray-100 shadow-xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Sparkles size={120} />
                            </div>
                            <BrandingStep
                                items={currentBundle.items}
                                onUpdateAll={handleUpdateAll}
                                onComplete={() => { }} // No longer needed for transition
                                isEmbedded={true}
                            />
                        </div>

                        {/* Items Sections by Category */}
                        <div className="space-y-16">
                            {categories.map((cat, idx) => (
                                <div key={cat} className="space-y-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-black text-xl shadow-lg">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight leading-none">
                                                {currentBundle.items.find(i => i.category === cat)?.categoryLabel || cat}
                                            </h2>
                                            <p className="text-sm font-black text-gray-500 uppercase tracking-widest mt-1">
                                                Select style & sizes
                                            </p>
                                        </div>
                                    </div>

                                    <CategoryStep
                                        category={cat}
                                        categoryLabel={currentBundle.items.find(i => i.category === cat)?.categoryLabel || ''}
                                        items={currentBundle.items.filter(i => i.category === cat)}
                                        products={filterProductsByCategory(cat)}
                                        onUpdateItem={updateBundleItem}
                                        onComplete={() => { }} // No longer needed for transition
                                        isEmbedded={true}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Sticky Summary Sidebar */}
                    <div className="lg:col-span-4 lg:sticky lg:top-8 h-fit space-y-6">
                        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-2xl space-y-8">
                            <div>
                                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-6">
                                    Bundle Summary
                                </h3>
                                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    <BundleSummary
                                        bundle={{
                                            ...currentBundle,
                                            totalPrice: calculateBundlePrice(currentBundle),
                                        }}
                                        isCompact={true}
                                    />
                                </div>
                            </div>

                            <div className="pt-8 border-t border-gray-100 space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-900 font-black uppercase tracking-widest text-xs">Total Price</span>
                                    <span className="text-3xl font-black text-gray-900">
                                        £{calculateBundlePrice(currentBundle).toFixed(2)}
                                    </span>
                                </div>

                                <button
                                    onClick={handleComplete}
                                    disabled={!isBundleConfigured}
                                    className="w-full flex items-center justify-center gap-4 py-6 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed group"
                                >
                                    Add Bundle to Cart
                                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </button>

                                <div className="flex items-center gap-3 justify-center text-gray-900">
                                    <ShieldCheck size={16} className="text-blue-600" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Secure Configuration</span>
                                </div>
                            </div>
                        </div>

                        {/* Status Widget */}
                        <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold uppercase tracking-widest opacity-80">Configuration Status</span>
                                <span className="text-sm font-black">
                                    {currentBundle.items.filter(i => i.productId && i.variantId).length} / {currentBundle.items.length}
                                </span>
                            </div>
                            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                    style={{ width: `${(currentBundle.items.filter(i => i.productId && i.variantId).length / currentBundle.items.length) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
