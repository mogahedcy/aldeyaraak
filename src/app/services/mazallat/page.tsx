import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Car,
  Shield,
  Sun,
  Droplets,
  CheckCircle,
  Phone,
  MessageCircle,
  ArrowLeft,
  Plus,
  Minus,
  Eye,
  Star,
  Award,
  Users,
  Clock,
  MapPin,
  Zap,
  ThumbsUp,
  Target
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'مظلات سيارات جدة | محترفين الديار العالمية - أفضل مظلات بأعلى جودة',
  description: 'أفضل مظلات سيارات في جدة من محترفين الديار العالمية. مظلات PVC، مظلات حدائق، مظلات مدارس ومسابح. تركيب احترافي وضمان 10 سنوات. اتصل الآن للحصول على عرض سعر مجاني.',
  keywords: 'مظلات سيارات جدة، مظلات PVC، مظلات حدائق جدة، مظلات مدارس، مظلات مسابح، تركيب مظلات، محترفين الديار العالمية',
  openGraph: {
    title: 'مظلات سيارات جدة | محترفين الديار العالمية',
    description: 'أفضل مظلات سيارات في جدة بأعلى جودة وأفضل الأسعار. خبرة 15 عاماً في تركيب المظلات.',
    images: [
      {
        url: 'https://ext.same-assets.com/2470837690/71406733.jpeg',
        width: 1200,
        height: 630,
        alt: 'مظلات سيارات جدة - محترفين الديار',
      },
    ],
  },
};

const heroFeatures = [
  { icon: MapPin, text: 'نخدم جميع أحياء جدة' },
  { icon: Clock, text: 'ضمان 10 سنوات شامل' },
  { icon: Star, text: 'أكثر من 5000 مشروع ناجح' }
];

const whyChooseUsFeatures = [
  {
    icon: Award,
    title: 'خبرة 15 عاماً',
    description: 'نحن رواد في مجال المظلات بخبرة تمتد لأكثر من 15 عاماً',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    icon: Shield,
    title: 'ضمان شامل 10 سنوات',
    description: 'ضمان طويل المدى على جميع أعمالنا وخاماتنا المستخدمة',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    icon: Users,
    title: 'فريق متخصص',
    description: 'مهندسون وفنيون متخصصون ومدربون على أعلى مستوى',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    icon: Zap,
    title: 'تنفيذ سريع',
    description: 'سرعة في التنفيذ مع الحفاظ على أعلى معايير الجودة',
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600'
  },
  {
    icon: ThumbsUp,
    title: 'رضا العملاء',
    description: 'نسبة رضا عملاء تصل إلى 99% وتقييمات ممتازة',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600'
  },
  {
    icon: Target,
    title: 'أسعار تنافسية',
    description: 'أفضل الأسعار في السوق مع جودة عالية لا تُضاهى',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600'
  }
];

const shadeTypes = [
  {
    id: 'cars',
    title: 'مظلات سيارات',
    description: 'مظلات مواقف السيارات بمختلف المقاسات والأشكال، توفر حماية كاملة للسيارات من أشعة الشمس والأمطار.',
    image: 'https://ext.same-assets.com/2470837690/3897470258.jpeg',
    features: ['حماية من الأشعة فوق البنفسجية', 'مقاومة للأمطار', 'تصاميم متنوعة'],
    price: 'تبدأ من 2,500 ريال',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    id: 'gardens',
    title: 'مظلات حدائق',
    description: 'مظلات للحدائق المنزلية والعامة بتصميمات عصرية وخامات عالية الجودة تضيف لمسة جمالية للمكان.',
    image: 'https://ext.same-assets.com/2470837690/3049632715.jpeg',
    features: ['تصاميم جمالية', 'مقاومة للعوامل الجوية', 'ألوان متنوعة'],
    price: 'تبدأ من 3,000 ريال',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    id: 'schools',
    title: 'مظلات مدارس',
    description: 'مظلات للمدارس والمؤسسات التعليمية، توفر بيئة آمنة للطلاب والمعلمين وتحميهم من العوامل الجوية.',
    image: 'https://ext.same-assets.com/2470837690/3504524629.jpeg',
    features: ['مساحات واسعة', 'أمان عالي', 'متانة ممتازة'],
    price: 'تبدأ من 5,000 ريال',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    id: 'pools',
    title: 'مظلات مسابح',
    description: 'مظلات للمسابح تحمي من أشعة الشمس وتحافظ على نظافة المسبح، مع توفير تهوية مناسبة.',
    image: 'https://ext.same-assets.com/2470837690/1807765189.jpeg',
    features: ['حماية المسبح', 'تهوية ممتازة', 'مقاومة للكلور'],
    price: 'تبدأ من 4,000 ريال',
    bgColor: 'bg-cyan-50',
    iconColor: 'text-cyan-600'
  }
];

