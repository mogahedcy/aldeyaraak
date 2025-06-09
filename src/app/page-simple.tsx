export default function SimpleHomePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            مؤسسة الديار العالمية
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            خبرة 15 عاماً في خدمات المظلات والسواتر في جدة
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">مظلات السيارات</h3>
              <p className="text-gray-600">حماية سيارتك من العوامل الجوية</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">برجولات الحدائق</h3>
              <p className="text-gray-600">أضف لمسة جمالية لحديقتك</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">سواتر الخصوصية</h3>
              <p className="text-gray-600">احم خصوصيتك بأناقة</p>
            </div>
          </div>
          <div className="mt-12">
            <a
              href="tel:+966553719009"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              اتصل الآن: 9009 371 55 966+
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
