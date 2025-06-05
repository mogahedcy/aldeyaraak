import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import {
  Star,
  Phone,
  MessageCircle,
  ArrowLeft,
  Clock,
  Users,
  Award,
  Shield,
  Wrench,
  Check,
  Mail,
  AlertTriangle,
  FileCheck,
  Settings,
  Zap,
  Droplets
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ترميم ملحقات في جدة | مؤسسة الديار العالمية - مقاول ترميم محترف',
  description: 'ترميم ملحقات منزلية وتجارية في جدة. إعادة تأهيل المباني والملحقات القديمة، إصلاح التشققات، صيانة شاملة. خبرة 15 عاماً في الترميم. اطلب عرض سعر مجاني!',
  openGraph: {
    title: 'ترميم ملحقات في جدة | مؤسسة الديار العالمية',
    description: 'ترميم ملحقات منزلية وتجارية في جدة. إعادة تأهيل المباني والملحقات القديمة، إصلاح التشققات، صيانة شاملة.',
    images: [
      {
        url: 'https://ext.same-assets.com/2228747888/11390105.webp',
        width: 1200,
        height: 630,
        alt: 'ترميم ملحقات في جدة - مؤسسة الديار العالمية'
      }
    ],
    type: 'website',
    locale: 'ar_SA'
  }
}

const heroFeatures = [
  { icon: Shield, text: 'ضمان 5 سنوات' },
  { icon: Award, text: 'جودة عالية' },
  { icon: Users, text: 'فريق خبير' },
  { icon: Clock, text: 'تنفيذ سريع' }
];



const renovationProcess = [
  {
    step: 1,
    title: 'فحص وتقييم الحالة',
    description: 'فحص شامل للملحق وتقييم الأضرار والعيوب الموجودة',
    icon: FileCheck
  },
  {
    step: 2,
    title: 'وضع خطة الترميم',
    description: 'إعداد خطة مفصلة للترميم مع تحديد المواد والتكاليف',
    icon: Settings
  },
  {
    step: 3,
    title: 'تنفيذ أعمال الترميم',
    description: 'تنفيذ أعمال الترميم بدقة وجودة عالية وفقاً للخطة المحددة',
    icon: Wrench
  },
  {
    step: 4,
    title: 'التشطيب والتسليم',
    description: 'أعمال التشطيب النهائية وتسليم المشروع مع ضمان الجودة',
    icon: Award
  }
];

const commonProblems = [
  {
    title: 'التشققات في الجدران',
    description: 'معالجة التشققات الناتجة عن الهبوط أو التمدد الحراري',
    icon: AlertTriangle,
    solutions: ['حقن الشروخ', 'تقوية الهيكل', 'عزل حراري', 'طلاء وقائي']
  },
  {
    title: 'تسريب المياه',
    description: 'حل مشاكل تسريب المياه في الأسقف والجدران',
    icon: Droplets,
    solutions: ['كشف التسريب', 'إصلاح الأنابيب', 'عزل مائي', 'معالجة الرطوبة']
  },
  {
    title: 'مشاكل الكهرباء',
    description: 'تحديث وإصلاح الأنظمة الكهربائية القديمة',
    icon: Zap,
    solutions: ['فحص الأسلاك', 'تحديث اللوحات', 'تأمين الوصلات', 'اختبار السلامة']
  },
  {
    title: 'تآكل المواد',
    description: 'معالجة تآكل المواد والحماية من العوامل الجوية',
    icon: Shield,
    solutions: ['إزالة التآكل', 'طلاء حماية', 'تغيير المواد', 'صيانة دورية']
  }
];

