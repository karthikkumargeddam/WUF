"use client";

import { useState } from 'react';
import { Package, DollarSign, TrendingUp, Users, Plus, Search, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
    // Mock Statistics
    const stats = [
        { label: 'Total Sales', value: '£45,231.89', change: '+20.1%', icon: DollarSign, color: 'text-green-600' },
        { label: 'Active Orders', value: '23', change: '+12', icon: Package, color: 'text-blue-600' },
        { label: 'New Customers', value: '12', change: '+4', icon: Users, color: 'text-purple-600' },
        { label: 'Avg. Order Value', value: '£450.00', change: '+2.4%', icon: TrendingUp, color: 'text-orange-600' },
    ];

    // Mock Products
    const products = [
        { id: 1, name: 'Premium Heavyweight Hoodie', sku: 'HD-001', price: '£24.99', stock: 124, status: 'Active' },
        { id: 2, name: 'Executive Softshell Jacket', sku: 'JK-002', price: '£45.00', stock: 56, status: 'Active' },
        { id: 3, name: 'Pro-Work Cargo Trousers', sku: 'TR-003', price: '£29.99', stock: 89, status: 'Active' },
        { id: 4, name: 'Safety Dealer Boots', sku: 'BT-004', price: '£55.00', stock: 32, status: 'Low Stock' },
        { id: 5, name: 'Hi-Vis Vest (Yellow)', sku: 'HV-005', price: '£4.99', stock: 500, status: 'Active' },
    ];

    return (
        <div className="min-h-screen bg-zinc-50">
            {/* Admin Header */}
            <div className="bg-zinc-900 text-white py-6">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-black uppercase tracking-tight italic">Owner Dashboard</h1>
                        <p className="text-xs text-zinc-400 font-medium">Welcome back, Admin</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-4 py-2 bg-zinc-800 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-zinc-700 transition-colors">
                            Settings
                        </button>
                        <Link href="/" className="px-4 py-2 bg-white text-zinc-900 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors">
                            View Site
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl bg-zinc-50 ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-2xl font-black text-zinc-900">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Products Table */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
                            <h2 className="text-lg font-black uppercase tracking-tight">Recent Products</h2>
                            <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors">
                                <Plus size={16} /> Add Product
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-zinc-50 text-[10px] uppercase font-black tracking-widest text-zinc-400">
                                    <tr>
                                        <th className="px-6 py-4">Product Name</th>
                                        <th className="px-6 py-4">SKU</th>
                                        <th className="px-6 py-4">Price</th>
                                        <th className="px-6 py-4">Stock</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100 text-sm font-medium">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-zinc-50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-zinc-900">{product.name}</td>
                                            <td className="px-6 py-4 text-zinc-500">{product.sku}</td>
                                            <td className="px-6 py-4">{product.price}</td>
                                            <td className="px-6 py-4">{product.stock}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${product.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                                    }`}>
                                                    {product.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-zinc-400 hover:text-zinc-900">
                                                    <MoreHorizontal size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Sales Activity */}
                    <div className="bg-zinc-900 text-white rounded-2xl p-6 shadow-xl">
                        <h3 className="text-lg font-black uppercase tracking-tight mb-6">Live Activity</h3>
                        <div className="space-y-6">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">New order received</p>
                                        <p className="text-xs text-zinc-500">2 minutes ago</p>
                                    </div>
                                    <p className="text-sm font-bold opacity-60">£124.00</p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-3 bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors">
                            View All Activity
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
