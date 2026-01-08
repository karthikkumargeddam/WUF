"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, User, LogOut } from 'lucide-react';
import { Collection } from '@/types';
import { useAuthStore } from '@/store/authStore';

interface MobileMenuProps {
    collections: Collection[];
}

export default function MobileMenu({ collections }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <button
                onClick={toggleMenu}
                className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 transition-colors"
                aria-label="Toggle Menu"
            >
                <Menu size={24} />
            </button>

            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleMenu}
            />

            {/* Drawer */}
            <div
                className={`fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white z-[110] transform transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-zinc-100">
                        <h2 className="text-xl font-black text-zinc-950 uppercase tracking-tighter italic">Menu</h2>
                        <button onClick={toggleMenu} className="p-2 text-zinc-500 hover:text-zinc-950">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-6 px-6">
                        <nav className="space-y-6">
                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4">Navigation</h3>
                                <ul className="space-y-4">
                                    <li>
                                        <Link href="/" onClick={toggleMenu} className="text-lg font-bold text-zinc-900 hover:text-blue-600 underline-offset-4 decoration-2">Home</Link>
                                    </li>
                                    <li>
                                        <Link href="/products" onClick={toggleMenu} className="text-lg font-bold text-red-700 hover:text-red-800 underline-offset-4 decoration-2">All Industrial Gear</Link>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4">Categories</h3>
                                <ul className="space-y-4">
                                    {collections.slice(0, 10).map((col) => (
                                        <li key={col.id}>
                                            <Link
                                                href={`/collections/${col.handle}`}
                                                onClick={toggleMenu}
                                                className="text-lg font-bold text-zinc-900 hover:text-blue-600 capitalize"
                                            >
                                                {col.title}
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <Link href="/collections" onClick={toggleMenu} className="text-base font-black text-zinc-500 hover:text-zinc-900 uppercase tracking-widest">View All Categories</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="pt-6 border-t border-zinc-100">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4">Account & Support</h3>
                                <ul className="space-y-4">
                                    {mounted && isAuthenticated && user ? (
                                        <>
                                            <li>
                                                <Link href="/dashboard" onClick={toggleMenu} className="flex items-center gap-3 text-lg font-bold text-zinc-900">
                                                    <User size={20} /> {user.email}
                                                </Link>
                                            </li>
                                            <li>
                                                <button onClick={() => { logout(); toggleMenu(); }} className="flex items-center gap-3 text-lg font-bold text-red-600 w-full text-left">
                                                    <LogOut size={20} /> Sign Out
                                                </button>
                                            </li>
                                        </>
                                    ) : (
                                        <li>
                                            <Link href="/login" onClick={toggleMenu} className="flex items-center gap-3 text-lg font-bold text-zinc-900">
                                                <User size={20} /> Business Login
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <a href="tel:+15551234567" className="flex items-center gap-3 text-lg font-bold text-zinc-900">
                                            <Phone size={20} /> 555-123-4567
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>

                    <div className="p-6 bg-zinc-50 border-t border-zinc-100 mt-auto">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Operational Integrity</p>
                        <p className="text-[10px] text-zinc-500 font-medium">Wearunifab Industrial — Standard Issue Workwear</p>
                    </div>
                </div>
            </div>
        </>
    );
}
