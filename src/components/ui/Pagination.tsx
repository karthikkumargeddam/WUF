import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    hasNextPage: boolean;
    baseUrl: string;
    extraParams?: Record<string, string | number | boolean | undefined>;
}

const Pagination = ({ currentPage, hasNextPage, baseUrl, extraParams }: PaginationProps) => {
    const createHref = (page: number) => {
        const params = new URLSearchParams();
        params.set('page', page.toString());

        if (extraParams) {
            Object.entries(extraParams).forEach(([key, value]) => {
                if (value !== undefined) {
                    params.set(key, value.toString());
                }
            });
        }

        return `${baseUrl}?${params.toString()}`;
    };

    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = hasNextPage ? currentPage + 1 : null;

    return (
        <div className="flex justify-center items-center space-x-2 mt-12">
            {prevPage ? (
                <Link
                    href={createHref(prevPage)}
                    className="p-2 border border-zinc-300 rounded-md hover:bg-zinc-100 text-zinc-600 transition-colors"
                >
                    <ChevronLeft size={20} />
                </Link>
            ) : (
                <button disabled className="p-2 border border-zinc-200 rounded-md text-zinc-300 cursor-not-allowed">
                    <ChevronLeft size={20} />
                </button>
            )}

            <span className="px-4 py-2 text-zinc-900 font-medium">
                Page {currentPage}
            </span>

            {nextPage ? (
                <Link
                    href={createHref(nextPage)}
                    className="p-2 border border-zinc-300 rounded-md hover:bg-zinc-100 text-zinc-600 transition-colors"
                >
                    <ChevronRight size={20} />
                </Link>
            ) : (
                <button disabled className="p-2 border border-zinc-200 rounded-md text-zinc-300 cursor-not-allowed">
                    <ChevronRight size={20} />
                </button>
            )}
        </div>
    );
};

export default Pagination;
