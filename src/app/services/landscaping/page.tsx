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
  TreePine,
  Flower2,
  Droplets,
  Scissors,
  Check,
  Mail,
  Palette,
  Sun,
  Sprout
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'تنسيق حدائق في جدة | مؤسسة الديار العالمية - أفضل التصاميم',
  description: 'تنسيق حدائق منزلية وعامة في جدة. تصميم الحدائق بأحدث التقنيات وأفضل النباتات والديكورات. خبرة 15 عاماً في تنسيق الحدائق. اطلب عرض سعر مجاني!',
  openGraph: {
    title: 'تنسيق حدائق في جدة | مؤسسة الديار العالمية',
    description: 'تنسيق حدائق منزلية وعامة في جدة. تصميم الحدائق بأحدث التقنيات وأفضل النباتات والديكورات.',
    images: [
      {
        url: 'https://ext.same-assets.com/4049809232/447736083.jpeg',
        width: 1200,
        height: 630,
        alt: 'تنسيق حدائق في جدة - مؤسسة الديار العالمية'
      }
    ],
    type: 'website',
    locale: 'ar_SA'
  }
}

const heroFeatures = [
  { icon: Shield, text: 'ضمان 2 سنة' },
  { icon: Award, text: 'أعلى جودة' },
  { icon: Users, text: 'فريق متخصص' },
  { icon: Clock, text: 'تنفيذ سريع' }
];

const landscapingServices = [
  {
    id: 1,
    title: 'تصميم الحدائق المنزلية',
    description: 'تصميم وتنسيق الحدائق المنزلية بأسلوب عصري يجمع بين الجمال والاستدامة',
    image: 'https://ext.same-assets.com/4049809232/447736083.jpeg',
    price: 'تبدأ من 150 ريال/م²',
    category: 'حدائق منزلية',
    features: ['تصميم ثلاثي الأبعاد', 'نباتات متنوعة', 'أنظمة ري حديثة', 'إضاءة مميزة'],
    icon: TreePine
  },
  {
    id: 2,
    title: 'تصميم الحدائق الخارجية',
    description: 'حدائق خارجية للفلل والقصور مع مساحات واسعة وتصاميم فاخرة',
    image: 'https://ext.same-assets.com/4049809232/2214971808.jpeg',
    price: 'تبدأ من 200 ريال/م²',
    category: 'حدائق خارجية',
    features: ['مساحات واسعة', 'تصاميم فاخرة', 'مسارات مزينة', 'مناطق جلوس'],
    icon: Flower2
  },
  {
    id: 3,
    title: 'تنسيق حدائق الفلل',
    description: 'تنسيق شامل لحدائق الفلل مع مناطق ترفيهية ومساحات خضراء متنوعة',
    image: 'https://ext.same-assets.com/4049809232/1002713684.jpeg',
    price: 'تبدأ من 250 ريال/م²',
    category: 'حدائق فلل',
    features: ['مناطق ترفيهية', 'مساحات خضراء', 'نوافير مائية', 'إضاءة ليلية'],
    icon: Sun
  },
  {
    id: 4,
    title: 'صيانة الحدائق',
    description: 'خدمات صيانة دورية للحدائق تشمل التقليم والري والتسميد',
    image: 'https://ext.same-assets.com/4049809232/795805632.jpeg',
    price: 'تبدأ من 50 ريال/زيارة',
    category: 'صيانة',
    features: ['تقليم الأشجار', 'صيانة النباتات', 'تنظيف الحديقة', 'متابعة دورية'],
    icon: Scissors
  }
];

const gardenFeatures = [
  {
    title: 'زراعة النباتات',
    description: 'اختيار وزراعة النباتات المناسبة للمناخ المحلي',
    image: 'https://ext.same-assets.com/4049809232/3414519594.jpeg',
    features: ['نباتات محلية', 'أشجار الظل', 'نباتات زينة', 'أعشاب عطرية']
  },
  {
    title: 'أنظمة الري الحديثة',
    description: 'تركيب أنظمة ري ذكية توفر المياه وتضمن نمو النباتات',
    image: 'https://ext.same-assets.com/4049809232/597962119.jpeg',
    features: ['ري بالتنقيط', 'أنظمة ذكية', 'توفير المياه', 'تحكم آلي']
  },
  {
    title: 'تصميم المسارات',
    description: 'تصميم وتنفيذ مسارات جميلة ومريحة للمشي في الحديقة',
    image: 'https://ext.same-assets.com/4049809232/1339958127.jpeg',
    features: ['حجر طبيعي', 'تصاميم فنية', 'إضاءة جانبية', 'أمان وراحة']
  }
];

