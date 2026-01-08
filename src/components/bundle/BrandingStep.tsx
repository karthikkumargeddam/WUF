"use client";

import { useState } from 'react';
import { BundleItem, LogoCustomization } from '@/types';
import { Upload, Type, Check, X, CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface BrandingStepProps {
    items: BundleItem[];
    onUpdateAll: (updateFn: (item: BundleItem) => BundleItem) => void;
    onComplete: () => void;
}

export default function BrandingStep({ items, onUpdateAll, onComplete }: BrandingStepProps) {
    // Local state for the "Global" logo setting
    const [logoType, setLogoType] = useState<LogoCustomization['type']>('none');
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoText, setLogoText] = useState('');
    const [positions, setPositions] = useState<string[]>([]);

    const handleApply = () => {
        // Construct the customization object
        const customization: LogoCustomization = {
            type: logoType,
            placement: positions,
            text: logoText || undefined,
            // In a real app, we'd upload the file here and get a URL.
            // For now, we simulate a URL or base64
            fileUrl: logoFile ? URL.createObjectURL(logoFile) : undefined,
            fileName: logoFile?.name,
        };

        // Apply to ALL items
        onUpdateAll((item) => ({
            ...item,
            logoCustomization: customization
        }));

        onComplete();
    };

    const togglePosition = (pos: string) => {
        setPositions(prev =>
            prev.includes(pos) ? prev.filter(p => p !== pos) : [...prev, pos]
        );
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h3 className="text-2xl font-black uppercase tracking-tight text-zinc-900 mb-2">
                    Add Your Branding
                </h3>
                <p className="text-zinc-600 max-w-lg mx-auto">
                    Upload your logo or add text. We'll apply this to all standard positions (Left Chest) by default.
                </p>
            </div>

            {/* Type Selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                    onClick={() => setLogoType('upload')}
                    className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 ${logoType === 'upload' ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 hover:border-zinc-300'
                        }`}
                >
                    <Upload size={32} />
                    <span className="font-bold uppercase tracking-widest text-sm">Upload Logo</span>
                </button>

                <button
                    onClick={() => setLogoType('text')}
                    className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 ${logoType === 'text' ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 hover:border-zinc-300'
                        }`}
                >
                    <Type size={32} />
                    <span className="font-bold uppercase tracking-widest text-sm">Text Logo</span>
                </button>

                <button
                    onClick={() => setLogoType('none')}
                    className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 ${logoType === 'none' ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 hover:border-zinc-300'
                        }`}
                >
                    <X size={32} />
                    <span className="font-bold uppercase tracking-widest text-sm">No Branding</span>
                </button>
            </div>

            {/* Inputs */}
            <div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-100">
                {logoType === 'upload' && (
                    <div className="text-center space-y-4">
                        <div className="border-2 border-dashed border-zinc-300 rounded-xl p-8 hover:bg-white transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                            />
                            {logoFile ? (
                                <div className="flex flex-col items-center text-green-600">
                                    <CheckCircle size={48} className="mb-2" />
                                    <p className="font-bold">{logoFile.name}</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-zinc-400">
                                    <Upload size={48} className="mb-2" />
                                    <p className="font-bold text-sm">Click or Drag to Upload</p>
                                    <p className="text-xs">JPG, PNG, PDF, AI (Max 10MB)</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {logoType === 'text' && (
                    <div className="space-y-4">
                        <label className="block text-xs font-bold uppercase text-zinc-500">Logo Text</label>
                        <input
                            type="text"
                            value={logoText}
                            onChange={(e) => setLogoText(e.target.value)}
                            placeholder="Enter your company name..."
                            className="w-full p-4 rounded-xl border border-zinc-300 font-bold focus:ring-2 focus:ring-zinc-900 outline-none"
                        />
                    </div>
                )}

                {logoType === 'none' && (
                    <div className="text-center text-zinc-500 py-8 italic">
                        Your items will be supplied plain without customization.
                    </div>
                )}
            </div>

            {/* Placement - Only if logo selected */}
            {logoType !== 'none' && (
                <div>
                    <h4 className="font-black text-center uppercase tracking-tight text-zinc-900 mb-6">Choose Placement</h4>
                    <div className="flex justify-center flex-wrap gap-4">
                        {['Left Chest', 'Right Chest', 'Back', 'Right Sleeve', 'Left Sleeve'].map(pos => {
                            const isActive = positions.includes(pos.toLowerCase().replace(' ', '-'));
                            return (
                                <button
                                    key={pos}
                                    onClick={() => togglePosition(pos.toLowerCase().replace(' ', '-'))}
                                    className={`px-6 py-3 rounded-full border-2 font-bold text-sm transition-all ${isActive ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 text-zinc-500 hover:border-zinc-400'
                                        }`}
                                >
                                    {pos}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Action */}
            <button
                onClick={handleApply}
                disabled={logoType !== 'none' && !logoFile && !logoText}
                className="w-full py-5 bg-gradient-to-r from-zinc-900 to-zinc-800 text-white rounded-xl font-black uppercase tracking-widest hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Start Production
            </button>
        </div>
    );
}
