import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Crown,
  Shield,
  Star,
  Users,
  CheckCircle,
  Phone,
  MessageCircle,
  ArrowLeft,
  Plus,
  Eye,
  Award,
  Clock,
  MapPin,
  Zap,
  ThumbsUp,
  Target,
  Sparkles,
  Heart,
  Gift
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'خيام ملكية جدة | محترفين الديار العالمية - أفضل خيام فاخرة للمناسبات',
  description: 'أفضل خيام ملكية فاخرة في جدة من محترفين الديار العالمية. خيام أفراح، خيام مناسبات، خيام VIP، خيام عزاء. تصميم وتنفيذ احترافي وضمان شامل. اتصل الآن للحصول على عرض سعر مجاني.',
  keywords: 'خيام ملكية جدة، خيام أفراح، خيام مناسبات، خيام VIP، خيام عزاء، خيام فاخرة، تأجير خيام، محترفين الديار العالمية',
  openGraph: {
    title: 'خيام ملكية جدة | محترفين الديار العالمية',
    description: 'أفضل خيام ملكية فاخرة في جدة بأعلى جودة وأفضل الأسعار. خبرة 15 عاماً في تصميم وتنفيذ الخيام الملكية.',
    images: [
      {
        url: 'https://ext.same-assets.com/200922472/870035748.jpeg',
        width: 1200,
        height: 630,
        alt: 'خيام ملكية جدة - محترفين الديار',
      },
    ],
  },
};

const heroFeatures = [
  { icon: MapPin, text: 'نخدم جميع أحياء جدة' },
  { icon: Clock, text: 'ضمان 10 سنوات شامل' },
  { icon: Star, text: 'أكثر من 1000 خيمة منجزة' }
];

const whyChooseUsFeatures = [
  {
    icon: Crown,
    title: 'تصاميم ملكية فاخرة',
    description: 'تصاميم ملكية حصرية تجمع بين الأصالة والفخامة العصرية',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    icon: Sparkles,
    title: 'خامات مستوردة عالية الجودة',
    description: 'أجود أنواع الأقمشة والخامات المستوردة المقاومة للعوامل الجوية',
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-600'
  },
  {
    icon: Users,
    title: 'فريق متخصص محترف',
    description: 'مصممون ومهندسون متخصصون في الخيام الملكية والمناسبات',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    icon: Zap,
    title: 'تنفيذ سريع ومتقن',
    description: 'سرعة في التركيب والتنفيذ مع الحفاظ على أعلى معايير الجودة',
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600'
  },
  {
    icon: Heart,
    title: 'خدمة عملاء مميزة',
    description: 'خدمة عملاء متاحة 24/7 لضمان رضاكم وراحتكم التامة',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600'
  },
  {
    icon: Gift,
    title: 'باقات شاملة متكاملة',
    description: 'باقات شاملة تشمل التصميم والتركيب والديكور والتجهيزات',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  }
];