const galleryImages = [
  {
    id: 1,
    src: 'https://ext.same-assets.com/4049809232/1574876251.jpeg',
    title: 'حديقة منزلية عصرية',
    category: 'حدائق منزلية',
    description: 'تصميم حديقة منزلية بأسلوب عصري مع مساحات خضراء'
  },
  {
    id: 2,
    src: 'https://ext.same-assets.com/4049809232/3955559781.jpeg',
    title: 'حديقة فيلا فاخرة',
    category: 'حدائق فلل',
    description: 'تنسيق حديقة فيلا مع نوافير ومناطق جلوس'
  },
  {
    id: 3,
    src: 'https://ext.same-assets.com/4049809232/785441482.jpeg',
    title: 'تصميم مسارات الحديقة',
    category: 'مسارات',
    description: 'مسارات حديقة بالحجر الطبيعي مع إضاءة'
  },
  {
    id: 4,
    src: 'https://ext.same-assets.com/4049809232/1676117830.jpeg',
    title: 'منطقة جلوس خارجية',
    category: 'مناطق جلوس',
    description: 'منطقة جلوس محاطة بالنباتات والأشجار'
  },
  {
    id: 5,
    src: 'https://ext.same-assets.com/4049809232/3332192368.jpeg',
    title: 'حديقة بأشجار الظل',
    category: 'أشجار',
    description: 'حديقة مزينة بأشجار الظل والنباتات المتنوعة'
  },
  {
    id: 6,
    src: 'https://ext.same-assets.com/4049809232/3174482530.jpeg',
    title: 'نافورة مائية',
    category: 'نوافير',
    description: 'نافورة مائية جميلة تضفي جمالاً على الحديقة'
  },
  {
    id: 7,
    src: 'https://ext.same-assets.com/4049809232/2137379307.jpeg',
    title: 'حديقة مع إضاءة ليلية',
    category: 'إضاءة',
    description: 'تصميم إضاءة ليلية مميزة للحديقة'
  },
  {
    id: 8,
    src: 'https://ext.same-assets.com/4049809232/3779550463.jpeg',
    title: 'حديقة منزل صغير',
    category: 'حدائق صغيرة',
    description: 'تنسيق حديقة للمنازل ذات المساحات الصغيرة'
  }
];

const stats = [
  { number: '500+', label: 'حديقة منفذة' },
  { number: '15+', label: 'سنة خبرة' },
  { number: '100%', label: 'رضا العملاء' },
  { number: '24/7', label: 'خدمة عملاء' }
];

const whyChooseUs = [
  {
    title: 'خبرة واسعة',
    description: 'خبرة أكثر من 15 عاماً في تنسيق وتصميم الحدائق',
    icon: Droplets
  },
  {
    title: 'تصاميم مبتكرة',
    description: 'تصاميم إبداعية تجمع بين الجمال والوظيفية',
    icon: Palette
  },
  {
    title: 'نباتات عالية الجودة',
    description: 'استخدام أفضل أنواع النباتات المناسبة للمناخ',
    icon: Sprout
  },
  {
    title: 'أنظمة ري متطورة',
    description: 'تركيب أنظمة ري ذكية توفر المياه والوقت',
    icon: Droplets
  },
  {
    title: 'صيانة مستمرة',
    description: 'خدمات صيانة دورية للحفاظ على جمال الحديقة',
    icon: Scissors
  },
  {
    title: 'خدمة العملاء',
    description: 'فريق خدمة عملاء متاح 24/7 لخدمتكم',
    icon: Users
  }
];

const testimonials = [
  {
    id: 1,
    name: 'أحمد السعيد',
    role: 'صاحب فيلا - حي الزهراء',
    content: 'نسقوا لنا حديقة الفيلا بشكل رائع. التصميم مبدع والتنفيذ احترافي. أصبحت الحديقة مكان مفضل للعائلة.',
    rating: 5,
    image: '/images/testimonials/client1.jpg'
  },
  {
    id: 2,
    name: 'فاطمة الأحمدي',
    role: 'ربة منزل - حي النزهة',
    content: 'خدمة ممتازة في تنسيق حديقة المنزل. اختاروا النباتات المناسبة ونفذوا التصميم في الوقت المحدد.',
    rating: 5,
    image: '/images/testimonials/client2.jpg'
  },
  {
    id: 3,
    name: 'محمد العتيبي',
    role: 'مهندس - حي الروضة',
    content: 'أفضل شركة تنسيق حدائق في جدة. الفريق محترف والأسعار مناسبة. أنصح بالتعامل معهم.',
    rating: 5,
    image: '/images/testimonials/client3.jpg'
  }
];

