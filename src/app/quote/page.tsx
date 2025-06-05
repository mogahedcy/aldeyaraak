import type { Metadata } from 'next'
import {
  Calculator,
  FileText,
  Send,
  CheckCircle,
  Clock,
  Star,
  Phone,
  MessageCircle,
  User,
  Mail,
  Home,
  Ruler,
  MessageSquare,
  DollarSign,
  Shield,
  Award
} from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'طلب عرض سعر | مؤسسة الديار العالمية - احصل على عرض مجاني',
  description: 'احصل على عرض سعر مجاني ومفصل من مؤسسة الديار العالمية في جدة. أسعار تنافسية، جودة عالية، وضمان شامل على جميع الخدمات.',
  openGraph: {
    title: 'طلب عرض سعر | مؤسسة الديار العالمية',
    description: 'احصل على عرض سعر مجاني ومفصل من مؤسسة الديار العالمية في جدة.',
    type: 'website',
    locale: 'ar_SA'
  }
}

const services = [
  { id: 'mazallat', name: 'مظلات سيارات', price: 'تبدأ من 150 ريال/م²' },
  { id: 'sawater', name: 'سواتر خصوصية', price: 'تبدأ من 120 ريال/م²' },
  { id: 'pergolas', name: 'برجولات حدائق', price: 'تبدأ من 200 ريال/م²' },
  { id: 'khayyam', name: 'خيام ملكية', price: 'تبدأ من 300 ريال/م²' },
  { id: 'byoot-shaar', name: 'بيوت شعر', price: 'تبدأ من 250 ريال/م²' },
  { id: 'sandwich-panel', name: 'ساندوتش بانل', price: 'تبدأ من 165 ريال/م²' },
  { id: 'landscaping', name: 'تنسيق حدائق', price: 'حسب المشروع' },
  { id: 'renovation', name: 'ترميم ملحقات', price: 'تبدأ من 180 ريال/م²' }
];

const whyChooseUs = [
  {
    title: 'عروض أسعار مجانية',
    description: 'نقدم عروض أسعار مفصلة ومجانية بدون أي التزام',
    icon: FileText
  },
  {
    title: 'أسعار تنافسية',
    description: 'أفضل الأسعار في السوق مع جودة لا تقبل المساومة',
    icon: DollarSign
  },
  {
    title: 'شفافية كاملة',
    description: 'لا توجد رسوم خفية، كل شيء واضح ومفصل',
    icon: CheckCircle
  },
  {
    title: 'ضمان شامل',
    description: 'ضمان 5 سنوات على جميع أعمالنا',
    icon: Shield
  }
];

const pricingFeatures = [
  'تقييم مجاني للموقع',
  'استشارة فنية متخصصة',
  'عرض سعر مفصل وشفاف',
  'جدولة زمنية واضحة',
  'ضمان شامل على الأعمال',
  'خدمة ما بعد البيع',
  'فريق عمل محترف',
  'أفضل المواد والخامات'
];

