"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useBundleStore } from '@/store/bundleStore';
import { Bundle, BundleItem, Product } from '@/types';
import { createDefaultBundleItem, calculateBundlePrice } from '@/lib/bundle-utils';
import StepWizard from '@/components/ui/StepWizard';
import BundleItemSelector from '@/components/bundle/BundleItemSelector';
import LogoCustomizationPanel from '@/components/bundle/LogoCustomizationPanel';
import BundleSummary from '@/components/bundle/BundleSummary';
import { useCartStore } from '@/store/cartStore';

export default function BundleCustomizePage() {
    const params = useParams();
    const router = useRouter();
    const bundleHandle = params.handle as string;

    const { currentBundle, initializeBundle, updateBundleItem, isBundleComplete } = useBundleStore();
    const { addItem } = useCartStore();

    const [currentStep, setCurrentStep] = useState(1);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize bundle on mount
    useEffect(() => {
        const initBundle = async () => {
            // Fetch products using the API
            try {
                const { products: fetchedProducts } = await fetch('https://wearunifab.com/products.json?limit=50')
                    .then(res => res.json());
                setProducts(fetchedProducts || []);
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
            }

            // Create bundle based on handle
            const bundleConfig = getBundleConfig(bundleHandle);
            if (bundleConfig) {
                initializeBundle(bundleConfig);
            }
            setIsLoading(false);
        };

        initBundle();
    }, [bundleHandle, initializeBundle]);

    const getBundleConfig = (handle: string): Bundle | null => {
        const configs: Record<string, Bundle> = {
            '6-item-kickstarter': {
                id: '6-item-kickstarter',
                name: '6 Item Kickstarter Bundle',
                description: 'Perfect starter bundle for small teams',
                handle: '6-item-kickstarter',
                items: [
                    createDefaultBundleItem('polo-shirts', 'Polo Shirt'),
                    createDefaultBundleItem('polo-shirts', 'Polo Shirt'),
                    createDefaultBundleItem('hoodies', 'Hoodie'),
                    createDefaultBundleItem('hoodies', 'Hoodie'),
                    createDefaultBundleItem('softshell', 'Softshell Jacket'),
                    createDefaultBundleItem('softshell', 'Softshell Jacket'),
                ],
                basePrice: 299.99,
                totalPrice: 299.99,
                freeLogoIncluded: true,
                maxItems: 6,
            },
            '10-item-professional': {
                id: '10-item-professional',
                name: '10 Item Professional Bundle',
                description: 'Complete workwear solution',
                handle: '10-item-professional',
                items: [
                    ...Array(4).fill(null).map(() => createDefaultBundleItem('polo-shirts', 'Polo Shirt')),
                    ...Array(3).fill(null).map(() => createDefaultBundleItem('hoodies', 'Hoodie')),
                    ...Array(3).fill(null).map(() => createDefaultBundleItem('softshell', 'Softshell Jacket')),
                ],
                basePrice: 499.99,
                totalPrice: 499.99,
                freeLogoIncluded: true,
                maxItems: 10,
            },
        };

        return configs[handle] || null;
    };

    if (isLoading || !currentBundle) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block p-4 bg-zinc-100 rounded-full mb-4 animate-pulse">
                        <div className="w-8 h-8 bg-zinc-300 rounded-full" />
                    </div>
                    <p className="text-sm font-bold text-zinc-600">Loading bundle customization...</p>
                </div>
            </div>
        );
    }

    const currentItem = currentBundle.items[currentItemIndex];
    const totalSteps = currentBundle.items.length * 2 + 1; // Product selection + Logo for each item + Summary

    const steps = [
        ...currentBundle.items.flatMap((item, index) => [
            { id: index * 2 + 1, title: `Item ${index + 1}`, description: 'Select Product' },
            { id: index * 2 + 2, title: `Logo ${index + 1}`, description: 'Customize Logo' },
        ]),
        { id: totalSteps, title: 'Review', description: 'Final Summary' },
    ];

    const handleProductSelect = (product: Product, variant: any, size: string, color: string) => {
        console.log('handleProductSelect called with:', { product: product.title, variant, size, color });
        console.log('Current item before update:', currentItem);

        updateBundleItem(currentItem.id, {
            productId: product.id,
            productHandle: product.handle,
            productTitle: product.title,
            productImage: product.images[0]?.src,
            variantId: variant.id,
            size,
            color,
            price: parseFloat(variant.price),
        });

        console.log('Bundle item updated');
    };

    const handleLogoUpdate = (logoCustomization: any) => {
        updateBundleItem(currentItem.id, {
            logoCustomization,
        });
    };

    const handleNext = () => {
        const isProductStep = currentStep % 2 === 1;

        if (isProductStep) {
            // Move to logo customization for same item
            setCurrentStep(currentStep + 1);
        } else {
            // Move to next item or summary
            if (currentItemIndex < currentBundle.items.length - 1) {
                setCurrentItemIndex(currentItemIndex + 1);
                setCurrentStep(currentStep + 1);
            } else {
                // Go to summary
                setCurrentStep(totalSteps);
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            const isLogoStep = currentStep % 2 === 0;

            if (isLogoStep) {
                setCurrentStep(currentStep - 1);
            } else {
                if (currentItemIndex > 0) {
                    setCurrentItemIndex(currentItemIndex - 1);
                    setCurrentStep(currentStep - 1);
                }
            }
        }
    };

    const handleComplete = () => {
        if (isBundleComplete()) {
            // Add each bundle item to cart
            currentBundle.items.forEach(item => {
                if (item.productId && item.variantId) {
                    // Create a product object for cart
                    const product = products.find(p => p.id === item.productId);
                    if (product) {
                        addItem(product, item.variantId);
                    }
                }
            });

            router.push('/cart');
        }
    };

    const isProductStep = currentStep % 2 === 1 && currentStep < totalSteps;
    const isLogoStep = currentStep % 2 === 0 && currentStep < totalSteps;
    const isSummaryStep = currentStep === totalSteps;

    const canGoNext = () => {
        if (isProductStep) {
            const canProceed = !!(currentItem.productId && currentItem.variantId);
            console.log('canGoNext (product step):', {
                canProceed,
                productId: currentItem.productId,
                variantId: currentItem.variantId,
                currentItem
            });
            return canProceed;
        }
        if (isLogoStep) {
            const canProceed = !!(currentItem.logoCustomization && currentItem.logoCustomization.placement.length > 0);
            console.log('canGoNext (logo step):', { canProceed, logoCustomization: currentItem.logoCustomization });
            return canProceed;
        }
        return true;
    };

    return (
        <div className="min-h-screen bg-white py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-zinc-950 mb-4">
                            Customize Your <span className="text-gradient">Bundle</span>
                        </h1>
                        <p className="text-lg text-zinc-600 font-medium">
                            {currentBundle.name}
                        </p>
                    </div>

                    {/* Wizard */}
                    <StepWizard
                        steps={steps}
                        currentStep={currentStep}
                        onStepChange={setCurrentStep}
                        canGoNext={canGoNext()}
                        canGoPrevious={currentStep > 1}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        onComplete={handleComplete}
                        isComplete={isBundleComplete()}
                    >
                        {isProductStep && (
                            <BundleItemSelector
                                category={currentItem.category}
                                categoryLabel={currentItem.categoryLabel}
                                products={products}
                                onSelect={handleProductSelect}
                                selectedProduct={products.find(p => p.id === currentItem.productId)}
                            />
                        )}

                        {isLogoStep && (
                            <LogoCustomizationPanel
                                item={currentItem}
                                onUpdate={handleLogoUpdate}
                            />
                        )}

                        {isSummaryStep && (
                            <BundleSummary
                                bundle={{
                                    ...currentBundle,
                                    totalPrice: calculateBundlePrice(currentBundle),
                                }}
                            />
                        )}
                    </StepWizard>
                </div>
            </div>
        </div>
    );
}
