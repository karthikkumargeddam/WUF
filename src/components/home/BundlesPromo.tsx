"use client";
import { useEffect } from 'react';
import { useBundleStore } from '@/store/bundleStore';

import Link from 'next/link';
import Image from 'next/image';
import { Package, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

const bundleCategories = [
    {
        title: 'Fleece Bundles',
        description: 'Embroidery only',
        href: '/collections/fleece-bundles-embroidery-only',
        color: 'from-blue-600 to-blue-800',
        image: '/images/bundles/fleece_bundle_card_1767936189806.png'
    },
    {
        title: 'Hoodie Bundles',
        description: 'Complete sets',
        href: '/collections/hoodie-bundles',
        color: 'from-purple-600 to-purple-800',
        image: '/images/bundles/hoodie_bundle_card_1767936206110.png'
    },
    {
        title: 'Hospitality Bundles',
        description: 'Professional attire',
        href: '/collections/hospitality-bundles',
        color: 'from-amber-600 to-amber-800',
        image: '/images/bundles/hospitality_bundle_card_1767936313533.png'
    },
    {
        title: 'High Visibility Bundles',
        description: 'Safety first',
        href: '/collections/high-visibility-bundles',
        color: 'from-yellow-500 to-orange-600',
        image: '/images/bundles/general_bundle_card_1767936278962.png'
    },
    {
        title: 'Polo Bundles',
        description: 'Classic workwear',
        href: '/collections/polo-bundles',
        color: 'from-green-600 to-green-800',
        image: '/images/bundles/polo_bundle_card_1767936225519.png'
    },
    {
        title: 'Premium Bundles',
        description: 'Embroidery only',
        href: '/collections/premium-bundles-embroidery-only',
        color: 'from-indigo-600 to-indigo-800',
        image: '/images/bundles/winter_bundle_card_1767936295630.png'
    },
    {
        title: 'Start-Up Bundles',
        description: 'Everything you need',
        href: '/collections/start-up-bundles',
        color: 'from-rose-600 to-rose-800',
        image: '/images/bundles/starter_bundle_card_1767936260037.png'
    },
    {
        title: 'T-Shirt Bundles',
        description: 'Bulk savings',
        href: '/collections/t-shirt-bundles',
        color: 'from-cyan-600 to-cyan-800',
        image: '/images/bundles/tshirt_bundle_card_1767936243781.png'
    }
];

export default function BundlesPromo() {
    const loadProducts = useBundleStore(state => state.loadBundleProducts);
    const productsMap = useBundleStore(state => state.configuration?.products);

    useEffect(() => {
        if (!productsMap) {
            loadProducts();
        }
    }, []);
    return (
        <section className="py-16 bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
            <div className="container mx-auto px-4">
                {/* Main Banner */}
                <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 mb-12 shadow-2xl">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }} />
                    </div>

                    <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 md:p-16">
                        {/* Left Content */}
                        <div className="text-white space-y-6">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                <Sparkles className="w-5 h-5" />
                                <span className="text-sm font-bold uppercase tracking-wider">Special Offer</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                                Bundle & Save Big
                            </h2>

                            <p className="text-xl md:text-2xl font-medium text-white/90">
                                Get complete workwear packages at unbeatable prices. Perfect for teams, businesses, and bulk orders.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link
                                    href="/bundles"
                                    className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-black uppercase tracking-wider hover:scale-105 transition-transform shadow-xl"
                                >
                                    View All Bundles
                                    <ArrowRight className="w-5 h-5" />
                                </Link>

                                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl">
                                    <TrendingUp className="w-6 h-6" />
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider opacity-90">Save Up To</p>
                                        <p className="text-2xl font-black">30%</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Visual */}
                        <div className="relative">
                            <div className="aspect-square rounded-3xl overflow-hidden relative">
                                <Image
                                    src="/images/bundles/bundle_save_banner_1767936674723.png"
                                    alt="Bundle & Save Big"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Floating badges */}
                            <div className="absolute -top-4 -right-4 bg-yellow-400 text-zinc-900 px-6 py-3 rounded-2xl font-black text-lg shadow-xl rotate-6">
                                FREE SHIPPING
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-white text-orange-600 px-6 py-3 rounded-2xl font-black text-lg shadow-xl -rotate-6">
                                BULK DEALS
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bundle Categories Grid */}
                <div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter text-zinc-950 dark:text-white mb-8 text-center">
                        Popular Bundle Categories
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {bundleCategories.map((bundle) => (
                            <Link
                                key={bundle.href}
                                href={bundle.href}
                                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                            >
                                {/* Background Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={bundle.image}
                                        alt={bundle.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-t ${bundle.color} opacity-60 group-hover:opacity-70 transition-opacity`} />
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                                    <h4 className="text-xl font-black uppercase tracking-tight mb-1">
                                        {bundle.title}
                                    </h4>
                                    <p className="text-sm text-white/90 mb-4">
                                        {bundle.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm font-bold">
                                        Shop Now
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 text-center">
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                        Need a custom bundle for your business?
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform"
                    >
                        Contact Our Team
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
