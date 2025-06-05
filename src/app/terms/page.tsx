import type { Metadata } from 'next'
import { FileText, Users, Shield, AlertCircle, CheckCircle, Scale, Handshake, Clock, DollarSign } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'شروط الخدمة | مؤسسة الديار العالمية - اتفاقية الاستخدام',
  description: 'شروط وأحكام استخدام خدمات مؤسسة الديار العالمية. تعرف على حقوقك وواجباتك عند التعامل معنا.',
  openGraph: {
    title: 'شروط الخدمة | مؤسسة الديار العالمية',
    description: 'شروط وأحكام استخدام خدمات مؤسسة الديار العالمية',
    url: 'https://aldeyarksa.tech/terms',
  },
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-background to-accent/5">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
                <Scale className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                شروط الخدمة
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام خدماتنا
              </p>
              <div className="text-sm text-muted-foreground mt-4">
                تاريخ آخر تحديث: 1 ديسمبر 2024
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
              {/* قبول الشروط */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h2 className="text-2xl font-bold text-foreground">1. قبول الشروط</h2>
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    باستخدام موقعنا الإلكتروني أو طلب خدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. 
                    إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام خدماتنا.
                  </p>
                </div>
              </section>

              {/* الخدمات المقدمة */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-foreground">2. الخدمات المقدمة</h2>
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>نقدم الخدمات التالية:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>تصميم وتركيب مظلات السيارات</li>
                    <li>تصميم وتنفيذ برجولات الحدائق</li>
                    <li>تركيب سواتر الخصوصية</li>
                    <li>تركيب ألواح الساندوتش بانل</li>
                    <li>ترميم وصيانة الملحقات</li>
                    <li>تنسيق الحدائق والمساحات الخضراء</li>
                    <li>بناء بيوت الشعر التراثية</li>
                    <li>تأجير الخيام الملكية للمناسبات</li>
                  </ul>
                </div>
              </section>

              {/* التزامات العميل */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-foreground">3. التزامات العميل</h2>
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">تقديم معلومات دقيقة</h3>
                    <p>يلتزم العميل بتقديم معلومات صحيحة ودقيقة عن المشروع والموقع المطلوب تنفيذ الخدمة فيه.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">إتاحة الموقع</h3>
                    <p>يجب على العميل إتاحة الموقع للفريق التقني في الأوقات المتفق عليها.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">السداد</h3>
                    <p>الالتزام بجدول الدفعات المتفق عليه في العقد.</p>
                  </div>
                </div>
              </section>

              {/* الأسعار والدفع */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <h2 className="text-2xl font-bold text-foreground">4. الأسعار والدفع</h2>
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">الأسعار</h3>
                    <p>الأسعار المعروضة على الموقع استرشادية وقابلة للتغيير. السعر النهائي يحدد بعد الكشف والمعاينة.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">طرق الدفع</h3>
                    <p>نقبل الدفع نقداً، أو بالتحويل البنكي، أو بالتقسيط حسب الاتفاق.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">الضرائب</h3>
                    <p>جميع الأسعار تشمل ضريبة القيمة المضافة 15%.</p>
                  </div>
                </div>
              </section>

              {/* الضمانات */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-foreground">5. الضمانات</h2>
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>نقدم ضمانات متنوعة حسب نوع الخدمة:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>ضمان التركيب: سنة واحدة</li>
                    <li>ضمان المواد: حسب نوع المادة (3-10 سنوات)</li>
                    <li>ضمان الصيانة: 6 أشهر على أعمال الصيانة</li>
                  </ul>
                </div>
              </section>

              {/* المسؤولية */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                  <h2 className="text-2xl font-bold text-foreground">6. حدود المسؤولية</h2>
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    مسؤوليتنا محدودة بقيمة الخدمة المقدمة. لا نتحمل مسؤولية الأضرار غير المباشرة أو 
                    الأضرار الناتجة عن سوء الاستخدام أو عدم اتباع تعليمات الصيانة.
                  </p>
                </div>
              </section>

              {/* إلغاء الخدمة */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-red-600" />
                  <h2 className="text-2xl font-bold text-foreground">7. إلغاء الخدمة</h2>
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">إلغاء من قبل العميل</h3>
                    <p>يمكن إلغاء الخدمة قبل بدء التنفيذ بـ 48 ساعة دون رسوم. بعد بدء التنفيذ، يتم تحصيل رسوم بحسب المراحل المنجزة.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">إلغاء من جانبنا</h3>
                    <p>نحتفظ بحق إلغاء الخدمة في حالة عدم التزام العميل بالشروط المتفق عليها.</p>
                  </div>
                </div>
              </section>

              {/* القانون المعمول به */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-foreground">8. القانون المعمول به</h2>
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    تخضع هذه الشروط والأحكام لقوانين المملكة العربية السعودية. 
                    أي نزاع ينشأ عن هذه الاتفاقية يحل عبر المحاكم المختصة في جدة.
                  </p>
                </div>
              </section>

              {/* تعديل الشروط */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Handshake className="w-6 h-6 text-green-600" />
                  <h2 className="text-2xl font-bold text-foreground">9. تعديل الشروط</h2>
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    نحتفظ بحق تعديل هذه الشروط والأحكام في أي وقت. سيتم إشعار العملاء بأي تغييرات 
                    من خلال الموقع الإلكتروني أو البريد الإلكتروني.
                  </p>
                </div>
              </section>

              {/* معلومات الاتصال */}
              <section className="bg-accent/5 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">معلومات الاتصال</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>للاستفسارات حول هذه الشروط والأحكام، يمكنك التواصل معنا:</p>
                  <ul className="list-none space-y-2">
                    <li><strong>الهاتف:</strong> +966 12 123 4567</li>
                    <li><strong>البريد الإلكتروني:</strong> info@aldeyarksa.tech</li>
                    <li><strong>العنوان:</strong> جدة، المملكة العربية السعودية</li>
                  </ul>
                </div>
              </section>
            </div>

            {/* روابط ذات صلة */}
            <div className="text-center mt-12">
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  href="/privacy"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  سياسة الخصوصية
                </Link>
                <Link
                  href="/contact"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  اتصل بنا
                </Link>
                <Link
                  href="/"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  العودة للرئيسية
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}