import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, User, Phone } from 'lucide-react';
import { fetchCollections } from '@/lib/api';
import CartButton from '@/components/cart/CartButton';
import WishlistButton from '@/components/layout/WishlistButton';
import SearchBar from '@/components/search/SearchBar';
import MobileMenu from './MobileMenu';
import AuthStatus from './AuthStatus';
import { ThemeToggle } from '../theme/ThemeToggle';
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
                        <AuthStatus />
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
                            <h1 className="text-xl md:text-3xl font-black tracking-tighter text-zinc-950 dark:text-white uppercase italic">WEARUNIFAB</h1>
                        </Link>
                    </div>

                    {/* Search Bar - Hidden on small mobile, shown on larger screens */}
                    <div className="flex-1 max-w-2xl hidden lg:block">
                        <Suspense fallback={<div className="h-11 bg-zinc-800/50 border border-zinc-700 rounded-lg animate-pulse" />}>
                            <SearchBar />
                        </Suspense>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center space-x-4 md:space-x-6">
                        <Link href="/search">
                            <Search className="w-5 h-5 md:w-6 md:h-6 text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors" />
                        </Link>

                        <ThemeToggle />

                        <Link href="/profile">
                            <User className="w-5 h-5 md:w-6 md:h-6 text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors" />
                        </Link>

                        <WishlistButton />
                        <CartButton />
                    </div>
                </div>
                {/* Mobile Search Bar - Visible only on mobile */}
                <div className="mt-4 lg:hidden pb-2">
                    <Suspense fallback={<div className="h-11 bg-zinc-800/50 border border-zinc-700 rounded-lg animate-pulse" />}>
                        <SearchBar />
                    </Suspense>
                </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:block border-t border-white/5 bg-transparent">
                <div className="container mx-auto px-4">
                    <ul className="flex items-center space-x-8 overflow-x-auto py-3 text-sm font-medium text-zinc-400">
                        <li>
                            <Link href="/" prefetch={true} className="hover:text-white whitespace-nowrap transition-colors">Home</Link>
                        </li>
                        <li>
                            <Link href="/bundles" prefetch={true} className="hover:text-green-300 whitespace-nowrap text-green-500 font-bold transition-colors">Bundles</Link>
                        </li>
                        <li>
                            <Link href="/products" prefetch={true} className="hover:text-red-300 whitespace-nowrap text-red-500 transition-colors">All Products</Link>
                        </li>
                        {menuCollections.map((collection) => (
                            <li key={collection.id}>
                                <Link href={`/collections/${collection.handle}`} prefetch={true} className="hover:text-white whitespace-nowrap capitalize transition-colors">
                                    {collection.title}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href="/collections" prefetch={true} className="hover:text-white whitespace-nowrap font-semibold transition-colors">View All Categories</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
