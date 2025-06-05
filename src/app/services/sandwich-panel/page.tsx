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
  Building,
  Check,
  Mail,
  Thermometer,
  Volume2,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'غرف ساندوتش بانل في جدة | مؤسسة الديار العالمية - أفضل الأسعار',
  description: 'غرف ساندوتش بانل بأعلى جودة في جدة. عزل حراري وصوتي ممتاز، تركيب سريع، أسعار تبدأ من 165 ريال/م². اطلب عرض سعر مجاني الآن!',
  openGraph: {
    title: 'غرف ساندوتش بانل في جدة | مؤسسة الديار العالمية',
    description: 'غرف ساندوتش بانل بأعلى جودة في جدة. عزل حراري وصوتي ممتاز، تركيب سريع، أسعار تبدأ من 165 ريال/م².',
    images: [
      {
        url: 'https://ext.same-assets.com/165531043/871301785.webp',
        width: 1200,
        height: 630,
        alt: 'غرف ساندوتش بانل في جدة - مؤسسة الديار العالمية'
      }
    ],
    type: 'website',
    locale: 'ar_SA'
  }
}

const heroFeatures = [
  { icon: Shield, text: 'ضمان 10 سنوات' },
  { icon: Award, text: 'أعلى جودة' },
  { icon: Users, text: 'فريق محترف' },
  { icon: Clock, text: 'تركيب سريع' }
];



const galleryImages = [
  {
    id: 1,
    src: 'https://ext.same-assets.com/165531043/871301785.webp',
    title: 'غرف ساندوتش بانل سكنية',
    category: 'غرف سكنية',
    description: 'غرف ساندوتش بانل عالية الجودة للاستخدام السكني'
  },
  {
    id: 2,
    src: 'https://ext.same-assets.com/165531043/1090129134.webp',
    title: 'غرف ساندوتش بانل تجارية',
    category: 'غرف تجارية',
    description: 'حلول تجارية بتقنية ساندوتش بانل المتطورة'
  },
  {
    id: 3,
    src: 'https://ext.same-assets.com/165531043/976610246.webp',
    title: 'مستودعات ساندوتش بانل',
    category: 'مستودعات',
    description: 'مستودعات كبيرة بتقنية ساندوتش بانل'
  },
  {
    id: 4,
    src: 'https://ext.same-assets.com/165531043/1002843973.webp',
    title: 'غرف ساندوتش بانل صناعية',
    category: 'غرف صناعية',
    description: 'حلول صناعية متقدمة بساندوتش بانل'
  }
];

const stats = [
  { number: '1000+', label: 'مشروع منفذ' },
  { number: '15+', label: 'سنة خبرة' },
  { number: '100%', label: 'رضا العملاء' },
  { number: '24/7', label: 'دعم فني' }
];

const applications = [
  'غرف الحراسة',
  'مكاتب مؤقتة',
  'غرف التبريد',
  'مختبرات',
  'عيادات طبية',
  'فصول دراسية',
  'ورش عمل'
];

const specifications = [
  {
    title: 'السمك',
    value: '5 سم، 7.5 سم، 10 سم',
    icon: '📏'
  },
  {
    title: 'العزل',
    value: 'فوم البولي يوريثان',
    icon: '🏠'
  },
  {
    title: 'الغلاف الخارجي',
    value: 'صاج مجلفن مطلي',
    icon: '🛡️'
  },
  {
    title: 'المقاومة',
    value: 'مقاوم للحريق والرطوبة',
    icon: '🔥'
  },
  {
    title: 'الألوان',
    value: 'أبيض، بيج، أزرق، رمادي',
    icon: '🎨'
  },
  {
    title: 'التركيب',
    value: 'تركيب سريع وسهل',
    icon: '⚡'
  }
];

const testimonials = [
  {
    id: 1,
    name: 'محمد الأحمدي',
    role: 'مدير مصنع - المنطقة الصناعية',
    content: 'بنينا مستودع كامل بساندوتش بانل. الجودة ممتازة والعزل الحراري فعال جداً. وفرنا الكثير في فواتير الكهرباء.',
    rating: 5,
    image: '/images/testimonials/client1.jpg'
  },
  {
    id: 2,
    name: 'سارة العتيبي',
    role: 'صاحبة عيادة - حي النزهة',
    content: 'أنشأنا عيادة بساندوتش بانل. التركيب كان سريع والنتيجة مذهلة. العزل الصوتي ممتاز للعيادة.',
    rating: 5,
    image: '/images/testimonials/client2.jpg'
  },
  {
    id: 3,
    name: 'أحمد الغامدي',
    role: 'مقاول - شركة إنشاءات',
    content: 'نتعامل مع مؤسسة الديار في جميع مشاريع ساندوتش بانل. الجودة والمصداقية والأسعار المنافسة.',
    rating: 5,
    image: '/images/testimonials/client3.jpg'
  }
];

