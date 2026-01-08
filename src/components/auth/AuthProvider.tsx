"use client";

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const initialize = useAuthStore((state) => state.initialize);
    const user = useAuthStore((state) => state.user);
    const { mergeCart, setUserId, clearCart } = useCartStore();

    useEffect(() => {
        const unsubscribe = initialize();
        return () => unsubscribe();
    }, [initialize]);

    // Sync Cart when User changes
    useEffect(() => {
        if (user?.uid) {
            mergeCart(user.uid);
        } else {
            setUserId(null);
            clearCart();
        }
    }, [user, mergeCart, setUserId]);

    return <>{children}</>;
}
