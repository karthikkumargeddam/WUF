import { create } from 'zustand';
import { auth } from '@/lib/firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser
} from 'firebase/auth';

interface User {
    email: string;
    uid: string;
    name?: string;
}

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    initialize: () => () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
    user: null,
    isAuthenticated: false,
    loading: true,

    login: async (email, password) => {
        if (!auth) {
            console.error("Firebase Auth not initialized");
            throw new Error("Authentication system unavailable");
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Auth Store Login Error:", error);
            throw error;
        }
        // State updates handled by onAuthStateChanged listener
    },

    signup: async (email, password) => {
        if (!auth) {
            console.error("Firebase Auth not initialized");
            throw new Error("Authentication system unavailable");
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Auth Store Signup Error:", error);
            throw error;
        }
        // State updates handled by onAuthStateChanged listener
    },

    logout: async () => {
        if (!auth) return; // Fail silently or log
        try {
            await signOut(auth);
            // State update handled by listener, but we can optimistically clear
            set({ user: null, isAuthenticated: false });
        } catch (error) {
            console.error("Logout Error:", error);
        }
    },

    initialize: () => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser?.email) {
                set({
                    user: {
                        email: firebaseUser.email,
                        uid: firebaseUser.uid,
                        name: firebaseUser.displayName || undefined
                    },
                    isAuthenticated: true,
                    loading: false
                });
            } else {
                set({
                    user: null,
                    isAuthenticated: false,
                    loading: false
                });
            }
        });
        return unsubscribe;
    }
}));
