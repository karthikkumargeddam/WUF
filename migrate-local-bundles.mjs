
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
const storage = getStorage(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Root dir is one level up from scripts/ (if this file is in scripts/), but here I'm writing it to root directly or src? 
// I'll write it to root 'migrate-local-bundles.mjs' so:
const ROOT_DIR = __dirname;

const BUNDLE_DIRS = [
    'FLEECE BUNDLE JUST EMBROIDERY',
    'HI VISIBILITY BUNDLE',
    'HOODIES BUNDLE',
    'HOSPITALITY BUNDLE',
    'Hospitality Apron Bundle',
    'POLO BUNDLE',
    'PREMIUM BUNDLE E4',
    'PREMIUM BUNDLES JUST EMBROIDERY',
    'SALON AND BEAUTY BUNDLE',
    'START UP  BUNDLE',
    'T-SHIRT BUNDLE',
    'WINTER BUNDLES',
    'WORKWEAR BUNDLES'
];

async function uploadFile(filePath, destinationPath) {
    const fileContent = fs.readFileSync(filePath);
    // Convert Node Buffer to Uint8Array/ArrayBuffer for Firebase
    const uint8Array = new Uint8Array(fileContent);
    const storageRef = ref(storage, destinationPath);
    await uploadBytes(storageRef, uint8Array);
    return getDownloadURL(storageRef);
}

async function processBundle(folderName) {
    const bundlePath = path.join(ROOT_DIR, folderName);
    if (!fs.existsSync(bundlePath)) {
        console.warn(`Folder not found: ${folderName}`);
        return;
    }

    // Sometimes the bundle is immediately files, sometimes it has subfolders like "STARTER BUNDLE 1"
    const contents = fs.readdirSync(bundlePath);

    // Check if it has sub-bundles (directories) or just files
    const hasSubDirs = contents.some(c => fs.statSync(path.join(bundlePath, c)).isDirectory());

    if (hasSubDirs) {
        console.log(`Processing Parent Bundle: ${folderName}`);
        // Iterate subfolders
        for (const sub of contents) {
            const subPath = path.join(bundlePath, sub);
            if (fs.statSync(subPath).isDirectory()) {
                await processSingleBundleVariant(subPath, folderName, sub);
            }
        }
    } else {
        console.log(`Processing Single Bundle: ${folderName}`);
        await processSingleBundleVariant(bundlePath, folderName, folderName);
    }
}

async function processSingleBundleVariant(dirPath, category, variantName) {
    console.log(`  > Migrating ${variantName}...`);
    const files = fs.readdirSync(dirPath).filter(f => !f.startsWith('.'));
    const items = [];
    let mainImage = '';

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) continue;

        // Upload to Storage
        const dest = `bundles/${category}/${variantName}/${file}`;
        try {
            const url = await uploadFile(filePath, dest);

            // Heuristic: If it's a PNG/JPG, it's likely a product or the main bundle image
            // If the filename contains "BUNDLE" or "Main", it's the main image
            if (file.toLowerCase().includes('bundle') || file.toLowerCase().includes('main')) {
                mainImage = url;
            } else {
                // It's a component item
                items.push({
                    filename: file,
                    name: path.parse(file).name, // Check naming convention "UX04-BK-H Hoodie" -> product mapping
                    image: url
                });
            }
        } catch (e) {
            console.error(`    Failed to upload ${file}:`, e.message);
        }
    }

    // Create Firestore Document
    // ID: sanitized variant name
    const docId = variantName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const docRef = doc(db, 'bundle_configs', docId);

    const bundleData = {
        name: variantName,
        category: category,
        description: `Customizable ${variantName}`,
        items: items,
        mainImage: mainImage || (items.length > 0 ? items[0].image : ''),
        basePrice: 0, // Placeholder
        handle: docId,
        createdAt: new Date().toISOString()
    };

    await setDoc(docRef, bundleData);
    console.log(`    Saved config ${docId} to Firestore.`);
}

async function run() {
    for (const bundle of BUNDLE_DIRS) {
        await processBundle(bundle);
    }
    console.log("Migration Complete!");
    process.exit(0);
}

run();