const galleryImages = [
  {
    id: 1,
    src: 'https://ext.same-assets.com/2228747888/3701838953.jpeg',
    title: 'ترميم ملحق منزلي',
    category: 'ترميم منزلي',
    description: 'ترميم شامل لملحق منزلي مع تحديث التصميم'
  },
  {
    id: 2,
    src: 'https://ext.same-assets.com/2228747888/864845291.jpeg',
    title: 'ترميم محل تجاري',
    category: 'ترميم تجاري',
    description: 'إعادة تأهيل محل تجاري بمواصفات حديثة'
  },
  {
    id: 3,
    src: 'https://ext.same-assets.com/2228747888/3372186091.jpeg',
    title: 'إصلاح التشققات',
    category: 'إصلاح إنشائي',
    description: 'معالجة التشققات وتقوية الهيكل الإنشائي'
  },
  {
    id: 4,
    src: 'https://ext.same-assets.com/2228747888/1844105375.png',
    title: 'تطوير المرافق',
    category: 'تطوير',
    description: 'تطوير وتحديث المرافق والخدمات'
  },
  {
    id: 5,
    src: 'https://ext.same-assets.com/2228747888/837554789.jpeg',
    title: 'ترميم ملحق خارجي',
    category: 'ترميم خارجي',
    description: 'ترميم ملحق خارجي مع تحسين العزل'
  },
  {
    id: 6,
    src: 'https://ext.same-assets.com/2228747888/3179844079.jpeg',
    title: 'ترميم ملحق تراثي',
    category: 'ترميم تراثي',
    description: 'ترميم ملحق تراثي مع الحفاظ على الطابع الأصلي'
  }
];

const stats = [
  { number: '800+', label: 'مشروع ترميم' },
  { number: '15+', label: 'سنة خبرة' },
  { number: '100%', label: 'رضا العملاء' },
  { number: '5', label: 'سنوات ضمان' }
];

const benefits = [
  {
    title: 'توفير التكلفة',
    description: 'ترميم الملحق أوفر من بناء جديد بنسبة تصل إلى 60%',
    icon: '💰'
  },
  {
    title: 'زيادة القيمة',
    description: 'الترميم يزيد من قيمة العقار ويحسن من مظهره',
    icon: '📈'
  },
  {
    title: 'توفير الوقت',
    description: 'الترميم أسرع من البناء الجديد ويوفر الوقت والجهد',
    icon: '⏰'
  },
  {
    title: 'الاستدامة',
    description: 'الترميم يحافظ على البيئة ويقلل من النفايات',
    icon: '🌱'
  },
  {
    title: 'تحسين الأداء',
    description: 'تحديث الأنظمة يحسن من كفاءة الطاقة والأداء',
    icon: '⚡'
  },
  {
    title: 'الأمان',
    description: 'الترميم يضمن سلامة المبنى ومطابقته للمعايير',
    icon: '🛡️'
  }
];

const testimonials = [
  {
    id: 1,
    name: 'عبدالله المحمدي',
    role: 'صاحب عقار - حي الصفا',
    content: 'رممنا ملحق المنزل القديم وأصبح كالجديد تماماً. العمل احترافي والجودة ممتازة. الفريق ملتزم بالمواعيد ونظيف في العمل.',
    rating: 5,
    image: '/images/testimonials/client1.jpg'
  },
  {
    id: 2,
    name: 'فاطمة العتيبي',
    role: 'صاحبة محل - حي النزهة',
    content: 'رممت المحل التجاري معهم وحصلت على نتيجة رائعة. أصبح المحل أكثر جاذبية للعملاء والمبيعات ازدادت بشكل ملحوظ.',
    rating: 5,
    image: '/images/testimonials/client2.jpg'
  },
  {
    id: 3,
    name: 'أحمد الغامدي',
    role: 'مهندس - شركة عقارية',
    content: 'نتعامل معهم في جميع مشاريع الترميم. الخبرة والمصداقية والأسعار المناسبة جعلتهم شريكنا المفضل في الترميم.',
    rating: 5,
    image: '/images/testimonials/client3.jpg'
  }
];

