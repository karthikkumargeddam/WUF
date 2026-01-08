"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { useAnalytics } from '@/hooks/useAnalytics';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
    const router = useRouter();
    const { trackEvent } = useAnalytics();
    const { login } = useAuthStore();

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await login(email, password);

            // Track login success
            trackEvent('login', { method: 'email_password' });

            router.push('/dashboard');
        } catch (err: any) {
            console.error(err);
            setError('Invalid credentials. Please check your email and secure token.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center py-20 px-4">
            <div className="max-w-md w-full">
                <div className="bg-white p-12 rounded-[3.1rem] border-4 border-zinc-100 shadow-2xl relative overflow-hidden">
                    {/* Decorative Header */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-zinc-900" />

                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-zinc-900 text-white rounded-[1.8rem] flex items-center justify-center mx-auto mb-6 shadow-xl">
                            <ShieldCheck size={40} />
                        </div>
                        <h1 className="text-4xl font-black text-zinc-950 uppercase tracking-tighter mb-2 italic">Procurement Portal</h1>
                        <p className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">Authorized Business Access Only</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Corporate Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-4 text-zinc-300" size={20} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all font-medium"
                                    placeholder="procurement@acme.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Secure Token</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-4 text-zinc-300" size={20} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all font-medium"
                                    placeholder="**************"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl text-center">
                                {error}
                            </div>
                        )}

                        <button
                            disabled={isLoading}
                            className="w-full py-5 bg-zinc-950 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-zinc-800 transition-all shadow-xl flex items-center justify-center gap-2 group disabled:opacity-50"
                        >
                            {isLoading ? 'Authenticating...' : 'Initialize Session'}
                            {!isLoading && <ChevronRight className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-zinc-50 flex flex-col gap-4 text-center">
                        <Link href="/contact" className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 underline-offset-4 decoration-2">Request Business Account</Link>
                        <p className="text-[10px] text-zinc-300 font-medium">Standard industrial authentication protocol — 256-bit encrypted</p>
                    </div>
                </div>

                <p className="text-center mt-8">
                    <Link href="/" className="text-xs font-bold text-zinc-400 hover:text-zinc-950 uppercase tracking-widest flex items-center justify-center gap-2">
                        <ChevronLeft size={14} /> Back to Public Catalog
                    </Link>
                </p>
            </div>
        </div>
    );
}

function ChevronLeft({ size, className }: { size?: number, className?: string }) {
    return <ChevronRight size={size} className={`rotate-180 ${className}`} />
}
