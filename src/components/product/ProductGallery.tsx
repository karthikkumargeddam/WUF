"use client";

import { ProductImage } from "@/types";
import Image from "next/image";
import { useState, useEffect } from "react";
import { User } from "lucide-react";

interface ProductGalleryProps {
    images: ProductImage[];
    title: string;
    variantImageId?: number | string | null;
    scale?: number;
}

export default function ProductGallery({ images, title, variantImageId, scale = 1 }: ProductGalleryProps) {
    const [mounted, setMounted] = useState(false);
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [showMannequin, setShowMannequin] = useState(false);

    // Ensure client-side hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    // Update main image if variant changes
    useEffect(() => {
        if (variantImageId) {
            const variantImg = images.find(img => img.id === variantImageId);
            if (variantImg) {
                setSelectedImage(variantImg);
            }
        }
    }, [variantImageId, images]);

    if (images.length === 0) {
        return (
            <div className="aspect-square bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-400">
                No Image Available
            </div>
        );
    }

    // Show loading skeleton until mounted to prevent hydration mismatch
    if (!mounted) {
        return (
            <div className="space-y-6">
                <div className="relative aspect-square bg-zinc-100 rounded-2xl overflow-hidden border border-zinc-200 animate-pulse" />
                <div className="grid grid-cols-5 gap-3">
                    {images.map((img) => (
                        <div
                            key={img.id}
                            className="relative aspect-square rounded-lg overflow-hidden border-2 border-zinc-200 bg-zinc-100 animate-pulse"
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="relative aspect-square bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-200 group flex items-center justify-center pb-8">
                {/* Virtual Mannequin Overlay - Realistic Mode */}
                <div
                    className={`absolute inset-0 flex items-end justify-center pointer-events-none transition-all duration-500 z-20 ${showMannequin ? 'opacity-100' : 'opacity-0'}`}
                >
                    {/* Detailed Human Torso Silhouette */}
                    <svg viewBox="0 0 200 300" className="h-[85%] w-auto drop-shadow-2xl">
                        <defs>
                            <linearGradient id="bodyGradient" x1="0" x2="1" y1="0" y2="1">
                                <stop offset="0%" stopColor="#27272a" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#52525b" stopOpacity="0.4" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        {/* Body Fill */}
                        <path
                            d="M100,20 C115,20 125,25 125,45 L125,55 C125,60 160,70 180,85 C190,92 190,110 185,130 L170,125 C165,110 160,100 155,100 L155,250 C155,280 140,300 100,300 C60,300 45,280 45,250 L45,100 C40,100 35,110 30,125 L15,130 C10,110 10,92 20,85 C40,70 75,60 75,55 L75,45 C75,25 85,20 100,20 Z"
                            fill="url(#bodyGradient)"
                            filter="url(#glow)"
                            className="transition-all duration-500"
                        />
                        {/* Muscle/Contour Definitions for Realism */}
                        <path d="M100,20 L100,55 M50,150 Q70,180 100,180 Q130,180 150,150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    </svg>
                </div>

                <div
                    className="relative w-[80%] h-[80%] transition-transform duration-500 ease-out z-10"
                    style={{ transform: `scale(${scale})` }}
                >
                    <Image
                        src={selectedImage.src}
                        alt={title}
                        fill
                        className="object-contain object-bottom transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </div>

                {/* Virtual Fit Toggle */}
                <button
                    onClick={() => setShowMannequin(!showMannequin)}
                    className={`absolute top-4 right-4 z-20 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg ${showMannequin
                        ? 'bg-zinc-900 text-white shadow-zinc-900/20'
                        : 'bg-white text-zinc-950 border border-zinc-200 hover:bg-zinc-50'
                        }`}
                >
                    <User size={14} />
                    {showMannequin ? 'Hide Simulation' : 'Virtual Fit'}
                </button>
            </div>

            <div className="grid grid-cols-5 gap-3">
                {images.map((img) => (
                    <button
                        key={img.id}
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            setSelectedImage(img);
                        }}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${selectedImage.id === img.id
                            ? 'border-zinc-900 ring-2 ring-zinc-900/10'
                            : 'border-zinc-200 hover:border-zinc-400'
                            }`}
                    >
                        <Image
                            src={img.src}
                            alt={`${title} - View ${img.position}`}
                            fill
                            className="object-cover p-1 pointer-events-none"
                            sizes="10vw"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
