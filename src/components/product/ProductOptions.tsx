"use client";

import { Product, ProductVariant } from "@/types";
import { useState, useEffect } from "react";

interface ProductOptionsProps {
    product: Product;
    onVariantChange: (variant: ProductVariant) => void;
}

export default function ProductOptions({ product, onVariantChange }: ProductOptionsProps) {
    // Map of option name to selected value
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {};
        product.options.forEach(option => {
            if (option.values.length > 0) {
                initial[option.name] = option.values[0];
            }
        });
        return initial;
    });

    // Find the current variant matches selected options
    useEffect(() => {
        const matchedVariant = product.variants.find(variant => {
            return product.options.every(option => {
                const optKey = `option${option.position}` as keyof ProductVariant;
                return variant[optKey] === selectedOptions[option.name];
            });
        });

        if (matchedVariant) {
            onVariantChange(matchedVariant);
        }
    }, [selectedOptions, product, onVariantChange]);

    const handleOptionChange = (optionName: string, value: string) => {
        setSelectedOptions(prev => ({
            ...prev,
            [optionName]: value
        }));
    };

    if (product.variants.length <= 1 && product.variants[0]?.title === "Default Title") {
        return null;
    }

    return (
        <div className="space-y-6 mb-8">
            {product.options.map((option) => (
                <div key={option.id}>
                    <h3 className="text-sm font-bold text-zinc-900 mb-3">{option.name}</h3>
                    <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                            const isSelected = selectedOptions[option.name] === value;
                            return (
                                <button
                                    key={value}
                                    onClick={() => handleOptionChange(option.name, value)}
                                    className={`px-4 py-2 text-sm border-2 rounded-lg transition-all ${isSelected
                                        ? 'border-zinc-900 bg-zinc-900 text-white font-bold scale-110 shadow-lg transform'
                                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:scale-105'
                                        }`}
                                >
                                    {value}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
