"use client";

import Link from 'next/link';
import { User, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';

export default function AuthStatus() {
    const { user, isAuthenticated, loading, logout } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch and show loading state
    if (!mounted || loading) {
        return (
            <div className="flex flex-col text-[10px] leading-tight py-2 opacity-50">
                <span className="text-zinc-500 font-medium">Loading...</span>
                <span className="text-white font-black uppercase tracking-widest">Account</span>
            </div>
        );
    }

    return (
        <div className="relative group z-50">
            {/* Trigger Area */}
            <Link href={isAuthenticated ? "/profile" : "/login"} className="flex flex-col text-[10px] leading-tight cursor-pointer py-2">
                <span className="text-zinc-500 font-medium">
                    {isAuthenticated ? `Hello, ${user?.name?.split(' ')[0] || user?.email?.split('@')[0]}` : 'Hello, sign in'}
                </span>
                <span className="text-white font-black uppercase tracking-widest group-hover:underline flex items-end gap-1">
                    Account & Lists
                    <svg className="w-2 h-2 fill-zinc-500 mb-0.5" viewBox="0 0 10 6"><path d="M5 6L0 0h10z" /></svg>
                </span>
            </Link>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-lg shadow-xl p-4 border border-zinc-200 relative before:content-[''] before:absolute before:right-6 before:-top-2 before:border-x-8 before:border-x-transparent before:border-b-8 before:border-b-white">

                    {!isAuthenticated ? (
                        <div className="text-center pb-2 border-b border-zinc-100 mb-2">
                            <Link href="/login" className="block w-full py-3 bg-zinc-900 text-white rounded-md font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors mb-2">
                                Sign In
                            </Link>
                            <div className="text-[10px] text-zinc-500">
                                New Customer? <Link href="/signup" className="text-blue-600 hover:underline">Start here.</Link>
                            </div>
                        </div>
                    ) : (
                        <div className="pb-2 border-b border-zinc-100 mb-2">
                            <div className="mb-2 px-2">
                                <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold mb-1">Your Account</p>
                                <p className="text-sm font-bold text-zinc-900 truncate">{user?.email}</p>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col space-y-1">
                        {isAuthenticated && (
                            <>
                                <Link href="/profile" className="px-2 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 hover:text-blue-600 rounded-md transition-colors text-left">
                                    Your Profile
                                </Link>
                                <Link href="/orders" className="px-2 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 hover:text-blue-600 rounded-md transition-colors text-left">
                                    Your Orders
                                </Link>
                                {user?.email === 'admin@wearunifab.com' && (
                                    <Link href="/admin" className="px-2 py-2 text-xs font-bold text-amber-600 hover:bg-amber-50 rounded-md transition-colors text-left">
                                        Owner Dashboard
                                    </Link>
                                )}
                                <div className="h-px bg-zinc-100 my-1" />
                                <button
                                    onClick={async () => {
                                        await logout();
                                        window.location.reload(); // Hard refresh to ensure clean state
                                    }}
                                    className="px-2 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors text-left w-full"
                                >
                                    Sign Out
                                </button>
                            </>
                        )}
                        {!isAuthenticated && (
                            <Link href="/orders" className="px-2 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 hover:text-blue-600 rounded-md transition-colors text-left">
                                Find a Guest Order
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
