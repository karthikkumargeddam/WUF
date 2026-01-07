import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types';

export interface CartItem extends Product {
    variantId: number; // The specific variant selected
    variantTitle?: string;
    quantity: number;
    price: number; // Stored as number for calc
    image: string;
}

export interface Order {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
    status: 'Fulfilled' | 'Delivered' | 'In Transit' | 'Processing';
}

interface CartState {
    items: CartItem[];
    orders: Order[];
    isOpen: boolean;
    addItem: (product: Product, variantId?: number, quantity?: number) => void;
    removeItem: (id: number, variantId: number) => void;
    updateQuantity: (id: number, variantId: number, quantity: number) => void;
    clearCart: () => void;
    addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    getCartTotal: () => number;
    getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            orders: [],
            isOpen: false,

            addItem: (product, variantId, quantity = 1) => {
                set((state) => {
                    // Default to first variant if none specified
                    const selectedVariantId = variantId || product.variants[0]?.id || 0;
                    const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];

                    const price = parseFloat(selectedVariant?.price || '0');
                    const variantTitle = selectedVariant?.title === 'Default Title' ? '' : selectedVariant?.title;
                    const image = product.images.length > 0 ? product.images[0].src : '';

                    const existingItem = state.items.find(
                        (item) => item.id === product.id && item.variantId === selectedVariantId
                    );

                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.id === product.id && item.variantId === selectedVariantId
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            ),
                            isOpen: true, // Open cart when item added
                        };
                    }

                    return {
                        items: [
                            ...state.items,
                            {
                                ...product,
                                variantId: selectedVariantId,
                                variantTitle,
                                quantity,
                                price,
                                image,
                            },
                        ],
                        isOpen: true,
                    };
                });
            },

            removeItem: (id, variantId) => {
                set((state) => ({
                    items: state.items.filter((item) => !(item.id === id && item.variantId === variantId)),
                }));
            },

            updateQuantity: (id, variantId, quantity) => {
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id && item.variantId === variantId
                            ? { ...item, quantity: Math.max(0, quantity) }
                            : item
                    ),
                }));
            },

            clearCart: () => set({ items: [] }),

            addOrder: (orderData) => {
                const newOrder: Order = {
                    ...orderData,
                    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
                    date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                    status: 'Processing',
                };
                set((state) => ({
                    orders: [newOrder, ...state.orders].slice(0, 10), // Keep last 10
                    items: [], // Clear cart after order
                }));
            },

            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),

            getCartTotal: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },

            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            },
        }),
        {
            name: 'wuf-cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

