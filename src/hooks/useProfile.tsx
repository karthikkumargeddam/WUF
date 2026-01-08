"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { useAuthStore } from '@/store/authStore';

export interface UserProfile {
    firstName?: string;
    lastName?: string;
    companyName?: string;
    phone?: string;
    shippingAddress?: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    email: string;
}

export function useProfile() {
    const { user, isAuthenticated } = useAuthStore();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated || !user?.email) {
            setProfile(null);
            setLoading(false);
            return;
        }

        const userRef = doc(db, 'users', user.email);

        // Real-time listener for profile changes
        const unsubscribe = onSnapshot(userRef, (docSnap) => {
            if (docSnap.exists()) {
                setProfile(docSnap.data() as UserProfile);
            } else {
                // Initialize empty profile if it doesn't exist
                const initialProfile: UserProfile = { email: user.email };
                setProfile(initialProfile);
                // We typically don't force-write here to avoid overwrites, 
                // but we can set local state.
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching profile:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user, isAuthenticated]);

    const updateProfile = async (newProfile: Partial<UserProfile>) => {
        if (!user?.email) return;

        try {
            const userRef = doc(db, 'users', user.email);
            // Merge with existing data
            const dataToSave = { ...newProfile, email: user.email };
            await setDoc(userRef, dataToSave, { merge: true });
        } catch (error) {
            console.error("Error updating profile:", error);
            throw error;
        }
    };

    return { profile, loading, updateProfile };
}
