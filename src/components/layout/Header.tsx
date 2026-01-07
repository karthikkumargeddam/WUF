import Link from 'next/link';
import { User, Phone } from 'lucide-react';
import { fetchCollections } from '@/lib/api';
import CartButton from '@/components/cart/CartButton';
import SearchBar from '@/components/search/SearchBar';
import MobileMenu from './MobileMenu';
import { Suspense } from 'react';

export default async function Header() {
    const { collections } = await fetchCollections();

    // Filter top collections or use all (limiting to 6-8 for menu)
    const menuCollections = collections.slice(0, 7);

    return (
        <header className="sticky top-0 z-50 glass-premium border-b border-zinc-200/50 shadow-sm transition-all duration-300">

            {/* Top Bar */}
            <div className="bg-zinc-900 text-zinc-300 text-[10px] sm:text-xs py-2">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <p className="font-bold uppercase tracking-widest">Global Freight Over £500</p>
                    <div className="hidden sm:flex items-center space-x-4">
                        <Link href="/about" prefetch={true} className="hover:text-white uppercase font-black tracking-widest text-[10px]">About</Link>
                        <span className="h-3 w-px bg-zinc-700"></span>
                        <Link href="/admin" prefetch={true} className="hover:text-amber-500 text-amber-500/80 uppercase font-black tracking-widest text-[10px]">Owner Admin</Link>
                        <span className="h-3 w-px bg-zinc-700"></span>
                        <Link href="/login" prefetch={true} className="hover:text-white uppercase font-black tracking-widest text-[10px]">Sign In</Link>
                        <span className="h-3 w-px bg-zinc-700"></span>
                        <Link href="/signup" prefetch={true} className="flex items-center hover:text-white cursor-pointer uppercase font-black tracking-widest text-[10px]">
                            <User size={12} className="mr-1" />
                            <span>Sign Up</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="container mx-auto px-4 py-4 md:py-6">
                <div className="flex items-center justify-between gap-4 md:gap-8">
                    <div className="flex items-center gap-4">
                        <MobileMenu collections={collections} />
                        {/* Logo */}
                        <Link href="/" prefetch={true} className="flex-shrink-0">
                            <h1 className="text-xl md:text-3xl font-black tracking-tighter text-zinc-950 uppercase italic">WEARUNIFAB</h1>
                        </Link>
                    </div>

                    {/* Search Bar - Hidden on small mobile, shown on larger screens */}
                    <div className="flex-1 max-w-2xl hidden lg:block">
                        <Suspense fallback={<div className="h-11 bg-zinc-50 border border-zinc-300 rounded-lg animate-pulse" />}>
                            <SearchBar />
                        </Suspense>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center space-x-4 md:space-x-6">
                        <a href="tel:+15551234567" className="hidden xl:flex items-center text-zinc-600 hover:text-zinc-900 transition-colors">
                            <Phone size={20} className="mr-2" />
                            <div className="flex flex-col text-right leading-tight">
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Order Hotline</span>
                                <span className="text-sm font-black text-zinc-900">555-123-4567</span>
                            </div>
                        </a>

                        <CartButton />
                    </div>
                </div>
                {/* Mobile Search Bar - Visible only on mobile */}
                <div className="mt-4 lg:hidden pb-2">
                    <Suspense fallback={<div className="h-11 bg-zinc-50 border border-zinc-300 rounded-lg animate-pulse" />}>
                        <SearchBar />
                    </Suspense>
                </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:block border-t border-zinc-100 bg-white">
                <div className="container mx-auto px-4">
                    <ul className="flex items-center space-x-8 overflow-x-auto py-3 text-sm font-medium text-zinc-700">
                        <li>
                            <Link href="/" prefetch={true} className="hover:text-zinc-900 whitespace-nowrap">Home</Link>
                        </li>
                        <li>
                            <Link href="/bundles" prefetch={true} className="hover:text-zinc-900 whitespace-nowrap text-green-700 font-bold">Bundles</Link>
                        </li>
                        <li>
                            <Link href="/products" prefetch={true} className="hover:text-zinc-900 whitespace-nowrap text-red-700">All Products</Link>
                        </li>
                        {menuCollections.map((collection) => (
                            <li key={collection.id}>
                                <Link href={`/collections/${collection.handle}`} prefetch={true} className="hover:text-zinc-900 whitespace-nowrap capitalize">
                                    {collection.title}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href="/collections" prefetch={true} className="hover:text-zinc-900 whitespace-nowrap font-semibold">View All Categories</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
