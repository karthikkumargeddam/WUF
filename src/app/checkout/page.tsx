"use client";

import { useCartStore } from "@/store/cartStore";
import { CheckCircle2, ChevronLeft, ChevronRight, CreditCard, Ship, ShoppingBag, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type Step = 'shipping' | 'payment' | 'review' | 'success';

export default function CheckoutPage() {
    const { items, getCartTotal, addOrder } = useCartStore();
    const [step, setStep] = useState<Step>('shipping');
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!mounted) return null;

    if (items.length === 0 && step !== 'success') {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
                <ShoppingBag size={64} className="text-zinc-200 mb-6" />
                <h1 className="text-3xl font-black text-zinc-900 uppercase tracking-tighter mb-4">Your cart is empty</h1>
                <p className="text-zinc-600 mb-8 max-w-md">You haven&apos;t added any industrial gear to your procurement list yet.</p>
                <Link href="/products" className="bg-zinc-900 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">
                    Browse Products
                </Link>
            </div>
        );
    }

    const subtotal = getCartTotal();
    const shipping = subtotal > 500 ? 0 : 25;
    const tax = subtotal * 0.08; // 8% tax simulation
    const total = subtotal + shipping + tax;

    return (
        <div className="bg-zinc-50 min-h-screen py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Progress Bar */}
                    {step !== 'success' && (
                        <div className="flex items-center justify-center mb-12">
                            <div className="flex items-center w-full max-w-md">
                                <div className={`flex flex-col items-center relative ${step === 'shipping' ? 'text-zinc-900' : 'text-zinc-400'}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold mb-2 ${step === 'shipping' ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white'}`}>1</div>
                                    <span className="text-xs font-black uppercase tracking-widest absolute -bottom-6 whitespace-nowrap">Shipping</span>
                                </div>
                                <div className={`flex-1 h-0.5 mx-4 ${step === 'payment' || step === 'review' ? 'bg-zinc-900' : 'bg-zinc-300'}`} />
                                <div className={`flex flex-col items-center relative ${step === 'payment' ? 'text-zinc-900' : 'text-zinc-400'}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold mb-2 ${step === 'payment' ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white'}`}>2</div>
                                    <span className="text-xs font-black uppercase tracking-widest absolute -bottom-6 whitespace-nowrap">Payment</span>
                                </div>
                                <div className={`flex-1 h-0.5 mx-4 ${step === 'review' ? 'bg-zinc-900' : 'bg-zinc-300'}`} />
                                <div className={`flex flex-col items-center relative ${step === 'review' ? 'text-zinc-900' : 'text-zinc-400'}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold mb-2 ${step === 'review' ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white'}`}>3</div>
                                    <span className="text-xs font-black uppercase tracking-widest absolute -bottom-6 whitespace-nowrap">Review</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
                        {/* Main Form Area */}
                        <div className="lg:col-span-2">
                            {step === 'shipping' && (
                                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border-2 border-zinc-200 shadow-sm">
                                    <h2 className="text-3xl font-black text-zinc-950 uppercase tracking-tighter mb-8 flex items-center gap-3">
                                        <Truck className="text-zinc-900" /> Shipping Logistics
                                    </h2>
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">First Name</label>
                                                <input type="text" className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all" placeholder="John" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Last Name</label>
                                                <input type="text" className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all" placeholder="Doe" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Company Name (Optional)</label>
                                            <input type="text" className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all" placeholder="Acme Industrial Corp" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Shipping Address</label>
                                            <input type="text" className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all" placeholder="123 Industrial Way" />
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">City</label>
                                                <input type="text" className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all" placeholder="New York" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">State</label>
                                                <input type="text" className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all" placeholder="NY" />
                                            </div>
                                            <div className="space-y-2 col-span-2 md:col-span-1">
                                                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">ZIP Code</label>
                                                <input type="text" className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all" placeholder="10001" />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setStep('payment')}
                                            className="w-full py-5 bg-zinc-900 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-zinc-800 transition-all shadow-xl flex items-center justify-center gap-2 group"
                                        >
                                            Continue to Payment <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </form>
                                </div>
                            )}

                            {step === 'payment' && (
                                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border-2 border-zinc-200 shadow-sm">
                                    <h2 className="text-3xl font-black text-zinc-950 uppercase tracking-tighter mb-8 flex items-center gap-3">
                                        <CreditCard className="text-zinc-900" /> Payment Secure
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="p-6 border-2 border-zinc-900 rounded-2xl bg-zinc-50 flex items-center justify-between cursor-pointer">
                                            <div className="flex items-center gap-4">
                                                <div className="w-6 h-6 rounded-full border-4 border-zinc-900 bg-white" />
                                                <div>
                                                    <p className="font-black uppercase tracking-tight">Credit/Debit Card</p>
                                                    <p className="text-xs text-zinc-500 font-bold">Secure industrial gateway</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-10 h-6 bg-zinc-200 rounded" />
                                                <div className="w-10 h-6 bg-zinc-200 rounded" />
                                            </div>
                                        </div>
                                        <div className="p-6 border-2 border-zinc-100 rounded-2xl flex items-center gap-4 opacity-50 cursor-not-allowed">
                                            <div className="w-6 h-6 rounded-full border-2 border-zinc-200" />
                                            <div>
                                                <p className="font-black uppercase tracking-tight text-zinc-400">Corporate Invoice (PO)</p>
                                                <p className="text-xs text-zinc-400 font-bold">Net-30 available for approved accounts</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Card Number</label>
                                                <input type="text" className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all" placeholder="**** **** **** 1234" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Expiry (MM/YY)</label>
                                                    <input type="text" className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all" placeholder="12/28" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500">CVV</label>
                                                    <input type="text" className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all" placeholder="123" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <button
                                                onClick={() => setStep('shipping')}
                                                className="flex-1 py-5 border-2 border-zinc-900 text-zinc-900 font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-zinc-50 transition-all flex items-center justify-center gap-2"
                                            >
                                                <ChevronLeft size={20} /> Back
                                            </button>
                                            <button
                                                onClick={() => setStep('review')}
                                                className="flex-[2] py-5 bg-zinc-900 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-zinc-800 transition-all shadow-xl flex items-center justify-center gap-2"
                                            >
                                                Review Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 'review' && (
                                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border-2 border-zinc-200 shadow-sm">
                                    <h2 className="text-3xl font-black text-zinc-950 uppercase tracking-tighter mb-8 flex items-center gap-3">
                                        <CheckCircle2 className="text-zinc-900" /> Final Review
                                    </h2>
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-zinc-100">
                                            <div>
                                                <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">Shipping To</h4>
                                                <p className="font-black text-zinc-900 uppercase">John Doe</p>
                                                <p className="text-zinc-600 font-medium leading-relaxed">123 Industrial Way,<br />New York, NY 10001</p>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">Payment Method</h4>
                                                <div className="flex items-center gap-3">
                                                    <CreditCard size={20} className="text-zinc-900" />
                                                    <p className="font-black text-zinc-900 uppercase">Visa ending in 1234</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">Order Manifest</h4>
                                            {items.map((item) => (
                                                <div key={`${item.id}-${item.variantId}`} className="flex items-center justify-between py-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 relative rounded border border-zinc-100 overflow-hidden">
                                                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black uppercase line-clamp-1 max-w-[200px]">{item.title}</p>
                                                            <p className="text-[10px] text-zinc-500 font-bold">QTY: {item.quantity} — {item.variantTitle}</p>
                                                        </div>
                                                    </div>
                                                    <p className="font-black text-sm text-zinc-900">${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex gap-4 pt-8">
                                            <button
                                                onClick={() => setStep('payment')}
                                                className="flex-1 py-5 border-2 border-zinc-900 text-zinc-900 font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-zinc-50 transition-all flex items-center justify-center gap-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    addOrder({
                                                        items: [...items],
                                                        total: total,
                                                    });
                                                    setStep('success');
                                                }}
                                                className="flex-[2] py-5 bg-zinc-900 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-zinc-800 transition-all shadow-xl"
                                            >
                                                Confirm Procurement
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 'success' && (
                                <div className="bg-white p-12 md:p-20 rounded-[3rem] border-4 border-zinc-100 shadow-2xl text-center">
                                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <CheckCircle2 size={48} />
                                    </div>
                                    <h1 className="text-5xl font-black text-zinc-950 uppercase tracking-tighter mb-4">Order Confirmed</h1>
                                    <p className="text-xl text-zinc-600 font-medium mb-12 max-w-lg mx-auto leading-relaxed">
                                        Your industrial gear order <span className="font-black text-zinc-900">#WUF-2026-X49</span> has been processed. Our logistics team is initializing fulfillment.
                                    </p>
                                    <div className="space-y-4">
                                        <Link href="/" className="block w-full py-5 bg-zinc-900 text-white font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-zinc-800 transition-all shadow-xl">
                                            Return to Headquarters
                                        </Link>
                                        <Link href="/dashboard" className="block w-full py-5 border-2 border-zinc-900 text-zinc-900 font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-zinc-50 transition-all">
                                            Track Order Status
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Order Summary Sidebar */}
                        {step !== 'success' && (
                            <div className="lg:col-span-1">
                                <div className="bg-white p-8 rounded-[2.5rem] border-2 border-zinc-100 shadow-sm sticky top-32">
                                    <h3 className="text-xl font-black text-zinc-950 uppercase tracking-tighter mb-6">Financial Summary</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-zinc-600 font-medium">
                                            <span>Subtotal</span>
                                            <span className="font-black text-zinc-900">£{subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-zinc-600 font-medium">
                                            <span>Logistic Freight</span>
                                            <span className="font-black text-zinc-900">{shipping === 0 ? 'FREE' : `£${shipping.toFixed(2)}`}</span>
                                        </div>
                                        <div className="flex justify-between text-zinc-600 font-medium">
                                            <span>Operational Tax (8%)</span>
                                            <span className="font-black text-zinc-900">£{tax.toFixed(2)}</span>
                                        </div>
                                        <div className="h-px bg-zinc-100 my-4" />
                                        <div className="flex justify-between text-lg">
                                            <span className="font-black text-zinc-950 uppercase tracking-tight">Total Payable</span>
                                            <span className="font-black text-zinc-950 underline underline-offset-4 decoration-zinc-300 decoration-4">£{total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="mt-8 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                                        <div className="flex items-center gap-3 text-zinc-500 mb-2">
                                            <Ship size={16} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Global Logistics Support</span>
                                        </div>
                                        <p className="text-[10px] text-zinc-400 font-medium leading-tight">Your data is secured using 256-bit industrial encryption. Deployment scheduled within 48 hours of confirmation.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
