"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
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
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products, categories, or SKU..."
                className="w-full pl-4 pr-10 py-2.5 bg-zinc-50 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
            />
            <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900"
            >
                <Search size={20} />
            </button>
        </form>
    );
}
