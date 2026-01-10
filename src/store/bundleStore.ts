import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Bundle, BundleItem, BundleConfiguration, LogoCustomization } from '@/types';
import { getAllProducts } from '@/lib/data';

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
    setCategoryBranding: (category: string, branding: any) => void;
    loadBundleProducts: () => Promise<void>;
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

                const baseTotal = currentBundle.basePrice || 0;

                // Add logo customization costs if not free
                // JRS often includes 1 free placement
                const logoTotal = currentBundle.items.reduce((total, item) => {
                    if (item.logoCustomization && item.logoCustomization.type !== 'none') {
                        const placements = item.logoCustomization.placements || [];
                        // If freeLogoIncluded, first placement is £0, others are £5
                        const taxablePlacements = currentBundle.freeLogoIncluded
                            ? Math.max(0, placements.length - 1)
                            : placements.length;

                        return total + (taxablePlacements * 5);
                    }
                    return total;
                }, 0);

                return baseTotal + logoTotal;
            },

            setCategoryBranding: (category: string, branding: Partial<LogoCustomization>) => {
                const { currentBundle, configuration } = get();
                if (!currentBundle || !configuration) return;

                const updatedItems = configuration.items.map(item =>
                    item.category === category
                        ? { ...item, logoCustomization: { ...(item.logoCustomization || { type: 'none', placements: [] }), ...branding } }
                        : item
                );

                set({
                    currentBundle: { ...currentBundle, items: updatedItems },
                    configuration: { ...configuration, items: updatedItems }
                });
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
            // Load products from Shopify (direct API)
            loadBundleProducts: async () => {
                const products = await getAllProducts();
                const productMap: Record<string, any> = {};
                products.forEach(p => {
                    productMap[p.id] = p;
                });
                set(state => ({
                    configuration: state.configuration ? { ...state.configuration, products: productMap } : null,
                }));
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
            partialize: (state) => ({
                currentBundle: state.currentBundle,
                configuration: state.configuration ? {
                    ...state.configuration,
                    products: undefined // Don't persist large product map
                } : null,
            }),
        }
    )
);