const faqs = [
  {
    question: 'ما هي أفضل النباتات للحدائق في جدة؟',
    answer: 'نختار النباتات المناسبة لمناخ جدة مثل النخيل، الجهنمية، اللبلاب، الدفلة، وأشجار الزيتون. هذه النباتات تتحمل الحرارة والجفاف وتحتاج لكمية قليلة من المياه.'
  },
  {
    question: 'كم تكلفة تنسيق حديقة منزلية؟',
    answer: 'تختلف التكلفة حسب مساحة الحديقة ونوع التصميم والنباتات المختارة. بشكل عام تبدأ الأسعار من 150 ريال للمتر المربع للحدائق البسيطة وترتفع للتصاميم المعقدة.'
  },
  {
    question: 'هل تقدمون خدمة صيانة الحدائق؟',
    answer: 'نعم، نقدم خدمات صيانة دورية شاملة تتضمن تقليم الأشجار، تنظيف الحديقة، التسميد، مكافحة الآفات، وصيانة أنظمة الري. يمكن الاتفاق على زيارات أسبوعية أو شهرية.'
  },
  {
    question: 'كم من الوقت يحتاج تنفيذ مشروع تنسيق الحديقة؟',
    answer: 'يعتمد على حجم المشروع وتعقيده. الحدائق الصغيرة (أقل من 100 م²) تحتاج 3-5 أيام، المتوسطة 1-2 أسبوع، والكبيرة قد تحتاج 3-4 أسابيع. نقدم جدولة زمنية واضحة لكل مشروع.'
  },
  {
    question: 'هل تقدمون تصميم ثلاثي الأبعاد للحديقة؟',
    answer: 'نعم، نقدم تصاميم ثلاثية الأبعاد احترافية تمكنكم من رؤية الحديقة قبل التنفيذ. هذا يساعد في اختيار التصميم المناسب وإجراء أي تعديلات مطلوبة قبل البدء في العمل.'
  },
  {
    question: 'هل يمكن تنسيق حديقة بمساحة صغيرة؟',
    answer: 'بالطبع، نتخصص في تنسيق الحدائق من جميع المساحات. للمساحات الصغيرة نستخدم تقنيات خاصة مثل الحدائق العمودية، النباتات المتدلية، والتصاميم المدمجة لتحقيق أقصى استفادة من المساحة.'
  }
];

const relatedServices = [
  {
    title: 'مظلات حدائق',
    description: 'مظلات وبرجولات للحدائق توفر الظل والراحة',
    image: 'https://ext.same-assets.com/4049809232/2205790480.jpeg',
    href: '/services/mazallat',
    features: ['مظلات قماش', 'برجولات خشبية', 'تصاميم عصرية']
  },
  {
    title: 'بيوت شعر للحدائق',
    description: 'بيوت شعر تراثية مناسبة لجلسات الحدائق',
    image: 'https://ext.same-assets.com/4049809232/1914607147.jpeg',
    href: '/services/byoot-shaar',
    features: ['بيوت شعر حدائق', 'تصاميم تراثية', 'جلسات مريحة']
  },
  {
    title: 'السواتر',
    description: 'سواتر للحدائق توفر الخصوصية والحماية',
    image: 'https://ext.same-assets.com/3073684241/531069762.jpeg',
    href: '/services/sawater',
    features: ['سواتر قماش', 'سواتر خشبية', 'حماية وخصوصية']
  }
];

