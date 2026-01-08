"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&q=80&w=2000",
        title: "Equip the Frontline",
        subtitle: "High-Performance Industrial Wear",
        cta: "Shop Catalog",
        link: "/products",
        align: "left"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000",
        title: "Volume Pricing Available",
        subtitle: "Save up to 40% on Fleet Orders",
        cta: "Get Quote",
        link: "/contact",
        align: "center"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&q=80&w=2000",
        title: "Custom Branding",
        subtitle: "Your Logo, On Every Uniform",
        cta: "Start Customizing",
        link: "/bundles/high-vis-safety-bundle",
        align: "left"
    }
];

export default function HomeBanner() {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
    const prev = () => setCurrent((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

    useEffect(() => {
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-[600px] w-full overflow-hidden bg-zinc-900 group">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                    <div className="absolute inset-0 z-20 flex items-center container mx-auto px-4">
                        <div className={`max-w-2xl space-y-6 ${slide.align === 'center' ? 'mx-auto text-center' : ''}`}>
                            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter shadow-sm animate-in slide-in-from-bottom-5 duration-700 fade-in text-shadow">
                                {slide.title}
                            </h2>
                            <p className="text-xl md:text-2xl text-zinc-100 font-medium text-shadow-sm">
                                {slide.subtitle}
                            </p>
                            <Link
                                href={slide.link}
                                className="inline-block px-10 py-4 bg-white text-zinc-950 font-black uppercase tracking-widest rounded-xl hover:bg-zinc-200 transition-all shadow-xl active:scale-95"
                            >
                                {slide.cta}
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {/* Controls */}
            <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/30 text-white rounded-full backdrop-blur-sm hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/30 text-white rounded-full backdrop-blur-sm hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100"
            >
                <ChevronRight size={32} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${current === idx ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
