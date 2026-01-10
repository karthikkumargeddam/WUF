import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, writeBatch, collection } from "firebase/firestore";

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

const BASE_URL = 'https://wearunifab.com';
const BATCH_SIZE = 400;

// Utility to delay between requests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch with retry logic
async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            console.log(`Fetching: ${url}`);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Attempt ${i + 1} failed for ${url}:`, error.message);
            if (i === retries - 1) throw error;
            await delay(2000 * (i + 1)); // Exponential backoff
        }
    }
}

// Fetch all products (paginated)
async function fetchAllProducts() {
    console.log('\n📦 Fetching all products...');
    let allProducts = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        try {
            const url = `${BASE_URL}/products.json?limit=250&page=${page}`;
            const data = await fetchWithRetry(url);

            if (data.products && data.products.length > 0) {
                allProducts = allProducts.concat(data.products);
                console.log(`  ✓ Fetched page ${page}: ${data.products.length} products (Total: ${allProducts.length})`);
                page++;
                await delay(500); // Rate limiting
            } else {
                hasMore = false;
            }
        } catch (error) {
            console.error(`Failed to fetch products page ${page}:`, error.message);
            hasMore = false;
        }
    }

    console.log(`\n✅ Total products fetched: ${allProducts.length}`);
    return allProducts;
}

// Fetch all collections
async function fetchAllCollections() {
    console.log('\n📚 Fetching all collections...');
    try {
        const data = await fetchWithRetry(`${BASE_URL}/collections.json`);
        console.log(`✅ Fetched ${data.collections?.length || 0} collections`);
        return data.collections || [];
    } catch (error) {
        console.error('Failed to fetch collections:', error.message);
        return [];
    }
}

// Fetch products for each collection
async function fetchCollectionProducts(collectionHandle) {
    try {
        const url = `${BASE_URL}/collections/${collectionHandle}/products.json?limit=250`;
        const data = await fetchWithRetry(url);
        return data.products || [];
    } catch (error) {
        console.error(`Failed to fetch products for collection ${collectionHandle}:`, error.message);
        return [];
    }
}

// Fetch all pages
async function fetchAllPages() {
    console.log('\n📄 Fetching all pages...');
    try {
        const data = await fetchWithRetry(`${BASE_URL}/pages.json`);
        console.log(`✅ Fetched ${data.pages?.length || 0} pages`);
        return data.pages || [];
    } catch (error) {
        console.error('Failed to fetch pages:', error.message);
        return [];
    }
}

// Fetch all blogs
async function fetchAllBlogs() {
    console.log('\n📝 Fetching all blogs...');
    try {
        const data = await fetchWithRetry(`${BASE_URL}/blogs.json`);
        console.log(`✅ Fetched ${data.blogs?.length || 0} blogs`);
        return data.blogs || [];
    } catch (error) {
        console.error('Failed to fetch blogs:', error.message);
        return [];
    }
}

// Fetch articles for a blog
async function fetchBlogArticles(blogHandle) {
    try {
        const url = `${BASE_URL}/blogs/${blogHandle}/articles.json`;
        const data = await fetchWithRetry(url);
        return data.articles || [];
    } catch (error) {
        console.error(`Failed to fetch articles for blog ${blogHandle}:`, error.message);
        return [];
    }
}

// Migrate data to Firestore
async function migrateToFirestore(collectionName, data, idField = 'id') {
    if (!data || data.length === 0) {
        console.log(`  ⚠️  No data to migrate for ${collectionName}`);
        return;
    }

    console.log(`\n🔄 Migrating ${data.length} items to ${collectionName}...`);

    let batch = writeBatch(db);
    let count = 0;
    let totalProcessed = 0;

    for (const item of data) {
        const docId = String(item.handle || item[idField] || item.id);
        const docRef = doc(db, collectionName, docId);

        batch.set(docRef, {
            ...item,
            migratedAt: new Date().toISOString(),
            source: 'wearunifab-api'
        });

        count++;
        totalProcessed++;

        if (count >= BATCH_SIZE) {
            console.log(`  Committing batch of ${count} items...`);
            await batch.commit();
            batch = writeBatch(db);
            count = 0;
            await delay(500); // Rate limiting
        }
    }

    // Commit final batch
    if (count > 0) {
        console.log(`  Committing final batch of ${count} items...`);
        await batch.commit();
    }

    console.log(`✅ Successfully migrated ${totalProcessed} items to ${collectionName}`);
}

// Main migration function
async function migrateAllData() {
    try {
        console.log('🚀 Starting complete Wearunifab data migration...\n');
        console.log('='.repeat(60));

        // 1. Fetch and migrate products
        const products = await fetchAllProducts();
        await migrateToFirestore('products', products);

        // 2. Fetch and migrate collections
        const collections = await fetchAllCollections();
        await migrateToFirestore('collections', collections);

        // 3. Fetch and migrate collection-product mappings
        console.log('\n🔗 Fetching collection-product mappings...');
        for (const collection of collections) {
            if (collection.handle) {
                const collectionProducts = await fetchCollectionProducts(collection.handle);
                console.log(`  ✓ ${collection.handle}: ${collectionProducts.length} products`);

                // Store mapping
                if (collectionProducts.length > 0) {
                    const mappingRef = doc(db, 'collection_mappings', collection.handle);
                    await setDoc(mappingRef, {
                        collectionId: collection.id,
                        collectionHandle: collection.handle,
                        productIds: collectionProducts.map(p => p.id),
                        productHandles: collectionProducts.map(p => p.handle),
                        migratedAt: new Date().toISOString()
                    });
                }

                await delay(500);
            }
        }

        // 4. Fetch and migrate pages
        const pages = await fetchAllPages();
        await migrateToFirestore('pages', pages);

        // 5. Fetch and migrate blogs
        const blogs = await fetchAllBlogs();
        await migrateToFirestore('blogs', blogs);

        // 6. Fetch and migrate blog articles
        console.log('\n📰 Fetching blog articles...');
        for (const blog of blogs) {
            if (blog.handle) {
                const articles = await fetchBlogArticles(blog.handle);
                console.log(`  ✓ ${blog.handle}: ${articles.length} articles`);

                if (articles.length > 0) {
                    await migrateToFirestore(`blog_articles_${blog.handle}`, articles);
                }

                await delay(500);
            }
        }

        // Summary
        console.log('\n' + '='.repeat(60));
        console.log('🎉 MIGRATION COMPLETE!');
        console.log('='.repeat(60));
        console.log(`📦 Products: ${products.length}`);
        console.log(`📚 Collections: ${collections.length}`);
        console.log(`📄 Pages: ${pages.length}`);
        console.log(`📝 Blogs: ${blogs.length}`);
        console.log('='.repeat(60));

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Migration failed:', error);
        process.exit(1);
    }
}

// Run migration
migrateAllData();
