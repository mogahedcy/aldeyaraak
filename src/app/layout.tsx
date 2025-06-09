import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamic imports with proper SSR support
const Navbar = dynamic(() => import("@/components/Navbar"), {
  loading: () => (
    <header className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl font-bold">محترفين الديار العالمية</h1>
      </div>
    </header>
  ),
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="max-w-7xl mx-auto text-center">
        <p>© 2024 محترفين الديار العالمية</p>
      </div>
    </footer>
  ),
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "محترفين الديار العالمية | مظلات، برجولات، سواتر، ساندوتش بانل",
  description:
    "محترفين الديار العالمية - خبرة 15 عاماً في جدة. خدمات شاملة: مظلات السيارات، برجولات الحدائق، سواتر الخصوصية، ساندوتش بانل، ترميم الملحقات، تنسيق الحدائق، بيوت الشعر، والخيام الملكية",
  keywords:
    "محترفين الديار، مظلات جدة، برجولات جدة، سواتر جدة، ساندوتش بانل جدة",
  authors: [{ name: "محترفين الديار العالمية" }],
  robots: "index, follow",
  openGraph: {
    title: "محترفين الديار العالمية - خدمات شاملة في جدة",
    description:
      "خبرة 15 عاماً في خدمات المظلات، البرجولات، السواتر، وتنسيق الحدائق في جدة",
    type: "website",
    locale: "ar_SA",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={notoSansArabic.variable}>
      <body className="font-arabic">
        <div className="flex flex-col min-h-screen">
          <Suspense
            fallback={
              <header className="bg-blue-600 text-white p-4">
                <div className="max-w-7xl mx-auto">
                  <h1 className="text-xl font-bold">محترفين الديار العالمية</h1>
                </div>
              </header>
            }
          >
            <Navbar />
          </Suspense>

          <main className="flex-1">{children}</main>

          <Suspense
            fallback={
              <footer className="bg-gray-800 text-white p-4 mt-8">
                <div className="max-w-7xl mx-auto text-center">
                  <p>© 2024 محترفين الديار العالمية</p>
                </div>
              </footer>
            }
          >
            <Footer />
          </Suspense>
        </div>
      </body>
    </html>
  );
}