export default function QuotePage() {
  const whatsappMessage = "السلام عليكم، أريد طلب عرض سعر مفصل."
  const whatsappURL = `https://wa.me/966553719009?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "طلب عرض سعر - مؤسسة الديار العالمية",
            "description": "احصل على عرض سعر مجاني ومفصل لجميع خدماتنا",
            "provider": {
              "@type": "LocalBusiness",
              "name": "مؤسسة الديار العالمية",
              "telephone": "+966553719009",
              "email": "info@aldeyar-jeddah.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "جدة",
                "addressCountry": "SA"
              }
            },
            "areaServed": "جدة",
            "offers": {
              "@type": "Offer",
              "description": "عرض سعر مجاني",
              "price": "0",
              "priceCurrency": "SAR"
            }
          })
        }}
      />

      <Navbar />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav className="flex justify-center items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-8">
              <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
              <span>/</span>
              <span className="text-primary font-medium">طلب عرض سعر</span>
            </nav>

            <Calculator className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              احصل على عرض سعر مجاني
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              عرض سعر مفصل وشفاف خلال 24 ساعة. استشارة مجانية وبدون أي التزام من جانبكم
            </p>

            <div className="mt-8 flex justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                عرض سعر مجاني
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-green-600 mr-2" />
                رد خلال 24 ساعة
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-green-600 mr-2" />
                استشارة متخصصة
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">لماذا تختار عروض أسعارنا؟</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((feature, index) => (
                <div key={`why-choose-${feature.title}-${index}`} className="text-center">
                  <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">

              {/* Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <FileText className="w-6 h-6 text-primary mr-3" />
                    نموذج طلب عرض السعر
                  </h2>

                  <form className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات التواصل</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            الاسم الكامل *
                          </label>
                          <div className="relative">
                            <User className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              required
                              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="أدخل اسمك الكامل"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            رقم الهاتف *
                          </label>
                          <div className="relative">
                            <Phone className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                              type="tel"
                              required
                              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="05xxxxxxxx"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            البريد الإلكتروني
                          </label>
                          <div className="relative">
                            <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                              type="email"
                              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="example@email.com"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            المنطقة/الحي *
                          </label>
                          <div className="relative">
                            <Home className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              required
                              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="حي السلامة، جدة"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Service Selection */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل الخدمة</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          نوع الخدمة المطلوبة *
                        </label>
                        <select
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">اختر نوع الخدمة</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.name} - {service.price}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل المشروع</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            المساحة المطلوبة (متر مربع)
                          </label>
                          <div className="relative">
                            <Ruler className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                              type="number"
                              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="مثال: 50"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            الميزانية التقريبية
                          </label>
                          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option value="">اختر الميزانية</option>
                            <option value="5000-10000">5,000 - 10,000 ريال</option>
                            <option value="10000-20000">10,000 - 20,000 ريال</option>
                            <option value="20000-50000">20,000 - 50,000 ريال</option>
                            <option value="50000+">أكثر من 50,000 ريال</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          الموعد المفضل لزيارة الموقع
                        </label>
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            type="date"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option value="">اختر الوقت</option>
                            <option value="morning">صباحاً (8:00 - 12:00)</option>
                            <option value="afternoon">ظهراً (12:00 - 4:00)</option>
                            <option value="evening">مساءً (4:00 - 6:00)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        تفاصيل إضافية عن المشروع *
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                        <textarea
                          rows={4}
                          required
                          className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                          placeholder="اكتب تفاصيل المشروع: نوع التصميم المطلوب، الألوان المفضلة، أي متطلبات خاصة، إلخ..."
                        />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <label htmlFor="terms" className="mr-2 text-sm text-gray-700">
                        أوافق على <Link href="/terms" className="text-primary hover:underline">شروط الخدمة</Link> و
                        <Link href="/privacy" className="text-primary hover:underline"> سياسة الخصوصية</Link>
                      </label>
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-4 text-lg">
                      <Send className="w-5 h-5 mr-2" />
                      إرسال طلب عرض السعر
                    </Button>
                  </form>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">

                {/* Quick Contact */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    تفضل التواصل المباشر؟
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    تواصل معنا مباشرة للحصول على عرض سعر فوري
                  </p>
                  <div className="space-y-3">
                    <Link href="tel:+966553719009" className="block">
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        <Phone className="w-5 h-5 mr-2" />
                        اتصل الآن: 9009 371 55 966+
                      </Button>
                    </Link>
                    <Link href={whatsappURL} target="_blank" className="block">
                      <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        واتساب مباشر
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* What's Included */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Award className="w-6 h-6 text-primary mr-3" />
                    ما يشمله عرض السعر
                  </h3>
                  <div className="space-y-3">
                    {pricingFeatures.map((feature) => (
                      <div key={`pricing-feature-${feature}`} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services Quick View */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    خدماتنا والأسعار
                  </h3>
                  <div className="space-y-3">
                    {services.slice(0, 4).map((service) => (
                      <div key={service.id} className="border-b border-gray-100 pb-2 last:border-b-0">
                        <div className="font-medium text-gray-900 text-sm">{service.name}</div>
                        <div className="text-primary text-xs">{service.price}</div>
                      </div>
                    ))}
                    <Link href="/#services" className="block text-center">
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        عرض جميع الخدمات
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-white">
                  <h3 className="text-xl font-bold mb-3">
                    زمن الاستجابة
                  </h3>
                  <div className="space-y-2 text-sm opacity-90">
                    <p>⚡ رد فوري عبر الهاتف/واتساب</p>
                    <p>📧 عرض سعر مفصل خلال 24 ساعة</p>
                    <p>📋 معاينة الموقع خلال 48 ساعة</p>
                    <p>🚀 بداية التنفيذ حسب الاتفاق</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                كيف نعمل؟
              </h2>
              <p className="text-xl text-gray-600">
                عملية بسيطة وسريعة للحصول على عرض السعر وتنفيذ المشروع
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">طلب العرض</h3>
                <p className="text-gray-600 text-sm">املأ النموذج أو اتصل بنا مباشرة</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">معاينة الموقع</h3>
                <p className="text-gray-600 text-sm">زيارة مجانية للموقع وأخذ المقاسات</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">عرض السعر</h3>
                <p className="text-gray-600 text-sm">عرض مفصل وشفاف مع الجدولة الزمنية</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">التنفيذ</h3>
                <p className="text-gray-600 text-sm">بداية العمل وفقاً للجدولة المتفق عليها</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
