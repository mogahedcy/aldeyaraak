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
  title: "محترفين الديار العالمية",
  description: "خدمات شاملة في جدة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={notoSansArabic.variable}>
      <body className="font-arabic">
        <div className="min-h-screen">
          {/* Temporary simple header */}
          <header className="bg-blue-600 text-white p-4">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-xl font-bold">محترفين الديار العالمية</h1>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1">{children}</main>

          {/* Temporary simple footer */}
          <footer className="bg-gray-800 text-white p-4 mt-8">
            <div className="max-w-7xl mx-auto text-center">
              <p>© 2024 محترفين الديار العالمية - جميع الحقوق محفوظة</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
