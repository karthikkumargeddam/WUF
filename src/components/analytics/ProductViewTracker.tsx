"use client";

import { useEffect } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Product } from "@/types";

export default function ProductViewTracker({ product }: { product: Product }) {
    const { trackEvent } = useAnalytics();

    useEffect(() => {
        trackEvent('product_view', {
            product_id: product.id,
            title: product.title,
            vendor: product.vendor,
            price: product.variants[0]?.price,
        });
    }, [product, trackEvent]);

    return null;
}
