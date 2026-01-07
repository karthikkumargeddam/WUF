import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-12 space-y-8">
            {/* Hero Skeleton */}
            <Skeleton className="w-full h-[400px] rounded-[3rem]" />

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="w-full aspect-square rounded-[2rem]" />
                        <Skeleton className="w-2/3 h-6" />
                        <Skeleton className="w-1/2 h-4" />
                    </div>
                ))}
            </div>
        </div>
    );
}