const tentTypes = [
  {
    id: 'royal-luxury',
    title: 'خيام ملكية فاخرة',
    description: 'خيام ملكية فاخرة ذات تصميم راقي ومميز، مجهزة بكافة وسائل الراحة، مناسبة للمناسبات الرسمية واستقبال كبار الشخصيات.',
    image: 'https://ext.same-assets.com/200922472/870035748.jpeg',
    features: ['تصاميم حصرية فاخرة', 'أقمشة مستوردة عالية الجودة', 'تجهيزات VIP كاملة'],
    price: 'تبدأ من 15,000 ريال',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    capacity: 'تتسع من 50-500 شخص'
  },
  {
    id: 'wedding-events',
    title: 'خيام أفراح ومناسبات',
    description: 'خيام مصممة خصيصاً للأفراح والمناسبات الخاصة، تتميز بالفخامة والرحابة وإمكانية تجهيزها حسب طبيعة المناسبة.',
    image: 'https://ext.same-assets.com/200922472/3473190553.jpeg',
    features: ['تصاميم رومانسية أنيقة', 'إضاءة مميزة وديكورات', 'مساحات واسعة مريحة'],
    price: 'تبدأ من 10,000 ريال',
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-600',
    capacity: 'تتسع من 100-800 شخص'
  },
  {
    id: 'mourning',
    title: 'خيام عزاء',
    description: 'خيام مخصصة لمجالس العزاء، مصممة بشكل يوفر الراحة والخصوصية ويتناسب مع طبيعة المناسبة.',
    image: 'https://ext.same-assets.com/200922472/1836008776.jpeg',
    features: ['تصاميم محتشمة مناسبة', 'تهوية وإضاءة مريحة', 'خصوصية تامة'],
    price: 'تبدأ من 8,000 ريال',
    bgColor: 'bg-gray-50',
    iconColor: 'text-gray-600',
    capacity: 'تتسع من 50-400 شخص'
  },
  {
    id: 'vip',
    title: 'خيام VIP',
    description: 'خيام VIP ذات مواصفات خاصة وتجهيزات استثنائية، مصممة لتلبية متطلبات كبار الشخصيات والمناسبات الرفيعة.',
    image: 'https://ext.same-assets.com/200922472/1549714147.jpeg',
    features: ['مواصفات استثنائية', 'تجهيزات تقنية متطورة', 'خدمة شخصية مميزة'],
    price: 'تبدأ من 20,000 ريال',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    capacity: 'تتسع من 30-300 شخص'
  }
];

const galleryImages = [
  {
    id: 1,
    src: 'https://ext.same-assets.com/200922472/1754028587.jpeg',
    title: 'خيمة ملكية فاخرة',
    category: 'خيام ملكية',
    description: 'خيمة ملكية بتصميم فاخر وديكورات داخلية مميزة'
  },
  {
    id: 2,
    src: 'https://ext.same-assets.com/200922472/3473190553.jpeg',
    title: 'خيمة أفراح أنيقة',
    category: 'خيام أفراح',
    description: 'خيمة زفاف بتصميم رومانسي وإضاءة ساحرة'
  },
  {
    id: 3,
    src: 'https://ext.same-assets.com/200922472/1836008776.jpeg',
    title: 'خيمة مناسبات',
    category: 'خيام مناسبات',
    description: 'خيمة مناسبات بمساحة واسعة وتجهيزات كاملة'
  },
  {
    id: 4,
    src: 'https://ext.same-assets.com/200922472/1549714147.jpeg',
    title: 'خيمة VIP حصرية',
    category: 'خيام VIP',
    description: 'خيمة VIP بمواصفات استثنائية وتجهيزات فاخرة'
  },
  {
    id: 5,
    src: 'https://ext.same-assets.com/200922472/1202963034.jpeg',
    title: 'خيمة بتصميم عصري',
    category: 'خيام عصرية',
    description: 'خيمة بتصميم عصري يجمع بين الأصالة والحداثة'
  },
  {
    id: 6,
    src: 'https://ext.same-assets.com/200922472/1656897895.jpeg',
    title: 'خيمة بديكورات فاخرة',
    category: 'خيام فاخرة',
    description: 'خيمة بديكورات داخلية فاخرة وإضاءة مميزة'
  },
  {
    id: 7,
    src: 'https://ext.same-assets.com/200922472/2436778414.jpeg',
    title: 'خيمة بإضاءة مبتكرة',
    category: 'خيام مضيئة',
    description: 'خيمة بنظام إضاءة مبتكر ومميز'
  },
  {
    id: 8,
    src: 'https://ext.same-assets.com/200922472/1287770187.jpeg',
    title: 'خيمة بتصميم فريد',
    category: 'خيام مميزة',
    description: 'خيمة بتصميم فريد ومبتكر للمناسبات الخاصة'
  }
];

const stats = [
  { number: '1000+', label: 'خيمة منجزة' },
  { number: '15+', label: 'سنة خبرة' },
  { number: '98%', label: 'رضا العملاء' },
  { number: '24/7', label: 'خدمة متواصلة' }
];

