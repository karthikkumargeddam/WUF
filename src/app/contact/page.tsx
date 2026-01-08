"use client";

import { Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        requirements: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            await addDoc(collection(db, 'contact_submissions'), {
                ...formData,
                submittedAt: serverTimestamp(),
                status: 'new'
            });
            setStatus('success');
            setFormData({ firstName: '', lastName: '', email: '', requirements: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Info Section */}
                        <div>
                            <h1 className="text-6xl font-black text-zinc-950 uppercase tracking-tighter mb-8 shadow-sm">Get in Touch</h1>
                            <p className="text-zinc-800 text-xl mb-12 leading-relaxed font-bold tracking-tight">
                                Whether you&apos;re looking for a single uniform or equipping a fleet of thousands, our business experts are ready to assist.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-zinc-900 text-white rounded-xl">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-zinc-900 mb-1 uppercase tracking-widest text-xs">Email Us</h4>
                                        <p className="text-zinc-600">sales@wearunifab.com</p>
                                        <p className="text-zinc-400 text-sm">Response within 24 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-zinc-900 text-white rounded-xl">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-zinc-900 mb-1 uppercase tracking-widest text-xs">Call Support</h4>
                                        <p className="text-zinc-600">+1 (555) 123-4567</p>
                                        <p className="text-zinc-400 text-sm">Mon-Fri: 8am - 6pm EST</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-zinc-900 text-white rounded-xl">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-zinc-900 mb-1 uppercase tracking-widest text-xs">Our Office</h4>
                                        <p className="text-zinc-600">123 Business Park Dr,<br />Industrial District, NY 10001</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="bg-white p-12 rounded-[2.5rem] border-2 border-zinc-900 shadow-xl">
                            {status === 'success' ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mb-4">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <h3 className="text-2xl font-black uppercase tracking-tight">Message Received</h3>
                                    <p className="text-zinc-600 font-medium">Thank you for contacting us. A specialist will review your requirements and respond within 24 hours.</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="mt-8 px-8 py-3 bg-zinc-100 text-zinc-900 font-bold rounded-xl hover:bg-zinc-200 transition-colors"
                                    >
                                        Send Another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900">First Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:ring-0 focus:outline-none transition-colors font-medium text-zinc-900"
                                                placeholder="E.g. John"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900">Last Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:ring-0 focus:outline-none transition-colors font-medium text-zinc-900"
                                                placeholder="E.g. Doe"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900">Company Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:ring-0 focus:outline-none transition-colors font-medium text-zinc-900"
                                            placeholder="john.doe@company.com"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900">Project Requirements</label>
                                        <textarea
                                            rows={4}
                                            required
                                            value={formData.requirements}
                                            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                            className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:ring-0 focus:outline-none transition-colors font-medium text-zinc-900"
                                            placeholder="Describe your team size and branding needs..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full py-5 bg-zinc-950 text-white font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-zinc-800 transition-all shadow-2xl active:scale-[98%] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
                                    </button>
                                    {status === 'error' && (
                                        <p className="text-red-500 text-center font-bold text-sm">Something went wrong. Please try again.</p>
                                    )}
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
