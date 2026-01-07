import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
    return (
        <div className="bg-white min-h-screen py-24 md:py-32">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Sidebar Skeleton */}
                    <div className="lg:w-80 space-y-8">
                        <Skeleton className="h-40 w-full rounded-[2.5rem]" />
                        <Skeleton className="h-60 w-full rounded-[2.5rem]" />
                    </div>

                    {/* Content Skeleton */}
                    <div className="flex-1">
                        <div className="flex justify-between items-end mb-12">
                            <div className="space-y-4">
                                <Skeleton className="h-16 w-64" />
                                <Skeleton className="h-4 w-40" />
                            </div>
                            <Skeleton className="h-12 w-48 rounded-2xl" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="space-y-6">
                                    <Skeleton className="w-full aspect-square rounded-[2.5rem]" />
                                    <div className="space-y-2 px-4">
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                        <Skeleton className="h-8 w-24 rounded-xl mt-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
