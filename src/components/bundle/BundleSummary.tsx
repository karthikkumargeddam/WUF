"use client";

import { Bundle } from '@/types';
import { Package, Sparkles, Edit2 } from 'lucide-react';

interface BundleSummaryProps {
    bundle: Bundle;
    onEdit?: (itemId: string) => void;
}

export default function BundleSummary({ bundle, onEdit }: BundleSummaryProps) {
    const completedItems = bundle.items.filter(item =>
        item.productId && item.variantId && item.logoCustomization
    );

    const progress = (completedItems.length / bundle.items.length) * 100;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900">
                    Bundle Summary
                </h3>
                <div className="text-right">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                        Progress
                    </p>
                    <p className="text-2xl font-black text-zinc-950">
                        {completedItems.length}/{bundle.items.length}
                    </p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-zinc-950 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Items List */}
            <div className="space-y-4">
                {bundle.items.map((item, index) => {
                    const isComplete = !!(item.productId && item.variantId && item.logoCustomization);

                    return (
                        <div
                            key={item.id}
                            className={`p-6 rounded-2xl border-2 transition-all ${isComplete
                                ? 'border-zinc-950 bg-zinc-50'
                                : 'border-zinc-200 bg-white'
                                }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Package size={20} className={isComplete ? 'text-zinc-950' : 'text-zinc-400'} />
                                        <h4 className="text-sm font-black uppercase tracking-tight text-zinc-900">
                                            Item {index + 1}: {item.categoryLabel}
                                        </h4>
                                    </div>

                                    {isComplete ? (
                                        <div className="space-y-2 ml-8">
                                            <p className="text-xs font-bold text-zinc-700">
                                                {item.productTitle}
                                            </p>
                                            <div className="flex gap-4 text-xs text-zinc-600">
                                                <span>Size: <strong>{item.size}</strong></span>
                                                <span>Color: <strong>{item.color}</strong></span>
                                            </div>
                                            {item.logoCustomization && (
                                                <div className="text-xs text-zinc-600">
                                                    Logo: <strong className="capitalize">{item.logoCustomization.type}</strong>
                                                    {item.logoCustomization.text && ` - "${item.logoCustomization.text}"`}
                                                    {item.logoCustomization.placement.length > 0 && (
                                                        <span className="ml-2">
                                                            ({item.logoCustomization.placement.join(', ')})
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                            {item.price && (
                                                <p className="text-lg font-black text-zinc-950">
                                                    £{item.price.toFixed(2)}
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-zinc-500 ml-8">
                                            Not configured yet
                                        </p>
                                    )}
                                </div>

                                {onEdit && isComplete && (
                                    <button
                                        onClick={() => onEdit(item.id)}
                                        className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                                        aria-label="Edit item"
                                    >
                                        <Edit2 size={16} className="text-zinc-600" />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Total Price & Breakdown */}
            <div className="bg-zinc-950 rounded-2xl p-8 text-white space-y-4">
                <div className="flex justify-between items-center text-zinc-400 text-sm">
                    <span>Subtotal</span>
                    <span>£{(bundle.totalPrice / 1.2).toFixed(2)}</span>
                </div>
                {/* Free logo text removed as requested */}
                <div className="flex justify-between items-center text-zinc-400 text-sm">
                    <span>VAT (20%)</span>
                    <span>£{(bundle.totalPrice - (bundle.totalPrice / 1.2)).toFixed(2)}</span>
                </div>
                <div className="border-t border-zinc-800 pt-4 flex justify-between items-end">
                    <div>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">
                            Total Bundle Price
                        </p>
                        <p className="text-4xl font-black tracking-tighter italic">
                            £{bundle.totalPrice.toFixed(2)}
                        </p>
                    </div>
                    <Sparkles size={48} className="text-zinc-800" />
                </div>
            </div>
        </div>
    );
}
