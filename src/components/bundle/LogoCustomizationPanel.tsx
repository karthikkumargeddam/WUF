"use client";

import { useState } from 'react';
import { BundleItem, LogoCustomization } from '@/types';
import { getLogoPlacementOptions, uploadLogoFile } from '@/lib/bundle-utils';
import FileUpload from '@/components/ui/FileUpload';
import { Check } from 'lucide-react';

interface LogoCustomizationPanelProps {
    item: BundleItem;
    onUpdate: (logoCustomization: LogoCustomization) => void;
}

export default function LogoCustomizationPanel({ item, onUpdate }: LogoCustomizationPanelProps) {
    const [activeTab, setActiveTab] = useState<'text' | 'upload' | 'existing'>('text');
    const [textLogo, setTextLogo] = useState(item.logoCustomization?.text || '');
    const [selectedPlacements, setSelectedPlacements] = useState<string[]>(
        item.logoCustomization?.placements || []
    );
    const [uploadedFile, setUploadedFile] = useState<{ url: string; fileName: string; fileSize: number } | null>(
        item.logoCustomization?.fileUrl ? {
            url: item.logoCustomization.fileUrl,
            fileName: item.logoCustomization.fileName || '',
            fileSize: item.logoCustomization.fileSize || 0,
        } : null
    );

    const placementOptions = getLogoPlacementOptions(item.category);

    const handlePlacementToggle = (placement: string) => {
        const newPlacements = selectedPlacements.includes(placement)
            ? selectedPlacements.filter(p => p !== placement)
            : [...selectedPlacements, placement];

        setSelectedPlacements(newPlacements);
        updateLogoCustomization(activeTab, newPlacements);
    };

    const updateLogoCustomization = (type: 'text' | 'upload' | 'existing', placements: string[]) => {
        const customization: LogoCustomization = {
            type,
            placements: placements as any,
        };

        if (type === 'text') {
            customization.text = textLogo;
        } else if (type === 'upload' && uploadedFile) {
            customization.fileUrl = uploadedFile.url;
            customization.fileName = uploadedFile.fileName;
            customization.fileSize = uploadedFile.fileSize;
        }

        onUpdate(customization);
    };

    const handleFileSelect = async (file: File) => {
        try {
            const result = await uploadLogoFile(file);
            setUploadedFile(result);
            updateLogoCustomization('upload', selectedPlacements);
        } catch (error) {
            console.error('File upload error:', error);
        }
    };

    const handleFileRemove = () => {
        setUploadedFile(null);
    };

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 mb-2">
                    Add Your Logo
                </h3>
                <p className="text-sm text-zinc-600">
                    Choose how you'd like to add your logo to this item
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b-2 border-zinc-100">
                {[
                    { id: 'text', label: 'Text Logo' },
                    { id: 'upload', label: 'Upload Logo' },
                    { id: 'existing', label: 'Existing Logo' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === tab.id
                            ? 'text-zinc-900'
                            : 'text-zinc-400 hover:text-zinc-600'
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-[-2px] left-0 right-0 h-1 bg-zinc-950 rounded-full" />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
                {activeTab === 'text' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-black uppercase tracking-widest text-zinc-900 mb-3">
                                Enter Your Text
                            </label>
                            <input
                                type="text"
                                value={textLogo}
                                onChange={(e) => {
                                    setTextLogo(e.target.value);
                                    updateLogoCustomization('text', selectedPlacements);
                                }}
                                placeholder="e.g., Your Company Name"
                                className="w-full px-6 py-4 border-2 border-zinc-200 rounded-xl text-sm font-bold focus:border-zinc-950 focus:outline-none transition-all"
                            />
                            <p className="mt-2 text-xs text-zinc-500 italic">
                                We will send a design proof for your approval before production
                            </p>
                        </div>

                        {textLogo && (
                            <div className="p-8 bg-zinc-900 rounded-2xl">
                                <p className="text-2xl font-black text-white text-center tracking-tight">
                                    {textLogo}
                                </p>
                                <p className="text-xs text-zinc-400 text-center mt-2">
                                    Preview (actual design may vary)
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'upload' && (
                    <FileUpload
                        onFileSelect={handleFileSelect}
                        onFileRemove={handleFileRemove}
                        currentFile={uploadedFile}
                    />
                )}

                {activeTab === 'existing' && (
                    <div className="text-center py-12 bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200">
                        <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                            No existing logos found
                        </p>
                        <p className="text-xs text-zinc-500 mt-2">
                            Upload a logo first to save it for future use
                        </p>
                    </div>
                )}
            </div>

            {/* Logo Placement */}
            <div className="space-y-4">
                <h4 className="text-sm font-black uppercase tracking-widest text-zinc-900">
                    Select Logo Placement
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {placementOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handlePlacementToggle(option.value)}
                            className={`p-4 rounded-2xl border-2 transition-all group flex flex-col items-center gap-3 ${selectedPlacements.includes(option.value)
                                ? 'border-zinc-950 bg-zinc-50'
                                : 'border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50'
                                }`}
                        >
                            {/* Visual Icon */}
                            <div className={`relative w-20 h-20 rounded-xl flex items-center justify-center transition-colors ${selectedPlacements.includes(option.value) ? 'bg-white shadow-sm' : 'bg-white'
                                }`}>
                                {/* Generic Shirt Outline */}
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300">
                                    <path d="M20.38 3.4a1.6 1.6 0 0 0-1.2-1.2A10.6 10.6 0 0 0 12 2a10.6 10.6 0 0 0-7.18.2 1.6 1.6 0 0 0-1.2 1.2c-.3.9-.5 1.9-.5 2.8v.6c0 1.2.9 2.1 2.1 2.1h.4c.7 0 1.3-.3 1.7-.8.5-.7 1-1.5 1.7-2.3.9-.9 2.2-.9 3.1 0 .7.8 1.2 1.6 1.7 2.3.4.5 1 .8 1.7.8h.4c1.2 0 2.1-.9 2.1-2.1v-.6c0-.9-.2-1.9-.5-2.8z" />
                                    <path d="M4 14a2 2 0 0 1 2-2 2 2 0 0 1 2 2" />
                                    <path d="M16 14a2 2 0 0 1 2-2 2 2 0 0 1 2 2" />
                                    <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
                                </svg>

                                {/* Placement Highlights */}
                                {option.value.includes('left_chest') && (
                                    <div className="absolute top-[45%] right-[35%] w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                                )}
                                {option.value.includes('right_chest') && (
                                    <div className="absolute top-[45%] left-[35%] w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                                )}
                                {option.value.includes('center_chest') && (
                                    <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-3 h-3 border-2 border-red-500 bg-red-500/20 rounded-full animate-pulse" />
                                )}
                                {option.value.includes('back') && (
                                    <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-6 h-6 border-2 border-red-500 bg-red-500/20 rounded-sm animate-pulse" />
                                )}
                                {option.value.includes('sleeve') && (
                                    <div className="absolute top-[35%] right-[10%] w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                                )}
                            </div>

                            <div className="text-center">
                                <p className={`text-xs font-black uppercase tracking-tight ${selectedPlacements.includes(option.value) ? 'text-zinc-900' : 'text-zinc-500'
                                    }`}>
                                    {option.label}
                                </p>
                            </div>

                            {selectedPlacements.includes(option.value) && (
                                <div className="absolute top-2 right-2 p-1 bg-zinc-950 rounded-full">
                                    <Check size={12} className="text-white" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
