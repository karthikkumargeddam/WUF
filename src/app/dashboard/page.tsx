"use client";

import { Box, Package, RefreshCcw, Truck, LayoutDashboard, Settings, LogOut, ExternalLink, ShoppingBag, Activity } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, Timestamp } from 'firebase/firestore';

export default function DashboardPage() {
    const { orders } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [liveEvents, setLiveEvents] = useState<any[]>([]);

    useEffect(() => {
        setMounted(true);

        const q = query(collection(db, 'analytics_events'), orderBy('timestamp', 'desc'), limit(10));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const events = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate() || new Date()
            }));
            setLiveEvents(events);
        });

        return () => unsubscribe();
    }, []);

    const defaultPastOrders = [
        { id: 'ORD-8821', date: 'Jan 04, 2026', total: 1440.00, assetCount: 12, status: 'Fulfilled' },
        { id: 'ORD-7756', date: 'Dec 18, 2025', total: 6250.00, assetCount: 50, status: 'Delivered' },
        { id: 'ORD-6612', date: 'Dec 02, 2025', total: 415.50, assetCount: 3, status: 'Delivered' },
    ];

    if (!mounted) return null;

    // Combine store orders with default ones for a full dashboard feel
    const allOrders = [...orders, ...defaultPastOrders];

    return (
        <div className="min-h-screen bg-zinc-50 lg:flex">
            {/* Sidebar */}
            <aside className="lg:w-72 bg-zinc-950 text-white lg:min-h-screen p-8 flex flex-col">
                <div className="mb-12">
                    <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-1">HQ Dashboard</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Acme Industrial Corp</p>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 p-4 bg-zinc-900 rounded-2xl font-bold text-sm tracking-wide group transition-all">
                        <LayoutDashboard size={20} className="text-zinc-500 group-hover:text-white" /> Overview
                    </Link>
                    <Link href="#" className="flex items-center gap-3 p-4 hover:bg-zinc-900 rounded-2xl font-bold text-sm tracking-wide text-zinc-400 hover:text-white transition-all">
                        <Package size={20} /> Deployment Orders
                    </Link>
                    <Link href="#" className="flex items-center gap-3 p-4 hover:bg-zinc-900 rounded-2xl font-bold text-sm tracking-wide text-zinc-400 hover:text-white transition-all">
                        <Box size={20} /> Inventory Management
                    </Link>
                    <Link href="#" className="flex items-center gap-3 p-4 hover:bg-zinc-900 rounded-2xl font-bold text-sm tracking-wide text-zinc-400 hover:text-white transition-all">
                        <Settings size={20} /> Procurement Settings
                    </Link>
                </nav>

                <div className="mt-auto pt-8 border-t border-zinc-900">
                    <Link href="/" className="flex items-center gap-3 p-4 text-red-500 font-bold text-sm">
                        <LogOut size={20} /> Terminate Session
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 lg:p-12 max-w-7xl mx-auto w-full">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-zinc-950 uppercase tracking-tighter mb-2">Operational Overview</h1>
                        <p className="text-zinc-500 font-medium">Monitoring procurement cycles for Acme Industrial Corp.</p>
                    </div>
                    <Link href="/products" className="bg-zinc-950 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-zinc-800 shadow-xl transition-all">
                        Start New Procurement
                    </Link>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Live Operations Feed (Takes up 2/3 on large screens) */}
                    <div className="lg:col-span-2 bg-zinc-900 text-zinc-400 rounded-[2.5rem] border-2 border-zinc-800 shadow-sm p-8 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Activity size={120} className="text-white" />
                        </div>
                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <h3 className="text-white text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                                Live Operations Log
                            </h3>
                            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Real-time Feed</div>
                        </div>

                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 relative z-10 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                            {liveEvents.length > 0 ? liveEvents.map((event) => (
                                <div key={event.id} className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-800 flex items-start justify-between gap-4 animate-in fade-in slide-in-from-right-4 duration-500 text-xs">
                                    <div>
                                        <p className="text-white font-bold uppercase tracking-wide mb-1">
                                            {event.event_type.replace(/_/g, ' ')}
                                        </p>
                                        <p className="text-zinc-500 truncate max-w-[250px]">
                                            {event.metadata?.title || event.url || 'User Action'}
                                        </p>
                                    </div>
                                    <div className="text-right whitespace-nowrap">
                                        <p className="text-zinc-500 font-mono text-[10px]">
                                            {event.timestamp.toLocaleTimeString([], { hour12: false })}
                                        </p>
                                        {event.metadata?.price && (
                                            <p className="text-green-500 font-bold">£{event.metadata.price}</p>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <div className="text-zinc-600 text-center py-12 italic text-sm">Waiting for live signal...</div>
                            )}
                        </div>
                    </div>

                    {/* Quick Stats Column */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white p-6 rounded-[2rem] border-2 border-zinc-100 shadow-sm flex flex-col justify-between group hover:border-zinc-900 transition-all">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">System Events</p>
                                <h3 className="text-4xl font-black text-zinc-950 tracking-tighter">{liveEvents.length}</h3>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase text-green-600">
                                <Activity size={12} /> Live Tracking
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-[2rem] border-2 border-zinc-100 shadow-sm flex flex-col justify-between group hover:border-zinc-900 transition-all">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">Total Deployments</p>
                                <h3 className="text-4xl font-black text-zinc-950 tracking-tighter">{142 + orders.length}</h3>
                            </div>
                            <Link href="#" className="mt-4 text-[10px] font-black uppercase text-zinc-900 underline underline-offset-2">View Report</Link>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-[2.5rem] border-2 border-zinc-100 shadow-sm overflow-hidden mb-12">
                    <div className="p-8 border-b border-zinc-100 flex items-center justify-between">
                        <h3 className="text-xl font-black text-zinc-950 uppercase tracking-tighter">Recent Deployment History</h3>
                        <Link href="#" className="text-xs font-black uppercase border-b-2 border-zinc-900 py-1">View Full Log</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-zinc-50">
                                <tr>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Order ID</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Date Initiated</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Asset Count</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Total Capital</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {allOrders.length > 0 ? allOrders.map((order) => {
                                    const assetCount = 'items' in order
                                        ? order.items.reduce((acc, item) => acc + item.quantity, 0)
                                        : (order as any).assetCount;

                                    const totalDisplay = typeof order.total === 'number'
                                        ? `£${order.total.toFixed(2)}`
                                        : `£${order.total}`;

                                    return (
                                        <tr key={order.id} className="hover:bg-zinc-50 transition-colors group">
                                            <td className="px-8 py-5 font-black text-sm text-zinc-950">{order.id}</td>
                                            <td className="px-8 py-5 font-medium text-sm text-zinc-500">{order.date}</td>
                                            <td className="px-8 py-5 font-bold text-sm text-zinc-900">{assetCount} Units</td>
                                            <td className="px-8 py-5 font-black text-sm text-zinc-950">{totalDisplay}</td>
                                            <td className="px-8 py-5 text-sm">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'Processing' ? 'bg-zinc-100 text-zinc-950 border border-zinc-200' :
                                                    order.status === 'Fulfilled' ? 'bg-zinc-900 text-white' : 'bg-green-100 text-green-700'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                }) : (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <ShoppingBag size={40} className="mx-auto text-zinc-200 mb-4" />
                                            <p className="text-zinc-400 font-medium uppercase tracking-widest text-xs">No Deployment History Found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-12 p-8 bg-zinc-900 rounded-[2.5rem] text-zinc-400 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-md">
                        <h4 className="text-white font-black uppercase tracking-tight mb-2 italic text-lg">Industrial Bulk Pricing</h4>
                        <p className="text-sm font-medium leading-relaxed">Your account is eligible for tier 3 enterprise discounts. Contact your logistics manager to unlock tier 4.</p>
                    </div>
                    <button className="bg-white text-zinc-950 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-zinc-100 transition-all shadow-xl whitespace-nowrap">
                        Contact Logistics Manager
                    </button>
                </div>
            </main>
        </div>
    );
}

