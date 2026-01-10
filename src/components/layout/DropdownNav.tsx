"use client";

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownItem {
    label: string;
    href: string;
}

interface NavItem {
    label: string;
    href?: string;
    items?: DropdownItem[];
}

const navigationItems: NavItem[] = [
    {
        label: 'Home',
        href: '/'
    },
    {
        label: 'About Us',
        href: '/about'
    },
    {
        label: 'Bundles (Promotional Packages)',
        items: [
            { label: 'Fleece Bundles (Embroidery only)', href: '/collections/fleece-bundles-embroidery-only' },
            { label: 'Hoodie Bundles', href: '/collections/hoodie-bundles' },
            { label: 'Hospitality Bundles', href: '/collections/hospitality-bundles' },
            { label: 'High Visibility Bundles', href: '/collections/high-visibility-bundles' },
            { label: 'Polo Bundles', href: '/collections/polo-bundles' },
            { label: 'Premium Bundles (Embroidery only)', href: '/collections/premium-bundles-embroidery-only' },
            { label: 'Salon and Beauty Bundles', href: '/collections/salon-and-beauty-bundles' },
            { label: 'Start-Up Bundles', href: '/collections/start-up-bundles' },
            { label: 'T-Shirt Bundles', href: '/collections/t-shirt-bundles' },
            { label: 'Winter Bundles', href: '/collections/winter-bundles' }
        ]
    },
    {
        label: 'T-shirt',
        items: [
            { label: 'Men T-Shirts', href: '/collections/men-t-shirts' },
            { label: 'Women T-Shirts', href: '/collections/women-t-shirts' },
            { label: 'Kids T-Shirts', href: '/collections/kids-t-shirts' }
        ]
    },
    {
        label: 'Polo Shirts',
        items: [
            { label: 'Men Polo Shirts', href: '/collections/men-polo-shirts' },
            { label: 'Women Polo Shirts', href: '/collections/women-polo-shirts' },
            { label: 'Kids Polo Shirts', href: '/collections/kids-polo-shirts' }
        ]
    },
    {
        label: 'Hoodies',
        items: [
            { label: 'Men Hoodies', href: '/collections/men-hoodies' },
            { label: 'Women Hoodies', href: '/collections/women-hoodies' },
            { label: 'Kids Hoodies', href: '/collections/kids-hoodies' }
        ]
    },
    {
        label: 'Sweatshirts',
        items: [
            { label: 'Men Sweatshirts', href: '/collections/men-sweatshirts' },
            { label: 'Women Sweatshirts', href: '/collections/women-sweatshirts' },
            { label: 'Kids Sweatshirts', href: '/collections/kids-sweatshirts' }
        ]
    },
    {
        label: 'Jackets',
        items: [
            { label: 'Men Jackets', href: '/collections/men-jackets' },
            { label: 'Women Jackets', href: '/collections/women-jackets' },
            { label: 'Kids Jackets', href: '/collections/kids-jackets' }
        ]
    },
    {
        label: 'High Visibility Gear',
        href: '/collections/high-visibility-gear'
    },
    {
        label: 'Headwear',
        href: '/collections/headwear'
    },
    {
        label: 'By Profession',
        items: [
            { label: 'Chefswear & Catering', href: '/collections/chefswear-catering' },
            { label: 'Health, Salon & Beauty', href: '/collections/health-salon-beauty' },
            { label: 'Hospitality', href: '/collections/hospitality' }
        ]
    },
    {
        label: 'Contact Us',
        href: '/contact'
    }
];

export default function DropdownNav() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    return (
        <nav className="hidden lg:block border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <div className="container mx-auto px-4">
                <ul className="flex items-center justify-start space-x-1">
                    {navigationItems.map((item) => (
                        <li
                            key={item.label}
                            className="relative group"
                            onMouseEnter={() => item.items && setOpenDropdown(item.label)}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className="block px-4 py-3 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors whitespace-nowrap"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <button
                                    className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors whitespace-nowrap"
                                >
                                    {item.label}
                                    {item.items && <ChevronDown className="w-4 h-4" />}
                                </button>
                            )}

                            {/* Dropdown Menu */}
                            {item.items && openDropdown === item.label && (
                                <div className="absolute left-0 top-full pt-1 z-50 min-w-[280px]">
                                    <div className="bg-amber-500 shadow-xl rounded-sm overflow-hidden">
                                        <ul className="py-2">
                                            {item.items.map((subItem) => (
                                                <li key={subItem.href}>
                                                    <Link
                                                        href={subItem.href}
                                                        className="block px-6 py-2.5 text-sm text-white hover:bg-amber-600 transition-colors"
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
