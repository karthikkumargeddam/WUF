import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, limit, query } from "firebase/firestore";

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

async function checkProducts() {
    try {
        const q = query(collection(db, "products"), limit(10));
        const snapshot = await getDocs(q);

        console.log(`\nChecking first 10 products for ID issues:\n`);

        snapshot.forEach((doc, index) => {
            const data = doc.data();
            console.log(`Product ${index + 1}:`);
            console.log(`  Doc ID: ${doc.id}`);
            console.log(`  Data ID: ${data.id}`);
            console.log(`  Title: ${data.title}`);
            console.log(`  ID Type: ${typeof data.id}`);
            console.log(`  ID is undefined: ${data.id === undefined}`);
            console.log(`---`);
        });

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

checkProducts();
