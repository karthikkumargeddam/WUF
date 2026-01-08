"use client";

import { useState, useEffect } from "react";
import { UserProfile } from "@/hooks/useProfile";
import { Truck } from "lucide-react";

interface ShippingFormProps {
    onNext: (email: string) => void;
    initialData?: UserProfile['shippingAddress'];
    userProfile?: UserProfile | null;
}

export default function ShippingForm({ onNext, initialData, userProfile }: ShippingFormProps) {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: 'United States'
    });

    useEffect(() => {
        if (userProfile || initialData) {
            setFormData(prev => ({
                ...prev,
                email: userProfile?.email || '',
                firstName: userProfile?.firstName || '',
                lastName: userProfile?.lastName || '',
                address: initialData?.street || '',
                city: initialData?.city || '',
                state: initialData?.state || '',
                zip: initialData?.zip || '',
                country: initialData?.country || 'United States'
            }));
        }
    }, [userProfile, initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Pass the captured email back to the parent
        onNext(formData.email);
    };

    return (
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border-2 border-zinc-200 shadow-sm">
            <h2 className="text-3xl font-black text-zinc-950 uppercase tracking-tighter mb-8 flex items-center gap-3">
                <Truck className="text-zinc-900" /> Logistics Data
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Contact Email</label>
                    <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all"
                        placeholder="procurement@company.com"
                    />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-500">First Name</label>
                        <input
                            required
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all"
                            placeholder="John"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Last Name</label>
                        <input
                            required
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all"
                            placeholder="Doe"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Street Address</label>
                    <input
                        required
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all"
                        placeholder="123 Industrial Blvd"
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-500">City</label>
                        <input
                            required
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all"
                            placeholder="New York"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-500">State</label>
                        <input
                            required
                            type="text"
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all"
                            placeholder="NY"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-1 col-span-2">
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-500">ZIP Code</label>
                        <input
                            required
                            type="text"
                            value={formData.zip}
                            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                            className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all"
                            placeholder="10001"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-5 bg-zinc-900 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-zinc-800 transition-all shadow-xl flex items-center justify-center gap-2"
                >
                    Proceed to Payment
                </button>
            </form>
        </div>
    );
}
