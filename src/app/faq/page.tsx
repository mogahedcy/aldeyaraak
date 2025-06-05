import type { Metadata } from 'next'
import {
  HelpCircle,
  ArrowLeft,
  Clock,
  DollarSign,
  Truck,
  Shield,
  MessageCircle,
  Phone,
  Search
} from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'الأسئلة الشائعة | مؤسسة الديار العالمية - إجابات شاملة',
  description: 'إجابات شاملة على الأسئلة الشائعة حول خدمات مؤسسة الديار العالمية في جدة. المظلات، السواتر، الأسعار، الضمان والمزيد.',
  openGraph: {
    title: 'الأسئلة الشائعة | مؤسسة الديار العالمية',
    description: 'إجابات شاملة على الأسئلة الشائعة حول خدمات مؤسسة الديار العالمية في جدة.',
    type: 'website',
    locale: 'ar_SA'
  }
}

const faqCategories = [
  {
    title: 'الخدمات العامة',
    icon: HelpCircle,
    color: 'bg-blue-100 text-blue-600',
    faqs: [
      {
        question: 'ما هي الخدمات التي تقدمونها؟',
        answer: 'نقدم مجموعة شاملة من الخدمات تشمل: تصميم وتركيب المظلات، السواتر الخصوصية، البرجولات، الخيام الملكية، بيوت الشعر التراثية، ساندوتش بانل، تنسيق الحدائق، وترميم الملحقات. جميع خدماتنا متوفرة في جدة وضواحيها.'
      },
      {
        question: 'هل تقدمون خدمات في جميع مناطق جدة؟',
        answer: 'نعم، نقدم خدماتنا في جميع أحياء ومناطق جدة الكبرى، بما في ذلك شمال وجنوب وشرق وغرب جدة، بالإضافة إلى المناطق المجاورة. فريقنا جاهز للوصول إليكم أينما كنتم.'
      },
      {
        question: 'هل تقدمون استشارة مجانية؟',
        answer: 'نعم، نقدم استشارة مجانية لجميع عملائنا. يشمل ذلك زيارة الموقع، تقييم الاحتياجات، تقديم التوصيات المناسبة، وعرض سعر مفصل دون أي التزام من جانبكم.'
      },
      {
        question: 'كم من الوقت تحتاجون لإنجاز المشروع؟',
        answer: 'مدة التنفيذ تعتمد على نوع وحجم المشروع. المشاريع البسيطة كالمظلات الصغيرة تحتاج 1-3 أيام، بينما المشاريع الكبيرة قد تحتاج أسبوع إلى شهر. نحدد المدة الدقيقة بعد المعاينة ونلتزم بها.'
      }
    ]
  },
  {
    title: 'الأسعار والدفع',
    icon: DollarSign,
    color: 'bg-green-100 text-green-600',
    faqs: [
      {
        question: 'كيف يتم حساب الأسعار؟',
        answer: 'نحسب الأسعار بناءً على عدة عوامل: نوع الخدمة، المساحة، المواد المستخدمة، تعقيد التصميم، وموقع المشروع. نقدم عروض أسعار مفصلة وشفافة بدون رسوم خفية.'
      },
      {
        question: 'هل الأسعار تشمل ضريبة القيمة المضافة؟',
        answer: 'نعم، جميع أسعارنا تشمل ضريبة القيمة المضافة 15% ولا توجد رسوم إضافية مخفية. السعر المعروض هو السعر النهائي الذي ستدفعونه.'
      },
      {
        question: 'ما هي طرق الدفع المتاحة؟',
        answer: 'نقبل الدفع نقداً، التحويل البنكي، الشيكات، وبطاقات الائتمان. نتبع نظام دفع مرن: 50% مقدم عند التوقيع، 30% عند بداية التنفيذ، و20% عند الانتهاء والتسليم.'
      },
      {
        question: 'هل تقدمون خصومات أو عروض خاصة؟',
        answer: 'نعم، نقدم خصومات للمشاريع الكبيرة، العملاء المتكررين، والطلبات الجماعية. كما نقدم عروض موسمية خاصة. تواصلوا معنا للاستفسار عن العروض الحالية.'
      }
    ]
  },
  {
    title: 'التركيب والتنفيذ',
    icon: Truck,
    color: 'bg-orange-100 text-orange-600',
    faqs: [
      {
        question: 'كم من الوقت يستغرق تركيب مظلة سيارة؟',
        answer: 'تركيب مظلة سيارة واحدة يستغرق عادة يوم واحد (6-8 ساعات). المظلات المتعددة أو التصاميم المعقدة قد تحتاج يومين. نحدد الوقت الدقيق بعد معاينة الموقع.'
      },
      {
        question: 'هل تحتاجون لإغلاق الكهرباء أو الماء أثناء التركيب؟',
        answer: 'في معظم الحالات لا نحتاج لإغلاق الخدمات. إذا كان المشروع يتطلب ذلك، سنخبركم مسبقاً ونحدد الوقت المناسب لتقليل الإزعاج.'
      },
      {
        question: 'هل تنظفون الموقع بعد انتهاء العمل؟',
        answer: 'نعم، تنظيف الموقع جزء أساسي من خدمتنا. نزيل جميع مخلفات البناء والأدوات ونترك المكان نظيفاً ومرتباً كما كان أو أفضل.'
      },
      {
        question: 'ماذا لو كان الطقس غير مناسب للتركيب؟',
        answer: 'سلامة فريق العمل أولوية. في حالة الطقس السيء (أمطار غزيرة، رياح قوية)، نؤجل العمل ليوم آخر دون رسوم إضافية ونخبركم فوراً بالجدول الجديد.'
      }
    ]
  },
  {
    title: 'الضمان والصيانة',
    icon: Shield,
    color: 'bg-purple-100 text-purple-600',
    faqs: [
      {
        question: 'ما مدة الضمان على أعمالكم؟',
        answer: 'نقدم ضمان شامل: 5 سنوات على الهيكل الأساسي، 3 سنوات على المواد والتشطيبات، وسنة واحدة على أعمال الصيانة. الضمان يغطي العيوب في التصنيع والتركيب.'
      },
      {
        question: 'ماذا يغطي الضمان وماذا لا يغطي؟',
        answer: 'الضمان يغطي: العيوب في المواد، أخطاء التركيب، والتآكل الطبيعي المبكر. لا يغطي: الأضرار من سوء الاستخدام، الكوارث الطبيعية، أو التعديلات غير المصرحة.'
      },
      {
        question: 'هل تقدمون خدمات صيانة دورية؟',
        answer: 'نعم، نقدم برامج صيانة دورية تشمل: التنظيف، فحص الهيكل، شد البراغي، فحص الأقمشة، ومعالجة أي مشاكل بسيطة. هذا يضمن طول عمر المنتج.'
      },
      {
        question: 'كيف أطلب خدمة صيانة أو إصلاح؟',
        answer: 'يمكنكم طلب الصيانة عبر الهاتف أو واتساب. فريقنا سيحدد موعد الزيارة خلال 24-48 ساعة. خدمات الضمان مجانية، والصيانة الإضافية بأسعار تنافسية.'
      }
    ]
  },
  {
    title: 'المواد والجودة',
    icon: HelpCircle,
    color: 'bg-red-100 text-red-600',
    faqs: [
      {
        question: 'ما نوع المواد التي تستخدمونها؟',
        answer: 'نستخدم مواد عالية الجودة: حديد مجلفن مقاوم للصدأ، أقمشة PVC المقاومة للأشعة فوق البنفسجية، دهانات الكتروستاتيك، ومواد عزل حديثة. جميع المواد حاصلة على شهادات جودة دولية.'
      },
      {
        question: 'هل المواد مقاومة للعوامل الجوية؟',
        answer: 'نعم، جميع موادنا مصممة خصيصاً لمقاومة العوامل الجوية القاسية في المنطقة: الحرارة العالية، الأشعة فوق البنفسجية، الرطوبة، والرياح. نختبرها في ظروف مشابهة لضمان الأداء.'
      },
      {
        question: 'هل يمكنني اختيار ألوان وتصاميم مخصصة؟',
        answer: 'بالطبع! نقدم مجموعة واسعة من الألوان والتصاميم. يمكنكم اختيار من كتالوجنا أو طلب تصميم مخصص. فريق التصميم سيعمل معكم لتحقيق رؤيتكم بأفضل شكل ممكن.'
      },
      {
        question: 'هل تستوردون المواد أم محلية الصنع؟',
        answer: 'نستخدم مزيج من المواد المحلية عالية الجودة والمستوردة من الشركات الرائدة عالمياً. نختار أفضل المواد المناسبة لكل مشروع بناءً على المتطلبات والميزانية.'
      }
    ]
  }
];

