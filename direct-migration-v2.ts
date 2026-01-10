
// direct-migration-v2.ts
// Self-contained script to avoid alias issues with tsx

// --- Imports (using relative paths if possible, or mocking) ---
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, writeBatch } from "firebase/firestore";
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// --- Load Env ---
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    console.log("Loading .env.local...");
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const [key, val] = line.split('=');
        if (key && val) {
            process.env[key.trim()] = val.trim();
        }
    });
}

// --- Firebase Config (Hardcoded or from Env) ---
const firebaseConfig = {
    apiKey: "AIzaSyCSn-uUtIP2toFIf0diskjAZaXX1jQ13pw",
    authDomain: "style-sphere-95c19.firebaseapp.com",
    projectId: "style-sphere-95c19",
    storageBucket: "style-sphere-95c19.firebasestorage.app",
    messagingSenderId: "316334207780",
    appId: "1:316334207780:web:b462d821737c699c5d79b1",
    measurementId: "G-S755QKDV3T"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// --- Shopify Logic (Copied from src/lib/shopify.ts) ---
const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const SHOPIFY_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

async function fetchAllProducts() {
    const limit = 250;

    if (!SHOPIFY_DOMAIN) throw new Error('NEXT_PUBLIC_SHOPIFY_DOMAIN is not defined');
    if (!SHOPIFY_TOKEN) throw new Error('SHOPIFY_ADMIN_TOKEN is not defined');

    console.log(`Fetching from: ${SHOPIFY_DOMAIN}`);

    let pageInfo = null;
    const allProducts = [];
    do {
        const url = new URL(`https://${SHOPIFY_DOMAIN}/admin/api/2024-04/products.json`);
        url.searchParams.set('limit', limit.toString());
        if (pageInfo) url.searchParams.set('page_info', pageInfo);

        const headers = new Headers();
        headers.append('X-Shopify-Access-Token', SHOPIFY_TOKEN);
        headers.append('Content-Type', 'application/json');

        const res = await fetch(url.toString(), { headers });
        if (!res.ok) {
            throw new Error(`Shopify fetch failed: ${res.status}`);
        }
        const data = await res.json();
        allProducts.push(...data.products);

        const linkHeader = res.headers.get('link');
        const match = linkHeader?.match(/<([^>]+)>; rel="next"/);
        pageInfo = match ? new URL(match[1]).searchParams.get('page_info') : null;
        console.log(`Fetched ${allProducts.length} products so far...`);
    } while (pageInfo);

    return allProducts;
}

// --- Main Migration Logic ---
async function run() {
    try {
        console.log("Starting migration (v2 self-contained)...");
        const products = await fetchAllProducts();
        console.log(`Total Fetched: ${products.length}`);

        if (products.length === 0) {
            console.log("No products found.");
            process.exit(0);
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
