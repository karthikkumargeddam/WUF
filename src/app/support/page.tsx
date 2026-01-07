export default function SupportPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <h1 className="text-6xl font-black text-zinc-950 mb-10 uppercase tracking-tighter">Operational Support</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 text-zinc-800">
                <div className="bg-white p-8 rounded-[2.5rem] border-4 border-zinc-100 shadow-xl hover:border-zinc-900 transition-all group">
                    <h2 className="text-2xl font-black text-zinc-900 mb-4 uppercase tracking-tight">Direct Terminal</h2>
                    <p className="font-medium mb-6 leading-relaxed text-zinc-600">Immediate assistance for ongoing deployments and procurement cycles.</p>
                    <a href="tel:+15551234567" className="text-xl font-black text-zinc-950 underline underline-offset-8 decoration-4 decoration-zinc-200 hover:decoration-zinc-900 transition-all">555-123-4567</a>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border-4 border-zinc-100 shadow-xl hover:border-zinc-900 transition-all group">
                    <h2 className="text-2xl font-black text-zinc-900 mb-4 uppercase tracking-tight">Fleet Inquiry</h2>
                    <p className="font-medium mb-6 leading-relaxed text-zinc-600">Contact our logistics team for bulk ordering and corporate accounts.</p>
                    <a href="mailto:support@wearunifab.com" className="text-xl font-black text-zinc-950 underline underline-offset-8 decoration-4 decoration-zinc-200 hover:decoration-zinc-900 transition-all">support@wearunifab.com</a>
                </div>
            </div>

            <div className="prose prose-zinc max-w-none space-y-12 text-zinc-800">
                <section>
                    <h2 className="text-3xl font-black text-zinc-950 mb-6 uppercase tracking-tight border-l-8 border-zinc-900 pl-6">Technical Resources</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a href="/faq" className="p-6 bg-zinc-50 rounded-2xl border-2 border-zinc-100 font-bold hover:bg-zinc-100 transition-colors">Operational FAQ</a>
                        <a href="/size-guide" className="p-6 bg-zinc-50 rounded-2xl border-2 border-zinc-100 font-bold hover:bg-zinc-100 transition-colors">Industrial Sizing Matrix</a>
                        <a href="/shipping" className="p-6 bg-zinc-50 rounded-2xl border-2 border-zinc-100 font-bold hover:bg-zinc-100 transition-colors">Logistics & Freight</a>
                        <a href="/returns" className="p-6 bg-zinc-50 rounded-2xl border-2 border-zinc-100 font-bold hover:bg-zinc-100 transition-colors">Returns Protocol</a>
                    </div>
                </section>

                <section className="bg-zinc-950 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter italic">24/7 Enterprise Support</h2>
                        <p className="text-zinc-400 font-medium mb-8 leading-relaxed max-w-md">Our senior logistics managers are available around the clock for tier-4 corporate partners. Sign in to your portal for immediate escalation.</p>
                        <a href="/login" className="inline-block px-10 py-5 bg-white text-zinc-950 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-zinc-100 transition-all shadow-xl">Portal Login</a>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-900/50 rounded-full -translate-y-1/2 translate-x-1/2" />
                </section>
            </div>
        </div>
    );
}
