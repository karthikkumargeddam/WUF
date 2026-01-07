"use client";

import { useState, useCallback } from 'react';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    onFileRemove: () => void;
    accept?: string;
    maxSize?: number; // in bytes
    currentFile?: { url: string; fileName: string; fileSize: number } | null;
    label?: string;
    description?: string;
}

export default function FileUpload({
    onFileSelect,
    onFileRemove,
    accept = 'image/jpeg,image/png,image/svg+xml,application/pdf',
    maxSize = 8 * 1024 * 1024, // 8MB default
    currentFile,
    label = 'Upload Your Logo',
    description = 'JPG, PNG, SVG, or PDF. Max size: 8MB',
}: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateFile = (file: File): string | null => {
        if (file.size > maxSize) {
            return `File size must be less than ${(maxSize / (1024 * 1024)).toFixed(0)}MB`;
        }

        const acceptedTypes = accept.split(',');
        if (!acceptedTypes.includes(file.type)) {
            return 'Invalid file type. Please upload JPG, PNG, SVG, or PDF';
        }

        return null;
    };

    const handleFile = useCallback((file: File) => {
        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);
        onFileSelect(file);
    }, [maxSize, accept, onFileSelect]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFile(file);
        }
    }, [handleFile]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    }, [handleFile]);

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const getFileIcon = (fileName: string) => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        if (ext === 'pdf') return <FileText size={24} className="text-red-500" />;
        return <ImageIcon size={24} className="text-blue-500" />;
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900">{label}</h3>
            </div>

            {currentFile ? (
                <div className="relative bg-zinc-50 border-2 border-zinc-200 rounded-2xl p-6">
                    <button
                        onClick={onFileRemove}
                        className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                        aria-label="Remove file"
                    >
                        <X size={16} className="text-red-600" />
                    </button>

                    <div className="flex items-center gap-4">
                        {getFileIcon(currentFile.fileName)}
                        <div className="flex-1">
                            <p className="text-sm font-bold text-zinc-900 truncate">{currentFile.fileName}</p>
                            <p className="text-xs text-zinc-500">{formatFileSize(currentFile.fileSize)}</p>
                        </div>
                    </div>

                    {currentFile.url.startsWith('blob:') && currentFile.fileName.match(/\.(jpg|jpeg|png|svg)$/i) && (
                        <div className="mt-4 rounded-lg overflow-hidden border border-zinc-200">
                            <img
                                src={currentFile.url}
                                alt="Preview"
                                className="w-full h-32 object-contain bg-white"
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`relative border-2 border-dashed rounded-2xl p-8 transition-all ${isDragging
                            ? 'border-zinc-900 bg-zinc-50'
                            : 'border-zinc-300 hover:border-zinc-400'
                        }`}
                >
                    <input
                        type="file"
                        accept={accept}
                        onChange={handleFileInput}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="file-upload"
                    />

                    <div className="text-center space-y-4">
                        <div className="flex justify-center">
                            <div className="p-4 bg-zinc-100 rounded-full">
                                <Upload size={32} className="text-zinc-600" />
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-bold text-zinc-900 mb-1">
                                Drag 'n' drop your file here, or click to select
                            </p>
                            <p className="text-xs text-zinc-500">{description}</p>
                        </div>

                        <label
                            htmlFor="file-upload"
                            className="inline-block px-6 py-3 bg-zinc-950 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                            Choose File
                        </label>
                    </div>
                </div>
            )}

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm font-bold text-red-600">{error}</p>
                </div>
            )}

            <p className="text-xs text-zinc-500 italic">
                Don't worry how it looks, we will make it look great and send a proof before we add to your products!
            </p>
        </div>
    );
}
