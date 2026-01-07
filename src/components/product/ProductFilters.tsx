"use client";

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface ProductFiltersProps {
    categories: string[];
    vendors: string[];
}

export default function ProductFilters({ categories, vendors }: ProductFiltersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value === "") {
                params.delete(name);
            } else {
                params.set(name, value);
            }
            // Reset to page 1 on filter change
            params.delete('page');
            return params.toString();
        },
        [searchParams]
    );

    const handleFilterChange = (name: string, value: string) => {
        router.push(pathname + '?' + createQueryString(name, value), { scroll: false });
    };

    const currentCategory = searchParams.get('category') || "";
    const currentVendor = searchParams.get('vendor') || "";
    const currentSort = searchParams.get('sort') || "newest";

    return (
        <aside className="w-full lg:w-80 space-y-12 flex-shrink-0 text-zinc-900">
            {/* Sort Order */}
            <div className="bg-white p-8 rounded-[2.5rem] border-2 border-zinc-100 shadow-sm">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6 italic">Filtration Protocol</h3>
                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block pl-1">Sort Logic</label>
                        <select
                            value={currentSort}
                            onChange={(e) => handleFilterChange('sort', e.target.value)}
                            className="w-full p-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl text-xs font-black uppercase tracking-widest focus:border-zinc-950 focus:outline-none transition-all cursor-pointer"
                        >
                            <option value="newest">Latest Deployment</option>
                            <option value="price-asc">Price: Ascending</option>
                            <option value="price-desc">Price: Descending</option>
                            <option value="name-asc">A-Z Registry</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-8 rounded-[2.5rem] border-2 border-zinc-100 shadow-sm">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6 italic">Category Nodes</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-4 scrollbar-thin">
                    <button
                        onClick={() => handleFilterChange('category', "")}
                        className={`block text-xs uppercase tracking-widest w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${currentCategory === "" ? 'bg-zinc-950 text-white font-black shadow-lg translate-x-1' : 'text-zinc-500 font-bold hover:bg-zinc-50 hover:text-zinc-950'}`}
                    >
                        All Categories
                    </button>
                    {categories.filter(Boolean).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleFilterChange('category', cat)}
                            className={`block text-xs uppercase tracking-widest w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${currentCategory === cat ? 'bg-zinc-950 text-white font-black shadow-lg translate-x-1' : 'text-zinc-500 font-bold hover:bg-zinc-50 hover:text-zinc-950'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Vendors */}
            <div className="bg-white p-8 rounded-[2.5rem] border-2 border-zinc-100 shadow-sm">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6 italic">Asset Origin</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-4 scrollbar-thin">
                    <button
                        onClick={() => handleFilterChange('vendor', "")}
                        className={`block text-xs uppercase tracking-widest w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${currentVendor === "" ? 'bg-zinc-950 text-white font-black shadow-lg translate-x-1' : 'text-zinc-500 font-bold hover:bg-zinc-50 hover:text-zinc-950'}`}
                    >
                        All Vendors
                    </button>
                    {vendors.filter(Boolean).map((vendor) => (
                        <button
                            key={vendor}
                            onClick={() => handleFilterChange('vendor', vendor)}
                            className={`block text-xs uppercase tracking-widest w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${currentVendor === vendor ? 'bg-zinc-950 text-white font-black shadow-lg translate-x-1' : 'text-zinc-500 font-bold hover:bg-zinc-50 hover:text-zinc-950'}`}
                        >
                            {vendor}
                        </button>
                    ))}
                </div>
            </div>

            {/* Clear All */}
            {(currentCategory || currentVendor || currentSort !== "newest") && (
                <button
                    onClick={() => router.push(pathname)}
                    className="w-full py-5 text-xs font-black uppercase tracking-[0.2em] text-red-600 bg-red-50/50 border-2 border-red-100 rounded-2xl hover:bg-red-50 hover:border-red-200 transition-all active:scale-95"
                >
                    Reset System Parameters
                </button>
            )}
        </aside>
    );

}
