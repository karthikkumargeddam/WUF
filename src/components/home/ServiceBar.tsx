import { Truck, RotateCcw, ShieldCheck, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function ServiceBar() {
    const services = [
        { icon: Truck, title: "Track Order", link: "/track-order", desc: "Real-time updates" },
        { icon: RotateCcw, title: "Returns", link: "/returns", desc: "30-Day Guarantee" },
        { icon: ShieldCheck, title: "Shipping", link: "/shipping", desc: "Global Logistics" },
        { icon: HelpCircle, title: "Support", link: "/contact", desc: "24/7 Assistance" },
    ];

    return (
        <div className="bg-zinc-900 text-white py-4 border-b border-zinc-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {services.map((item, idx) => (
                        <Link key={idx} href={item.link} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800 transition-colors">
                            <item.icon size={20} className="text-zinc-400" />
                            <div>
                                <p className="text-sm font-bold uppercase tracking-wide">{item.title}</p>
                                <p className="text-[10px] text-zinc-500">{item.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
