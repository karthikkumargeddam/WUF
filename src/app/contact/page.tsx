import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
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
                            <form className="space-y-8">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900">First Name</label>
                                        <input type="text" className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:ring-0 focus:outline-none transition-colors font-medium" placeholder="E.g. John" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900">Last Name</label>
                                        <input type="text" className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:ring-0 focus:outline-none transition-colors font-medium" placeholder="E.g. Doe" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900">Company Email</label>
                                    <input type="email" className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:ring-0 focus:outline-none transition-colors font-medium" placeholder="john.doe@company.com" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900">Project Requirements</label>
                                    <textarea rows={4} className="w-full p-4 rounded-xl border-2 border-zinc-100 focus:border-zinc-900 focus:ring-0 focus:outline-none transition-colors font-medium" placeholder="Describe your team size and branding needs..." />
                                </div>
                                <button className="w-full py-5 bg-zinc-950 text-white font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-zinc-800 transition-all shadow-2xl active:scale-[98%]">
                                    Submit Inquiry
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
