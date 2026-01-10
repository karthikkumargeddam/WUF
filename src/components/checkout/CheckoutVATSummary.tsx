/**
 * Checkout VAT Summary Component
 * Displays order summary with VAT breakdown at checkout
 */

'use client';

import { calculateCartTotal, formatPrice } from '@/lib/vat';

interface CheckoutVATSummaryProps {
    items: Array<{
        id: string | number;
        name: string;
        price: number;
        quantity: number;
        tags?: string[];
    }>;
    deliveryFee?: number;
    className?: string;
}

export default function CheckoutVATSummary({
    items,
    deliveryFee = 0,
    className = ''
}: CheckoutVATSummaryProps) {
    const { subtotal, delivery, vatBreakdown, total } = calculateCartTotal(items, deliveryFee);

    return (
        <div className={`bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 ${className}`}>
            <h3 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">
                Order Summary
            </h3>

            <div className="space-y-3">
                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">Subtotal:</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">
                        {formatPrice(subtotal)}
                    </span>
                </div>

                {/* Delivery */}
                {delivery > 0 ? (
                    <div className="flex justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">Delivery:</span>
                        <span className="font-semibold text-zinc-900 dark:text-white">
                            {formatPrice(delivery)}
                        </span>
                    </div>
                ) : (
                    <div className="flex justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">Delivery:</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                            FREE
                        </span>
                    </div>
                )}

                {/* VAT Breakdown */}
                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700">
                    <div className="text-xs text-zinc-800 dark:text-zinc-300 mb-2 font-medium">
                        VAT Breakdown:
                    </div>

                    {vatBreakdown.standardRateItems > 0 && (
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-zinc-800 dark:text-zinc-300 font-medium">
                                Standard rate items (20%):
                            </span>
                            <span className="text-zinc-900 dark:text-white">
                                {formatPrice(vatBreakdown.standardRateItems)}
                            </span>
                        </div>
                    )}

                    {vatBreakdown.zeroRatedItems > 0 && (
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-zinc-800 dark:text-zinc-300 font-medium">
                                VAT-free items (0%):
                            </span>
                            <span className="text-green-600 dark:text-green-400">
                                {formatPrice(vatBreakdown.zeroRatedItems)}
                            </span>
                        </div>
                    )}

                    <div className="flex justify-between text-sm mt-2">
                        <span className="font-semibold text-zinc-800 dark:text-zinc-300">
                            Total VAT (20%):
                        </span>
                        <span className="font-semibold text-zinc-900 dark:text-white">
                            {formatPrice(vatBreakdown.totalVAT)}
                        </span>
                    </div>
                </div>

                {/* Total */}
                <div className="pt-3 border-t-2 border-zinc-300 dark:border-zinc-700">
                    <div className="flex justify-between">
                        <span className="text-lg font-bold text-zinc-900 dark:text-white">
                            Total (inc. VAT):
                        </span>
                        <span className="text-2xl font-black text-zinc-900 dark:text-white">
                            {formatPrice(total)}
                        </span>
                    </div>
                </div>

                {/* VAT Notice */}
                <div className="pt-3 text-xs text-zinc-800 dark:text-zinc-300 italic font-medium">
                    * VAT is charged at 20% on standard items and delivery. Children's clothing is VAT-free (0%).
                </div>
            </div>
        </div>
    );
}
