"use client";

import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
    const { items, updateQuantity, removeItem, getCartTotal } = useCartStore();
    const total = getCartTotal();

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-6">
                        Your Cart is <span className="text-zinc-300">Empty</span>
                    </h1>
                    <p className="text-zinc-500 mb-8 font-medium">Looks like you haven't added any gear yet.</p>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-950 text-white rounded-full font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                    >
                        Start Shopping <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-12">
                    Your <span className="text-gradient">Cart</span>
                </h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-6">
                        {items.map((item) => (
                            <div key={`${item.id}-${item.variantId}`} className="flex gap-6 p-6 rounded-3xl border border-zinc-100 bg-zinc-50/50">
                                <div className="w-24 h-24 shrink-0 bg-white rounded-2xl p-2 border border-zinc-100">
                                    {item.image && (
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-lg text-zinc-900 leading-tight">{item.title}</h3>
                                            <p className="font-black text-lg">£{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <p className="text-sm text-zinc-500 font-medium">{item.variantTitle}</p>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center bg-white rounded-full border border-zinc-200 p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.variantId, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-zinc-100 rounded-full transition-colors"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.variantId, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-zinc-100 rounded-full transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id, item.variantId)}
                                            className="text-zinc-400 hover:text-red-500 transition-colors p-2"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:w-96 shrink-0">
                        <div className="bg-zinc-950 text-white rounded-3xl p-8 sticky top-32">
                            <h3 className="font-black uppercase tracking-widest text-sm mb-6 text-zinc-400 border-b border-zinc-800 pb-4">Order Summary</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-zinc-300">
                                    <span>Subtotal</span>
                                    <span className="font-bold">£{total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-zinc-300">
                                    <span>Shipping</span>
                                    <span className="text-zinc-500 text-sm">Calculated at checkout</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mb-8 pt-6 border-t border-zinc-800">
                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">Total</span>
                                    <span className="text-3xl font-black italic">£{total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                className="block w-full py-4 bg-white text-zinc-950 text-center rounded-xl font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
