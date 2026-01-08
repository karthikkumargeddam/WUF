"use client";

import { useState, useEffect } from 'react';
import { Package, DollarSign, TrendingUp, Users, Plus, Search, MoreHorizontal, Activity, ShoppingCart, Eye } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, where, Timestamp } from 'firebase/firestore';
import AdminGuard from '@/components/auth/AdminGuard';

interface AnalyticsEvent {
    id: string;
    event_type: string;
    session_id: string;
    timestamp: Date;
    metadata?: any;
    url?: string;
}

export default function AdminPage() {
    const [events, setEvents] = useState<AnalyticsEvent[]>([]);
    const [stats, setStats] = useState({
        totalSales: 0,
        activeVisitors: 0,
        cartActions: 0,
        totalViews: 0
    });
    const [loading, setLoading] = useState(true);

    // Subscribe to live events
    useEffect(() => {
        // Query last 100 events for live feeling
        const q = query(
            collection(db, 'analytics_events'),
            orderBy('timestamp', 'desc'),
            limit(100)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newEvents = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate() || new Date()
            })) as AnalyticsEvent[];

            setEvents(newEvents);
            calculateRealtimeStats(newEvents);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const calculateRealtimeStats = (currentEvents: AnalyticsEvent[]) => {
        // 1. Active Visitors (Unique Sessions in last 100 events)
        const uniqueSessions = new Set(currentEvents.map(e => e.session_id));

        // 2. Total Sales (Sum of purchase_complete value in this batch)
        const sales = currentEvents
            .filter(e => e.event_type === 'purchase_complete')
            .reduce((acc, curr) => acc + (curr.metadata?.value || 0), 0);

        // 3. Cart Actions
        const carts = currentEvents.filter(e => e.event_type === 'add_to_cart').length;

        // 4. Views
        const views = currentEvents.filter(e => e.event_type === 'page_view' || e.event_type === 'product_view').length;

        setStats({
            activeVisitors: uniqueSessions.size,
            totalSales: sales,
            cartActions: carts,
            totalViews: views
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
    };

    return (
        <div className="min-h-screen bg-zinc-50">
            {/* Admin Header */}
            <div className="bg-zinc-900 text-white py-6 sticky top-0 z-40 shadow-xl">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-black uppercase tracking-tight italic flex items-center gap-2">
                            <Activity className="text-red-500 animate-pulse" /> Mission Control
                        </h1>
                        <p className="text-xs text-zinc-400 font-medium">Live System Telemetry</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Real-time Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-xl bg-green-50 text-green-600">
                                <DollarSign size={24} />
                            </div>
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Live Batch</span>
                        </div>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Recent Revenue</p>
                        <p className="text-3xl font-black text-zinc-950">{formatCurrency(stats.totalSales)}</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                                <Users size={24} />
                            </div>
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full animate-pulse">
                                Live
                            </span>
                        </div>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Active Sessions</p>
                        <p className="text-3xl font-black text-zinc-950">{stats.activeVisitors}</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-xl bg-orange-50 text-orange-600">
                                <ShoppingCart size={24} />
                            </div>
                        </div>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Cart Actions</p>
                        <p className="text-3xl font-black text-zinc-950">{stats.cartActions}</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
                                <Eye size={24} />
                            </div>
                        </div>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Page Views</p>
                        <p className="text-3xl font-black text-zinc-950">{stats.totalViews}</p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Events Table */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden flex flex-col h-[600px]">
                        <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                            <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                                <Activity size={18} /> Live Event Log
                            </h2>
                            <div className="flex gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                            </div>
                        </div>
                        <div className="overflow-y-auto flex-1 p-2">
                            {loading ? (
                                <div className="flex items-center justify-center h-full text-zinc-400 text-sm font-bold uppercase tracking-widest">
                                    Connecting to Satellite...
                                </div>
                            ) : (
                                <table className="w-full text-left">
                                    <thead className="bg-zinc-50 sticky top-0 z-10">
                                        <tr>
                                            <th className="px-6 py-3 text-[10px] uppercase font-black tracking-widest text-zinc-400">Time</th>
                                            <th className="px-6 py-3 text-[10px] uppercase font-black tracking-widest text-zinc-400">Event</th>
                                            <th className="px-6 py-3 text-[10px] uppercase font-black tracking-widest text-zinc-400">Details</th>
                                            <th className="px-6 py-3 text-[10px] uppercase font-black tracking-widest text-zinc-400">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-100 text-sm font-medium">
                                        {events.map((event) => (
                                            <tr key={event.id} className="hover:bg-zinc-50 transition-colors animate-in fade-in slide-in-from-top-1">
                                                <td className="px-6 py-4 font-mono text-xs text-zinc-500">
                                                    {event.timestamp.toLocaleTimeString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wide border ${event.event_type === 'purchase_complete' ? 'bg-green-100 text-green-700 border-green-200' :
                                                        event.event_type === 'add_to_cart' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                                            event.event_type === 'product_click' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                                                'bg-zinc-100 text-zinc-600 border-zinc-200'
                                                        }`}>
                                                        {event.event_type.replace(/_/g, ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-xs text-zinc-600 truncate max-w-[200px]" title={event.metadata?.title || event.url}>
                                                    {event.metadata?.title || event.url || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 font-mono text-xs font-bold">
                                                    {event.metadata?.price ? `£${event.metadata.price}` : event.metadata?.value ? `£${event.metadata.value}` : '-'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                    {/* Live Ticker Side Panel */}
                    <div className="space-y-6">
                        <div className="bg-zinc-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 bg-red-600/20 blur-3xl rounded-full pointer-events-none" />
                            <h3 className="text-lg font-black uppercase tracking-tight mb-6 relative z-10">High Value Actions</h3>
                            <div className="space-y-4 relative z-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {events.filter(e => ['add_to_cart', 'purchase_complete'].includes(e.event_type)).slice(0, 10).map((e) => (
                                    <div key={e.id} className="flex items-start gap-4 p-3 bg-zinc-800/50 rounded-xl border border-white/5">
                                        <div className={`w-2 h-2 mt-1.5 rounded-full ${e.event_type === 'purchase_complete' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-orange-500'}`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold uppercase tracking-wide text-zinc-300">
                                                {e.event_type === 'purchase_complete' ? 'New Order' : 'Cart Addition'}
                                            </p>
                                            <p className="text-xs text-zinc-500 truncate mt-1">
                                                {e.metadata?.title || 'Unknown Item'}
                                            </p>
                                            <p className="text-[10px] text-zinc-600 mt-1 font-mono">
                                                {e.timestamp.toLocaleTimeString()}
                                            </p>
                                        </div>
                                        {e.metadata?.price && (
                                            <p className="text-xs font-black text-white">£{e.metadata.price}</p>
                                        )}
                                    </div>
                                ))}
                                {events.filter(e => ['add_to_cart', 'purchase_complete'].includes(e.event_type)).length === 0 && (
                                    <div className="text-center py-8 text-zinc-600 text-xs uppercase font-bold tracking-widest">
                                        Waiting for high value events...
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
                            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">System Status</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Database Connection</span>
                                    <span className="text-green-600">Stable</span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Analytics Stream</span>
                                    <span className="text-green-600">Active</span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> AI Agent</span>
                                    <span className="text-green-600">Online</span>
                                </div>

                                <div className="mt-4 pt-4 border-t border-zinc-100">
                                    <p className="text-[10px] text-zinc-400 font-mono uppercase">
                                        Last Sync: {new Date().toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
