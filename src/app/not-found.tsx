import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-zinc-900 mb-4">404</h1>
                <h2 className="text-2xl font-bold text-zinc-700 mb-6">Page Not Found</h2>
                <p className="text-zinc-500 mb-8 max-w-md">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-zinc-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-zinc-800 transition-colors"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
}
