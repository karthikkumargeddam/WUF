"use client";

import { useCartStore } from "@/store/cartStore";
import { CheckCircle2, ChevronLeft, ChevronRight, CreditCard, Ship, ShoppingBag, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthStore } from "@/store/authStore";
import { useProfile } from "@/hooks/useProfile";
import ShippingForm from "@/components/checkout/ShippingForm";
import CheckoutVATSummary from "@/components/checkout/CheckoutVATSummary";
import { calculateCartTotal } from "@/lib/vat";
import { v4 as uuidv4 } from 'uuid';

type Step = 'shipping' | 'payment' | 'review' | 'success';

export default function CheckoutPage() {
    const { items, getCartTotal, addOrder } = useCartStore();
    const { profile } = useProfile();
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();
    const [step, setStep] = useState<Step>('shipping');
    const [mounted, setMounted] = useState(false);
    const [guestEmail, setGuestEmail] = useState('');
    const { trackEvent } = useAnalytics();

    useEffect(() => {
        if (mounted) {
            trackEvent('checkout_view', { step: step, cart_size: items.length });
        }
    }, [step, mounted, items.length, trackEvent]);

    // Prevent hydration mismatch & Protect Route
    useEffect(() => {
        setMounted(true);
        if (!isAuthenticated) {
            router.push('/login?redirect=/checkout');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

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
    const deliveryFee = subtotal > 150 ? 0 : 5; // Free delivery over £150

    // Calculate VAT using proper UK tax system
    const cartItems = items.map(item => ({
        id: item.id,
        name: item.title,
        price: item.price,
        quantity: item.quantity,
        tags: item.tags || [],
    }));

    const { total, vatBreakdown } = calculateCartTotal(cartItems, deliveryFee);

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
                            <ShippingForm
                                onNext={(email) => {
                                    setGuestEmail(email);
                                    setStep('payment');
                                }}
                                initialData={profile?.shippingAddress}
                                userProfile={profile}
                            />


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
                                                onClick={async () => {
                                                    // 1. Prepare Order Data
                                                    const orderData = {
                                                        items: items,
                                                        total: total,
                                                        status: 'Processing',
                                                        user_email: useAuthStore.getState().user?.email || guestEmail,
                                                        shipping_details: {
                                                            name: 'John Doe', // In real app, bind to form state
                                                            address: '123 Industrial Way',
                                                            city: 'New York',
                                                            zip: '10001'
                                                        },
                                                        created_at: serverTimestamp(),
                                                        order_id: `WUF-${uuidv4().slice(0, 8).toUpperCase()}`
                                                    };

                                                    // 2. Save to Firestore
                                                    try {
                                                        await addDoc(collection(db, 'orders'), orderData);
                                                    } catch (e) {
                                                        console.error("Order save failed", e);
                                                    }

                                                    // 3. Update Local State & Analytics
                                                    addOrder({
                                                        items: [...items],
                                                        total: total,
                                                    });

                                                    trackEvent('purchase_complete', {
                                                        order_id: orderData.order_id,
                                                        value: total,
                                                        currency: 'GBP',
                                                        items: items.map(i => ({ id: i.id, title: i.title, quantity: i.quantity }))
                                                    });

                                                    // 4. Send Confirmation Email (Async/Non-blocking)
                                                    fetch('/api/emails/send', {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({
                                                            to: orderData.user_email,
                                                            orderData: {
                                                                orderId: orderData.order_id,
                                                                customerName: orderData.shipping_details.name,
                                                                items: items.map(item => ({
                                                                    title: item.title,
                                                                    quantity: item.quantity,
                                                                    price: item.price,
                                                                    variantTitle: item.variantTitle
                                                                })),
                                                                total: total,
                                                                shippingAddress: {
                                                                    street: orderData.shipping_details.address,
                                                                    city: orderData.shipping_details.city,
                                                                    zip: orderData.shipping_details.zip,
                                                                    country: 'USA' // Defaulting for now
                                                                }
                                                            }
                                                        })
                                                    }).catch(err => console.error("Email Trigger Failed:", err));

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
                                <CheckoutVATSummary
                                    items={cartItems}
                                    deliveryFee={deliveryFee}
                                    className="sticky top-32"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
