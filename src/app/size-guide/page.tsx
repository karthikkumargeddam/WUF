export default function SizeGuidePage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <h1 className="text-5xl font-black text-white mb-10 uppercase tracking-tighter">Size Guide</h1>
            <div className="prose prose-zinc max-w-none space-y-12 text-white prose-p:text-white prose-li:text-white prose-headings:text-white prose-strong:text-white">
                <p className="text-lg font-medium leading-relaxed">Industrial uniforms require a proper fit for both safety and operational efficiency. Use the professional charts below to find your fleet size.</p>

                <section>
                    <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight border-l-4 border-white pl-4">Men&apos;s Apparel (Chest Size)</h2>
                    <div className="overflow-hidden rounded-2xl border-2 border-zinc-700 shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white uppercase text-xs font-black text-zinc-950 tracking-widest">
                                    <th className="p-4 border-b border-zinc-200">Size</th>
                                    <th className="p-4 border-b border-zinc-200">Chest (Inches)</th>
                                    <th className="p-4 border-b border-zinc-200">Sleeve (Inches)</th>
                                </tr>
                            </thead>
                            <tbody className="bg-zinc-900 text-white">
                                <tr className="hover:bg-zinc-800 transition-colors"><td className="p-4 border-b border-zinc-800 font-bold text-white">Small</td><td className="p-4 border-b border-zinc-800">34 - 36</td><td className="p-4 border-b border-zinc-800">32.5 - 33</td></tr>
                                <tr className="hover:bg-zinc-800 transition-colors"><td className="p-4 border-b border-zinc-800 font-bold text-white">Medium</td><td className="p-4 border-b border-zinc-800">38 - 40</td><td className="p-4 border-b border-zinc-800">33.5 - 34</td></tr>
                                <tr className="hover:bg-zinc-800 transition-colors"><td className="p-4 border-b border-zinc-800 font-bold text-white">Large</td><td className="p-4 border-b border-zinc-800">42 - 44</td><td className="p-4 border-b border-zinc-800">34.5 - 35</td></tr>
                                <tr className="hover:bg-zinc-800 transition-colors"><td className="p-4 font-bold text-white">XL</td><td className="p-4">46 - 48</td><td className="p-4">35.5 - 36</td></tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight border-l-4 border-white pl-4">Measuring Protocol</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                            <h4 className="font-black uppercase text-xs tracking-widest mb-3 text-white">Chest Protocol</h4>
                            <p className="text-white">Measure around the fullest part of your chest, keeping the tape horizontal and firm but not tight.</p>
                        </div>
                        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                            <h4 className="font-black uppercase text-xs tracking-widest mb-3 text-white">Waist Protocol</h4>
                            <p className="text-white">Measure around your natural waistline, where your utility belt usually sits.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
