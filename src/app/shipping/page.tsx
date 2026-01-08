export default function ShippingPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <h1 className="text-5xl font-black text-white mb-10 uppercase tracking-tighter">Shipping Policy</h1>
            <div className="prose prose-invert prose-zinc max-w-none space-y-10 text-zinc-300 prose-p:text-zinc-300 prose-li:text-zinc-300 prose-headings:text-white prose-strong:text-white">
                <section>
                    <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight border-l-4 border-white pl-4">Processing Times</h2>
                    <p className="leading-relaxed font-medium">Orders are typically processed within 1-2 business days. For bulk orders exceeding 100 units, please allow 3-5 business days for processing and quality inspection.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight border-l-4 border-white pl-4">Domestic Shipping</h2>
                    <p className="mb-4 font-medium">We offer the following shipping methods for commercial and residential delivery:</p>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3"><span className="w-2 h-2 bg-white rounded-full" /> <strong>Standard Ground:</strong> 5-7 business days (Free on orders over £500)</li>
                        <li className="flex items-center gap-3"><span className="w-2 h-2 bg-white rounded-full" /> <strong>Expedited:</strong> 2-3 business days</li>
                        <li className="flex items-center gap-3"><span className="w-2 h-2 bg-white rounded-full" /> <strong>Next Day:</strong> Next business day delivery</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight border-l-4 border-white pl-4">Tracking Protocol</h2>
                    <p className="font-medium">Once your order has shipped, you will receive a secure confirmation with a tracking number. Use this to monitor your shipment via our carrier portal.</p>
                </section>

                <section className="bg-zinc-900 p-8 rounded-2xl border-2 border-zinc-800 text-white font-bold">
                    <p className="flex items-start gap-3">
                        <span className="text-red-500 block mt-1 uppercase text-xs">Avis:</span>
                        Industrial and oversized equipment may require specialized freight shipping. Our logistics team will contact you directly for these arrangements.
                    </p>
                </section>
            </div>
        </div>
    );
}
