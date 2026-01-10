"use client";

import { useState } from 'react';
import { LogoCustomization, LogoPlacementValue } from '@/types';
import { Upload, Type, Grid, Check, RotateCcw } from 'lucide-react';

interface LogoSelectorProps {
    currentBranding: LogoCustomization;
    onUpdate: (branding: Partial<LogoCustomization>) => void;
}

const PLACEMENTS: { value: LogoPlacementValue; label: string }[] = [
    { value: 'left-chest', label: 'Left Chest' },
    { value: 'right-chest', label: 'Right Chest' },
    { value: 'back', label: 'Large Back' },
    { value: 'nape', label: 'Nape of Neck' },
    { value: 'sleeve-left', label: 'Left Sleeve' },
    { value: 'sleeve-right', label: 'Right Sleeve' },
];

const FONTS = ['Inter', 'Roboto', 'Oswald', 'Outfit', 'Playfair Display'];

export default function LogoSelector({ currentBranding, onUpdate }: LogoSelectorProps) {
    const { type, placements, text, font, color, fileName } = currentBranding;

    const togglePlacement = (val: LogoPlacementValue) => {
        const newPlacements = placements.includes(val)
            ? placements.filter(p => p !== val)
            : [...placements, val];
        onUpdate({ placements: newPlacements });
    };

    return (
        <div className="space-y-8 bg-white dark:bg-zinc-900/50 p-6 md:p-10 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">Configure Branding</h4>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Logo Identity & Positioning</p>
                </div>
                <button
                    onClick={() => onUpdate({ type: 'none', placements: [] })}
                    className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                >
                    <RotateCcw size={18} />
                </button>
            </div>

            {/* Logo Type Selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { id: 'upload' as const, icon: Upload, label: 'Upload Logo' },
                    { id: 'text' as const, icon: Type, label: 'Text Logo' },
                    { id: 'existing' as const, icon: Grid, label: 'Existing Logo' },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onUpdate({ type: item.id })}
                        className={`group p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 ${type === item.id
                                ? 'border-zinc-900 bg-zinc-900 text-white shadow-xl translate-y-[-4px]'
                                : 'border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-zinc-50 dark:bg-zinc-900/20'
                            }`}
                    >
                        <item.icon size={28} className={type === item.id ? 'text-white' : 'group-hover:scale-110 transition-transform'} />
                        <span className="font-black uppercase tracking-widest text-[10px]">{item.label}</span>
                    </button>
                ))}
            </div>

            {/* Dynamic Input Area */}
            <div className="min-h-[200px] flex flex-col justify-center">
                {type === 'upload' && (
                    <div className="space-y-4">
                        <div className="border-4 border-dashed border-zinc-100 dark:border-zinc-800 rounded-[2rem] p-12 text-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all cursor-pointer relative">
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        onUpdate({
                                            fileName: file.name,
                                            fileSize: file.size,
                                            fileUrl: URL.createObjectURL(file) // Mock URL
                                        });
                                    }
                                }}
                            />
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-4">
                                    <Upload className="text-zinc-400" />
                                </div>
                                <p className="font-black uppercase tracking-widest text-sm text-zinc-900 dark:text-white">
                                    {fileName || 'Drop Artwork Here'}
                                </p>
                                <p className="text-[10px] font-bold text-zinc-400 mt-2 uppercase">SVG, PNG, JPG, PDF (MAX 10MB)</p>
                            </div>
                        </div>
                    </div>
                )}

                {type === 'text' && (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Company / Branding Text</label>
                            <input
                                type="text"
                                value={text || ''}
                                onChange={(e) => onUpdate({ text: e.target.value })}
                                placeholder="THE BRAND NAME"
                                className="w-full bg-zinc-50 dark:bg-zinc-800 border-2 border-transparent focus:border-zinc-900 dark:focus:border-white rounded-xl p-5 font-black uppercase tracking-tight text-xl outline-none transition-all"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Typography</label>
                                <select
                                    value={font || ''}
                                    onChange={(e) => onUpdate({ font: e.target.value })}
                                    className="w-full bg-zinc-50 dark:bg-zinc-800 border-2 border-transparent rounded-xl p-4 font-bold text-sm outline-none"
                                >
                                    {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Thread Color</label>
                                <div className="flex gap-2">
                                    {['#FFFFFF', '#000000', '#FF0000', '#0000FF', '#00FF00'].map(c => (
                                        <button
                                            key={c}
                                            onClick={() => onUpdate({ color: c })}
                                            className={`w-10 h-10 rounded-full border-2 ${color === c ? 'border-zinc-900 dark:border-white' : 'border-transparent'}`}
                                            style={{ backgroundColor: c }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {type === 'existing' && (
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-3xl p-8 text-center">
                        <Grid className="mx-auto text-zinc-300 mb-4" size={48} />
                        <p className="text-sm font-black text-zinc-400 uppercase tracking-widest italic">No prior architectural assets stored.</p>
                    </div>
                )}

                {type === 'none' && (
                    <div className="text-center py-10">
                        <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm italic italic italic">Items will be supplied without branding.</p>
                    </div>
                )}
            </div>

            {/* Placements Selector */}
            {type !== 'none' && (
                <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
                        Deployment Positions <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-900 dark:text-white">{placements.length}</span>
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {PLACEMENTS.map(pos => (
                            <button
                                key={pos.value}
                                onClick={() => togglePlacement(pos.value)}
                                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all font-bold text-[10px] uppercase tracking-wider ${placements.includes(pos.value)
                                        ? 'border-zinc-900 bg-zinc-900 text-white shadow-lg'
                                        : 'border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 text-zinc-500 hover:text-zinc-900 dark:hover:text-white dark:bg-zinc-900/40'
                                    }`}
                            >
                                {pos.label}
                                {placements.includes(pos.value) && <Check size={14} />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