const galleryImages = [
  {
    id: 1,
    src: 'https://ext.same-assets.com/2470837690/1414337162.jpeg',
    title: 'مظلات سيارات في مجمع سكني',
    category: 'مظلات سيارات',
    description: 'مشروع مظلات سيارات متعدد في مجمع سكني راقي بجدة'
  },
  {
    id: 2,
    src: 'https://ext.same-assets.com/2470837690/2164257014.jpeg',
    title: 'مظلات حدائق فاخرة',
    category: 'مظلات حدائق',
    description: 'تصميم مظلات حدائق عصرية وأنيقة لفيلا في شمال جدة'
  },
  {
    id: 3,
    src: 'https://ext.same-assets.com/2470837690/3651157645.jpeg',
    title: 'مظلات مدارس واسعة',
    category: 'مظلات مدارس',
    description: 'مظلات مدرسة ابتدائية تستوعب 500 طالب في جنوب جدة'
  },
  {
    id: 4,
    src: 'https://ext.same-assets.com/2470837690/1278764839.jpeg',
    title: 'مظلات مسابح فاخرة',
    category: 'مظلات مسابح',
    description: 'مظلات مسبح أولمبي في نادي رياضي راقي'
  },
  {
    id: 5,
    src: 'https://ext.same-assets.com/2470837690/2377535824.jpeg',
    title: 'مظلات PVC عالية الجودة',
    category: 'مظلات PVC',
    description: 'مظلات PVC مقاومة للحرارة في موقف تجاري'
  },
  {
    id: 6,
    src: 'https://ext.same-assets.com/2470837690/2202899246.jpeg',
    title: 'مظلات حديد مشغول',
    category: 'مظلات حديدية',
    description: 'مظلات حديد مشغول بتصميمات فنية رائعة'
  },
  {
    id: 7,
    src: 'https://ext.same-assets.com/2470837690/3367547583.jpeg',
    title: 'مظلات مداخل فلل',
    category: 'مظلات مداخل',
    description: 'مظلات أنيقة لمداخل الفلل الفاخرة'
  },
  {
    id: 8,
    src: 'https://ext.same-assets.com/2470837690/1754448353.jpeg',
    title: 'مظلات لكسان',
    category: 'مظلات لكسان',
    description: 'مظلات لكسان شفافة للإضاءة الطبيعية'
  }
];

const stats = [
  { number: '5000+', label: 'مشروع مكتمل' },
  { number: '15+', label: 'سنة خبرة' },
  { number: '99%', label: 'رضا العملاء' },
  { number: '24/7', label: 'خدمة العملاء' }
];

const testimonials = [
  {
    id: 1,
    name: 'أحمد المحمدي',
    role: 'صاحب فيلا - حي الزهراء',
    content: 'خدمة ممتازة وجودة عالية في التنفيذ. فريق محترف والتزام في المواعيد. أنصح بشدة بالتعامل مع محترفين الديار.',
    rating: 5,
    image: '/images/testimonials/client1.jpg'
  },
  {
    id: 2,
    name: 'سارة العتيبي',
    role: 'مديرة مدرسة - حي النعيم',
    content: 'ركبوا لنا مظلات للمدرسة بجودة عالية وسعر مناسب. الطلاب محميين من الشمس والأمطار. شكراً لفريق محترفين الديار.',
    rating: 5,
    image: '/images/testimonials/client2.jpg'
  },
  {
    id: 3,
    name: 'محمد الغامدي',
    role: 'مالك مجمع تجاري - وسط جدة',
    content: 'تم تركيب مظلات مواقف السيارات للمجمع التجاري. العمل احترافي والخامات ممتازة. العملاء راضين جداً.',
    rating: 5,
    image: '/images/testimonials/client3.jpg'
  }
];