export default function FAQPage() {
  const whatsappMessage = "السلام عليكم، لدي سؤال لم أجد إجابته في صفحة الأسئلة الشائعة."
  const whatsappURL = `https://wa.me/966553719009?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqCategories.flatMap(category =>
              category.faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            )
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
              <span className="text-primary font-medium">الأسئلة الشائعة</span>
            </nav>

            <HelpCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              الأسئلة الشائعة
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              إجابات شاملة على أكثر الأسئلة شيوعاً حول خدمات مؤسسة الديار العالمية
            </p>

            {/* Search Box */}
            <div className="mt-8 max-w-lg mx-auto">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث في الأسئلة الشائعة..."
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">فئات الأسئلة</h2>
              <p className="text-gray-600">انقر على الفئة للانتقال إليها مباشرة</p>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              {faqCategories.map((category, index) => (
                <Link key={`faq-category-${category.title}-${index}`} href={`#category-${index}`} className="block">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300 group">
                    <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">{category.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{category.faqs.length} أسئلة</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <div key={`category-${category.title}-${categoryIndex}`} id={`category-${categoryIndex}`} className="scroll-mt-20">
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <category.icon className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{category.title}</h2>
                    <div className="w-24 h-1 bg-primary mx-auto" />
                  </div>

                  <div className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => (
                      <div key={`faq-${faq.question.slice(0,20)}-${faqIndex}`} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <details className="group">
                          <summary className="p-6 cursor-pointer flex justify-between items-start hover:bg-gray-50 transition-colors">
                            <h3 className="font-semibold text-gray-900 pr-4 leading-relaxed">{faq.question}</h3>
                            <ArrowLeft className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0 mt-1" />
                          </summary>
                          <div className="px-6 pb-6 pt-0">
                            <div className="border-t pt-4">
                              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                            </div>
                          </div>
                        </details>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              لم تجد إجابة لسؤالك؟
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              فريق خدمة العملاء متاح على مدار الساعة للإجابة على جميع استفساراتكم
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={whatsappURL} target="_blank">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  تواصل عبر واتساب
                </Button>
              </Link>
              <Link href="tel:+966553719009">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  <Phone className="w-5 h-5 mr-2" />
                  اتصل الآن
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  صفحة التواصل
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Tips */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">نصائح مفيدة</h2>
              <p className="text-gray-600">معلومات إضافية قد تهمك</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-3">أفضل وقت للاتصال</h3>
                <p className="text-gray-600 text-sm">
                  للحصول على أسرع استجابة، اتصلوا بنا من الساعة 8 صباحاً حتى 6 مساءً.
                  خدمة الطوارئ متاحة 24/7.
                </p>
              </div>

              <div className="text-center">
                <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-3">قبل الاتصال</h3>
                <p className="text-gray-600 text-sm">
                  حضروا مقاسات المساحة، نوع الخدمة المطلوبة، والميزانية التقريبية
                  لنتمكن من تقديم أفضل استشارة.
                </p>
              </div>

              <div className="text-center">
                <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-3">واتساب أسرع</h3>
                <p className="text-gray-600 text-sm">
                  للحصول على رد سريع، استخدموا واتساب. يمكنكم إرسال الصور والمقاسات
                  مباشرة لتسهيل التقييم.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
