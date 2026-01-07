import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-zinc-900/60 z-10" />
                <div className="absolute inset-0 bg-[url('https://wearunifab.com/cdn/shop/files/about-us-hero.jpg?v=1710523456')] bg-cover bg-center" />
                <div className="relative z-20 text-center text-white px-4">
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 shadow-sm">The Heritage</h1>
                    <p className="text-xl md:text-2xl text-zinc-200 max-w-3xl mx-auto font-bold tracking-tight">Equipping the global industrial workforce with precision and durability since 1995.</p>
                </div>
            </section>

            <section className="container mx-auto px-4 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-4xl font-black text-zinc-950 uppercase tracking-tighter mb-8 italic">Dedication to Durability</h2>
                        <p className="text-zinc-800 text-lg leading-relaxed mb-6 font-medium">
                            Wearunifab was founded with a single mission: to provide the hardest-working people with the highest-quality uniforms. We understand that in industrial environments, your apparel is your armor.
                        </p>
                        <p className="text-zinc-800 text-lg leading-relaxed font-medium">
                            From heavy-duty construction sites to high-precision manufacturing labs, our products are engineered to exceed expectations. We combine traditional craftsmanship with modern fabric technology to ensure safety, comfort, and professional appearance.
                        </p>
                    </div>
                    <div className="bg-zinc-900 rounded-[40px] aspect-video flex flex-col items-center justify-center p-12 border-4 border-zinc-800 shadow-2xl">
                        <span className="text-zinc-600 font-black uppercase tracking-[0.2em] text-sm mb-4">Industrial Standards</span>
                        <div className="h-px w-24 bg-zinc-700 mb-4" />
                        <span className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Certified Manufacturing Visual</span>
                    </div>
                </div>
            </section>

            <section className="bg-zinc-50 py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <h3 className="text-4xl font-black text-zinc-900 mb-2">25+</h3>
                            <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest">Years of Expertise</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-4xl font-black text-zinc-900 mb-2">500k+</h3>
                            <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest">Workers Equipped</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-4xl font-black text-zinc-900 mb-2">10k+</h3>
                            <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest">Business Partners</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
