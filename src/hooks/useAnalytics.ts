"use client";

import { db, analytics } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { logEvent } from 'firebase/analytics';
import { useEffect, useState, useCallback } from 'react';

import { v4 as uuidv4 } from 'uuid';

export const useAnalytics = () => {
    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let currentSessionId = sessionStorage.getItem('analytics_session_id');

            if (!currentSessionId) {
                // Robust UUID generation
                currentSessionId = uuidv4();
                sessionStorage.setItem('analytics_session_id', currentSessionId);
            }
            setSessionId(currentSessionId);
        }
    }, []);

    const trackEvent = useCallback(async (eventName: string, metadata: Record<string, any> = {}) => {
        // Only track on client side
        if (typeof window === 'undefined') return;

        try {
            // 1. Log to Google Analytics (optional, checks if initialized)
            if (analytics) {
                logEvent(analytics, eventName, metadata);
            }

            // 2. Log to Firestore for Real-time Dashboard
            // We only log to Firestore if we have a valid session ID
            if (sessionId) {
                // Firestore doesn't accept 'undefined', so we replace it with null
                const safeMetadata = Object.entries(metadata).reduce((acc, [key, value]) => {
                    acc[key] = value === undefined ? null : value;
                    return acc;
                }, {} as Record<string, any>);

                await addDoc(collection(db, 'analytics_events'), {
                    event_type: eventName,
                    session_id: sessionId,
                    timestamp: serverTimestamp(),
                    metadata: safeMetadata,
                    url: window.location.pathname,
                    user_agent: window.navigator.userAgent,
                    // Add userId if available in future
                });
            }
        } catch (error) {
            // Fail silently to not impact user experience
            console.error("Error tracking event:", error);
        }
    }, [sessionId]);

    return { trackEvent, sessionId };
};
