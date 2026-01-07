"use client";

export default function TrackOrderPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl text-center">
            <h1 className="text-6xl font-black text-zinc-950 mb-6 uppercase tracking-tighter">Shipment Tracking</h1>
            <p className="text-zinc-600 font-medium text-xl mb-12 max-w-2xl mx-auto">Monitor the real-time status of your industrial gear deployment and logistic freight cycles.</p>

            <div className="bg-white p-12 md:p-16 rounded-[4rem] border-4 border-zinc-100 shadow-2xl max-w-2xl mx-auto mb-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-zinc-900" />

                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-4 text-left">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 pl-2">Operational Order ID</label>
                        <input
                            type="text"
                            className="w-full p-6 rounded-[2rem] border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all text-xl font-black tracking-widest placeholder:text-zinc-200"
                            placeholder="WUF-2026-XXXX"
                        />
                    </div>

                    <div className="space-y-4 text-left">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 pl-2">Authorized Email</label>
                        <input
                            type="email"
                            className="w-full p-6 rounded-[2rem] border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all text-xl font-black tracking-widest placeholder:text-zinc-200"
                            placeholder="logistics@company.com"
                        />
                    </div>

                    <button className="w-full py-6 bg-zinc-900 text-white font-black uppercase tracking-[0.4em] rounded-[2rem] hover:bg-zinc-800 transition-all shadow-xl text-lg mt-4">
                        Initialize Tracking
                    </button>
                </form>

                <div className="mt-12 pt-8 border-t border-zinc-50">
                    <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest leading-loose">
                        Global Logistic Standard ГЧі Real-time Carrier Integration ГЧі 256-bit Secure
                    </p>
                </div>
            </div>

            <p className="text-zinc-400 text-sm font-medium">Lost your manifest? <a href="/contact" className="text-zinc-950 font-black border-b-2 border-zinc-950 hover:text-blue-700 transition-colors">Contact Operational Headquarters</a></p>
        </div>
    );
}
