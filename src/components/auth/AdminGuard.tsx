"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { ShieldAlert } from 'lucide-react';

const OWNER_EMAIL = 'admin@wearunifab.com';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated } = useAuthStore();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        // Allow time for hydration and persistence rehydration
        const checkAuth = () => {
            if (!isAuthenticated || !user || user.email !== OWNER_EMAIL) {
                router.push('/');
            } else {
                setIsAuthorized(true);
            }
            setChecking(false);
        };

        // Small delay to ensure Zustand store has rehydrated
        const timer = setTimeout(checkAuth, 100);
        return () => clearTimeout(timer);
    }, [isAuthenticated, user, router]);

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 bg-zinc-200 rounded-full mb-4"></div>
                    <div className="h-4 w-32 bg-zinc-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (!isAuthorized) {
        return null; // Will redirect via useEffect
    }

    return <>{children}</>;
}
