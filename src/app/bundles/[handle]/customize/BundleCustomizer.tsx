"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBundleStore } from '@/store/bundleStore';
import { Bundle, BundleItem, Product } from '@/types';
import { createDefaultBundleItem, calculateBundlePrice } from '@/lib/bundle-utils';
import StepWizard from '@/components/ui/StepWizard';
import BundleSummary from '@/components/bundle/BundleSummary';
import { useCartStore } from '@/store/cartStore';
import { useAnalytics } from '@/hooks/useAnalytics';
import CategoryStep from '@/components/bundle/CategoryStep';
import BrandingStep from '@/components/bundle/BrandingStep';

interface BundleCustomizerProps {
    initialProducts: Product[];
    bundleHandle: string;
}

export default function BundleCustomizer({ initialProducts, bundleHandle }: BundleCustomizerProps) {
    const router = useRouter();

    const { currentBundle, initializeBundle, updateBundleItem, resetBundle } = useBundleStore();
    const { addItem, addItems } = useCartStore();
    const { trackEvent } = useAnalytics();

    const [currentStep, setCurrentStep] = useState(1);
    const [products] = useState<Product[]>(initialProducts);

    // Initialize bundle on mount (or change of handle)
    // We use useState with initializer to only run once if needed, but useEffect is safer for store sync
    useState(() => {
        resetBundle();
        const bundleConfig = getBundleConfig(bundleHandle);
        if (bundleConfig) {
            initializeBundle(bundleConfig);
            trackEvent('bundle_start', {
                bundle_id: bundleConfig.id,
                bundle_name: bundleConfig.name,
                base_price: bundleConfig.basePrice
            });
        }
    });

    // Define bundle configs
    // Note: copied helper from original file
    function getBundleConfig(handle: string): Bundle | null {
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
            '4-fleece-bundle': {
                id: '4-fleece-bundle',
                name: '4 Pack Fleece Bundle',
                description: 'Essential warmth for the team',
                handle: '4-fleece-bundle',
                items: [
                    ...Array(4).fill(null).map(() => createDefaultBundleItem('fleeces', 'Fleece')),
                ],
                basePrice: 99.99,
                totalPrice: 99.99,
                freeLogoIncluded: true,
                maxItems: 4,
            },
            '4-softshell-bundle': {
                id: '4-softshell-bundle',
                name: '4 Pack Softshell Bundle',
                description: 'Premium outdoor protection',
                handle: '4-softshell-bundle',
                items: [
                    ...Array(4).fill(null).map(() => createDefaultBundleItem('softshell', 'Softshell')),
                ],
                basePrice: 149.99,
                totalPrice: 149.99,
                freeLogoIncluded: true,
                maxItems: 4,
            },
            '4-hoodie-bundle': {
                id: '4-hoodie-bundle',
                name: '4 Pack Hoodie Bundle',
                description: 'Comfortable workwear staple',
                handle: '4-hoodie-bundle',
                items: [
                    ...Array(4).fill(null).map(() => createDefaultBundleItem('hoodies', 'Hoodie')),
                ],
                basePrice: 119.99,
                totalPrice: 119.99,
                freeLogoIncluded: true,
                maxItems: 4,
            },
            'hi-vis-bundle-4-1-printed-only': {
                id: 'hi-vis-bundle-4-1-printed-only',
                name: 'Hi-Vis Bundle 4+1 (Printed)',
                description: 'Essential safety wear with custom printing',
                handle: 'hi-vis-bundle-4-1-printed-only',
                items: [
                    ...Array(5).fill(null).map(() => createDefaultBundleItem('hi-vis', 'Hi-Vis Vest')),
                ],
                basePrice: 65.00,
                totalPrice: 65.00,
                freeLogoIncluded: true,
                maxItems: 5,
            },
        };

        if (configs[handle]) return configs[handle];

        // Generic Fallback for undefined bundles
        if (handle.includes('bundle')) {
            let category = 'workwear';
            let label = 'Workwear Item';

            if (handle.includes('vis') || handle.includes('safety')) {
                category = 'hi-vis';
                label = 'Hi-Vis Vest';
            } else if (handle.includes('hoodie')) {
                category = 'hoodies';
                label = 'Hoodie';
            } else if (handle.includes('polo')) {
                category = 'polo-shirts';
                label = 'Polo Shirt';
            } else if (handle.includes('fleece')) {
                category = 'fleeces';
                label = 'Fleece';
            } else if (handle.includes('softshell')) {
                category = 'softshell';
                label = 'Softshell';
            }

            return {
                id: handle,
                name: handle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                description: 'Customizable Bundle',
                handle: handle,
                items: Array(5).fill(null).map(() => createDefaultBundleItem(category, label)),
                basePrice: 0,
                totalPrice: 0,
                freeLogoIncluded: true,
                maxItems: 5,
            };
        }
        return null;
    }

    if (!currentBundle) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Bundle Not Found</h1>
                <p className="text-zinc-600 mb-8">We couldn't find a configuration for this bundle.</p>
                <button
                    onClick={() => router.push('/products')}
                    className="px-6 py-3 bg-zinc-900 text-white rounded-xl"
                >
                    Browse Bundles
                </button>
            </div>
        );
    }

    const categories = Array.from(new Set(currentBundle.items.map(i => i.category)));

    const steps = [
        ...categories.map((cat, idx) => ({
            id: idx + 1,
            title: currentBundle.items.find(i => i.category === cat)?.categoryLabel || cat,
            description: 'Select Styles'
        })),
        { id: categories.length + 1, title: 'Branding', description: 'Add Logo' },
        { id: categories.length + 2, title: 'Review', description: 'Summary' }
    ];

    const isCategoryStep = currentStep <= categories.length;
    const isBrandingStep = currentStep === categories.length + 1;
    const isReviewStep = currentStep === categories.length + 2;

    const currentCategory = isCategoryStep ? categories[currentStep - 1] : null;

    const isStepValid = () => {
        if (isCategoryStep && currentCategory) {
            const categoryItems = currentBundle.items.filter(i => i.category === currentCategory);
            return categoryItems.every(i => i.productId && i.variantId);
        }
        return true;
    };

    const handleNext = () => {
        if (!isStepValid()) return;
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
            trackEvent('bundle_step_complete', {
                step: currentStep,
                bundle: currentBundle.id
            });
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleUpdateAll = (updateFn: (item: BundleItem) => BundleItem) => {
        currentBundle.items.forEach(item => {
            const updated = updateFn(item);
            updateBundleItem(item.id, updated);
        });
    };

    const handleComplete = () => {
        let addedCount = 0;
        currentBundle.items.forEach(item => {
            if (item.productId && item.variantId) {
                const product = products.find(p => String(p.id).trim() === String(item.productId).trim());
                if (product) {
                    addItem(product, item.variantId);
                    addedCount++;
                } else {
                    console.error("Bundle Product Not Found:", item.productId, "Available:", products.map(p => p.id));
                    // Try adding anyway if we have the data in the item (less safe but fallback)
                    if (item.productTitle && item.price) {
                        // We can't use addItem safely without full product object usually, 
                        // but if we are here, something is wrong with ID matching.
                        // Let's stick to the error for now as current CartStore expects full Product.
                    }
                }
            }
        });

        if (addedCount > 0) {
            trackEvent('bundle_complete', { bundle: currentBundle.id });
            router.push('/cart');
        } else {
            console.error("Failed to add any items to cart - product lookup failed");
            alert("Unexpected error: Could not find product details. Please try refreshing.");
        }
    };

    return (
        <div className="min-h-screen bg-white py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-zinc-950 mb-4">
                            Customize Your <span className="text-gradient">Bundle</span>
                        </h1>
                        <p className="text-lg text-zinc-600 font-medium">
                            {currentBundle.name}
                        </p>
                    </div>

                    <StepWizard
                        steps={steps}
                        currentStep={currentStep}
                        onStepChange={(step) => {
                            if (step < currentStep || isStepValid()) {
                                setCurrentStep(step);
                            }
                        }}
                        canGoNext={isStepValid()}
                        canGoPrevious={currentStep > 1}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        onComplete={handleComplete}
                        isComplete={isReviewStep}
                    >
                        {isCategoryStep && currentCategory && (
                            <CategoryStep
                                key={currentCategory}
                                category={currentCategory}
                                categoryLabel={currentBundle.items.find(i => i.category === currentCategory)?.categoryLabel || ''}
                                items={currentBundle.items.filter(i => i.category === currentCategory)}
                                products={products}
                                onUpdateItem={updateBundleItem}
                                onComplete={handleNext}
                            />
                        )}

                        {isBrandingStep && (
                            <BrandingStep
                                items={currentBundle.items}
                                onUpdateAll={handleUpdateAll}
                                onComplete={handleNext}
                            />
                        )}

                        {isReviewStep && (
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
