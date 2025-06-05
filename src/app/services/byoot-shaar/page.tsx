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
  Crown,
  Home,
  Building,
  TreePine,
  Check,
  Mail
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'بيوت شعر في جدة | مؤسسة الديار العالمية - أفضل تصاميم البيوت الشعبية',
  description: 'بيوت شعر ملكية وعربية تقليدية في جدة. تصميم وتنفيذ بيوت شعر فاخرة للمجالس والحدائق بأعلى معايير الجودة. اطلب عرض سعر مجاني الآن!',
  openGraph: {
    title: 'بيوت شعر في جدة | مؤسسة الديار العالمية',
    description: 'بيوت شعر ملكية وعربية تقليدية في جدة. تصميم وتنفيذ بيوت شعر فاخرة للمجالس والحدائق بأعلى معايير الجودة.',
    images: [
      {
        url: 'https://ext.same-assets.com/3073684241/1858852453.jpeg',
        width: 1200,
        height: 630,
        alt: 'بيوت شعر ملكية في جدة - مؤسسة الديار العالمية'
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
  { icon: Clock, text: 'تسليم سريع' }
];

const byootShaarTypes = [
  {
    id: 1,
    title: 'بيوت شعر ملكية',
    description: 'بيوت شعر ملكية فاخرة مصممة بأعلى معايير الجودة والرفاهية',
    image: 'https://ext.same-assets.com/3073684241/3661796902.jpeg',
    price: 'تبدأ من 8000 ريال',
    size: '6×8 متر',
    category: 'ملكية',
    features: ['تصميمات ملكية فاخرة', 'أقمشة عالية الجودة', 'تطريزات يدوية', 'إضاءة مميزة'],
    icon: Crown
  },
  {
    id: 2,
    title: 'بيوت شعر عربية',
    description: 'بيوت شعر بالطراز العربي التقليدي تعكس الأصالة والتراث',
    image: 'https://ext.same-assets.com/3073684241/566618696.jpeg',
    price: 'تبدأ من 6000 ريال',
    size: '5×7 متر',
    category: 'تراثية',
    features: ['طراز عربي أصيل', 'تصاميم تراثية', 'خامات تقليدية', 'جودة عالية'],
    icon: Home
  },
  {
    id: 3,
    title: 'بيوت شعر للمجالس',
    description: 'بيوت شعر مصممة خصيصاً للمجالس الرجالية بفخامة ورحابة',
    image: 'https://ext.same-assets.com/3073684241/95813410.jpeg',
    price: 'تبدأ من 7000 ريال',
    size: '8×10 متر',
    category: 'مجالس',
    features: ['تصاميم واسعة', 'جلسات مريحة', 'تهوية ممتازة', 'خصوصية تامة'],
    icon: Building
  },
  {
    id: 4,
    title: 'بيوت شعر للحدائق',
    description: 'بيوت شعر مصممة للحدائق المنزلية مع الحفاظ على الخصوصية',
    image: 'https://ext.same-assets.com/3073684241/1685504834.jpeg',
    price: 'تبدأ من 5000 ريال',
    size: '4×6 متر',
    category: 'حدائق',
    features: ['تصميمات خارجية', 'مقاومة للعوامل الجوية', 'إطلالات طبيعية', 'مساحات مفتوحة'],
    icon: TreePine
  }
];

const galleryImages = [
  {
    id: 1,
    src: 'https://ext.same-assets.com/3073684241/1206832505.jpeg',
    title: 'بيت شعر ملكي فاخر',
    category: 'بيوت شعر ملكية',
    description: 'بيت شعر ملكي بتصميم فاخر ومواصفات عالية'
  },
  {
    id: 2,
    src: 'https://ext.same-assets.com/3073684241/642393919.jpeg',
    title: 'بيت شعر عربي تقليدي',
    category: 'بيوت شعر عربية',
    description: 'بيت شعر بطراز عربي أصيل يحافظ على التراث'
  },
  {
    id: 3,
    src: 'https://ext.same-assets.com/3073684241/3714868902.jpeg',
    title: 'بيت شعر للمجالس',
    category: 'بيوت شعر مجالس',
    description: 'بيت شعر واسع مصمم خصيصاً للمجالس'
  },
  {
    id: 4,
    src: 'https://ext.same-assets.com/3073684241/3316960675.jpeg',
    title: 'بيت شعر للحدائق',
    category: 'بيوت شعر حدائق',
    description: 'بيت شعر مناسب للحدائق المنزلية'
  },
  {
    id: 5,
    src: 'https://ext.same-assets.com/3073684241/1467360701.jpeg',
    title: 'بيت شعر بتصميم عصري',
    category: 'تصاميم عصرية',
    description: 'بيت شعر بتصميم عصري وأنيق'
  },
  {
    id: 6,
    src: 'https://ext.same-assets.com/3073684241/2122556860.jpeg',
    title: 'بيت شعر مع ديكورات فاخرة',
    category: 'ديكورات داخلية',
    description: 'بيت شعر مع ديكورات داخلية فاخرة'
  },
  {
    id: 7,
    src: 'https://ext.same-assets.com/3073684241/2063912984.jpeg',
    title: 'بيت شعر مع إضاءة مميزة',
    category: 'إضاءة مميزة',
    description: 'بيت شعر مزود بإضاءة عصرية'
  },
  {
    id: 8,
    src: 'https://ext.same-assets.com/3073684241/901478804.jpeg',
    title: 'بيت شعر بتطريزات يدوية',
    category: 'تطريزات يدوية',
    description: 'بيت شعر مزين بتطريزات يدوية أصيلة'
  }
];

const stats = [
  { number: '500+', label: 'بيت شعر منفذ' },
  { number: '15+', label: 'سنة خبرة' },
  { number: '100%', label: 'رضا العملاء' },
  { number: '24/7', label: 'دعم فني' }
];

const testimonials = [
  {
    id: 1,
    name: 'أحمد محمد الغامدي',
    role: 'صاحب مزرعة - حي الصفا',
    content: 'بيت شعر رائع وتنفيذ ممتاز. الجودة عالية جداً والفريق محترف. أنصح بشدة بالتعامل مع مؤسسة الديار.',
    rating: 5,
    image: '/images/testimonials/client1.jpg'
  },
  {
    id: 2,
    name: 'فهد العتيبي',
    role: 'مهندس - حي النزهة',
    content: 'أفضل شركة بيوت شعر في جدة. التصميم راقي والخدمة ممتازة. التزموا بالموعد والجودة فاقت التوقعات.',
    rating: 5,
    image: '/images/testimonials/client2.jpg'
  },
  {
    id: 3,
    name: 'محمد الأحمدي',
    role: 'رجل أعمال - حي الروضة',
    content: 'تعامل راقي ومهني. بيت الشعر جاء بمواصفات عالية جداً وتسليم في الوقت المحدد. شكراً لكم.',
    rating: 5,
    image: '/images/testimonials/client3.jpg'
  }
];

const faqs = [
  {
    question: 'ما هي أنواع الأقمشة المستخدمة في بيوت الشعر؟',
    answer: 'نستخدم أجود أنواع الأقمشة المخصصة لبيوت الشعر مثل القماش الكوري عالي الجودة، والقماش الكتاني المعالج، وأقمشة البولي إيثيلين المقاومة للماء والحرارة، والأقمشة المطرزة المصنوعة خصيصاً لبيوت الشعر الملكية.'
  },
  {
    question: 'كم تستغرق مدة تنفيذ بيت الشعر؟',
    answer: 'تختلف مدة التنفيذ حسب حجم المشروع وتفاصيل التصميم، ولكن بشكل عام تتراوح بين 10-20 يوم للمشاريع المتوسطة، وقد تصل إلى 30 يوم للمشاريع الكبيرة والملكية.'
  },
  {
    question: 'هل يمكن تجهيز بيت الشعر بأنظمة تكييف وإضاءة؟',
    answer: 'نعم، نقدم خدمة تجهيز بيوت الشعر بأحدث أنظمة التكييف المركزي أو المنفصل، وأنظمة الإضاءة الداخلية والخارجية، وكافة التمديدات الكهربائية اللازمة.'
  },
  {
    question: 'هل تقدمون خدمة الصيانة لبيوت الشعر؟',
    answer: 'نعم، نقدم خدمة صيانة دورية شاملة تشمل فحص الهيكل المعدني، وتنظيف وصيانة الأقمشة، واستبدال أي أجزاء تالفة، وصيانة أنظمة الإضاءة والتكييف.'
  },
  {
    question: 'ما هي أحجام بيوت الشعر المتوفرة؟',
    answer: 'نوفر أحجام متنوعة تبدأ من 4×6 متر للحدائق المنزلية وتصل إلى 12×15 متر للمشاريع الكبيرة والملكية، مع إمكانية التصميم حسب المساحة المطلوبة.'
  },
  {
    question: 'هل تقدمون ضمان على بيوت الشعر؟',
    answer: 'نعم، نقدم ضمان شامل لمدة 10 سنوات على الهيكل المعدني وضمان 5 سنوات على الأقمشة، مع خدمة صيانة مجانية للسنة الأولى.'
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
    title: 'السواتر',
    description: 'سواتر عالية الجودة لحماية الخصوصية والأمان',
    image: 'https://ext.same-assets.com/3073684241/531069762.jpeg',
    href: '/services/sawater',
    features: ['سواتر حديدية', 'سواتر قماش', 'سواتر خشبية']
  }
];

export default function ByootShaarPage() {
  const whatsappMessage = "السلام عليكم، أريد الاستفسار عن خدمة بيوت الشعر وطلب عرض سعر."
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
            "name": "بيوت شعر في جدة",
            "provider": {
              "@type": "LocalBusiness",
              "name": "مؤسسة الديار العالمية",
              "image": "https://ext.same-assets.com/3073684241/1858852453.jpeg",
              "telephone": "+966553719009",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "جدة",
                "addressCountry": "SA"
              }
            },
            "areaServed": "جدة",
            "description": "أفضل بيوت شعر في جدة من مؤسسة الديار العالمية. بيوت شعر ملكية، عربية، للمجالس والحدائق.",
            "serviceType": ["بيوت شعر ملكية", "بيوت شعر عربية", "بيوت شعر مجالس", "بيوت شعر حدائق"],
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "SAR",
              "lowPrice": "5000",
              "highPrice": "15000"
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
              <span className="text-blue-600 font-medium">بيوت شعر</span>
            </nav>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              أفضل بيوت شعر في{' '}
              <span className="text-amber-600">جدة</span>
              <br />
              تراث أصيل وجودة عالية
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              مؤسسة الديار العالمية - خبرة 15 عاماً في تصميم وتنفيذ بيوت شعر ملكية وعربية تقليدية.
              أقمشة عالية الجودة، تصاميم أصيلة، وضمان شامل 10 سنوات
            </p>

            {/* Key Features */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-sm text-gray-600">
              {heroFeatures.map((feature) => (
                <div key={feature.text} className="flex items-center space-x-2 space-x-reverse">
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

        {/* Byoot Shaar Types Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                أنواع بيوت الشعر التي نقدمها
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                مجموعة متنوعة من بيوت الشعر لتناسب جميع احتياجاتك ومتطلباتك
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {byootShaarTypes.map((type, index) => (
                <div key={type.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="md:flex">
                    <div className="md:w-1/2 relative h-64 md:h-auto">
                      <Image
                        src={type.image}
                        alt={type.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                          {type.category}
                        </span>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <type.icon className="w-6 h-6 text-amber-600" />
                          <h3 className="text-xl font-bold text-gray-900">{type.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                          {type.description}
                        </p>
                        <div className="space-y-2 mb-4">
                          {type.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm">
                              <Check className="w-4 h-4 text-green-600" />
                              <span className="text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-gray-500">الحجم: {type.size}</span>
                          <span className="font-bold text-lg text-blue-600">{type.price}</span>
                        </div>
                        <Link href={whatsappURL} target="_blank">
                          <Button className="w-full">
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

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                إنجازاتنا في أرقام
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                أرقام تتحدث عن خبرتنا وجودة خدماتنا في مجال بيوت الشعر
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
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
                مشاهدة مجموعة من أفضل مشاريع بيوت الشعر التي نفذناها
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
                      <Star key={`star-${testimonial.id}-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
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
                إجابات شاملة على أهم الأسئلة حول خدمات بيوت الشعر
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={`faq-${faq.question.substring(0, 20).replace(/\s+/g, '-')}-${index}`} className="bg-white rounded-lg shadow-lg overflow-hidden">
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
              احصل على بيت شعر أحلامك الآن
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
                <div key={`service-${service.title.replace(/\s+/g, '-')}`} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
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
                        <div key={`feature-${feature.substring(0, 15).replace(/\s+/g, '-')}-${idx}`} className="flex items-center gap-2 text-sm">
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
