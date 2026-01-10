import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCSn-uUtIP2toFIf0diskjAZaXX1jQ13pw",
    authDomain: "style-sphere-95c19.firebaseapp.com",
    projectId: "style-sphere-95c19",
    storageBucket: "style-sphere-95c19.firebasestorage.app",
    messagingSenderId: "316334207780",
    appId: "1:316334207780:web:b462d821737c699c5d79b1",
    measurementId: "G-S755QKDV3T"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

// Analytics defaults to undefined on server
let analytics: Analytics | undefined;
if (typeof window !== 'undefined') {
    isSupported().then((yes) => {
        if (yes) {
            analytics = getAnalytics(app);
        }
    });
}

const auth = getAuth(app);

export { app, db, analytics, auth, storage };
