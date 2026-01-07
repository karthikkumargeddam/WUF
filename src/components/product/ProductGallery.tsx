"use client";

import { ProductImage } from "@/types";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ProductGalleryProps {
    images: ProductImage[];
    title: string;
    variantImageId?: number | null;
}

export default function ProductGallery({ images, title, variantImageId }: ProductGalleryProps) {
    const [mounted, setMounted] = useState(false);
    const [selectedImage, setSelectedImage] = useState(images[0]);

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
            <div className="relative aspect-square bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-200 group">
                <Image
                    src={selectedImage.src}
                    alt={title}
                    fill
                    className="object-contain object-center p-8 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                />
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
