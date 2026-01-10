import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export interface CartItem extends Product {
    variantId: number | string; // The specific variant selected
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
    addItem: (product: Product, variantId?: number | string, quantity?: number) => void;
    addItems: (items: { product: Product; variantId?: number | string; quantity?: number }[]) => void;

    removeItem: (id: number | string, variantId: number | string) => void;
    updateQuantity: (id: number | string, variantId: number | string, quantity: number) => void;
    clearCart: () => void;
    addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    getCartTotal: () => number;
    getItemCount: () => number;
    // Firestore Sync
    uid: string | null;
    setUserId: (uid: string | null) => void;
    mergeCart: (uid: string) => Promise<void>;
}

// Helper to sync state to Firestore
const syncToFirestore = async (uid: string, items: CartItem[]) => {
    try {
        await setDoc(doc(db, 'users', uid), { cartItems: items }, { merge: true });
    } catch (e) {
        console.error("Failed to sync cart:", e);
    }
};

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            orders: [],
            isOpen: false,
            uid: null,

            setUserId: (uid) => set({ uid }),

            mergeCart: async (uid) => {
                set({ uid });
                const localItems = get().items;
                try {
                    const userDoc = await getDoc(doc(db, 'users', uid));
                    const serverItems = (userDoc.data()?.cartItems || []) as CartItem[];

                    // Append unique items from local to server
                    const mergedItems = [...serverItems];
                    localItems.forEach(localItem => {
                        const exists = mergedItems.find(s => s.id === localItem.id && s.variantId === localItem.variantId);
                        if (exists) {
                            exists.quantity += localItem.quantity;
                        } else {
                            mergedItems.push(localItem);
                        }
                    });

                    set({ items: mergedItems });
                    syncToFirestore(uid, mergedItems);
                } catch (error) {
                    console.error("Merge cart error:", error);
                }
            },

            addItem: (product, variantId, quantity = 1) => {
                get().addItems([{ product, variantId, quantity }]);
            },

            addItems: (newCartItems) => {
                set((state) => {
                    let currentItems = [...state.items];

                    newCartItems.forEach(({ product, variantId, quantity = 1 }) => {
                        const selectedVariantId = variantId || product.variants[0]?.id || 0;
                        const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];

                        const price = parseFloat(selectedVariant?.price || '0');
                        const variantTitle = selectedVariant?.title === 'Default Title' ? '' : selectedVariant?.title;
                        const image = product.images.length > 0 ? product.images[0].src : '';

                        const existingItemIndex = currentItems.findIndex(
                            (item) => item.id === product.id && item.variantId === selectedVariantId
                        );

                        if (existingItemIndex > -1) {
                            currentItems[existingItemIndex].quantity += quantity;
                        } else {
                            currentItems.push({
                                ...product,
                                variantId: selectedVariantId,
                                variantTitle,
                                quantity,
                                price,
                                image,
                            });
                        }
                    });

                    if (state.uid) syncToFirestore(state.uid, currentItems);
                    return { items: currentItems, isOpen: true };
                });
            },

            removeItem: (id, variantId) => {
                set((state) => {
                    const newItems = state.items.filter((item) => !(item.id === id && item.variantId === variantId));
                    if (state.uid) syncToFirestore(state.uid, newItems);
                    return { items: newItems };
                });
            },

            updateQuantity: (id, variantId, quantity) => {
                set((state) => {
                    const newItems = state.items.map((item) =>
                        item.id === id && item.variantId === variantId
                            ? { ...item, quantity: Math.max(0, quantity) }
                            : item
                    );
                    if (state.uid) syncToFirestore(state.uid, newItems);
                    return { items: newItems };
                });
            },

            clearCart: () => {
                set((state) => {
                    if (state.uid) syncToFirestore(state.uid, []);
                    return { items: [] };
                });
            },


            addOrder: (orderData) => {
                const newOrder: Order = {
                    ...orderData,
                    id: `ORD-${uuidv4().slice(0, 8).toUpperCase()}`,
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

