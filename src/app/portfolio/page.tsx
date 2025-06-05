import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PortfolioPageClient from './PortfolioPageClient';

export const metadata: Metadata = {
  title: 'معرض الأعمال - محترفين الديار العالمية',
  description: 'استعرض مجموعة شاملة من مشاريعنا المميزة في مجال تنسيق الحدائق والمظلات والبرجولات وأعمال الترميم في جدة والمنطقة الغربية',
  keywords: 'معرض الأعمال, مشاريع محترفين الديار العالمية, تنسيق حدائق, مظلات, برجولات, ترميم, جدة',
  openGraph: {
    title: 'معرض الأعمال - محترفين الديار العالمية',
    description: 'استعرض مجموعة شاملة من مشاريعنا المميزة في مجال تنسيق الحدائق والمظلات والبرجولات',
    images: ['/images/portfolio-hero.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'معرض الأعمال - محترفين الديار العالمية',
    description: 'استعرض مجموعة شاملة من مشاريعنا المميزة',
    images: ['/images/portfolio-hero.jpg'],
  },
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* الهيدر */}
      <Navbar />

      {/* محتوى الصفحة */}
      <main className="flex-1">
        <PortfolioPageClient />
      </main>

      {/* الفوتر */}
      <Footer />
    </div>
  );
}