export default function LandscapingPage() {
  const whatsappMessage = "السلام عليكم، أريد الاستفسار عن خدمة تنسيق الحدائق وطلب عرض سعر."
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
            "name": "تنسيق حدائق في جدة",
            "provider": {
              "@type": "LocalBusiness",
              "name": "مؤسسة الديار العالمية",
              "image": "https://ext.same-assets.com/4049809232/447736083.jpeg",
              "telephone": "+966553719009",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "جدة",
                "addressCountry": "SA"
              }
            },
            "areaServed": "جدة",
            "description": "أفضل تنسيق حدائق في جدة من مؤسسة الديار العالمية. حدائق منزلية، خارجية، فلل وصيانة.",
            "serviceType": ["تنسيق حدائق منزلية", "تنسيق حدائق خارجية", "تنسيق حدائق فلل", "صيانة حدائق"],
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "SAR",
              "lowPrice": "150",
              "highPrice": "250",
              "description": "سعر المتر المربع"
            }
          })
        }}
      />

      <Navbar />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-32 h-32 bg-green-600 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-600 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-teal-600 rounded-full blur-2xl" />
          </div>

          <div className="relative z-10 text-center max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex justify-center items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-8">
              <Link href="/" className="hover:text-green-600 transition-colors">الرئيسية</Link>
              <span>/</span>
              <Link href="/#services" className="hover:text-green-600 transition-colors">خدماتنا</Link>
              <span>/</span>
              <span className="text-green-600 font-medium">تنسيق حدائق</span>
            </nav>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              تنسيق حدائق في{' '}
              <span className="text-green-600">جدة</span>
              <br />
              حدائق تجمع بين الجمال والاستدامة
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              مؤسسة الديار العالمية - خبرة 15 عاماً في تصميم وتنسيق الحدائق المنزلية والعامة.
              تصاميم مبتكرة وأحدث التقنيات وأفضل النباتات المحلية
            </p>

            {/* Key Features */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-sm text-gray-600">
              {heroFeatures.map((feature, index) => (
                <div key={`landscaping-hero-${feature.text.replace(/\s+/g, '-')}`} className="flex items-center space-x-2 space-x-reverse">
                  <feature.icon className="w-4 h-4 text-green-600" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href="tel:+966553719009">
                <Button size="lg" className="text-lg px-8 py-4 bg-green-600 hover:bg-green-700">
                  <Phone className="w-5 h-5 mr-2" />
                  اتصل للاستشارة المجانية
                </Button>
              </Link>
              <Link href={whatsappURL} target="_blank">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-green-600 text-green-600 hover:bg-green-50">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  واتساب الآن
                </Button>
              </Link>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-8 w-16 h-16 bg-green-600/10 rounded-full blur-xl" />
          <div className="absolute bottom-1/4 right-8 w-20 h-20 bg-emerald-600/10 rounded-full blur-xl" />
        </section>

        {/* Garden Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                خدمات تنسيق الحدائق التي نقدمها
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                نحول أحلامكم إلى واقع أخضر جميل مع أحدث تقنيات تنسيق الحدائق
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {gardenFeatures.map((feature, index) => (
                <div key={`garden-feature-${feature.title.replace(/\s+/g, '-')}`} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {feature.features.map((item, idx) => (
                        <div key={`garden-item-${item.substring(0, 10).replace(/\s+/g, '-')}-${idx}`} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Landscaping Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                أنواع خدمات تنسيق الحدائق
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                حلول متكاملة لجميع أنواع الحدائق والمساحات الخضراء
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {landscapingServices.map((service, index) => (
                <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="md:flex">
                    <div className="md:w-1/2 relative h-64 md:h-auto">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                          {service.category}
                        </span>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <service.icon className="w-6 h-6 text-green-600" />
                          <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                          {service.description}
                        </p>
                        <div className="space-y-2 mb-4">
                          {service.features.map((feature, idx) => (
                            <div key={`portfolio-feature-${feature.substring(0, 10).replace(/\s+/g, '-')}-${idx}`} className="flex items-center gap-2 text-sm">
                              <Check className="w-4 h-4 text-green-600" />
                              <span className="text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-bold text-lg text-green-600">{service.price}</span>
                        </div>
                        <Link href={whatsappURL} target="_blank">
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            طلب عرض سعر
                            <ArrowLeft className="w-4 h-4 mr-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                لماذا تختار خدمات تنسيق الحدائق من الديار العالمية؟
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                نتميز بالخبرة والجودة والابتكار في تحويل أحلامكم إلى واقع أخضر
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseUs.map((reason, index) => (
                <div key={`why-choose-${reason.title.replace(/\s+/g, '-')}`} className="text-center bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <reason.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                  <p className="text-gray-600">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                إنجازاتنا في أرقام
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                أرقام تتحدث عن خبرتنا وجودة خدماتنا في مجال تنسيق الحدائق
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={`landscape-stat-${stat.label.replace(/\s+/g, '-')}`} className="text-center">
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
                معرض أعمالنا
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                مشاهدة مجموعة من أفضل مشاريع تنسيق الحدائق التي نفذناها
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
                      <Star key={`landscape-star-${testimonial.id}-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
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
                إجابات شاملة على أهم الأسئلة حول خدمات تنسيق الحدائق
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={`landscape-faq-${faq.question.substring(0, 20).replace(/\s+/g, '-')}-${index}`} className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
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
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              هل ترغب في حديقة أحلامك؟
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              تواصل معنا اليوم واحصل على استشارة مجانية وتصميم ثلاثي الأبعاد لحديقتك
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={whatsappURL} target="_blank">
                <Button size="lg" className="text-lg px-8 py-4 bg-white text-green-600 hover:bg-gray-100">
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
                اكتشف المزيد من خدماتنا المتميزة في مجال المظلات والإنشاءات
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedServices.map((service, index) => (
                <div key={`landscape-related-${service.title.replace(/\s+/g, '-')}`} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
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
                        <div key={`landscape-related-feature-${feature.substring(0, 10).replace(/\s+/g, '-')}-${idx}`} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link href={service.href}>
                      <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
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
