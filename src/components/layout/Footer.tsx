import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';

const Footer = () => {
    return (
        <footer className="bg-zinc-900 text-zinc-300 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic">WEARUNIFAB</h3>
                        <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                            Premium industrial workwear solutions. Precision-engineered uniforms, safety equipment, and corporate apparel for the modern workforce.
                        </p>
                        <div className="flex space-x-6 pt-2">
                            <a href="https://www.facebook.com/share/17nNwxadiT/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors" aria-label="Facebook"><Facebook size={22} /></a>
                            <a href="https://www.instagram.com/wearunifab?igsh=MTB0M2oyd2x6YnA1aw==" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors" aria-label="Instagram"><Instagram size={22} /></a>
                            <a href="https://www.tiktok.com/@wearunifab?_r=1&_t=ZN-92g7VG4ZyRq" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors" aria-label="TikTok"><SiTiktok size={22} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/collections" className="hover:text-white transition-colors">Collections</Link></li>
                            <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Customer Service</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/policies/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                            <li><Link href="/policies/refund" className="hover:text-white transition-colors">Refund Policy</Link></li>
                            <li><Link href="/policies/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/policies/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start">
                                <MapPin size={18} className="mr-3 mt-0.5 flex-shrink-0" />
                                <span>123 Business Park Dr,<br />Industrial District, NY 10001</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={18} className="mr-3 flex-shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={18} className="mr-3 flex-shrink-0" />
                                <span>support@wearunifab.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-800 pt-8 mt-8 text-center text-sm text-zinc-500">
                    <p>&copy; {new Date().getFullYear()} Wearunifab. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
