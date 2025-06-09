import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

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

// Simple Header Component
function SimpleHeader() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">محترفين الديار العالمية</h1>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <a
              href="tel:+966553719009"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              اتصل الآن
            </a>
            <a
              href="https://wa.me/966553719009"
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              واتساب
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

// Simple Footer Component
function SimpleFooter() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">محترفين الديار العالمية</h3>
            <p className="text-gray-300 leading-relaxed">
              خبرة 15 عاماً في تقديم خدمات شاملة: مظلات، برجولات، سواتر، ساندوتش
              بانل، ترميم، تنسيق حدائق، بيوت شعر، وخيام ملكية في جدة.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">خدماتنا</h4>
            <ul className="space-y-2 text-gray-300">
              <li>مظلات السيارات</li>
              <li>برجولات الحدائق</li>
              <li>سواتر الخصوصية</li>
              <li>ساندوتش بانل</li>
              <li>ترميم الملحقات</li>
              <li>تنسيق الحدائق</li>
              <li>بيوت الشعر</li>
              <li>الخيام الملكية</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
            <div className="space-y-3 text-gray-300">
              <p>📱 +966 55 371 9009</p>
              <p>📧 info@aldeyar.com</p>
              <p>📍 جدة، المملكة العربية السعودية</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 محترفين الديار العالمية - جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={notoSansArabic.variable}>
      <body className="font-arabic">
        <div className="flex flex-col min-h-screen">
          <SimpleHeader />
          <main className="flex-1">{children}</main>
          <SimpleFooter />
        </div>
      </body>
    </html>
  );
}
