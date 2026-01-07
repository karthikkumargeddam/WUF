export default function ReturnsPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <h1 className="text-5xl font-black text-zinc-950 mb-10 uppercase tracking-tighter">Returns & Exchanges</h1>
            <div className="prose prose-zinc max-w-none space-y-10 text-zinc-800">
                <section>
                    <h2 className="text-2xl font-black text-zinc-900 mb-4 uppercase tracking-tight border-l-4 border-zinc-900 pl-4">30-Day Industrial Guarantee</h2>
                    <p className="leading-relaxed font-medium">We stand behind the quality of our industrial workwear. If your selection does not meet your operational standards, you may initiate a return or exchange within 30 days of delivery.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-black text-zinc-900 mb-4 uppercase tracking-tight border-l-4 border-zinc-900 pl-4">Return Conditions</h2>
                    <ul className="space-y-3 font-medium">
                        <li className="flex items-start gap-3"><span className="w-2 h-2 bg-zinc-900 rounded-full mt-2" /> Items must be in original, unused condition for safety and hygiene compliancy.</li>
                        <li className="flex items-start gap-3"><span className="w-2 h-2 bg-zinc-900 rounded-full mt-2" /> Original tags and packaging must be present and undamaged.</li>
                        <li className="flex items-start gap-3"><span className="w-2 h-2 bg-zinc-900 rounded-full mt-2" /> <strong>Custom-branded (embroidered/printed) items are non-returnable</strong> unless a manufacturing defect is present.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-black text-zinc-900 mb-4 uppercase tracking-tight border-l-4 border-zinc-900 pl-4">Operational Process</h2>
                    <p className="font-medium">To start a return, contact our logistics team at <strong className="text-zinc-950 underline underline-offset-4">returns@wearunifab.com</strong>. Include your Order ID and specific reasons for return. We provide industrial-grade support for all fleet returns.</p>
                </section>
            </div>
        </div>
    );
}
