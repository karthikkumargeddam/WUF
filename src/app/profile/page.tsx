"use client";

import { useState, useEffect } from 'react';
import { useProfile, UserProfile } from '@/hooks/useProfile';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { User, Building2, MapPin, Phone, Save, Loader2 } from 'lucide-react';

export default function ProfilePage() {
    const { user, isAuthenticated } = useAuthStore();
    const { profile, loading: profileLoading, updateProfile } = useProfile();
    const router = useRouter();

    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState<Partial<UserProfile>>({});
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (!isAuthenticated && !profileLoading) {
            router.push('/login');
        }
    }, [isAuthenticated, profileLoading, router]);

    useEffect(() => {
        if (profile) {
            setFormData(profile);
        }
    }, [profile]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSuccessMessage('');

        try {
            await updateProfile(formData);
            setSuccessMessage('Profile updated successfully.');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    if (profileLoading || !profile) {
        return (
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
                <Loader2 className="animate-spin text-zinc-300" size={32} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-black text-zinc-950 uppercase tracking-tighter italic mb-8 flex items-center gap-3">
                        <User className="text-zinc-900" size={32} /> Account Matrix
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Details */}
                        <div className="bg-white p-8 rounded-[2rem] border-2 border-zinc-100 shadow-sm">
                            <h2 className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Building2 size={16} /> Corporate Identity
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">First Name</label>
                                    <input
                                        type="text"
                                        value={formData.firstName || ''}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none font-medium"
                                        placeholder="John"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Last Name</label>
                                    <input
                                        type="text"
                                        value={formData.lastName || ''}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none font-medium"
                                        placeholder="Doe"
                                    />
                                </div>
                                <div className="space-y-2 col-span-full">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Company Name</label>
                                    <input
                                        type="text"
                                        value={formData.companyName || ''}
                                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                        className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none font-medium"
                                        placeholder="Acme Industries"
                                    />
                                </div>
                                <div className="space-y-2 col-span-full">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Contact Phone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                                        <input
                                            type="tel"
                                            value={formData.phone || ''}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full pl-12 p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none font-medium"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white p-8 rounded-[2rem] border-2 border-zinc-100 shadow-sm">
                            <h2 className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <MapPin size={16} /> Primary Logistics Node
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 col-span-full">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Street Address</label>
                                    <input
                                        type="text"
                                        value={formData.shippingAddress?.street || ''}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            shippingAddress: { ...formData.shippingAddress!, street: e.target.value }
                                        })}
                                        className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none font-medium"
                                        placeholder="123 Industrial Blvd"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">City</label>
                                    <input
                                        type="text"
                                        value={formData.shippingAddress?.city || ''}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            shippingAddress: { ...formData.shippingAddress!, city: e.target.value }
                                        })}
                                        className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none font-medium"
                                        placeholder="New York"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">State / Province</label>
                                    <input
                                        type="text"
                                        value={formData.shippingAddress?.state || ''}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            shippingAddress: { ...formData.shippingAddress!, state: e.target.value }
                                        })}
                                        className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none font-medium"
                                        placeholder="NY"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">ZIP / Postal Code</label>
                                    <input
                                        type="text"
                                        value={formData.shippingAddress?.zip || ''}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            shippingAddress: { ...formData.shippingAddress!, zip: e.target.value }
                                        })}
                                        className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none font-medium"
                                        placeholder="10001"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Country</label>
                                    <input
                                        type="text"
                                        value={formData.shippingAddress?.country || ''}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            shippingAddress: { ...formData.shippingAddress!, country: e.target.value }
                                        })}
                                        className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none font-medium"
                                        placeholder="United States"
                                    />
                                </div>
                            </div>
                        </div>

                        {successMessage && (
                            <div className="p-4 bg-green-50 text-green-700 text-sm font-bold rounded-xl text-center animate-pulse">
                                {successMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full py-5 bg-zinc-900 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-zinc-800 transition-all shadow-xl flex items-center justify-center gap-2"
                        >
                            {isSaving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                            {isSaving ? 'Saving...' : 'Save Configuration'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
