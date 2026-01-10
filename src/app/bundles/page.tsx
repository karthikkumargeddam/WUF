import Link from 'next/link';
import { Package, Check, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Workwear Bundles | Wearunifab',
    description: 'Save on professional workwear bundles with free logo customization.',
};

export default function BundlesPage() {
    const featuredBundles = [
        {
            id: 'autumn-uneek-bundle',
            name: 'Autumn Uneek Bundle',
            tagline: 'Staff Favorite',
            description: 'Essential warmth layer pack. 3 Hoodies, 2 Fleeces, 3 Beanies. Stay warm on site.',
            items: [
                { qty: 3, label: 'Hoodies' },
                { qty: 2, label: 'Fleece Jackets' },
                { qty: 3, label: 'Beanies' }
            ],
            price: 130.00,
            image: '/category-backgrounds/workwear.png',
            badge: 'Top Pick',
            color: 'bg-orange-600'
        },
        {
            id: '10-item-professional',
            name: 'Pro Pack',
            tagline: 'Most Popular',
            description: 'The standard choice for growing teams. Includes polos, sweatshirts and fleece.',
            items: [
                { qty: 5, label: 'Polo Shirts' },
                { qty: 3, label: 'Sweatshirts' },
                { qty: 2, label: 'Fleeces' }
            ],
            price: 185.00,
            image: '/category-backgrounds/hoodies.png',
            badge: 'Popular',
            color: 'bg-green-600'
        },
        {
            id: '15-item-enterprise',
            name: 'Enterprise Pack',
            tagline: 'Complete Uniform',
            description: 'Full uniform solution for larger teams or comprehensive individual issue.',
            items: [
                { qty: 7, label: 'Polo Shirts' },
                { qty: 5, label: 'Hoodies' },
                { qty: 3, label: 'Softshell Jackets' }
            ],
            price: 299.00,
            image: '/category-backgrounds/jackets.png',
            color: 'bg-purple-600'
        }
    ];

    const specializedBundles = [
        {
            id: 'kids-school-bundle',
            name: 'Kids School Pack (VAT FREE)',
            price: 45.00,
            image: '/category-backgrounds/polos.png',
            count: '5 Items'
        },
        {
            id: 'hospitality-bundle',
            name: 'Hospitality Pack',
            price: 199.99,
            image: '/images/bundles/hospitality_bundle_card_1767936313533.png',
            count: '5 Items'
        },
        {
            id: 'polo-bundle',
            name: '5 Pack Polos',
            price: 65.00,
            image: '/category-backgrounds/polos.png',
            count: '5 Items'
        },
        {
            id: 'hoodies-bundle',
            name: '5 Pack Hoodies',
            price: 110.00,
            image: '/category-backgrounds/hoodies.png',
            count: '5 Items'
        },
        {
            id: 'hi-visibility-bundle',
            name: 'Hi-Vis Safety Pack',
            price: 45.00,
            image: '/category-backgrounds/hi-vis.png',
            count: '5 Items'
        },
        {
            id: 'fleece-bundle-just-embroidery',
            name: 'Fleece Warmth Pack',
            price: 85.00,
            image: '/category-backgrounds/fleeces.png',
            count: '5 Items'
        },
        {
            id: 't-shirt-bundle',
            name: '10 Pack T-Shirts',
            price: 75.00,
            image: '/category-backgrounds/t-shirts.png',
            count: '10 Items'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Value Proposition Header */}
            <div className="bg-gray-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Workwear Bundles</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
                        Professional uniforms made simple. Select a bundle, customize your items, and add your logo.
                        Bundle pricing includes <span className="text-white font-bold underline decoration-blue-500">Free Logo Setup</span>.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-400">
                        <div className="flex items-center gap-2">
                            <Check className="text-green-400 w-5 h-5" /> Free Logo Upload
                        </div>
                        <div className="flex items-center gap-2">
                            <Check className="text-green-400 w-5 h-5" /> Mix & Match Sizes/Colors
                        </div>
                        <div className="flex items-center gap-2">
                            <Check className="text-green-400 w-5 h-5" /> Bulk Discounts Applied
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Bundles */}
            <section className="py-16 container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 -mt-24 relative z-10">
                    {featuredBundles.map((bundle) => (
                        <div key={bundle.id} className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 flex flex-col hover:shadow-2xl transition-shadow">
                            <div className="h-48 bg-gray-100 relative overflow-hidden">
                                {bundle.badge && (
                                    <span className={`absolute top-4 right-4 ${bundle.color} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
                                        {bundle.badge}
                                    </span>
                                )}
                                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
                                <img src={bundle.image} alt={bundle.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{bundle.name}</h3>
                                <p className="text-gray-500 text-sm mb-6">{bundle.description}</p>

                                <div className="space-y-3 mb-8 bg-gray-50 p-4 rounded-lg">
                                    {bundle.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600">{item.label}</span>
                                            <span className="font-bold text-gray-900">x{item.qty}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase">From</p>
                                        <p className="text-3xl font-bold text-gray-900">£{bundle.price}</p>
                                    </div>
                                    <Link
                                        href={`/bundles/${bundle.id}/customize`}
                                        className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                                    >
                                        Customize <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* More Collections */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Specialized Packs</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {specializedBundles.map((bundle) => (
                            <Link
                                key={bundle.id}
                                href={`/bundles/${bundle.id}/customize`}
                                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-300 transition-all hover:-translate-y-1 block"
                            >
                                <div className="aspect-[4/3] bg-gray-100 relative text-gray-500 flex items-center justify-center">
                                    <img src={bundle.image} alt={bundle.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{bundle.name}</h4>
                                    <p className="text-gray-500 text-sm mt-1">£{bundle.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
