import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '250';
    const page = searchParams.get('page') || '1';

    try {
        const targetUrl = `https://wearunifab.com/products.json?limit=${limit}&page=${page}`;
        const response = await fetch(targetUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`Upstream API responded with ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Proxy Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products from upstream' },
            { status: 500 }
        );
    }
}
