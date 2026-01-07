"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Mail, Lock, User, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate signup delay
        setTimeout(() => {
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center py-20 px-4">
            <div className="max-w-md w-full">
                <div className="bg-white p-12 rounded-[3.1rem] border-4 border-zinc-100 shadow-2xl relative overflow-hidden">
                    {/* Decorative Header */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-zinc-900" />

                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-zinc-50 text-zinc-900 rounded-[1.8rem] flex items-center justify-center mx-auto mb-6 shadow-sm border-2 border-zinc-100">
                            <User size={40} />
                        </div>
                        <h1 className="text-4xl font-black text-zinc-950 uppercase tracking-tighter mb-2 italic">Join Portal</h1>
                        <p className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">Create Business Account</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Company Name</label>
                            <input
                                type="text"
                                required
                                className="w-full px-6 py-4 rounded-2xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all font-medium"
                                placeholder="Acme Industries Ltd."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Corporate Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-4 text-zinc-300" size={20} />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all font-medium"
                                    placeholder="procurement@acme.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Create Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-4 text-zinc-300" size={20} />
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-zinc-100 focus:border-zinc-900 focus:outline-none transition-all font-medium"
                                    placeholder="**************"
                                />
                            </div>
                        </div>

                        <button
                            disabled={isLoading}
                            className="w-full py-5 bg-zinc-950 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-zinc-800 transition-all shadow-xl flex items-center justify-center gap-2 group disabled:opacity-50"
                        >
                            {isLoading ? 'Creating Account...' : 'Request Access'}
                            {!isLoading && <ChevronRight className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-zinc-50 text-center">
                        <Link href="/login" className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 underline-offset-4 decoration-2">
                            Already have an account? Sign In
                        </Link>
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
