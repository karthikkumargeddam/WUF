"use client";

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { Package, Truck, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface Order {
    id: string;
    order_id: string;
    total: number;
    status: string;
    created_at: any;
    items: any[];
}

export default function OrdersPage() {
    const { user, isAuthenticated } = useAuthStore();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        const fetchOrders = async () => {
            if (!user?.email) return;

            try {
                const q = query(
                    collection(db, 'orders'),
                    where('user_email', '==', user.email),
                    orderBy('created_at', 'desc')
                );

                const querySnapshot = await getDocs(q);
                const fetchedOrders = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Order[];

                setOrders(fetchedOrders);
            } catch (error) {
                console.error("Error loading orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, isAuthenticated, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 bg-zinc-200 rounded-full mb-4"></div>
                    <div className="h-4 w-32 bg-zinc-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-black text-zinc-950 uppercase tracking-tighter italic">Procurement History</h1>
                            <p className="text-zinc-500 font-bold text-sm mt-1">{user?.email}</p>
                        </div>
                        <Link href="/products" className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 border-b-2 border-transparent hover:border-zinc-900 transition-all">
                            Start New Requisition
                        </Link>
                    </div>

                    {orders.length === 0 ? (
                        <div className="bg-white rounded-[2rem] p-12 text-center border-2 border-zinc-100">
                            <Package size={48} className="mx-auto text-zinc-300 mb-6" />
                            <h3 className="text-xl font-black text-zinc-900 uppercase tracking-tight mb-2">No Archives Found</h3>
                            <p className="text-zinc-500 mb-8 max-w-md mx-auto">You haven't initialized any procurement orders yet. The global supply chain awaits.</p>
                            <Link href="/products" className="inline-block bg-zinc-900 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">
                                Access Catalog
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-white rounded-[2rem] border-2 border-zinc-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <div className="p-6 md:p-8">
                                        <div className="flex flex-wrap gap-4 justify-between items-start mb-6">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="text-lg font-black text-zinc-900">#{order.order_id}</span>
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${order.status === 'Processing' ? 'bg-blue-50 text-blue-600' :
                                                            order.status === 'Fulfilled' ? 'bg-green-50 text-green-600' : 'bg-zinc-100 text-zinc-600'
                                                        }`}>
                                                        {order.status === 'Processing' && <Clock size={12} />}
                                                        {order.status === 'Fulfilled' && <CheckCircle2 size={12} />}
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-zinc-500 font-medium">
                                                    Requester: {user?.email} • {order.created_at?.toDate().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-black text-zinc-900">£{order.total.toFixed(2)}</p>
                                                <p className="text-[10px] text-zinc-400 uppercase font-black tracking-widest">Total Value</p>
                                            </div>
                                        </div>

                                        <div className="border-t border-zinc-50 -mx-6 md:-mx-8 px-6 md:px-8 py-6 bg-zinc-50/50">
                                            <div className="space-y-4">
                                                {order.items.map((item: any, idx: number) => (
                                                    <div key={idx} className="flex items-center justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-2 h-2 rounded-full bg-zinc-300" />
                                                            <span className="text-sm font-bold text-zinc-700">{item.title}</span>
                                                            <span className="text-xs text-zinc-400 font-mono">x{item.quantity}</span>
                                                        </div>
                                                        <span className="text-sm font-mono font-medium text-zinc-500">
                                                            £{(item.price * item.quantity).toFixed(2)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-6 border-t border-zinc-100 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                                                <Truck size={16} />
                                                <span>Standard Freight</span>
                                            </div>
                                            <button className="text-xs font-black uppercase tracking-widest text-zinc-900 hover:text-blue-600 underline-offset-4 decoration-2 hover:underline">
                                                Generate Invoice
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
