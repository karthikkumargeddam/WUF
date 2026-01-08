import Link from "next/link";
import Image from "next/image";
import { Clock, Tag } from "lucide-react";

export default function OffersSection() {
    const offers = [
        {
            id: 1,
            title: "Bulk Fleet Deal",
            discount: "20% OFF",
            desc: "On orders over £1000",
            image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
            code: "FLEET20",
            link: "/products"
        },
        {
            id: 2,
            title: "New Customer Pack",
            discount: "Free Logo",
            desc: "First order setup fee waived",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
            code: "WELCOME",
            link: "/contact"
        },
        {
            id: 3,
            title: "Hi-Vis Bundle",
            discount: "From £39.99",
            desc: "Complete safety set",
            image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800",
            code: "BUNDLE",
            link: "/bundles/high-vis-safety-bundle"
        }
    ];

    return (
        <section className="py-12 bg-transparent border-y border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-2 mb-8">
                    <Tag className="text-red-500" />
                    <h2 className="text-2xl font-black uppercase tracking-tight text-white">Today&apos;s Deals</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {offers.map((offer) => (
                        <div key={offer.id} className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 shadow-sm hover:shadow-lg hover:border-zinc-700 transition-all group cursor-pointer">
                            <Link href={offer.link} className="flex gap-4">
                                <div className="relative w-32 h-32 flex-shrink-0 bg-zinc-800 rounded-xl overflow-hidden">
                                    <Image src={offer.image} alt={offer.title} fill className="object-cover group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="inline-block bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md mb-2 w-fit">
                                        {offer.discount}
                                    </span>
                                    <h3 className="font-bold text-white leading-tight mb-1">{offer.title}</h3>
                                    <p className="text-xs text-zinc-400 mb-3">{offer.desc}</p>
                                    <div className="flex items-center gap-1 text-xs font-bold text-zinc-500">
                                        Code: <span className="text-white border border-zinc-700 px-1 rounded ml-1">{offer.code}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
