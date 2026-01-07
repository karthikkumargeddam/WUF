export default function FAQPage() {
    const faqs = [
        {
            q: "Do you offer bulk discounts?",
            a: "Yes! We specialize in wholesale and corporate accounts. Discounts start at orders of 50+ units. Please contact our sales team for a custom quote."
        },
        {
            q: "Can I customize the uniforms with my company logo?",
            a: "Absolutely. We offer high-quality embroidery and screen printing services. You can upload your logo during the bulk order process."
        },
        {
            q: "What is your typical turnaround time?",
            a: "Standard orders ship within 48 hours. Custom branded orders typically take 10-14 business days from design approval."
        },
        {
            q: "What standards do your safety gear meet?",
            a: "Our safety apparel is compliant with relevant OSHA and ANSI standards. Specific certifications are listed on individual product pages."
        }
    ];

    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <h1 className="text-5xl font-black text-zinc-950 mb-10 uppercase tracking-tighter">Support & FAQ</h1>
            <div className="space-y-8">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="p-8 bg-white border-2 border-zinc-100 rounded-3xl shadow-sm hover:border-zinc-200 transition-colors">
                        <h3 className="text-xl font-black text-zinc-900 mb-3 uppercase tracking-tight">{faq.q}</h3>
                        <p className="text-zinc-800 leading-relaxed font-medium">{faq.a}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
