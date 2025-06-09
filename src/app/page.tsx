import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";

// Dynamic imports for better performance and error prevention
const HeroSection = dynamic(() => import("@/components/HeroSection"), {
  ssr: true,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">جاري تحميل المحتوى...</p>
      </div>
    </div>
  ),
});

const ServicesSection = dynamic(() => import("@/components/ServicesSection"), {
  ssr: true,
  loading: () => (
    <div className="h-96 bg-gray-50 animate-pulse rounded-lg mx-4 my-8"></div>
  ),
});

const PortfolioSection = dynamic(
  () => import("@/components/PortfolioSection"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 bg-gray-50 animate-pulse rounded-lg mx-4 my-8"></div>
    ),
  },
);

const WhyChooseUsSection = dynamic(
  () => import("@/components/WhyChooseUsSection"),
  {
    ssr: true,
    loading: () => (
      <div className="h-96 bg-gray-50 animate-pulse rounded-lg mx-4 my-8"></div>
    ),
  },
);

const TestimonialsSection = dynamic(
  () => import("@/components/TestimonialsSection"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 bg-gray-50 animate-pulse rounded-lg mx-4 my-8"></div>
    ),
  },
);

const FAQSection = dynamic(() => import("@/components/FAQSection"), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-50 animate-pulse rounded-lg mx-4 my-8"></div>
  ),
});

const QuoteSection = dynamic(() => import("@/components/QuoteSection"), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gray-50 animate-pulse rounded-lg mx-4 my-8"></div>
  ),
});

export const metadata: Metadata = {
  title: "محترفين الديار - خدمات شاملة في جدة | مظلات، برجولات، سواتر",
  description:
    "محترفين الديار العالمية - خبرة 15 عاماً في جدة. خدمات شاملة: مظلات السيارات، برجولات الحدائق، سواتر الخصوصية، ساندوتش بانل، ترميم الملحقات، تنسيق الحدائق، بيوت الشعر، والخيام الملكية بأعلى معايير الجودة",
  keywords:
    "محترفين الديار، مظلات جدة، برجولات جدة، سواتر جدة، ساندوتش بانل جدة، ترميم جدة، تنسيق حدائق جدة، بيوت شعر، خيام ملكية",
  openGraph: {
    title: "محترفين الديار - خدمات شاملة في جدة",
    description:
      "خبرة 15 عاماً في خدمات المظلات، البرجولات، السواتر، والتصميم في جدة",
    type: "website",
    locale: "ar_SA",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section - القسم الرئيسي */}
      <Suspense
        fallback={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">جاري تحميل القسم الرئيسي...</p>
            </div>
          </div>
        }
      >
        <HeroSection />
      </Suspense>

      {/* Services Section - قسم الخدمات */}
      <Suspense
        fallback={
          <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-96 bg-gray-50 animate-pulse rounded-lg"></div>
            </div>
          </div>
        }
      >
        <ServicesSection />
      </Suspense>

      {/* Portfolio Section - قسم أعمالنا */}
      <Suspense
        fallback={
          <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-96 bg-gray-50 animate-pulse rounded-lg"></div>
            </div>
          </div>
        }
      >
        <PortfolioSection />
      </Suspense>

      {/* Why Choose Us Section - لماذا تختارنا */}
      <Suspense
        fallback={
          <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-96 bg-gray-50 animate-pulse rounded-lg"></div>
            </div>
          </div>
        }
      >
        <WhyChooseUsSection />
      </Suspense>

      {/* Testimonials Section - آراء العملاء */}
      <Suspense
        fallback={
          <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-96 bg-gray-50 animate-pulse rounded-lg"></div>
            </div>
          </div>
        }
      >
        <TestimonialsSection />
      </Suspense>

      {/* FAQ Section - الأسئلة الشائعة */}
      <Suspense
        fallback={
          <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-96 bg-gray-50 animate-pulse rounded-lg"></div>
            </div>
          </div>
        }
      >
        <FAQSection />
      </Suspense>

      {/* Quote Section - طلب عرض سعر */}
      <Suspense
        fallback={
          <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-64 bg-gray-50 animate-pulse rounded-lg"></div>
            </div>
          </div>
        }
      >
        <QuoteSection />
      </Suspense>
    </>
  );
}