const faqs = [
  {
    question: 'ما هي مزايا ساندوتش بانل مقارنة بالبناء التقليدي؟',
    answer: 'ساندوتش بانل يتميز بالعزل الحراري والصوتي الفائق، سرعة التركيب، خفة الوزن، مقاومة الحريق والرطوبة، وتوفير الطاقة. كما أنه أقل تكلفة من البناء التقليدي ويمكن تفكيكه وإعادة تركيبه.'
  },
  {
    question: 'كم تستغرق مدة تركيب غرفة ساندوتش بانل؟',
    answer: 'تختلف المدة حسب حجم المشروع، لكن غرفة متوسطة (4×6 متر) تستغرق من يوم إلى يومين فقط. المستودعات الكبيرة قد تحتاج من أسبوع إلى أسبوعين حسب المساحة والتعقيد.'
  },
  {
    question: 'هل ساندوتش بانل مقاوم للعوامل الجوية؟',
    answer: 'نعم، ساندوتش بانل مقاوم للأمطار، الرياح، أشعة الشمس، والتغيرات في درجات الحرارة. الطلاء الخارجي يحميه من التآكل والصدأ لسنوات طويلة.'
  },
  {
    question: 'ما هي أنواع العزل المستخدمة في ساندوتش بانل؟',
    answer: 'نستخدم عدة أنواع من العزل: فوم البولي يوريثان للعزل الحراري الفائق، الصوف الصخري للمقاومة العالية للحريق، والبولي ستايرين للمشاريع الاقتصادية. كل نوع له مزاياه الخاصة.'
  },
  {
    question: 'هل يمكن تخصيص تصميم غرف ساندوتش بانل؟',
    answer: 'بالطبع، نقدم تصاميم مخصصة حسب احتياجاتك. يمكن تحديد المقاسات، الألوان، أماكن الأبواب والنوافذ، أنظمة التهوية والكهرباء، وأي متطلبات خاصة أخرى.'
  },
  {
    question: 'ما هي تكلفة ساندوتش بانل بالمتر المربع؟',
    answer: 'الأسعار تبدأ من 165 ريال للمتر المربع للغرف السكنية البسيطة، وترتفع حسب نوع العزل، السمك، التشطيبات، والمواصفات الخاصة. نقدم عروض أسعار مفصلة مجانية.'
  }
];

const relatedServices = [
  {
    title: 'مظلات سيارات',
    description: 'تصميم وتنفيذ مظلات السيارات بأعلى معايير الجودة والمتانة',
    image: 'https://ext.same-assets.com/3073684241/2205790480.jpeg',
    href: '/services/mazallat',
    features: ['مظلات PVC', 'مظلات حديدية', 'ضمان شامل']
  },
  {
    title: 'خيام ملكية',
    description: 'خيام ملكية فاخرة بتصاميم عصرية وأنيقة لجميع المناسبات',
    image: 'https://ext.same-assets.com/3073684241/1914607147.jpeg',
    href: '/services/khayyam',
    features: ['خيام أفراح', 'خيام استراحات', 'خيام مناسبات']
  },
  {
    title: 'بيوت شعر',
    description: 'بيوت شعر تراثية وعصرية بخامات عالية الجودة وتصاميم أصيلة',
    image: 'https://ext.same-assets.com/3073684241/1858852453.jpeg',
    href: '/services/byoot-shaar',
    features: ['بيوت شعر ملكية', 'بيوت شعر تراثية', 'تصاميم مخصصة']
  }
];

const advantages = [
  {
    title: 'عزل حراري فائق',
    description: 'توفير يصل إلى 40% في فواتير الكهرباء',
    icon: Thermometer
  },
  {
    title: 'عزل صوتي ممتاز',
    description: 'تقليل الضوضاء بنسبة تصل إلى 35 ديسيبل',
    icon: Volume2
  },
  {
    title: 'تركيب سريع',
    description: 'توفير الوقت والجهد مقارنة بالبناء التقليدي',
    icon: Zap
  },
  {
    title: 'مقاوم للحريق',
    description: 'مواد مقاومة للحريق بمعايير السلامة العالمية',
    icon: Shield
  }
];

