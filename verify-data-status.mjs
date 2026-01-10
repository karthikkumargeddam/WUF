
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getCountFromServer } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCSn-uUtIP2toFIf0diskjAZaXX1jQ13pw",
    authDomain: "style-sphere-95c19.firebaseapp.com",
    projectId: "style-sphere-95c19",
    storageBucket: "style-sphere-95c19.firebasestorage.app",
    messagingSenderId: "316334207780",
    appId: "1:316334207780:web:b462d821737c699c5d79b1",
    measurementId: "G-S755QKDV3T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function verifyCounts() {
    try {
        const productsColl = collection(db, "products");
        const bundlesColl = collection(db, "bundle_configs");

        const productsSnapshot = await getCountFromServer(productsColl);
        const bundlesSnapshot = await getCountFromServer(bundlesColl);

        console.log(`Products in Firestore: ${productsSnapshot.data().count}`);
        console.log(`Bundles in Firestore: ${bundlesSnapshot.data().count}`);
        process.exit(0);
    } catch (error) {
        console.error("Error verifying details:", error);
        process.exit(1);
    }
}

verifyCounts();
