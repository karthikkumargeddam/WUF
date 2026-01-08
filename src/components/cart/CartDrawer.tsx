"use client";

import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { X, Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types";

export default function CartDrawer() {
    const {
        isOpen,
        closeCart,
        items,
        removeItem,
        updateQuantity,
        getCartTotal
    } = useCartStore();
    const { isAuthenticated } = useAuthStore();

    const [mounted, setMounted] = useState(false);
    const [suggestions, setSuggestions] = useState<Product[]>([]);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);

        // Fetch suggestions for empty state
        const loadSuggestions = async () => {
            const data = await fetchProducts(1, 3);
            setSuggestions(data.products);
        };
        loadSuggestions();
    }, []);

    if (!mounted) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={closeCart}
            />

            {/* Drawer */}
            <div
                className={`fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white shadow-2xl transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} border-l-4 border-zinc-950`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-100">
                        <div>
                            <h2 className="text-xl font-black text-zinc-950 uppercase tracking-tighter">Manifest</h2>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{items.length} Active Deployments</p>
                        </div>
                        <button onClick={closeCart} className="p-2 text-zinc-400 hover:text-zinc-950 rounded-xl hover:bg-zinc-50 transition-all">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Priority Shipping Progress */}
                    {items.length > 0 && (
                        <div className="px-8 py-5 bg-zinc-50 border-b border-zinc-100">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-950 italic">Priority Freight Log</span>
                                <span className="text-[10px] font-bold text-zinc-500">
                                    {getCartTotal() >= 500 ? 'FREE SHIPPING ACHIEVED' : `£${(500 - getCartTotal()).toFixed(2)} to free freight`}
                                </span>
                            </div>
                            <div className="h-2 w-full bg-zinc-200 rounded-full overflow-hidden border border-zinc-200">
                                <div
                                    className="h-full bg-zinc-950 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(0,0,0,0.2)]"
                                    style={{ width: `${Math.min((getCartTotal() / 500) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Items */}
                    <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 no-scrollbar">
                        {items.length === 0 ? (
                            <div className="h-full flex flex-col pt-12">
                                <div className="text-center mb-12">
                                    <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-zinc-200">
                                        <ShoppingBag size={24} className="text-zinc-300" />
                                    </div>
                                    <p className="text-sm font-black text-zinc-400 uppercase tracking-widest">No assets deployed</p>
                                    <button onClick={closeCart} className="text-zinc-950 font-black border-b-2 border-zinc-950 text-xs mt-4 uppercase tracking-widest">
                                        Initialize Procurement
                                    </button>
                                </div>

                                {suggestions.length > 0 && (
                                    <div className="mt-auto">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 border-b border-zinc-100 pb-2 italic">Recommended Fleet Gear</h3>
                                        <div className="space-y-4">
                                            {suggestions.map((product) => (
                                                <Link
                                                    key={product.id}
                                                    href={`/products/${product.handle}`}
                                                    onClick={closeCart}
                                                    className="flex gap-4 p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-transparent hover:border-zinc-200 transition-all group"
                                                >
                                                    <div className="h-16 w-16 bg-white rounded-xl overflow-hidden border border-zinc-100 p-2 flex-shrink-0">
                                                        <Image src={product.images[0]?.src} alt={product.title} width={60} height={60} className="object-contain w-full h-full group-hover:scale-110 transition-transform" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-xs font-black uppercase text-zinc-950 line-clamp-1">{product.title}</p>
                                                        <p className="text-[10px] font-bold text-zinc-400 tracking-widest mt-1">£{product.variants[0]?.price} GBP</p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <ArrowRight size={14} className="text-zinc-300 group-hover:text-zinc-950 group-hover:translate-x-1 transition-all" />
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={`${item.id}-${item.variantId}`} className="group relative">
                                    <div className="flex gap-6">
                                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-[1.5rem] bg-zinc-50 border-2 border-zinc-100 p-2 group-hover:border-zinc-950 transition-colors">
                                            {item.image ? (
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] font-black uppercase text-zinc-300 tracking-tighter">Null-Img</div>
                                            )}
                                        </div>

                                        <div className="flex flex-1 flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <Link href={`/products/${item.handle}`} onClick={closeCart} className="text-xs font-black uppercase text-zinc-950 hover:underline underline-offset-4 decoration-zinc-300 line-clamp-2 pr-4 tracking-tight">
                                                        {item.title}
                                                    </Link>
                                                    <p className="text-xs font-black text-zinc-950 tracking-tighter">£{(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                                <p className="mt-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest italic">
                                                    {item.quantity} Units {item.variantTitle && item.variantTitle !== 'Default Title' ? `• ${item.variantTitle}` : ''}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center bg-zinc-100 rounded-lg p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.variantId, item.quantity - 1)}
                                                        className="p-1 hover:bg-white rounded-md transition-all text-zinc-950 disabled:opacity-20"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="px-3 text-[10px] font-black w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.variantId, item.quantity + 1)}
                                                        className="p-1 hover:bg-white rounded-md transition-all text-zinc-950"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.id, item.variantId)}
                                                    className="p-2 text-zinc-300 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="border-t-2 border-zinc-950 px-8 py-8 bg-zinc-50">
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                    <p>Logistics Load</p>
                                    <p>{items.reduce((acc, i) => acc + i.quantity, 0)} Units</p>
                                </div>
                                <div className="flex justify-between items-end">
                                    <p className="text-xs font-black uppercase text-zinc-500 tracking-tighter">Budget Allocation</p>
                                    <p className="text-3xl font-black text-zinc-950 tracking-tighter leading-none">£{getCartTotal().toFixed(2)}</p>
                                </div>
                                <p className="text-[10px] font-bold text-zinc-400 tracking-wider">Freight calculated at deployment confirmation.</p>
                            </div>

                            {isAuthenticated ? (
                                <Link
                                    href="/checkout"
                                    onClick={closeCart}
                                    className="flex items-center justify-center w-full bg-zinc-950 text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)] hover:scale-[1.02] transition-all active:scale-95"
                                >
                                    Initiate Deployment
                                </Link>
                            ) : (
                                <Link
                                    href="/login?redirect=/checkout"
                                    onClick={closeCart}
                                    className="flex items-center justify-center w-full bg-zinc-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:bg-zinc-800 transition-all"
                                >
                                    Login to Deploy
                                </Link>
                            )}

                            <button onClick={closeCart} className="w-full text-center text-[10px] font-black uppercase tracking-widest text-zinc-300 mt-6 hover:text-zinc-950 transition-colors">
                                Return to Command
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

