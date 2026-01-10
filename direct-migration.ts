
import { fetchAllProducts } from './src/lib/shopify';
import { db } from './src/lib/firebase';
import { doc, writeBatch } from 'firebase/firestore';
import * as dotenv from 'dotenv';

// Create a simple fetch polyfill for older node if needed, but node 18+ has it.
// Load env vars
dotenv.config({ path: '.env.local' });

async function run() {
    try {
        console.log("Starting migration (direct script)...");
        const products = await fetchAllProducts();
        console.log(`Fetched ${products.length} products from Shopify.`);

        if (products.length === 0) {
            console.log("No products found.");
            return;
        }

        const BATCH_SIZE = 450;
        let batchCount = 0;
        let successCount = 0;

        for (let i = 0; i < products.length; i += BATCH_SIZE) {
            const batch = writeBatch(db);
            const chunk = products.slice(i, i + BATCH_SIZE);

            chunk.forEach(product => {
                const ref = doc(db, 'products', String(product.id));
                batch.set(ref, product);
            });

            await batch.commit();
            batchCount++;
            successCount += chunk.length;
            console.log(`Batch ${batchCount} committed. ${successCount}/${products.length} products processed.`);
        }
        console.log("Migration complete!");
        process.exit(0);

    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
}

run();