const faqs = [
  {
    question: 'ما هي علامات الحاجة لترميم الملحق؟',
    answer: 'العلامات تشمل: ظهور تشققات في الجدران، تسريب المياه، تآكل الدهانات، مشاكل في الكهرباء، ضعف العزل، أو تدهور الشكل العام. إذا ظهرت هذه العلامات فهذا يعني أن الملحق يحتاج لترميم.'
  },
  {
    question: 'كم تكلفة ترميم ملحق متوسط؟',
    answer: 'تعتمد التكلفة على حجم الملحق ونوع الأعمال المطلوبة. بشكل عام تتراوح من 200-400 ريال للمتر المربع للترميم البسيط، وقد تصل لـ 600 ريال/م² للترميم الشامل مع التحديث الكامل.'
  },
  {
    question: 'كم من الوقت يحتاج ترميم الملحق؟',
    answer: 'المدة تعتمد على حجم وحالة الملحق. الترميم البسيط يحتاج 1-2 أسبوع، الترميم المتوسط 2-4 أسابيع، والترميم الشامل قد يحتاج 4-8 أسابيع. نقدم جدولة زمنية واضحة لكل مشروع.'
  },
  {
    question: 'هل يمكن ترميم الملحق دون هدمه؟',
    answer: 'نعم، في معظم الحالات يمكن الترميم دون هدم كامل. نقوم بفحص الهيكل الإنشائي وتحديد الأجزاء التي تحتاج استبدال. الهدف دائماً هو الحفاظ على الهيكل الأساسي وترميم ما يحتاج ترميم فقط.'
  },
  {
    question: 'ما هي المواد المستخدمة في الترميم؟',
    answer: 'نستخدم مواد عالية الجودة مثل: أسمنت مقاوم للرطوبة، دهانات عازلة، مواد عزل حديثة، أسلاك كهربائية معتمدة، ومواد سباكة متينة. جميع المواد معتمدة ومطابقة للمعايير السعودية.'
  },
  {
    question: 'هل تقدمون ضمان على أعمال الترميم؟',
    answer: 'نعم، نقدم ضمان شامل لمدة 5 سنوات على جميع أعمال الترميم. يشمل الضمان: الأعمال الإنشائية، الدهانات، العزل، والتمديدات الكهربائية والصحية. كما نقدم خدمة صيانة دورية.'
  }
];

const relatedServices = [
  {
    title: 'ساندوتش بانل',
    description: 'غرف ساندوتش بانل عالية الجودة للاستخدامات المتنوعة',
    image: 'https://ext.same-assets.com/165531043/871301785.webp',
    href: '/services/sandwich-panel',
    features: ['عزل ممتاز', 'تركيب سريع', 'جودة عالية']
  },
  {
    title: 'مظلات ومراكب',
    description: 'مظلات للحماية من العوامل الجوية مع تصاميم عصرية',
    image: 'https://ext.same-assets.com/4049809232/2205790480.jpeg',
    href: '/services/mazallat',
    features: ['حماية فائقة', 'تصاميم متنوعة', 'مواد متينة']
  },
  {
    title: 'بيوت شعر',
    description: 'بيوت شعر تراثية وعصرية لجلسات مميزة',
    image: 'https://ext.same-assets.com/4049809232/1914607147.jpeg',
    href: '/services/byoot-shaar',
    features: ['تصاميم أصيلة', 'خامات فاخرة', 'جودة عالية']
  }
];