const testimonials = [
  {
    id: 1,
    name: 'عبدالله السعودي',
    role: 'منظم مناسبات - حي الروضة',
    content: 'خيام ملكية بجودة استثنائية وخدمة احترافية. تم تنفيذ حفل زفاف ابنتي بشكل مثالي والضيوف كانوا معجبين جداً بالتصميم والتنظيم.',
    rating: 5,
    image: '/images/testimonials/client1.jpg'
  },
  {
    id: 2,
    name: 'فاطمة المحمدي',
    role: 'صاحبة قاعة أفراح - حي النعيم',
    content: 'تعاملت مع محترفين الديار في عدة مناسبات. دائماً ما يقدمون خيام فاخرة بتصاميم مميزة وخدمة عملاء ممتازة. أنصح بهم بقوة.',
    rating: 5,
    image: '/images/testimonials/client2.jpg'
  },
  {
    id: 3,
    name: 'خالد الغامدي',
    role: 'رجل أعمال - شمال جدة',
    content: 'استأجرت خيمة VIP لمؤتمر شركتي. الخيمة كانت فاخرة جداً والتجهيزات التقنية متطورة. خدمة احترافية من البداية للنهاية.',
    rating: 5,
    image: '/images/testimonials/client3.jpg'
  }
];

const faqs = [
  {
    id: 1,
    question: 'ما هي أنواع المناسبات المناسبة للخيام الملكية؟',
    answer: 'الخيام الملكية مناسبة لجميع المناسبات: حفلات الزفاف والخطوبة، الاحتفالات العائلية، المؤتمرات والندوات، المعارض التجارية، المناسبات الرسمية والحكومية، مجالس العزاء، الفعاليات الثقافية والرياضية، وحفلات التخرج. نصمم كل خيمة حسب طبيعة المناسبة والمتطلبات الخاصة.'
  },
  {
    id: 2,
    question: 'ما هي المساحات والسعات المتوفرة للخيام الملكية؟',
    answer: 'نوفر خيام بمساحات متنوعة تبدأ من 50 متر مربع (تتسع 30-50 شخص) وتصل إلى 2000 متر مربع أو أكثر (تتسع أكثر من 1000 شخص). يمكن تصميم الخيام حسب المساحة المتاحة والعدد المتوقع، مع إمكانية دمج عدة خيام أو تقسيمها لقاعات متعددة.'
  },
  {
    id: 3,
    question: 'ما هي التجهيزات والخدمات المشمولة مع الخيمة؟',
    answer: 'نقدم خدمة شاملة تتضمن: التصميم والتركيب المحترف، الديكورات الداخلية الفاخرة، أنظمة الإضاءة المتطورة (LED وثريات)، أنظمة التكييف والتهوية، الأثاث الفاخر (طاولات، كراسي، أرائك VIP)، السجاد والمفروشات، أنظمة الصوت والفيديو، المنصات وطاولات الشرف، والديكورات الخارجية.'
  },
  {
    id: 4,
    question: 'كم تبلغ مدة تركيب وفك الخيمة الملكية؟',
    answer: 'مدة التركيب تختلف حسب حجم الخيمة وتعقيد التصميم: الخيام الصغيرة (50-100 شخص): 4-6 ساعات، الخيام المتوسطة (100-300 شخص): 8-12 ساعة، الخيام الكبيرة (300+ شخص): 1-2 يوم. نبدأ التركيب قبل المناسبة بـ 24-48 ساعة، ونقوم بالفك خلال 4-8 ساعات بعد انتهاء المناسبة.'
  },
  {
    id: 5,
    question: 'ما هي تكلفة استئجار الخيام الملكية؟',
    answer: 'تبدأ أسعار الخيام من 8,000 ريال وتختلف حسب: نوع الخيمة والتصميم، المساحة وعدد الضيوف، مستوى التجهيزات والديكورات، مدة الاستئجار، الموقع والمسافة. نقدم باقات شاملة وعروض خاصة للمناسبات الكبيرة مع إمكانية التفاوض والتقسيط.'
  },
  {
    id: 6,
    question: 'هل تقدمون خدمات إضافية مع الخيام؟',
    answer: 'نعم، نقدم خدمات إضافية شاملة: تنسيق الورود والديكورات، خدمة الأمن والحراسة، خدمة الضيافة والطعام (بالشراكة مع أفضل المطاعم)، التصوير والفيديو، الموسيقى والفرق الشعبية، تنظيم الفعاليات والأنشطة، وخدمة التنظيف قبل وبعد المناسبة.'
  }
];

