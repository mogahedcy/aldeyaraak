
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReviewsPageClient from './ReviewsPageClient';

export const metadata: Metadata = {
  title: 'تقييمات ومراجعات العملاء - محترفين الديار العالمية',
  description: 'اطلع على تقييمات ومراجعات عملائنا الكرام حول مشاريعنا في تنسيق الحدائق والمظلات والبرجولات',
  keywords: 'تقييمات العملاء, مراجعات المشاريع, آراء العملاء, محترفين الديار العالمية',
  openGraph: {
    title: 'تقييمات ومراجعات العملاء - محترفين الديار العالمية',
    description: 'اطلع على تقييمات ومراجعات عملائنا الكرام حول مشاريعنا',
    images: ['/images/reviews-hero.jpg'],
    type: 'website',
  },
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ReviewsPageClient />
      </main>
      <Footer />
    </div>
  );
}