export default function RenovationPage() {
  const whatsappMessage = "السلام عليكم، أريد الاستفسار عن خدمة ترميم الملحقات وطلب عرض سعر."
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
            "name": "ترميم ملحقات في جدة",
            "provider": {
              "@type": "LocalBusiness",
              "name": "مؤسسة الديار العالمية",
              "image": "https://ext.same-assets.com/2228747888/11390105.webp",
              "telephone": "+966553719009",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "جدة",
                "addressCountry": "SA"
              }
            },
            "areaServed": "جدة",
            "description": "أفضل ترميم ملحقات في جدة من مؤسسة الديار العالمية. ترميم منزلي، تجاري، إصلاح تشققات وصيانة شاملة.",
            "serviceType": ["ترميم ملحقات منزلية", "ترميم ملحقات تجارية", "إصلاح التشققات", "صيانة شاملة"],
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "SAR",
              "lowPrice": "150",
              "highPrice": "400",
              "description": "سعر المتر المربع"
            }
          })
        }}
      />

      <Navbar />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-32 h-32 bg-orange-600 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-amber-600 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-600 rounded-full blur-2xl" />
          </div>

          <div className="relative z-10 text-center max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex justify-center items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-8">
              <Link href="/" className="hover:text-orange-600 transition-colors">الرئيسية</Link>
              <span>/</span>
              <Link href="/#services" className="hover:text-orange-600 transition-colors">خدماتنا</Link>
              <span>/</span>
              <span className="text-orange-600 font-medium">ترميم ملحقات</span>
            </nav>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              ترميم ملحقات في{' '}
              <span className="text-orange-600">جدة</span>
              <br />
              إعادة الحياة للملحقات القديمة
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              مؤسسة الديار العالمية - خبرة 15 عاماً في ترميم وإعادة تأهيل الملحقات المنزلية والتجارية.
              حلول شاملة من الفحص حتى التسليم مع ضمان 5 سنوات
            </p>

            {/* Key Features */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-sm text-gray-600">
              {heroFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 space-x-reverse">
                  <feature.icon className="w-4 h-4 text-orange-600" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href="tel:+966553719009">
                <Button size="lg" className="text-lg px-8 py-4 bg-orange-600 hover:bg-orange-700">
                  <Phone className="w-5 h-5 mr-2" />
                  اتصل للاستشارة المجانية
                </Button>
              </Link>
              <Link href={whatsappURL} target="_blank">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-orange-600 text-orange-600 hover:bg-orange-50">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  واتساب الآن
                </Button>
              </Link>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-8 w-16 h-16 bg-orange-600/10 rounded-full blur-xl" />
          <div className="absolute bottom-1/4 right-8 w-20 h-20 bg-amber-600/10 rounded-full blur-xl" />
        </section>



        {/* Renovation Process Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                عملية الترميم المتكاملة
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                نتبع منهجية علمية مدروسة في جميع مراحل الترميم
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {renovationProcess.map((process, index) => (
                <div key={index} className="text-center bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <process.icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{process.title}</h3>
                  <p className="text-gray-600">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Problems Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                المشاكل الشائعة التي نحلها
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                خبرتنا تمكننا من حل جميع مشاكل الملحقات بطرق علمية متقدمة
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {commonProblems.map((problem, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <problem.icon className="w-12 h-12 text-orange-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{problem.title}</h3>
                  <p className="text-gray-600 mb-4">{problem.description}</p>
                  <div className="space-y-2">
                    {problem.solutions.map((solution, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-gray-600">{solution}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                فوائد ترميم الملحقات
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                الترميم خيار ذكي يحقق فوائد متعددة للمالك والعقار
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-amber-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                إنجازاتنا في أرقام
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                أرقام تتحدث عن خبرتنا وجودة خدماتنا في مجال الترميم
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-yellow-300">
                    {stat.number}
                  </div>
                  <div className="text-lg opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                معرض أعمال الترميم
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                مشاهدة مجموعة من أفضل مشاريع الترميم التي نفذناها
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <div key={image.id} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video relative">
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="font-semibold text-sm mb-1">{image.title}</h3>
                        <p className="text-xs opacity-80">{image.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                آراء عملائنا
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                تقييمات حقيقية من عملائنا الكرام الذين وثقوا بخدماتنا
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray-600 mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                الأسئلة الشائعة
              </h2>
              <p className="text-xl text-gray-600">
                إجابات شاملة على أهم الأسئلة حول خدمات الترميم
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
                  <details className="group">
                    <summary className="p-6 cursor-pointer flex justify-between items-center hover:bg-gray-100 transition-colors">
                      <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                      <ArrowLeft className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-amber-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              هل تحتاج لترميم ملحقك؟
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              تواصل معنا اليوم واحصل على فحص مجاني وعرض سعر مفصل لمشروع الترميم
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={whatsappURL} target="_blank">
                <Button size="lg" className="text-lg px-8 py-4 bg-white text-orange-600 hover:bg-gray-100">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  واتساب الآن
                </Button>
              </Link>
              <Link href="tel:+966553719009">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <Phone className="w-5 h-5 mr-2" />
                  اتصل الآن
                </Button>
              </Link>
              <Link href="mailto:info@aldeyar-jeddah.com">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <Mail className="w-5 h-5 mr-2" />
                  راسلنا
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Services Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                خدمات أخرى قد تهمك
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                اكتشف المزيد من خدماتنا المتميزة في مجال الإنشاءات والتطوير
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedServices.map((service, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="space-y-2 mb-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link href={service.href}>
                      <Button variant="outline" className="w-full border-orange-600 text-orange-600 hover:bg-orange-50">
                        اعرف المزيد
                        <ArrowLeft className="w-4 h-4 mr-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
