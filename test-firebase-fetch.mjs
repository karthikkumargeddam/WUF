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

async function testFetch() {
    try {
        console.log("Testing Firebase connection...");
        const q = query(collection(db, "products"), limit(5));
        const snapshot = await getDocs(q);

        console.log(`\nFound ${snapshot.size} products`);

        snapshot.forEach((doc, index) => {
            const data = doc.data();
            const productId = data.id !== undefined ? String(data.id) : doc.id;
            console.log(`\nProduct ${index + 1}:`);
            console.log(`  ID: ${productId}`);
            console.log(`  Title: ${data.title}`);
            console.log(`  Handle: ${data.handle}`);
            console.log(`  Variants: ${data.variants?.length || 0}`);
            console.log(`  Images: ${data.images?.length || 0}`);
        });

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

testFetch();
