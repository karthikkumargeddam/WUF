import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
    wishlist: string[]; // Array of product IDs
    addItem: (productId: string) => void;
    removeItem: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    toggleItem: (productId: string) => void;
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
