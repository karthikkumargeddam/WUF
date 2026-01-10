
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, writeBatch } from "firebase/firestore";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIG ---
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrateProducts() {
    try {
        console.log("Reading products-page1.json...");
        const jsonPath = path.join(__dirname, 'products-page1.json');
        let rawData = fs.readFileSync(jsonPath, 'utf8');

        // Remove BOM if present
        if (rawData.charCodeAt(0) === 0xFEFF) {
            rawData = rawData.slice(1);
        }

        const data = JSON.parse(rawData);
        const products = data.products;

        if (!products || !Array.isArray(products)) {
            throw new Error("Invalid JSON structure: 'products' array missing.");
        }

        console.log(`Found ${products.length} products to migrate.`);

        // Process in batches of 400 (Firestore limit is 500)
        const BATCH_SIZE = 400;
        let batch = writeBatch(db);
        let count = 0;
        let totalProcessed = 0;

        for (const product of products) {
            // Use handle as ID for friendlier URLs, or fallback to product.id
            const docId = String(product.handle || product.id);
            const docRef = doc(db, "products", docId);

            batch.set(docRef, {
                ...product,
                migratedAt: new Date().toISOString(),
                source: 'shopify-json-migration'
            });

            count++;
            totalProcessed++;

            if (count >= BATCH_SIZE) {
                console.log(`Committing batch of ${count} products...`);
                await batch.commit();
                batch = writeBatch(db); // Start new batch
                count = 0;
            }
        }

        // Commit final batch
        if (count > 0) {
            console.log(`Committing final batch of ${count} products...`);
            await batch.commit();
        }

        console.log(`Successfully migrated ${totalProcessed} products to Firestore!`);

    } catch (error) {
        console.error("Migration failed:", error);
    }
}

migrateProducts();
