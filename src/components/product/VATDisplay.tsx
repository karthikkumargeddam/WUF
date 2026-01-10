/**
 * VAT Display Component
 * Shows VAT information on product pages and checkout
 */

import { calculateVAT, formatPrice, formatVATRate } from '@/lib/vat';

interface VATDisplayProps {
    price: number;
    tags?: string[];
    showBreakdown?: boolean;
    className?: string;
}

export default function VATDisplay({
    price,
    tags = [],
    showBreakdown = false,
    className = ''
}: VATDisplayProps) {
    const { netPrice, vatRate, vatAmount, grossPrice } = calculateVAT(price, tags);

    if (!showBreakdown) {
        return (
            <div className={`text-xs text-zinc-600 dark:text-zinc-400 ${className}`}>
                {vatRate === 0 ? (
                    <span className="inline-flex items-center gap-1">
                        <span className="font-semibold text-green-600 dark:text-green-400">VAT-FREE</span>
                        <span>(Children's clothing)</span>
                    </span>
                ) : (
                    <span>Inc. VAT {formatVATRate(vatRate)}</span>
                )}
            </div>
        );
    }

    return (
        <div className={`space-y-1 text-sm ${className}`}>
            <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Price (ex. VAT):</span>
                <span className="font-semibold">{formatPrice(netPrice)}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">
                    VAT ({formatVATRate(vatRate)}):
                </span>
                <span className="font-semibold">
                    {vatAmount === 0 ? (
                        <span className="text-green-600 dark:text-green-400">FREE</span>
                    ) : (
                        formatPrice(vatAmount)
                    )}
                </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-zinc-200 dark:border-zinc-700">
                <span className="font-bold">Total (inc. VAT):</span>
                <span className="font-bold text-lg">{formatPrice(grossPrice)}</span>
            </div>
        </div>
    );
}
