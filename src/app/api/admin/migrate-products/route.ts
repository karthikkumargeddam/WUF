import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, writeBatch } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';

// Helper to get Env Vars even if server didn't pick them up
function getEnv(key: string): string | undefined {
    if (process.env[key]) return process.env[key];
    try {
        const cwd = process.cwd();
        console.log(`[DEBUG] CWD: ${cwd}`);
        const envPath = path.resolve(cwd, '.env.local');
        // console.log(`[DEBUG] Looking for .env.local at: ${envPath}`);
        if (!fs.existsSync(envPath)) return undefined;

        const file = fs.readFileSync(envPath, 'utf8');
        const line = file.split('\n').find(l => l.trim().startsWith(`${key}=`));
        if (line) {
            const val = line.split('=')[1].trim();
            // Remove quotes if present
            return val.replace(/^["'](.*)["']$/, '$1');
        }
        return undefined;
    } catch (e) {
        return undefined;
    }
}

export async function GET() {
    try {
        console.log("Starting migration (API)...");

        const domain = getEnv('NEXT_PUBLIC_SHOPIFY_DOMAIN');
        const token = getEnv('SHOPIFY_ADMIN_TOKEN');

        if (!domain || !token) {
            return NextResponse.json({ success: false, error: 'Missing credentials in .env.local' });
        }

        console.log(`Fetching from: ${domain}`);

        // Fetch Logic Inlined to use local variables
        let pageInfo: string | null = null;
        const allProducts: any[] = [];
        do {
            const url = new URL(`https://${domain}/admin/api/2024-04/products.json`);
            url.searchParams.set('limit', '250');
            if (pageInfo) url.searchParams.set('page_info', pageInfo);

            const headers = new Headers();
            headers.append('X-Shopify-Access-Token', token);
            headers.append('Content-Type', 'application/json');

            const res = await fetch(url.toString(), { headers });
            if (!res.ok) throw new Error(`Shopify fetch failed: ${res.status}`);

            const data = await res.json();
            allProducts.push(...data.products);

            const linkHeader = res.headers.get('link');
            const match = linkHeader?.match(/<([^>]+)>; rel="next"/);
            pageInfo = match ? new URL(match[1]).searchParams.get('page_info') : null;
        } while (pageInfo);

        console.log(`Fetched ${allProducts.length} products.`);

        if (allProducts.length === 0) {
            return NextResponse.json({ message: 'No products found to migrate.' });
        }

        // Firestore batch has a limit of 500 operations
        const BATCH_SIZE = 450;
        let batchCount = 0;
        let successCount = 0;

        for (let i = 0; i < allProducts.length; i += BATCH_SIZE) {
            const batch = writeBatch(db);
            const chunk = allProducts.slice(i, i + BATCH_SIZE);

            chunk.forEach(product => {
                // Use product ID as document ID for easy reference/update
                const ref = doc(db, 'products', String(product.id));
                batch.set(ref, product); // overwrites if exists, which is good for sync
            });

            await batch.commit();
            batchCount++;
            successCount += chunk.length;
            console.log(`Batch ${batchCount} committed. ${successCount}/${allProducts.length} products processed.`);
        }

        return NextResponse.json({
            success: true,
            message: `Successfully migrated ${successCount} products.`,
            total_fetched: allProducts.length
        });

    } catch (error: any) {
        console.error("Migration failed:", error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
