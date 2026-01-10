
# DEFINITIVE REBUILD AND CLEANUP
# Run this from the root directory of your project (c:\WUF-Ecommerce)

# 1. Stop any running dev/start processes first (Ctrl+C in your other terminal)

# 2. Delete the .next folder to clear all build artifacts and caches
if (Test-Path .next) { Remove-Item -Recurse -Force .next }

# 3. Reinstall dependencies just in case (optional but recommended if issues persist)
# npm install

# 4. Rebuild the application
npm run build

# 5. Start the application
npm start
