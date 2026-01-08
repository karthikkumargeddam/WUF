const fs = require('fs');
const https = require('https');

const url = 'https://wearunifab.com/products.json?limit=250';

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            const products = json.products;

            const types = new Set();
            const tags = new Set();
            const hivisExample = [];

            products.forEach(p => {
                types.add(p.product_type);
                if (typeof p.tags === 'string') {
                    p.tags.split(',').forEach(t => tags.add(t.trim()));
                    if (p.tags.toLowerCase().includes('vis')) hivisExample.push({ title: p.title, type: p.product_type, tags: p.tags });
                } else if (Array.isArray(p.tags)) {
                    p.tags.forEach(t => tags.add(t));
                    if (p.tags.some(t => t.toLowerCase().includes('vis'))) hivisExample.push({ title: p.title, type: p.product_type, tags: p.tags });
                }

                if (p.title.toLowerCase().includes('vest') || p.title.toLowerCase().includes('hi-vis')) {
                    hivisExample.push({ title: p.title, type: p.product_type, tags: p.tags });
                }
            });

            console.log('--- Product Types ---');
            console.log(Array.from(types).join('\n'));
            console.log('\n--- Hi-Vis Examples ---');
            console.log(JSON.stringify(hivisExample.slice(0, 5), null, 2));

        } catch (e) {
            console.error('Error parsing JSON:', e.message);
            console.log('--- Raw Response Preview ---');
            console.log(data.substring(0, 500));
        }
    });
}).on('error', (e) => {
    console.error('Error fetching:', e.message);
});
