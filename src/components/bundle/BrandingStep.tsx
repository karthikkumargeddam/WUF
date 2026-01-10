"use client";

import { useBundleStore } from '@/store/bundleStore';
import { BundleItem, LogoCustomization } from '@/types';
import LogoSelector from './LogoSelector';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface BrandingStepProps {
    items: BundleItem[];
    onUpdateAll: (updateFn: (item: BundleItem) => BundleItem) => void;
    onComplete: () => void;
    isEmbedded?: boolean;
}

export default function BrandingStep({ items, onUpdateAll, onComplete, isEmbedded }: BrandingStepProps) {
    const { setCategoryBranding } = useBundleStore();

    // Group items by category to allow category-level branding
    const categoriesSorted = Array.from(new Set(items.map(i => i.category)));

    const handleApplyAll = (branding: Partial<LogoCustomization>) => {
        onUpdateAll((item) => ({
            ...item,
            logoCustomization: { ...(item.logoCustomization || { type: 'none', placements: [] }), ...branding }
        }));
    };

    return (
        <div className={isEmbedded ? "space-y-8" : "space-y-16"}>
            {!isEmbedded && (
                <div className="text-center space-y-4">
                    <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-gray-900 leading-none">
                        Customize <span className="text-blue-600">Your Bundle</span>
                    </h3>
                    <p className="text-gray-500 font-medium text-sm max-w-lg mx-auto leading-relaxed">
                        Add your logo to your items. You can apply the same logo settings to all matching items or customize them individually based on category.
                    </p>
                </div>
            )}

            {isEmbedded && (
                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                        Bundle Branding
                    </h3>
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                        <ShieldCheck size={14} className="stroke-[3]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">Logo Included</span>
                    </div>
                </div>
            )}

            <div className={isEmbedded ? "space-y-8" : "space-y-12"}>
                {categoriesSorted.map((cat, idx) => {
                    const firstItem = items.find(i => i.category === cat);
                    const label = firstItem?.categoryLabel || cat;
                    const currentBranding = firstItem?.logoCustomization || { type: 'none', placements: [] };

                    return (
                        <div key={cat} className="relative">
                            {/* Step Indicator Connector */}
                            {!isEmbedded && idx < categoriesSorted.length - 1 && (
                                <div className="absolute left-1/2 top-full w-px h-12 bg-gray-200 -z-10" />
                            )}

                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-md">
                                        {idx + 1}
                                    </div>
                                    <h4 className="text-sm font-black uppercase tracking-wide text-gray-900">
                                        Branding: <span className="text-blue-600">{label}</span>
                                    </h4>
                                </div>

                                <LogoSelector
                                    currentBranding={currentBranding}
                                    onUpdate={(branding) => setCategoryBranding(cat, branding)}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Global Actions / Complete */}
            {!isEmbedded && (
                <div className="bg-gray-900 rounded-3xl p-10 md:p-16 text-center space-y-10 shadow-xl relative overflow-hidden">
                    <div className="space-y-4 relative z-10">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pricing & Review</p>
                        <h4 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">Ready to <span className="text-blue-500">Review?</span></h4>
                        <p className="text-gray-400 text-sm max-w-md mx-auto">
                            Check your bundle configuration and customization details before proceeding to checkout.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
                        <button
                            onClick={onComplete}
                            className="group flex items-center gap-4 px-12 py-5 bg-white hover:bg-gray-100 text-gray-900 rounded-xl font-bold uppercase tracking-wide text-sm transition-all shadow-lg"
                        >
                            Review Bundle Summary <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
