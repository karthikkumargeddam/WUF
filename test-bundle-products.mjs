import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

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

async function testBundleProducts() {
    try {
        // Test 1: Get all products
        console.log('\n📦 Testing product fetch...');
        const productsSnapshot = await getDocs(collection(db, 'products'));
        console.log(`Total products in Firestore: ${productsSnapshot.size}`);

        // Test 2: Check product structure
        const firstProduct = productsSnapshot.docs[0]?.data();
        console.log('\nFirst product structure:');
        console.log(`  ID: ${firstProduct?.id}`);
        console.log(`  Title: ${firstProduct?.title}`);
        console.log(`  Handle: ${firstProduct?.handle}`);
        console.log(`  Product Type: ${firstProduct?.product_type}`);
        console.log(`  Tags: ${firstProduct?.tags}`);
        console.log(`  Variants: ${firstProduct?.variants?.length || 0}`);
        console.log(`  Images: ${firstProduct?.images?.length || 0}`);

        // Test 3: Search for polo products
        console.log('\n🔍 Searching for polo products...');
        const poloProducts = [];
        productsSnapshot.forEach(doc => {
            const data = doc.data();
            const title = (data.title || '').toLowerCase();
            const type = (data.product_type || '').toLowerCase();
            const tags = Array.isArray(data.tags) ? data.tags : [];

            if (title.includes('polo') || type.includes('polo') ||
                tags.some(tag => tag.toLowerCase().includes('polo'))) {
                poloProducts.push({
                    id: data.id,
                    title: data.title,
                    type: data.product_type,
                    tags: tags
                });
            }
        });

        console.log(`Found ${poloProducts.length} polo products`);
        console.log('\nSample polo products:');
        poloProducts.slice(0, 5).forEach((p, i) => {
            console.log(`  ${i + 1}. ${p.title} (${p.type})`);
        });

        // Test 4: Check for hoodies
        console.log('\n🔍 Searching for hoodie products...');
        const hoodieProducts = [];
        productsSnapshot.forEach(doc => {
            const data = doc.data();
            const title = (data.title || '').toLowerCase();
            const type = (data.product_type || '').toLowerCase();

            if (title.includes('hoodie') || title.includes('hooded') ||
                type.includes('sweata')) {
                hoodieProducts.push({
                    id: data.id,
                    title: data.title,
                    type: data.product_type
                });
            }
        });

        console.log(`Found ${hoodieProducts.length} hoodie products`);
        console.log('\nSample hoodie products:');
        hoodieProducts.slice(0, 5).forEach((p, i) => {
            console.log(`  ${i + 1}. ${p.title} (${p.type})`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

testBundleProducts();
