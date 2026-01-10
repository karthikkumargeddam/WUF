import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { getAllProducts } from '@/lib/data';

export default async function TrendingProducts() {
    const allProducts = await getAllProducts();
    const products = allProducts.slice(0, 8);

    return (
        <section className="relative py-24 md:py-32 mx-4 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
            {/* Vibrant Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000" // Industrial Warehouse (Known Working)
                    alt="Trending Warehouse Background"
                    fill
                    className="object-cover transition-transform duration-[20s] ease-in-out group-hover:scale-110 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-900/50 to-zinc-900/20" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-2">Fleet Deployment</p>
                        <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic">Trending Assets</h2>
                    </div>
                    <Link href="/products" className="bg-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-zinc-950 hover:bg-zinc-200 transition-all flex items-center self-start md:self-auto shadow-lg hover:shadow-xl active:scale-95">
                        View All Assets <ArrowRight size={16} className="ml-2" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 stagger-entry">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
