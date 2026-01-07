export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <h1 className="text-5xl font-black text-zinc-950 mb-10 uppercase tracking-tighter">Privacy & Security</h1>
            <div className="prose prose-zinc max-w-none space-y-10 text-zinc-800">
                <p className="font-black text-zinc-400 uppercase tracking-widest text-[10px]">Operational Security Standard — Updated: {new Date().toLocaleDateString()}</p>
                <section>
                    <h2 className="text-2xl font-black text-zinc-900 mb-4 uppercase tracking-tight border-l-4 border-zinc-900 pl-4">Data Collection Protocol</h2>
                    <p className="leading-relaxed font-medium">We collect information required for business transactions and fleet procurement, including corporate billing details, shipping addresses, and professional contact information.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-black text-zinc-900 mb-4 uppercase tracking-tight border-l-4 border-zinc-900 pl-4">Utilization</h2>
                    <p className="leading-relaxed font-medium">Your data is utilized strictly for service fulfillment, logistics optimization, and account management. We maintain high standards of business confidentiality.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-black text-zinc-900 mb-4 uppercase tracking-tight border-l-4 border-zinc-900 pl-4">Industrial-Grade Security</h2>
                    <p className="leading-relaxed font-medium">Every transaction is protected by 256-bit encryption. We partner with leading financial gateways to ensure your corporate payment data remains private and secure.</p>
                </section>
            </div>
        </div>
    );
}
