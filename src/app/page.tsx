import { Suspense } from 'react';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import TrendingProducts from '@/components/home/TrendingProducts';
import HomeBanner from '@/components/home/HomeBanner';
import OffersSection from '@/components/home/OffersSection';
import ServiceBar from '@/components/home/ServiceBar';
import ChatWidget from '@/components/chat/ChatWidget';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel */}
      <HomeBanner />

      {/* Quick Service Links */}
      <ServiceBar />

      {/* Deals & Offers */}
      <OffersSection />

      {/* Suspended Sections */}
      <Suspense fallback={
        <div className="py-32 container mx-auto px-4">
          <div className="h-10 w-48 bg-zinc-800 rounded-lg animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => <div key={i} className="aspect-[4/5] bg-zinc-900 rounded-[2rem] animate-pulse" />)}
          </div>
        </div>
      }>
        <FeaturedCollections />
      </Suspense>

      <Suspense fallback={
        <div className="py-32 container mx-auto px-4">
          <div className="h-10 w-48 bg-zinc-800 rounded-lg animate-pulse mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => <div key={i} className="aspect-[3/4] bg-zinc-900 rounded-[2rem] animate-pulse" />)}
          </div>
        </div>
      }>
        <TrendingProducts />
      </Suspense>

      {/* Chat Bot */}
      <ChatWidget />
    </div>
  );
}