const faqs = [
  {
    id: 1,
    question: 'ما هي أفضل أنواع المظلات للسيارات في جدة؟',
    answer: 'تعتبر مظلات PVC ومظلات القماش المعالج ومظلات اللكسان من أفضل الأنواع للسيارات في مناخ جدة. مظلات PVC هي الأكثر انتشارًا بسبب متانتها وقدرتها على عزل الحرارة وسعرها المناسب، بينما مظلات اللكسان توفر شفافية وإضاءة طبيعية.'
  },
  {
    id: 2,
    question: 'كم تبلغ مدة تنفيذ مشروع المظلات؟',
    answer: 'تختلف مدة التنفيذ حسب حجم المشروع ونوع المظلة. للمشاريع الصغيرة (1-4 مظلات): 3-5 أيام، للمشاريع المتوسطة (5-15 مظلة): 7-10 أيام، للمشاريع الكبيرة (أكثر من 15 مظلة): 2-3 أسابيع.'
  },
  {
    id: 3,
    question: 'ما هو الضمان المقدم على المظلات؟',
    answer: 'نقدم ضمان شامل يصل إلى 10 سنوات على المظلات حسب نوع الخامة المستخدمة. يشمل الضمان: جودة التركيب والخامات، مقاومة العوامل الجوية، الصيانة الدورية المجانية للسنة الأولى.'
  },
  {
    id: 4,
    question: 'هل تقومون بالصيانة الدورية للمظلات؟',
    answer: 'نعم، نقدم خدمة صيانة دورية شاملة تشمل: تنظيف المظلات، فحص الهيكل المعدني، تشحيم المفاصل، استبدال القطع التالفة. الصيانة مجانية للسنة الأولى ثم بأسعار مدروسة.'
  },
  {
    id: 5,
    question: 'ما هي تكلفة تركيب مظلات السيارات؟',
    answer: 'تبدأ أسعار مظلات السيارات من 2,500 ريال للمظلة الواحدة وتختلف حسب: نوع الخامة المستخدمة، حجم المظلة، تعقيد التصميم، الموقع الجغرافي. نقدم عروض أسعار مجانية مع إمكانية التقسيط.'
  },
  {
    id: 6,
    question: 'هل تخدمون جميع مناطق جدة؟',
    answer: 'نعم، نخدم جميع أحياء ومناطق جدة بما في ذلك: شمال جدة (أبحر، الشاطئ، النهضة)، وسط جدة (العزيزية، البلد، الحمراء)، شرق جدة (الفيصلية، النزهة، الروضة)، جنوب جدة (الصفا، المروة، برايمان).'
  }
];

const relatedServices = [
  {
    id: 'sawater',
    title: 'السواتر',
    description: 'تركيب سواتر بمختلف الأنواع والخامات لتوفير الخصوصية والحماية.',
    image: 'https://ext.same-assets.com/2470837690/531069762.jpeg',
    href: '/services/sawater',
    features: ['سواتر قماش', 'سواتر حديد', 'سواتر خشبية']
  },
  {
    id: 'pergolas',
    title: 'البرجولات',
    description: 'تصميم وتنفيذ برجولات خشبية وحديدية بأشكال عصرية.',
    image: 'https://ext.same-assets.com/2470837690/3318001237.jpeg',
    href: '/services/pergolas',
    features: ['برجولات خشبية', 'برجولات حديدية', 'برجولات مختلطة']
  },
  {
    id: 'khayyam',
    title: 'خيام ملكية',
    description: 'تصميم وتنفيذ خيام ملكية فاخرة للمناسبات والاحتفالات.',
    image: 'https://ext.same-assets.com/2470837690/1914607147.jpeg',
    href: '/services/khayyam',
    features: ['خيام أفراح', 'خيام استراحات', 'خيام مناسبات']
  }
];

