"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function AnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { trackEvent } = useAnalytics();

    useEffect(() => {
        trackEvent('page_view', {
            path: pathname,
            search: searchParams.toString(),
        });
    }, [pathname, searchParams, trackEvent]);

    return null;
}
