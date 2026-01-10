"use client";

import { Bundle } from '@/types';
import { Check, Edit2 } from 'lucide-react';

interface BundleSummaryProps {
    bundle: Bundle;
    onEdit?: (itemId: string) => void;
    isCompact?: boolean;
}

export default function BundleSummary({ bundle, onEdit, isCompact }: BundleSummaryProps) {
    const completedItems = bundle.items.filter(item =>
        item.productId && item.variantId
    );

    return (
        <div className={isCompact ? "space-y-4" : "space-y-8"}>
            {!isCompact && (
                <div className="flex items-center justify-between border-b pb-4">
                    <h3 className="text-xl font-bold text-gray-900">Bundle Summary</h3>
                    <span className="text-sm text-gray-500">
                        {completedItems.length} / {bundle.items.length} Items Configured
                    </span>
                </div>
            )}

            <div className="grid grid-cols-1 gap-3">
                {bundle.items.map((item, index) => {
                    const isComplete = !!(item.productId && item.variantId);
                    const hasBranding = item.logoCustomization && item.logoCustomization.type !== 'none';

                    return (
                        <div
                            key={item.id}
                            className={`flex items-start justify-between p-3 rounded-xl border transition-all duration-300 ${isComplete ? 'bg-white border-gray-100 shadow-sm' : 'bg-gray-50/50 border-gray-100 border-dashed'
                                }`}
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="flex items-center justify-center w-5 h-5 rounded-lg bg-gray-900 text-[10px] font-black text-white">
                                        {index + 1}
                                    </span>
                                    <h4 className="font-black text-xs text-gray-500 uppercase tracking-widest truncate">{item.categoryLabel}</h4>
                                </div>

                                {isComplete ? (
                                    <div className="space-y-0.5">
                                        <p className="text-xs font-black text-gray-900 leading-tight line-clamp-1">{item.productTitle}</p>
                                        <p className="text-[10px] text-gray-900 font-bold uppercase tracking-tight">
                                            {item.size} • {item.color}
                                        </p>

                                        {hasBranding && item.logoCustomization && (
                                            <div className="mt-1.5 flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                                                <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">
                                                    Custom Logo Added
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Pending Selection</p>
                                )}
                            </div>

                            {onEdit && (
                                <button
                                    onClick={() => onEdit(item.id)}
                                    className="p-1.5 text-gray-900 hover:text-black transition-colors"
                                    aria-label="Edit item"
                                >
                                    <Edit2 size={14} />
                                </button>
                            )}

                            {isComplete && !onEdit && (
                                <div className="text-green-600 p-1">
                                    <Check size={14} className="stroke-[3]" />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {!isCompact && (
                <div className="bg-gray-900 text-white rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h4 className="text-lg font-bold">Total Price</h4>
                        <p className="text-gray-400 text-sm">Including all items and customization</p>
                    </div>
                    <div className="text-3xl font-bold">
                        £{bundle.totalPrice.toFixed(2)}
                    </div>
                </div>
            )}
        </div>
    );
}