// قسم المقالات الجديد
const articlesData = [
  {
    id: 1,
    title: 'أهمية مظلات السيارات في المناخ السعودي',
    excerpt: 'تعرف على الفوائد الأساسية لمظلات السيارات في حماية سيارتك من الحرارة العالية والعوامل الجوية في المملكة العربية السعودية.',
    image: '/uploads/mazallat-1.jpg',
    author: 'فريق محترفين الديار',
    publishDate: '2024-01-15',
    readTime: '5 دقائق'
  },
  {
    id: 2,
    title: 'أنواع مظلات السيارات وأفضل الخيارات لمنزلك',
    excerpt: 'دليل شامل لأنواع مظلات السيارات المختلفة ومميزات كل نوع لمساعدتك في اختيار الأنسب لاحتياجاتك.',
    image: '/uploads/mazallat-2.jpg',
    author: 'فريق محترفين الديار',
    publishDate: '2024-01-10',
    readTime: '7 دقائق'
  },
  {
    id: 3,
    title: 'كيفية اختيار المقاول المناسب لتركيب مظلات السيارات',
    excerpt: 'نصائح مهمة لاختيار أفضل مقاول لتركيب مظلات السيارات في جدة وضمان الحصول على خدمة عالية الجودة.',
    image: '/uploads/mazallat-1.jpg',
    author: 'فريق محترفين الديار',
    publishDate: '2024-01-05',
    readTime: '6 دقائق'
  }
];

