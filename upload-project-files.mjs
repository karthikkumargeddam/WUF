
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
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
const storage = getStorage(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = __dirname; // Assuming script is in root

const EXCLUDES = [
    'node_modules',
    'public',
    '.git',
    '.next',
    '.vscode',
    'dist',
    'build-output.txt',
    'build-final.txt',
    '.env',
    '.env.local', // Don't upload secrets!
    'npm-debug.log'
];

async function uploadFile(filePath, destinationPath) {
    try {
        const fileContent = fs.readFileSync(filePath);
        const uint8Array = new Uint8Array(fileContent);
        const storageRef = ref(storage, destinationPath);
        await uploadBytes(storageRef, uint8Array);
        process.stdout.write('.'); // Progress dot
    } catch (e) {
        console.error(`\nFailed: ${destinationPath} - ${e.message}`);
    }
}

async function walkAndUpload(dir, baseDir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (EXCLUDES.includes(file)) continue;

        const fullPath = path.join(dir, file);
        const relativePath = path.relative(baseDir, fullPath);

        if (fs.statSync(fullPath).isDirectory()) {
            await walkAndUpload(fullPath, baseDir);
        } else {
            // Destination: project-backup/timestamp/path
            // We'll just overwrite in 'project-source' for now to keep it simple/browsable if they want "data"
            // actually user said "upload these also", maybe they mean the *files* at root?
            // Let's assume a folder 'project-files'
            await uploadFile(fullPath, `project-files/${relativePath.replace(/\\/g, '/')}`);
        }
    }
}

console.log("Starting full project upload (excluding node_modules, public)...");
await walkAndUpload(ROOT_DIR, ROOT_DIR);
console.log("\nUpload Complete!");
process.exit(0);
