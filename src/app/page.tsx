import Link from 'next/link';
import { fetchCollections, fetchProducts } from '@/lib/api';
import CollectionCard from '@/components/collection/CollectionCard';
import ProductCard from '@/components/product/ProductCard';
import { ArrowRight, CheckCircle, Truck, ShieldCheck } from 'lucide-react';

export default async function Home() {
  const { collections } = await fetchCollections();
  const { products } = await fetchProducts(1, 8); // Fetch 8 products for "Trending"

  // Select 3-4 collections for "Featured" section
  const featuredCollections = collections.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-zinc-950 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#18181b_0%,#09090b_100%)]"></div>
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-zinc-800/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-zinc-800/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl space-y-10">
            <div className="space-y-4">
              <span className="inline-block px-6 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 animate-float">
                Authorized Industrial Supplier
              </span>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic">
                Equip the <br />
                <span className="text-gradient">Frontline.</span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed font-medium">
              High-performance gear engineered for the modern industrial fleet. From heavy-duty apparel to advanced safety systems.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Link href="/products" className="inline-flex items-center justify-center px-12 py-6 bg-white text-zinc-950 font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-zinc-200 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] active:scale-95 text-sm">
                Access Catalog <ArrowRight className="ml-3" size={20} />
              </Link>
              <Link href="/collections" className="inline-flex items-center justify-center px-12 py-6 glass-premium border-2 border-zinc-800 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-zinc-800/50 transition-all active:scale-95 text-sm">
                Deployment Nodes
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
          <div className="w-1 h-12 bg-white rounded-full"></div>
        </div>
      </section>

      {/* Trust Indicators - The "Operational Integrity" Bar */}
      <section className="bg-zinc-950 border-y border-zinc-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex items-center gap-6 group">
              <div className="p-5 bg-zinc-900 rounded-3xl text-white group-hover:bg-zinc-800 transition-colors border border-zinc-800">
                <Truck size={32} />
              </div>
              <div>
                <h3 className="font-black text-white uppercase tracking-tighter text-lg italic">Global Logistics</h3>
                <p className="text-sm text-zinc-500 font-medium">Tier-1 freight priority</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="p-5 bg-zinc-900 rounded-3xl text-white group-hover:bg-zinc-800 transition-colors border border-zinc-800">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h3 className="font-black text-white uppercase tracking-tighter text-lg italic">Quality Standard</h3>
                <p className="text-sm text-zinc-500 font-medium">Industrial-grade durability</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="p-5 bg-zinc-900 rounded-3xl text-white group-hover:bg-zinc-800 transition-colors border border-zinc-800">
                <CheckCircle size={32} />
              </div>
              <div>
                <h3 className="font-black text-white uppercase tracking-tighter text-lg italic">Enterprise Flow</h3>
                <p className="text-sm text-zinc-500 font-medium">Volume-optimized pricing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-2">Navigation Matrix</p>
              <h2 className="text-5xl font-black text-zinc-950 tracking-tighter uppercase italic">Operational Nodes</h2>
            </div>
            <Link href="/collections" className="bg-zinc-100 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-zinc-900 hover:bg-zinc-200 transition-all flex items-center self-start md:self-auto">
              View All Nodes <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-entry">
            {featuredCollections.map(collection => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-24 md:py-32 bg-zinc-50 rounded-[5rem] mx-4 border-2 border-zinc-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-2">Fleet Deployment</p>
              <h2 className="text-5xl font-black text-zinc-950 tracking-tighter uppercase italic">Trending Assets</h2>
            </div>
            <Link href="/products" className="bg-zinc-950 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-zinc-800 transition-all flex items-center self-start md:self-auto">
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

      {/* Corporate Call to Action */}
      <section className="py-32 md:py-48 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-zinc-950"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5f649e expansion?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-10 grayscale"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-none">Initialize <br /><span className="text-gradient">Fleet Procurement</span></h2>
            <p className="text-zinc-400 text-xl font-medium leading-relaxed">
              We provide end-to-end apparel solutions for enterprise-level operations. Scale your brand visibility across your entire workforce.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link href="/contact" className="inline-block px-12 py-6 bg-white text-zinc-950 font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-zinc-200 transition-all shadow-xl active:scale-95">
                Request Quote
              </Link>
              <Link href="/login" className="inline-block px-12 py-6 glass-premium border-2 border-zinc-800 text-white font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-zinc-800/50 transition-all active:scale-95">
                Business Portal
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

