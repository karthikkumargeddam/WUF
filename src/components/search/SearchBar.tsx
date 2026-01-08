"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState("");

    // Sync with URL on load
    useEffect(() => {
        const q = searchParams.get("q");
        if (q && q !== query) {
            const frame = requestAnimationFrame(() => setQuery(q));
            return () => cancelAnimationFrame(frame);
        }
    }, [searchParams, query]);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
            setIsFocused(false);
        }
    };

    return (
        <>
            {/* Dark Backdrop Context */}
            {isFocused && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-500 animate-in fade-in"
                    onClick={() => setIsFocused(false)}
                />
            )}

            <form onSubmit={handleSearch} className={`relative w-full transition-all duration-300 ${isFocused ? 'z-50 scale-105' : 'z-10'}`}>
                <input
                    type="text"
                    value={query}
                    onFocus={() => setIsFocused(true)}

                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for products, categories, or SKU..."
                    className={`w-full pl-4 pr-10 py-3 border rounded-xl focus:outline-none transition-all duration-300 shadow-lg ${isFocused
                        ? 'bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500 ring-4 ring-zinc-800/50'
                        : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-zinc-900'
                        }`}
                />
                <button
                    type="submit"
                    className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${isFocused ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
                >
                    <Search size={20} />
                </button>
            </form>
        </>
    );
}
