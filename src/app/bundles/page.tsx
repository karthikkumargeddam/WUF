import Link from 'next/link';
import { Package, CheckCircle, Sparkles } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Product Bundles - Wearunifab',
    description: 'Customizable workwear bundles with free logo embroidery',
};

export default function BundlesPage() {
    const bundles = [
        {
            id: '6-item-kickstarter',
            name: '6 Item Kickstarter Bundle',
            description: 'Perfect starter bundle for small teams',
            items: ['2x Polo Shirts', '2x Hoodies', '2x Softshell Jackets'],
            price: 299.99,
            image: '/category-backgrounds/workwear.png',
        },
        {
            id: '10-item-professional',
            name: '10 Item Professional Bundle',
            description: 'Complete workwear solution for growing businesses',
            items: ['4x Polo Shirts', '3x Hoodies', '3x Softshell Jackets'],
            price: 499.99,
            image: '/category-backgrounds/hoodies.png',
        },
        {
            id: '15-item-enterprise',
            name: '15 Item Enterprise Bundle',
            description: 'Full team outfitting with maximum value',
            items: ['6x Polo Shirts', '5x Hoodies', '4x Softshell Jackets'],
            price: 699.99,
            image: '/category-backgrounds/jackets.png',
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-zinc-950 text-white py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#18181b_0%,#09090b_100%)]" />
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-zinc-800/20 rounded-full blur-[120px] animate-pulse" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-block px-6 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6">
                            Customizable Bundles
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase italic mb-6">
                            Workwear <span className="text-gradient">Bundles</span>
                        </h1>
                        <p className="text-xl text-zinc-400 leading-relaxed font-medium mb-8">
                            Complete workwear packages with free logo customization. Perfect for teams of any size.
                        </p>
                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="text-green-400" size={24} />
                                <span className="text-sm font-bold">Free Logo Embroidery</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="text-green-400" size={24} />
                                <span className="text-sm font-bold">Custom Sizes & Colors</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="text-green-400" size={24} />
                                <span className="text-sm font-bold">Design Proof Included</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bundles Grid */}
            <section className="py-24 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="mb-16">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-2">
                            Available Packages
                        </p>
                        <h2 className="text-4xl font-black text-zinc-950 tracking-tighter uppercase italic">
                            Choose Your Bundle
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {bundles.map((bundle) => (
                            <div
                                key={bundle.id}
                                className="group relative bg-white rounded-[2.5rem] border-2 border-zinc-100 overflow-hidden hover:border-zinc-950 transition-all duration-500 hover:shadow-2xl"
                            >
                                {/* Image */}
                                <div className="relative h-64 bg-zinc-50 overflow-hidden">
                                    <img
                                        src={bundle.image}
                                        alt={bundle.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                                    <div className="absolute bottom-4 left-4">
                                        <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white border border-white/20">
                                            Free Logo
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <h3 className="text-2xl font-black text-zinc-950 uppercase tracking-tight mb-2">
                                        {bundle.name}
                                    </h3>
                                    <p className="text-sm text-zinc-600 mb-6">
                                        {bundle.description}
                                    </p>

                                    {/* Items List */}
                                    <div className="space-y-2 mb-6">
                                        {bundle.items.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <Package size={16} className="text-zinc-400" />
                                                <span className="text-xs font-bold text-zinc-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-end justify-between mb-6">
                                        <div>
                                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                                Bundle Price
                                            </p>
                                            <p className="text-3xl font-black text-zinc-950 tracking-tighter italic">
                                                £{bundle.price}
                                            </p>
                                        </div>
                                        <Sparkles className="text-zinc-300" size={32} />
                                    </div>

                                    {/* CTA */}
                                    <Link
                                        href={`/bundles/${bundle.id}/customize`}
                                        className="block w-full py-4 bg-zinc-950 text-white text-center font-black uppercase tracking-widest text-xs rounded-xl hover:bg-zinc-800 transition-all shadow-lg"
                                    >
                                        Start Customizing
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 bg-zinc-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="inline-block p-6 bg-white rounded-2xl shadow-sm mb-4">
                                <Package size={32} className="text-zinc-950" />
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 mb-2">
                                Custom Selection
                            </h3>
                            <p className="text-sm text-zinc-600">
                                Choose specific products, sizes, and colors for each bundle item
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="inline-block p-6 bg-white rounded-2xl shadow-sm mb-4">
                                <Sparkles size={32} className="text-zinc-950" />
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 mb-2">
                                Logo Customization
                            </h3>
                            <p className="text-sm text-zinc-600">
                                Add text logos or upload your own design for each garment
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="inline-block p-6 bg-white rounded-2xl shadow-sm mb-4">
                                <CheckCircle size={32} className="text-zinc-950" />
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 mb-2">
                                Design Proof
                            </h3>
                            <p className="text-sm text-zinc-600">
                                We'll send a proof for approval before production begins
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
