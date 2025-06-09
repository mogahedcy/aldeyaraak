import { Metadata } from "next";
import Link from "next/link";

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 space-x-reverse bg-blue-600/10 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <span>⭐</span>
              <span>محترفين الديار العالمية - خبرة 15 عاماً في جدة</span>
              <span>⭐</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              محترفين الديار العالمية{" "}
              <span className="text-blue-600">خدمات شاملة متكاملة</span>
              <br />
              لجميع احتياجاتك في جدة
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              خبرة 15 عاماً في تقديم خدمات شاملة: مظلات السيارات، البرجولات
              الفاخرة، السواتر العالية، ساندوتش بانل المتقدم، ترميم الملحقات،
              تنسيق الحدائق، بيوت الشعر التراثية، والخيام الملكية بأعلى معايير
              الجودة والتميز في جدة
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="https://wa.me/+966553719009"
                className="inline-flex items-center space-x-3 space-x-reverse bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>💬</span>
                <span>استشارة مجانية عبر واتساب</span>
              </Link>

              <Link
                href="tel:+966553719009"
                className="inline-flex items-center space-x-3 space-x-reverse border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
              >
                <span>📞</span>
                <span>اتصال مباشر: 966553719009+</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              خدمات محترفين الديار الشاملة في جدة
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نقدم 8 خدمات متخصصة ومتكاملة بأعلى معايير الجودة والحرفية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "مظلات السيارات",
                description: "مظلات عالية الجودة لحماية المركبات",
                icon: "🚗",
                color: "bg-blue-50 text-blue-600",
              },
              {
                title: "برجولات الحدائق",
                description: "برجولات فاخرة للمساحات الخارجية",
                icon: "🌳",
                color: "bg-green-50 text-green-600",
              },
              {
                title: "سواتر الخصوصية",
                description: "سواتر متنوعة لضمان الخصوصية",
                icon: "🛡️",
                color: "bg-purple-50 text-purple-600",
              },
              {
                title: "ساندوتش بانل",
                description: "ساندوتش بانل عالي الجودة",
                icon: "🏢",
                color: "bg-orange-50 text-orange-600",
              },
              {
                title: "ترميم الملحقات",
                description: "خدمات ترميم شاملة ومتخصصة",
                icon: "🔧",
                color: "bg-teal-50 text-teal-600",
              },
              {
                title: "تنسيق الحدائق",
                description: "تصميم وتنسيق المساحات الخضراء",
                icon: "🌺",
                color: "bg-emerald-50 text-emerald-600",
              },
              {
                title: "بيوت الشعر",
                description: "بيوت شعر تراثية أصيلة",
                icon: "🏕️",
                color: "bg-amber-50 text-amber-600",
              },
              {
                title: "الخيام الملكية",
                description: "خيام فاخرة للمناسبات",
                icon: "👑",
                color: "bg-rose-50 text-rose-600",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${service.color} text-2xl mb-4`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  href={`/services/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  تفاصيل أكثر ←
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              أحدث أعمال محترفين الديار في جدة
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              استكشف أحدث مشاريعنا المتميزة في جدة والمناطق المحيطة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "مظلة سيارات فيلا فاخرة",
                description:
                  "تصميم وتنفيذ مظلة سيارات عصرية لفيلا سكنية في حي الروضة",
                category: "مظلات",
                location: "جدة - حي الروضة",
              },
              {
                title: "برجولة حديقة منزلية",
                description: "برجولة خشبية أنيقة لحديقة منزلية مع إضاءة LED",
                category: "برجولات",
                location: "جدة - حي النزهة",
              },
              {
                title: "ساتر خصوصية لل��ديقة",
                description: "ساتر حديدي مزخرف لضمان الخصوصية مع لمسة جمالية",
                category: "سواتر",
                location: "جدة - حي الصفا",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-center text-blue-600">
                    <div className="text-4xl mb-2">📸</div>
                    <p className="text-sm">صورة المشروع</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span>📍</span>
                    <span className="mr-2">{project.location}</span>
                  </div>
                  <Link
                    href={`/portfolio/${index + 1}`}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    عرض التفاصيل
                    <span className="mr-2">←</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <span>مشاهدة جميع الأعمال</span>
              <span className="mr-2">←</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            هل لديك مشروع جديد؟
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            تواصل معنا الآن للحصول على استشارة مجانية وعرض سعر مخصص لمشروعك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://wa.me/+966553719009"
              className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>💬</span>
              <span className="mr-2">واتساب فوري</span>
            </Link>
            <Link
              href="tel:+966553719009"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <span>📞</span>
              <span className="mr-2">اتصل الآن</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