export default function MazallatPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "مظلات سيارات جدة",
            "provider": {
              "@type": "LocalBusiness",
              "name": "محترفين الديار",
              "image": "https://ext.same-assets.com/2470837690/71406733.jpeg",
              "telephone": "+966553719009",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "جدة",
                "addressCountry": "SA"
              }
            },
            "areaServed": "جدة",
            "description": "أفضل مظلات سيارات في جدة من محترفين الديار. مظلات PVC، مظلات حدائق، مظلات مدارس ومسابح.",
            "serviceType": ["مظلات سيارات", "مظلات حدائق", "مظلات مدارس", "مظلات مسابح"],
            "offers": {
              "@type": "AggregateOffer",
              "lowPrice": "2500",
              "highPrice": "10000",
              "priceCurrency": "SAR"
            }
          })
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10 py-20 lg:py-32 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Breadcrumb */}
              <div className="inline-flex items-center space-x-2 space-x-reverse bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-8">
                <Link href="/" className="hover:text-accent transition-colors">الرئيسية</Link>
                <span>/</span>
                <Link href="/#services" className="hover:text-accent transition-colors">خدماتنا</Link>
                <span>/</span>
                <span>مظلات السيارات</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                أفضل مظلات سيارات في{' '}
                <span className="text-accent">جدة</span>
                <br />
                جودة عالية وأسعار منافسة
              </h1>

              {/* Subheading */}
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
                محترفين الديار - خبرة 15 عاماً في تركيب أفضل مظلات السيارات والحدائق والمدارس في جدة.
                مظلات PVC عالية الجودة، تصاميم عصرية، وضمان شامل 10 سنوات
              </p>

              {/* Key Features */}
              <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-sm text-muted-foreground">
                {heroFeatures.map((feature, index) => (
                  <div key={`mazallat-hero-${feature.text.replace(/\s+/g, '-')}`} className="flex items-center space-x-2 space-x-reverse">
                    <feature.icon className="w-4 h-4 text-accent" />
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
                <Link href="https://wa.me/+966553719009" target="_blank">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    واتساب الآن
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-8 w-16 h-16 bg-accent/10 rounded-full blur-xl" />
          <div className="absolute bottom-1/4 right-8 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
        </section>

        {/* Services Types Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                أنواع المظلات المتخصصة
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                نقدم مجموعة شاملة من المظلات عالية الجودة تناسب جميع الاحتياجات
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {shadeTypes.map((service) => (
                <div
                  key={service.id}
                  className="group hover:shadow-xl transition-all duration-300 bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  {/* Service Header */}
                  <div className={`${service.bgColor} p-6 text-center relative`}>
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${service.iconColor} rounded-full bg-white/80 mb-4`}>
                      <Car className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-primary">{service.title}</h3>
                  </div>

                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Service Content */}
                  <div className="p-6">
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, index) => (
                        <li key={`mazallat-service-feature-${feature.substring(0, 10).replace(/\s+/g, '-')}-${index}`} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Price */}
                    <div className="text-lg font-bold text-accent mb-4">
                      {service.price}
                    </div>

                    {/* CTA Button */}
                    <Link href={`https://wa.me/+966553719009?text=أرغب في الحصول على عرض سعر لـ ${service.title}`} target="_blank">
                      <Button className="w-full group-hover:bg-accent transition-colors">
                        اطلب عرض سعر
                        <ArrowLeft className="w-4 h-4 mr-2" />
                      </Button>
                    </Link>
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
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                لماذا نحن الخيار الأفضل لمظلات جدة؟
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                نحن نقدم أفضل خدمات المظلات في جدة بجودة عالية وخبرة متميزة
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {stats.map((stat, index) => (
                <div key={`mazallat-stat-${stat.label.replace(/\s+/g, '-')}`} className="text-center bg-gradient-to-br from-accent/5 to-primary/5 rounded-2xl p-6">
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {whyChooseUsFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={`mazallat-why-feature-${feature.title.replace(/\s+/g, '-')}`} className="group hover:shadow-xl transition-all duration-300 bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    {/* Feature Header */}
                    <div className={`${feature.bgColor} p-6 text-center relative`}>
                      <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.iconColor} rounded-full bg-white/80 mb-4`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-primary">{feature.title}</h3>
                    </div>

                    {/* Feature Content */}
                    <div className="p-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Portfolio Gallery Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                معرض أعمالنا المتميزة
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                اطلع على مجموعة من أفضل مشاريعنا المكتملة في مختلف أنحاء جدة
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {galleryImages.map((image) => (
                <div key={image.id} className="group relative overflow-hidden rounded-2xl bg-gray-200 aspect-square hover:shadow-xl transition-all duration-300">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-sm mb-1">{image.title}</h3>
                    <p className="text-xs opacity-90 mb-2">{image.category}</p>
                    <p className="text-xs opacity-80 line-clamp-2">{image.description}</p>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/portfolio">
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  عرض المزيد من المشاريع
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Articles Section - القسم الجديد */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                مقالات ونصائح حول مظلات السيارات
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                اكتشف كل ما تحتاج لمعرفته حول مظلات السيارات من خلال مقالاتنا التعليمية المفيدة
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articlesData.map((article) => (
                <article key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <span>{article.author}</span>
                      <span className="mx-2">•</span>
                      <span>{article.publishDate}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-primary mb-3 leading-tight">
                      {article.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <Button variant="outline" className="w-full group hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                      <span>قراءة المقال كاملاً</span>
                      <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="px-8 py-4">
                <span>عرض جميع المقالات</span>
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                ماذا يقول عملاؤنا
              </h2>
              <p className="text-lg text-muted-foreground">
                تقييمات حقيقية من عملائنا الكرام
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={`mazallat-testimonial-${testimonial.id || testimonial.author}-${i}`} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                الأسئلة الشائعة حول مظلات السيارات
              </h2>
              <p className="text-lg text-muted-foreground">
                إجابات شاملة على أهم استفساراتكم
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-primary mb-3 flex items-start">
                      <div className="bg-accent/10 text-accent rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                        <Plus className="w-4 h-4" />
                      </div>
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed pr-10">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                خدمات أخرى قد تهمك
              </h2>
              <p className="text-lg text-muted-foreground">
                استكشف المزيد من خدماتنا المتخصصة
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((service) => (
                <div key={service.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>

                    {/* Features */}
                    <ul className="space-y-1 mb-6">
                      {service.features.map((feature, index) => (
                        <li key={`mazallat-related-service-${feature.substring(0, 10).replace(/\s+/g, '-')}-${index}`} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-3 h-3 text-green-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link href={service.href}>
                      <Button className="w-full group-hover:bg-accent transition-colors">
                        عرض التفاصيل
                        <ArrowLeft className="w-4 h-4 mr-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              جاهز لتركيب مظلات عالية الجودة؟
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              احصل على استشارة مجانية وعرض سعر تنافسي من خبراء محترفين الديار
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="tel:+966553719009">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
                  <Phone className="w-5 h-5 mr-2" />
                  اتصل الآن - مجاني
                </Button>
              </Link>
              <Link href="https://wa.me/+966553719009" target="_blank">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  واتساب فوري
                </Button>
              </Link>
              <Link href="https://wa.me/+966553719009?text=أرغب في الحصول على عرض سعر لمظلات السيارات" target="_blank">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                  طلب عرض سعر
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
