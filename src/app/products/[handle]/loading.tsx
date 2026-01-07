import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
    return (
        <div className="bg-white min-h-screen py-12 md:py-20 lg:py-32">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    {/* Image Gallery Skeleton */}
                    <div className="lg:w-1/2 space-y-6">
                        <Skeleton className="w-full aspect-square rounded-[3rem]" />
                        <div className="grid grid-cols-4 gap-4">
                            {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="aspect-square rounded-2xl" />
                            ))}
                        </div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="lg:w-1/2 space-y-8">
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-12 w-48" />
                        </div>

                        <div className="space-y-6 pt-8 border-t border-zinc-100">
                            <Skeleton className="h-8 w-24" />
                            <div className="flex gap-4">
                                {[...Array(4)].map((_, i) => (
                                    <Skeleton key={i} className="h-12 w-12 rounded-full" />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 pt-12">
                            <Skeleton className="h-16 w-full rounded-2xl" />
                            <Skeleton className="h-16 w-full rounded-2xl" />
                        </div>

                        <div className="pt-12">
                            <Skeleton className="h-40 w-full rounded-[2.5rem]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