const relatedServices = [
  {
    id: 'mazallat',
    title: 'المظلات',
    description: 'تصميم وتنفيذ مختلف أنواع المظلات للسيارات والحدائق والمسابح.',
    image: 'https://ext.same-assets.com/200922472/2205790480.jpeg',
    href: '/services/mazallat',
    features: ['مظلات سيارات', 'مظلات حدائق', 'مظلات مسابح']
  },
  {
    id: 'sawater',
    title: 'السواتر',
    description: 'تركيب سواتر بمختلف الأنواع والخامات لتوفير الخصوصية والحماية.',
    image: 'https://ext.same-assets.com/200922472/531069762.jpeg',
    href: '/services/sawater',
    features: ['سواتر قماش', 'سواتر حديد', 'سواتر خشبية']
  },
  {
    id: 'byoot-shaar',
    title: 'بيوت شعر',
    description: 'تصميم وتنفيذ بيوت شعر تراثية بتصاميم أصيلة وحديثة.',
    image: 'https://ext.same-assets.com/200922472/60439396.jpeg',
    href: '/services/byoot-shaar',
    features: ['بيوت شعر تراثية', 'تصاميم عصرية', 'خامات أصيلة']
  }
];

export default function KhayyamPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "خيام ملكية جدة",
            "provider": {
              "@type": "LocalBusiness",
              "name": "محترفين الديار",
              "image": "https://ext.same-assets.com/200922472/870035748.jpeg",
              "telephone": "+966553719009",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "جدة",
                "addressCountry": "SA"
              }
            },
            "areaServed": "جدة",
            "description": "أفضل خيام ملكية فاخرة في جدة من محترفين الديار. خيام أفراح، خيام مناسبات، خيام VIP، خيام عزاء.",
            "serviceType": ["خيام ملكية فاخرة", "خيام أفراح", "خيام مناسبات", "خيام VIP", "خيام عزاء"],
            "offers": {
              "@type": "AggregateOffer",
              "lowPrice": "8000",
              "highPrice": "50000",
              "priceCurrency": "SAR"
            }
          })
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple/5 via-accent/5 to-pink/10 py-20 lg:py-32 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-purple/5 to-pink/5" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Breadcrumb */}
              <div className="inline-flex items-center space-x-2 space-x-reverse bg-purple/10 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <Link href="/" className="hover:text-purple-700 transition-colors">الرئيسية</Link>
                <span>/</span>
                <Link href="/#services" className="hover:text-purple-700 transition-colors">خدماتنا</Link>
                <span>/</span>
                <span>الخيام الملكية</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                أفضل خيام ملكية فاخرة في{' '}
                <span className="text-purple-600">جدة</span>
                <br />
                تصاميم حصرية وفخامة استثنائية
              </h1>

              {/* Subheading */}
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
                محترفين الديار - خبرة 15 عاماً في تصميم وتنفيذ أفضل الخيام الملكية الفاخرة في جدة.
                خيام أفراح، مناسبات، VIP وعزاء بأجود الخامات المستوردة وضمان شامل
              </p>

              {/* Key Features */}
              <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-sm text-muted-foreground">
                {heroFeatures.map((feature, index) => (
                  <div key={`hero-feature-${feature.text.replace(/\s+/g, '-')}`} className="flex items-center space-x-2 space-x-reverse">
                    <feature.icon className="w-4 h-4 text-purple-600" />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Link href="tel:+966553719009">
                  <Button size="lg" className="text-lg px-8 py-4 bg-purple-600 hover:bg-purple-700">
                    <Phone className="w-5 h-5 mr-2" />
                    اتصل للاستشارة المجانية
                  </Button>
                </Link>
                <Link href="https://wa.me/+966553719009" target="_blank">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-purple-600 text-purple-600 hover:bg-purple-50">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    واتساب الآن
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-8 w-16 h-16 bg-purple/10 rounded-full blur-xl" />
          <div className="absolute bottom-1/4 right-8 w-20 h-20 bg-pink/10 rounded-full blur-xl" />
        </section>

        {/* Tent Types Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                أنواع الخيام الملكية المتخصصة
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                نقدم مجموعة متنوعة من الخيام الملكية الفاخرة لجميع المناسبات والاحتياجات
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tentTypes.map((tent) => (
                <div
                  key={tent.id}
                  className="group hover:shadow-xl transition-all duration-300 bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  {/* Tent Header */}
                  <div className={`${tent.bgColor} p-6 text-center relative`}>
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${tent.iconColor} rounded-full bg-white/80 mb-4`}>
                      <Crown className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">{tent.title}</h3>
                    <p className="text-sm text-gray-600">{tent.capacity}</p>
                  </div>

                  {/* Tent Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={tent.image}
                      alt={tent.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Tent Content */}
                  <div className="p-6">
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {tent.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-4">
                      {tent.features.map((feature, index) => (
                        <li key={`tent-feature-${feature.substring(0, 10).replace(/\s+/g, '-')}-${index}`} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Price */}
                    <div className="text-lg font-bold text-purple-600 mb-4">
                      {tent.price}
                    </div>

                    {/* CTA Button */}
                    <Link href={`https://wa.me/+966553719009?text=أرغب في الحصول على عرض سعر لـ ${tent.title}`} target="_blank">
                      <Button className="w-full group-hover:bg-purple-600 transition-colors">
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
                لماذا نحن الخيار الأفضل للخيام الملكية؟
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                نحن رواد في مجال الخيام الملكية في جدة بخبرة عريقة وجودة استثنائية
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {stats.map((stat, index) => (
                <div key={`stat-${stat.label.replace(/\s+/g, '-')}`} className="text-center bg-gradient-to-br from-purple/5 to-pink/5 rounded-2xl p-6">
                  <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
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
                  <div key={`why-feature-${feature.title.replace(/\s+/g, '-')}`} className="group hover:shadow-xl transition-all duration-300 bg-white rounded-2xl border border-gray-100 overflow-hidden">
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
                معرض خيامنا الملكية المتميزة
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                اطلع على مجموعة من أفضل خيامنا الملكية المنجزة في مختلف المناسبات
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

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-br from-purple/5 via-pink/5 to-indigo/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                ماذا يقول عملاؤنا عن خيامنا الملكية
              </h2>
              <p className="text-lg text-muted-foreground">
                تقييمات حقيقية من عملائنا الكرام الذين اختاروا خيامنا الملكية
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={`testimonial-star-${testimonial.id || testimonial.author}-${i}`} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple/20 to-pink/20 rounded-full flex items-center justify-center mr-4">
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
                الأسئلة الشائعة حول الخيام الملكية
              </h2>
              <p className="text-lg text-muted-foreground">
                إجابات شاملة على أهم استفساراتكم حول خدمات الخيام الملكية
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-primary mb-3 flex items-start">
                      <div className="bg-purple/10 text-purple-600 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
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
                        <li key={`related-feature-${feature.substring(0, 10).replace(/\s+/g, '-')}-${index}`} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-3 h-3 text-green-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link href={service.href}>
                      <Button className="w-full group-hover:bg-purple-600 transition-colors">
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
        <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              جاهز لحجز خيمة ملكية فاخرة؟
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              احصل على استشارة مجانية وعرض سعر تنافسي لخيمتك الملكية من خبراء محترفين الديار
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="tel:+966553719009">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4">
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
              <Link href="https://wa.me/+966553719009?text=أرغب في الحصول على عرض سعر للخيام الملكية" target="_blank">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-4">
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
