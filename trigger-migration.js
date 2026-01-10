const fs = require('fs');
const path = require('path');

// 1. Load Env Vars manually since we are running outside Next.js
try {
    const envPath = path.resolve(__dirname, '.env.local');
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const [key, val] = line.split('=');
        if (key && val) {
            process.env[key.trim()] = val.trim();
        }
    });
    console.log("Environment variables loaded.");
} catch (e) {
    console.warn("Could not load .env.local", e.message);
}

// 2. Mock Fetch if needed (node 18+ has it)

// 3. Since we can't easily import TS files in raw Node without ts-node, 
// I will just hit the API again but first ensure the user has the server running?
// No, the error `Response: {"success":false... "NEXT_PUBLIC_SHOPIFY_DOMAIN is not defined"}` proved the server IS running but the env vars were missing when IT started.

// Wait, I can't restart their server. 
// I will try to use `npm run dev` in a background process myself if the user's server is broken?
// OR better: I will create a temporary TS script and run it with `npx tsx`.

console.log("Please ensure your 'npm run dev' server was restarted AFTER adding .env.local variables.");
console.log("If you haven't restarted it, the new variables won't be picked up.");
console.log("Retrying migration in 5 seconds...");

async function migrate() {
    try {
        console.log("Triggering migration via API...");
        const res = await fetch('http://localhost:3000/api/admin/migrate-products');

        if (!res.ok) {
            console.error(`Status: ${res.status} ${res.statusText}`);
            const text = await res.text();
            console.error("Response:", text);
            return;
        }

        const data = await res.json();
        console.log("Migration Result:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error triggering migration:", err);
    }
}

migrate();
