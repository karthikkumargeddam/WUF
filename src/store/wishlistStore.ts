import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
    wishlist: (number | string)[]; // Array of product IDs
    addItem: (productId: number | string) => void;
    removeItem: (productId: number | string) => void;
    isInWishlist: (productId: number | string) => boolean;
    toggleItem: (productId: number | string) => void;
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            wishlist: [],
            addItem: (productId) => set((state) => ({ wishlist: [...state.wishlist, productId] })),
            removeItem: (productId) => set((state) => ({ wishlist: state.wishlist.filter((id) => id !== productId) })),
            isInWishlist: (productId) => get().wishlist.includes(productId),
            toggleItem: (productId) => {
                const { wishlist, addItem, removeItem } = get();
                // Ensure type safety when checking inclusion
                if (wishlist.includes(productId)) {
                    removeItem(productId);
                } else {
                    addItem(productId);
                }
            },
        }),
        {
            name: 'wishlist-storage', // unique name
        }
    )
);
