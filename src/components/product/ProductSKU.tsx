/**
 * Product SKU Display Component
 * Shows the SKU code on product pages
 */

interface ProductSKUProps {
    sku: string | null;
    className?: string;
}

export default function ProductSKU({ sku, className = '' }: ProductSKUProps) {
    if (!sku) return null;

    return (
        <div className={`flex items-center gap-2 text-sm ${className}`}>
            <span className="font-semibold text-zinc-600 dark:text-zinc-400">
                SKU:
            </span>
            <span className="font-mono text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                {sku}
            </span>
        </div>
    );
}
