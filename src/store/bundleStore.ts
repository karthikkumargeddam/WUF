import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Bundle, BundleItem, BundleConfiguration } from '@/types';

interface BundleStore {
    currentBundle: Bundle | null;
    configuration: BundleConfiguration | null;

    // Actions
    initializeBundle: (bundle: Bundle) => void;
    updateBundleItem: (itemId: string, updates: Partial<BundleItem>) => void;
    removeBundleItem: (itemId: string) => void;
    addBundleItem: (item: BundleItem) => void;
    calculateTotalPrice: () => number;
    resetBundle: () => void;
    setCompletedSteps: (steps: number) => void;
    isItemComplete: (itemId: string) => boolean;
    isBundleComplete: () => boolean;
}

export const useBundleStore = create<BundleStore>()(
    persist(
        (set, get) => ({
            currentBundle: null,
            configuration: null,

            initializeBundle: (bundle: Bundle) => {
                set({
                    currentBundle: bundle,
                    configuration: {
                        bundleId: bundle.id,
                        items: bundle.items,
                        completedSteps: 0,
                        totalSteps: bundle.items.length,
                    },
                });
            },

            updateBundleItem: (itemId: string, updates: Partial<BundleItem>) => {
                const { currentBundle, configuration } = get();
                if (!currentBundle || !configuration) return;

                const updatedItems = configuration.items.map(item =>
                    item.id === itemId ? { ...item, ...updates } : item
                );

                const updatedBundle = {
                    ...currentBundle,
                    items: updatedItems,
                };

                set({
                    currentBundle: updatedBundle,
                    configuration: {
                        ...configuration,
                        items: updatedItems,
                    },
                });
            },

            addBundleItem: (item: BundleItem) => {
                const { currentBundle, configuration } = get();
                if (!currentBundle || !configuration) return;

                const updatedItems = [...configuration.items, item];
                const updatedBundle = {
                    ...currentBundle,
                    items: updatedItems,
                };

                set({
                    currentBundle: updatedBundle,
                    configuration: {
                        ...configuration,
                        items: updatedItems,
                        totalSteps: updatedItems.length,
                    },
                });
            },

            removeBundleItem: (itemId: string) => {
                const { currentBundle, configuration } = get();
                if (!currentBundle || !configuration) return;

                const updatedItems = configuration.items.filter(item => item.id !== itemId);
                const updatedBundle = {
                    ...currentBundle,
                    items: updatedItems,
                };

                set({
                    currentBundle: updatedBundle,
                    configuration: {
                        ...configuration,
                        items: updatedItems,
                        totalSteps: updatedItems.length,
                    },
                });
            },

            calculateTotalPrice: () => {
                const { currentBundle } = get();
                if (!currentBundle) return 0;

                const itemsTotal = currentBundle.items.reduce((total, item) => {
                    return total + (item.price || 0);
                }, 0);

                // Add logo customization costs if not free
                const logoTotal = currentBundle.freeLogoIncluded ? 0 : currentBundle.items.reduce((total, item) => {
                    if (item.logoCustomization && item.logoCustomization.type !== 'none') {
                        // Add logo cost per placement (example: £5 per placement)
                        return total + (item.logoCustomization.placement.length * 5);
                    }
                    return total;
                }, 0);

                return itemsTotal + logoTotal;
            },

            resetBundle: () => {
                set({
                    currentBundle: null,
                    configuration: null,
                });
            },

            setCompletedSteps: (steps: number) => {
                const { configuration } = get();
                if (!configuration) return;

                set({
                    configuration: {
                        ...configuration,
                        completedSteps: steps,
                    },
                });
            },

            isItemComplete: (itemId: string) => {
                const { configuration } = get();
                if (!configuration) return false;

                const item = configuration.items.find(i => i.id === itemId);
                if (!item) return false;

                // Item is complete if it has product, variant, and logo customization
                return !!(
                    item.productId &&
                    item.variantId &&
                    item.size &&
                    item.color &&
                    item.logoCustomization
                );
            },

            isBundleComplete: () => {
                const { configuration } = get();
                if (!configuration) return false;

                return configuration.items.every(item => {
                    return !!(
                        item.productId &&
                        item.variantId &&
                        item.size &&
                        item.color &&
                        item.logoCustomization
                    );
                });
            },
        }),
        {
            name: 'bundle-storage',
        }
    )
);