export default function SandwichPanelPage() {
  const whatsappMessage = "السلام عليكم، أريد الاستفسار عن خدمة ساندوتش بانل وطلب عرض سعر."
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
            "name": "غرف ساندوتش بانل في جدة",
            "provider": {
              "@type": "LocalBusiness",
              "name": "مؤسسة الديار العالمية",
              "image": "https://ext.same-assets.com/165531043/871301785.webp",
              "telephone": "+966553719009",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "جدة",
                "addressCountry": "SA"
              }
            },
            "areaServed": "جدة",
            "description": "أفضل غرف ساندوتش بانل في جدة من مؤسسة الديار العالمية. غرف سكنية، تجارية، صناعية ومستودعات.",
            "serviceType": ["غرف ساندوتش بانل سكنية", "غرف ساندوتش بانل تجارية", "غرف ساندوتش بانل صناعية", "مستودعات ساندوتش بانل"],
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "SAR",
              "lowPrice": "165",
              "highPrice": "220",
              "description": "سعر المتر المربع"
            }
          })
        }}
      />

      <Navbar />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-32 h-32 bg-blue-600 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-amber-600 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gray-600 rounded-full blur-2xl" />
          </div>

          <div className="relative z-10 text-center max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex justify-center items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-8">
              <Link href="/" className="hover:text-blue-600 transition-colors">الرئيسية</Link>
              <span>/</span>
              <Link href="/#services" className="hover:text-blue-600 transition-colors">خدماتنا</Link>
              <span>/</span>
              <span className="text-blue-600 font-medium">ساندوتش بانل</span>
            </nav>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              أفضل غرف ساندوتش بانل في{' '}
              <span className="text-amber-600">جدة</span>
              <br />
              جودة عالية وأسعار منافسة
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              مؤسسة الديار العالمية - خبرة 15 عاماً في تصميم وتنفيذ غرف ساندوتش بانل عالية الجودة.
              عزل حراري وصوتي فائق، تركيب سريع، أسعار تبدأ من 165 ريال/م²
            </p>

            {/* Key Features */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-sm text-gray-600">
              {heroFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 space-x-reverse">
                  <feature.icon className="w-4 h-4 text-amber-600" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href="tel:+966553719009">
                <Button size="lg" className="text-lg px-8 py-4">
                  <Phone className="w-5 h-5 mr-2" />
                  اتصل للاستشارة المجانية
                </Button>
              </Link>
              <Link href={whatsappURL} target="_blank">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  واتساب الآن
                </Button>
              </Link>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-8 w-16 h-16 bg-amber-600/10 rounded-full blur-xl" />
          <div className="absolute bottom-1/4 right-8 w-20 h-20 bg-blue-600/10 rounded-full blur-xl" />
        </section>

        {/* Advantages Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                لماذا ساندوتش بانل هو الخيار الأمثل؟
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                تقنية متطورة توفر حلول بناء عصرية وسريعة مع أداء فائق
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((advantage, index) => (
                <div key={index} className="text-center bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <advantage.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                  <p className="text-gray-600">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* Applications Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                تطبيقات ساندوتش بانل المتنوعة
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                حلول شاملة لجميع القطاعات والاستخدامات
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {applications.map((application, index) => (
                <div key={index} className="bg-white rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{application}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specifications Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                مواصفات ساندوتش بانل
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                مواصفات تقنية عالية تضمن الأداء المتميز والجودة الفائقة
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specifications.map((spec, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-4">{spec.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{spec.title}</h3>
                  <p className="text-gray-600">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                إنجازاتنا في أرقام
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                أرقام تتحدث عن خبرتنا وجودة خدماتنا في مجال ساندوتش بانل
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-amber-400">
                    {stat.number}
                  </div>
                  <div className="text-lg opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                معرض أعمالنا
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                مشاهدة مجموعة من أفضل مشاريع ساندوتش بانل التي نفذناها
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryImages.map((image) => (
                <div key={image.id} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="aspect-square relative">
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
        <section className="py-20 bg-white">
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
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                الأسئلة الشائعة
              </h2>
              <p className="text-xl text-gray-600">
                إجابات شاملة على أهم الأسئلة حول خدمات ساندوتش بانل
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <details className="group">
                    <summary className="p-6 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition-colors">
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
        <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              احصل على غرفة ساندوتش بانل أحلامك الآن
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              تواصل معنا اليوم واحصل على استشارة مجانية وعرض سعر مخصص لمتطلباتك
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={whatsappURL} target="_blank">
                <Button size="lg" className="text-lg px-8 py-4 bg-green-600 hover:bg-green-700">
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
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                خدمات أخرى قد تهمك
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                اكتشف المزيد من خدماتنا المتميزة في مجال المظلات والإنشاءات
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
                      <Button variant="outline" className="w-full">
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
