import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import StructuredDataScript from "@/components/StructuredDataScript";
import ErrorBoundary from "@/components/ErrorBoundary";

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "محترفين الديار العالمية | مظلات، برجولات، سواتر، ساندوتش بانل، ترميم، تنسيق حدائق جدة",
  description:
    "محترفين الديار العالمية - شركة متخصصة في جدة تقدم خدمات شاملة: مظلات سيارات، برجولات حدائق، سواتر خصوصية، ساندوتش بانل، ترميم ملحقات، تنسيق حدائق، بيوت شعر تراثية، وخيام ملكية. خبرة 15 عاماً في تصميم وتنفيذ المشاريع بأعلى معايير الجودة في جدة والمملكة العربية السعودية.",
  keywords:
    "محترفين الديار العالمية، محترفين الديار جدة، مظلات سيارات جدة، برجولات حدائق جدة، سواتر خصوصية جدة، ساندوتش بانل جدة، ترميم ملحقات جدة، تنسيق حدائق جدة، بيوت شعر جدة، خيام ملكية جدة، مقاولات جدة، تركيب مظلات، تركيب برجولات، تركيب سواتر، أعمال معادن جدة، تنسيق مساحات خارجية",
  authors: [{ name: "محترفين الديار العالمية" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://aldeyarksa.tech",
    languages: {
      "ar-SA": "https://aldeyarksa.tech",
    },
  },
  openGraph: {
    title: "محترفين الديار العالمية - خدمات شاملة في جدة",
    description: "شركة متخصصة في المظلات، البرجولات، السواتر، وتنسيق الحدائق في جدة",
    url: "https://aldeyarksa.tech",
    siteName: "محترفين الديار العالمية",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "https://aldeyarksa.tech/favicon.svg",
        width: 1200,
        height: 630,
        alt: "محترفين الديار العالمية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "محترفين الديار العالمية",
    description: "خدمات شاملة في المظلات والبرجولات والسواتر في جدة",
    images: ["https://aldeyarksa.tech/favicon.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "محترفين الديار العالمية",
  image: "https://aldeyarksa.tech/images/og-image.jpg",
  "@id": "https://aldeyarksa.tech",
  url: "https://aldeyarksa.tech",
  telephone: "+966555555555",
  address: {
    "@type": "PostalAddress",
    streetAddress: "جدة",
    addressLocality: "جدة",
    addressRegion: "مكة",
    postalCode: "22233",
    addressCountry: "SA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 21.485811,
    longitude: 39.192505,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "16:00",
      closes: "22:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/aldeyar.jeddah",
    "https://www.instagram.com/aldeyar.jeddah",
    "https://twitter.com/aldeyar_jeddah",
  ],
  description:
    "محترفين الديار العالمية - شركة متخصصة في جدة تقدم خدمات شاملة: مظلات سيارات، برجولات حدائق، سواتر خصوصية، ساندوتش بانل، ترميم ملحقات، تنسيق حدائق، بيوت شعر تراثية، وخيام ملكية. خبرة 15 عاماً في تصميم وتنفيذ المشاريع بأعلى معايير الجودة في جدة والمملكة العربية السعودية.",
  priceRange: "SAR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={notoSansArabic.variable}>
      <head>
        <link rel="canonical" href="https://aldeyarksa.tech" />
        <StructuredDataScript data={structuredData} />
      </head>
      <body className="font-arabic">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}