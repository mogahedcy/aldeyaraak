import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import FAQSection from '@/components/FAQSection';
import QuoteSection from '@/components/QuoteSection';
import BlogSection from '@/components/BlogSection';
import ServiceAreasSection from '@/components/ServiceAreasSection';
import { Metadata } from 'next';

// Dynamic imports لتحسين الأداء
const DynamicTestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg"></div>,
  ssr: true
});

const DynamicFAQSection = dynamic(() => import('@/components/FAQSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg"></div>,
  ssr: true
});

const DynamicBlogSection = dynamic(() => import('@/components/BlogSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg"></div>,
  ssr: true
});

export const metadata: Metadata = {
  title: 'محترفين الديار - خدمات شاملة في جدة | مظلات، برجولات، سواتر، ساندوتش بانل',
  description: 'محترفين الديار العالمية - خبرة 15 عاماً في جدة. خدمات شاملة: مظلات السيارات، برجولات الحدائق، سواتر الخصوصية، ساندوتش بانل، ترميم الملحقات، تنسيق الحدائق، بيوت الشعر، والخيام الملكية بأعلى معايير الجودة',
  keywords: 'محترفين الديار، مظلات جدة، برجولات جدة، سواتر جدة، ساندوتش بانل جدة، ترميم جدة، تنسيق حدائق جدة، بيوت شعر، خيام ملكية',
  authors: [{ name: 'محترفين الديار' }],
  openGraph: {
    title: 'محترفين الديار - خدمات شاملة في جدة',
    description: 'خبرة 15 عاماً في خدمات المظلات، البرجولات، السواتر، الساندوتش بانل، الترميم، تنسيق الحدائق، بيوت الشعر، والخيام الملكية في جدة',
    type: 'website',
    locale: 'ar_SA',
  },
  alternates: {
    canonical: 'https://yourdomain.com',
  },
};

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "محترفين الديار العالمية",
  "description": "خدمات شاملة في جدة: مظلات، برجولات، سواتر، ساندوتش بانل، ترميم، تنسيق حدائق، بيوت شعر، خيام ملكية",
  "url": "https://yourdomain.com",
  "telephone": "+966553719009",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "جدة",
    "addressCountry": "SA"
  },
  "sameAs": [
    "https://wa.me/+966553719009"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "خدمات محترفين الديار",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "مظلات السيارات",
          "description": "تركيب مظلات سيارات عالية الجودة في جدة"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "برجولات الحدائق",
          "description": "تصميم وتنفيذ برجولات فاخرة للحدائق"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "سواتر الخصوصية",
          "description": "تركيب سواتر متنوعة لضمان الخصوصية"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "ساندوتش بانل",
          "description": "توريد وتركيب ساندوتش بانل عالي الجودة"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "ترميم الملحقات",
          "description": "خدمات ترميم شاملة للفلل والمنازل"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "تنسيق الحدائق",
          "description": "تصميم وتنسيق الحدائق بأسلوب احترافي"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "بيوت الشعر",
          "description": "تصنيع بيوت شعر تراثية أصيلة"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "الخيام الملكية",
          "description": "خيام فاخرة للمناسبات والاستراحات"
        }
      }
    ]
  }
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Main Content */}
      <div className="min-h-screen">
        {/* Hero Section - القسم الرئيسي */}
        <HeroSection />

        {/* Services Section - قسم الخدمات */}
        <ServicesSection />

        {/* Portfolio Section - قسم أعمالنا */}
        <Suspense fallback={
          <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-96 bg-gray-50 animate-pulse rounded-lg"></div>
            </div>
          </div>
        }>
          <PortfolioSection />
        </Suspense>

        {/* Why Choose Us Section - لماذا تختارنا */}
        <WhyChooseUsSection />

        {/* Service Areas Section - مناطق الخدمة */}
        <ServiceAreasSection />

        {/* Testimonials Section - آراء العملاء */}
        <Suspense fallback={
          <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-96 bg-gray-50 animate-pulse rounded-lg"></div>
            </div>
          </div>
        }>
          <DynamicTestimonialsSection />
        </Suspense>

        {/* FAQ Section - الأسئلة الشائعة */}
        <Suspense fallback={
          <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-96 bg-gray-50 animate-pulse rounded-lg"></div>
            </div>
          </div>
        }>
          <DynamicFAQSection />
        </Suspense>

        {/* Blog Section - أحدث المقالات */}
        <Suspense fallback={
          <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-96 bg-gray-50 animate-pulse rounded-lg"></div>
            </div>
          </div>
        }>
          <DynamicBlogSection />
        </Suspense>

        {/* Quote Section - طلب عرض سعر */}
        <QuoteSection />
      </main>
    </>
  );
}