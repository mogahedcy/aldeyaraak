import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  TreePine,
  Home,
  Palette,
  Wrench,
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
  Star,
  Users,
  Leaf,
  Sun
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'برجولات جدة | محترفين الديار - أفضل برجولات خشبية وحديدية',
  description: 'أفضل برجولات في جدة من محترفين الديار. برجولات خشبية، برجولات حديدية، برجولات ألومنيوم، برجولات حدائق. تصميم وتنفيذ احترافي وضمان شامل. اتصل الآن للحصول على عرض سعر مجاني.',
  keywords: 'برجولات جدة، برجولات خشبية، برجولات حديدية، برجولات ألومنيوم، برجولات حدائق، تركيب برجولات، محترفين الديار',
  openGraph: {
    title: 'برجولات جدة | محترفين الديار',
    description: 'أفضل برجولات خشبية وحديدية في جدة بأعلى جودة وأفضل الأسعار. خبرة 15 عاماً في تصميم وتنفيذ البرجولات.',
    images: [
      {
        url: 'https://ext.same-assets.com/3372524550/1177626593.jpeg',
        width: 1200,
        height: 630,
        alt: 'برجولات جدة - محترفين الديار',
      },
    ],
  },
};

const heroFeatures = [
  { icon: MapPin, text: 'نخدم جميع أحياء جدة' },
  { icon: Clock, text: 'ضمان 10 سنوات شامل' },
  { icon: Star, text: 'أكثر من 2000 برجولة منجزة' }
];

const whyChooseUsFeatures = [
  {
    icon: TreePine,
    title: 'تصاميم طبيعية خلابة',
    description: 'تصاميم برجولات تمزج بين الجمال الطبيعي والأناقة العصرية',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    icon: Sparkles,
    title: 'جودة خامات استثنائية',
    description: 'أجود أنواع الخشب والحديد والألومنيوم المقاومة للعوامل الجوية',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600'
  },
  {
    icon: Palette,
    title: 'تخصيص حسب الطلب',
    description: 'تصاميم مخصصة تناسب ذوقك ومساحة حديقتك أو منزلك',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    icon: Users,
    title: 'فريق مهندسين خبراء',
    description: 'مهندسون وحرفيون متخصصون في تصميم وتنفيذ البرجولات',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    icon: Zap,
    title: 'تنفيذ سريع ومتقن',
    description: 'سرعة في التنفيذ مع الحفاظ على أعلى معايير الحرفية',
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600'
  },
  {
    icon: Leaf,
    title: 'صديقة للبيئة',
    description: 'استخدام مواد طبيعية ومعالجة بطرق صديقة للبيئة',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600'
  }
];

const pergolaTypes = [
  {
    id: 'aluminum',
    title: 'برجولات ألومنيوم',
    description: 'برجولات من الألومنيوم عالي الجودة، خفيفة الوزن ومقاومة للتآكل، سهلة الصيانة وتتميز بالمتانة العالية.',
    image: 'https://ext.same-assets.com/3372524550/1734019317.jpeg',
    features: ['خفيفة الوزن', 'مقاومة للتآكل', 'سهولة الصيانة'],
    price: 'تبدأ من 250 ريال/متر مربع',
    bgColor: 'bg-gray-50',
    iconColor: 'text-gray-600',
    lifespan: 'مدة البقاء: 25+ سنة'
  },
  {
    id: 'wood',
    title: 'برجولات خشبية',
    description: 'برجولات من أجود أنواع الخشب الطبيعي المعالج، توفر مظهراً طبيعياً جميلاً وتتناسب مع البيئة الخضراء.',
    image: 'https://ext.same-assets.com/3372524550/1177626593.jpeg',
    features: ['مظهر طبيعي جميل', 'خشب معالج عالي الجودة', 'تصاميم كلاسيكية'],
    price: 'تبدأ من 300 ريال/متر مربع',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    lifespan: 'مدة البقاء: 15+ سنة'
  },
  {
    id: 'metal',
    title: 'برجولات حديدية',
    description: 'برجولات من الحديد المجلفن والمطلي، تتميز بالقوة والمتانة وقابلية التشكيل في تصاميم زخرفية مميزة.',
    image: 'https://ext.same-assets.com/3372524550/2093277565.jpeg',
    features: ['قوة ومتانة عالية', 'تصاميم زخرفية', 'مقاومة للعوامل الجوية'],
    price: 'تبدأ من 200 ريال/متر مربع',
    bgColor: 'bg-slate-50',
    iconColor: 'text-slate-600',
    lifespan: 'مدة البقاء: 20+ سنة'
  },
  {
    id: 'garden',
    title: 'برجولات حدائق',
    description: 'برجولات مصممة خصيصاً للحدائق والمساحات الخضراء، تدعم نمو النباتات المتسلقة وتوفر ظلاً طبيعياً.',
    image: 'https://ext.same-assets.com/3372524550/2754594000.jpeg',
    features: ['دعم للنباتات المتسلقة', 'ظل طبيعي مريح', 'تصميم متناسق مع الحديقة'],
    price: 'تبدأ من 280 ريال/متر مربع',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    lifespan: 'مدة البقاء: 18+ سنة'
  }
];

const galleryImages = [
  {
    id: 1,
    src: 'https://ext.same-assets.com/3372524550/1641487053.jpeg',
    title: 'برجولة خشبية كلاسيكية',
    category: 'برجولات خشبية',
    description: 'برجولة خشبية أنيقة بتصميم كلاسيكي لحديقة فيلا'
  },
  {
    id: 2,
    src: 'https://ext.same-assets.com/3372524550/1927758805.jpeg',
    title: 'برجولة حديدية عصرية',
    category: 'برجولات حديدية',
    description: 'برجولة حديد بتصميم عصري ومعاصر'
  },
  {
    id: 3,
    src: 'https://ext.same-assets.com/3372524550/3414519594.jpeg',
    title: 'برجولة ألومنيوم فاخرة',
    category: 'برجولات ألومنيوم',
    description: 'برجولة ألومنيوم فاخرة لمنطقة جلوس خارجية'
  },
  {
    id: 4,
    src: 'https://ext.same-assets.com/3372524550/842632897.jpeg',
    title: 'برجولة حديقة مع نباتات',
    category: 'برجولات حدائق',
    description: 'برجولة حديقة تدعم النباتات المتسلقة'
  },
  {
    id: 5,
    src: 'https://ext.same-assets.com/3372524550/3727260945.jpeg',
    title: 'برجولة مودرن للفلل',
    category: 'برجولات عصرية',
    description: 'برجولة بتصميم مودرن لمدخل فيلا فاخرة'
  },
  {
    id: 6,
    src: 'https://ext.same-assets.com/3372524550/1488121465.jpeg',
    title: 'برجولة مع إضاءة مميزة',
    category: 'برجولات مضيئة',
    description: 'برجولة مجهزة بنظام إضاءة ليلية رائع'
  },
  {
    id: 7,
    src: 'https://ext.same-assets.com/3372524550/1252668012.jpeg',
    title: 'برجولة لمنطقة الشواء',
    category: 'برجولات وظيفية',
    description: 'برجولة مصممة لمنطقة الشواء والجلسات'
  },
  {
    id: 8,
    src: 'https://ext.same-assets.com/3372524550/812304309.jpeg',
    title: 'برجولة للمسابح',
    category: 'برجولات مسابح',
    description: 'برجولة أنيقة لمنطقة المسبح والاستجمام'
  }
];

const stats = [
  { number: '2000+', label: 'برجولة منجزة' },
  { number: '15+', label: 'سنة خبرة' },
  { number: '96%', label: 'رضا العملاء' },
  { number: '50+', label: 'تصميم مختلف' }
];

const testimonials = [
  {
    id: 1,
    name: 'مهندس أحمد الزهراني',
    role: 'مهندس معماري - حي الفيصلية',
    content: 'برجولة خشبية رائعة في حديقة منزلي. التصميم متميز والتنفيذ احترافي. أضافت لمسة جمالية مذهلة للحديقة والعائلة تستمتع بها يومياً.',
    rating: 5,
    image: '/images/testimonials/client1.jpg'
  },
  {
    id: 2,
    name: 'د. فاطمة السعودي',
    role: 'طبيبة - شمال جدة',
    content: 'اخترت برجولة ألومنيوم لمنطقة الجلوس الخارجية. النتيجة فاقت التوقعات! جودة عالية وتصميم أنيق. فريق محترفين الديار محترف جداً.',
    rating: 5,
    image: '/images/testimonials/client2.jpg'
  },
  {
    id: 3,
    name: 'أبو عبدالرحمن المالكي',
    role: 'رجل أعمال - غرب جدة',
    content: 'ركبوا لي برجولة حديدية لمنطقة الشواء في الاستراحة. الشغل ممتاز والتصميم يجمع بين الجمالية والوظيفية. أنصح بهم بقوة.',
    rating: 5,
    image: '/images/testimonials/client3.jpg'
  }
];

const whyChooseData = [
  {
    icon: Sun,
    title: 'حماية من الشمس',
    description: 'توفر ظلاً مريحاً وحماية من أشعة الشمس الحارة'
  },
  {
    icon: Palette,
    title: 'تصاميم جميلة',
    description: 'تضيف لمسة جمالية مميزة لحديقتك أو منزلك'
  },
  {
    icon: TreePine,
    title: 'جودة عالية',
    description: 'خامات عالية الجودة تضمن المتانة والاستدامة'
  },
  {
    icon: Wrench,
    title: 'سهولة الصيانة',
    description: 'تصاميم عملية سهلة التنظيف والصيانة'
  },
  {
    icon: Target,
    title: 'تخصيص كامل',
    description: 'إمكانية تخصيص التصميم والحجم حسب احتياجاتك'
  },
  {
    icon: Award,
    title: 'ضمان شامل',
    description: 'ضمان طويل المدى على جميع أعمالنا وخاماتنا'
  }
];

const faqs = [
  {
    id: 1,
    question: 'ما هي أفضل أنواع البرجولات للمناخ في جدة؟',
    answer: 'لمناخ جدة الساحلي، ننصح بـ: برجولات الألومنيوم للمقاومة العالية للرطوبة والملوحة، برجولات الخشب المعالج ضد الرطوبة للمظهر الطبيعي، برجولات الحديد المجلفن والمطلي لمقاومة التآكل. كل نوع له مميزاته ويعتمد الاختيار على ذوقك وميزانيتك.'
  },
  {
    id: 2,
    question: 'كم تبلغ تكلفة تركيب البرجولات في جدة؟',
    answer: 'تختلف التكلفة حسب نوع البرجولة والحجم: برجولات الحديد من 200 ريال/م²، برجولات الألومنيوم من 250 ريال/م²، برجولات الحدائق من 280 ريال/م²، برجولات الخشب من 300 ريال/م². التكلفة تشمل التصميم والمواد والتركيب والضمان. نقدم عروض أسعار مجانية.'
  },
  {
    id: 3,
    question: 'كم تستغرق مدة تصميم وتركيب البرجولة؟',
    answer: 'المدة الزمنية تعتمد على حجم وتعقيد البرجولة: التصميم والتخطيط: 2-3 أيام، تحضير المواد: 3-5 أيام، التركيب: 1-3 أيام للبرجولات الصغيرة، 3-7 أيام للبرجولات الكبيرة. إجمالياً: 1-2 أسبوع للمشاريع العادية. نلتزم بالمواعيد المتفق عليها.'
  },
  {
    id: 4,
    question: 'هل يمكن تخصيص تصميم البرجولة حسب المساحة المتاحة؟',
    answer: 'نعم، نقدم خدمة التصميم المخصص بالكامل. فريق المهندسين لدينا سيزور الموقع لقياس المساحة وفهم احتياجاتك، ثم يقدم تصاميم مخصصة تناسب: حجم ومساحة الموقع، الطابع المعماري للمنزل، ذوقك الشخصي وميزانيتك، الوظيفة المطلوبة (جلوس، شواء، حديقة).'
  },
  {
    id: 5,
    question: 'ما هو الضمان المقدم على البرجولات؟',
    answer: 'نقدم ضمان شامل متدرج: برجولات الألومنيوم: 15 سنة، برجولات الحديد المطلي: 12 سنة، برجولات الخشب المعالج: 10 سنوات، برجولات الحدائق: 12 سنة. الضمان يشمل: جودة المواد والتركيب، مقاومة العوامل الجوية، الصيانة المجانية للسنة الأولى.'
  },
  {
    id: 6,
    question: 'هل البرجولات تحتاج صيانة دورية؟',
    answer: 'الصيانة بسيطة وتختلف حسب النوع: برجولات الألومنيوم: تنظيف بالماء والصابون كل 6 أشهر، برجولات الحديد: فحص الطلاء سنوياً وإعادة الطلاء كل 5-7 سنوات، برجولات الخشب: تنظيف وإعادة دهان كل 2-3 سنوات. نقدم خدمة صيانة دورية بأسعار مناسبة.'
  }
];

// قسم المقالات الجديد للبرجولات
const articlesData = [
  {
    id: 1,
    title: 'الفرق بين البرجولات الخشبية والحديدية',
    excerpt: 'تعرف على المقارنة الشاملة بين البرجولات الخشبية والحديدية من حيث المتانة والتكلفة والجمال لاختيار الأنسب لحديقتك.',
    image: '/uploads/pergola-1.jpg',
    author: 'فريق محترفين الديار',
    publishDate: '2024-01-20',
    readTime: '6 دقائق'
  },
  {
    id: 2,
    title: 'أفكار تصميم البرجولات الحديثة للحدائق',
    excerpt: 'اكتشف أحدث اتجاهات تصميم البرجولات العصرية وكيفية دمجها مع تنسيق الحدائق لإنشاء مساحة خارجية مثالية.',
    image: '/uploads/pergola-2.jpg',
    author: 'فريق محترفين الديار',
    publishDate: '2024-01-15',
    readTime: '8 دقائق'
  },
  {
    id: 3,
    title: 'كيفية صيانة البرجولات لضمان طول عمرها',
    excerpt: 'دليل شامل للعناية بالبرجولات الخشبية والحديدية، ونصائح الصيانة الدورية لضمان بقائها جميلة ومتينة لسنوات طويلة.',
    image: '/uploads/pergola-1.jpg',
    author: 'فريق محترفين الديار',
    publishDate: '2024-01-08',
    readTime: '5 دقائق'
  }
];

const relatedServices = [
  {
    id: 'mazallat',
    title: 'المظلات',
    description: 'تصميم وتنفيذ مختلف أنواع المظلات للسيارات والحدائق والمسابح.',
    image: 'https://ext.same-assets.com/3372524550/2205790480.jpeg',
    href: '/services/mazallat',
    features: ['مظلات سيارات', 'مظلات حدائق', 'مظلات مسابح']
  },
  {
    id: 'byoot-shaar',
    title: 'بيوت شعر',
    description: 'تصميم وتنفيذ بيوت شعر تراثية وعصرية بخامات عالية الجودة.',
    image: 'https://ext.same-assets.com/3372524550/60439396.jpeg',
    href: '/services/byoot-shaar',
    features: ['بيوت شعر تراثية', 'تصاميم عصرية', 'خامات أصيلة']
  },
  {
    id: 'sawater',
    title: 'السواتر',
    description: 'تركيب سواتر بمختلف الأنواع والخامات لتوفير الخصوصية والحماية.',
    image: 'https://ext.same-assets.com/3372524550/531069762.jpeg',
    href: '/services/sawater',
    features: ['سواتر حديد', 'سواتر خشبية', 'سواتر قماش']
  }
];

export default function PergolasPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "برجولات جدة",
            "provider": {
              "@type": "LocalBusiness",
              "name": "محترفين الديار",
              "image": "https://ext.same-assets.com/3372524550/1177626593.jpeg",
              "telephone": "+966553719009",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "جدة",
                "addressCountry": "SA"
              }
            },
            "areaServed": "جدة",
            "description": "أفضل برجولات في جدة من محترفين الديار. برجولات خشبية، برجولات حديدية، برجولات ألومنيوم، برجولات حدائق.",
            "serviceType": ["برجولات خشبية", "برجولات حديدية", "برجولات ألومنيوم", "برجولات حدائق"],
            "offers": {
              "@type": "AggregateOffer",
              "lowPrice": "200",
              "highPrice": "500",
              "priceCurrency": "SAR",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "priceCurrency": "SAR",
                "unitText": "متر مربع"
              }
            }
          })
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green/5 via-amber/5 to-emerald/10 py-20 lg:py-32 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-green/5 to-amber/5" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Breadcrumb */}
              <div className="inline-flex items-center space-x-2 space-x-reverse bg-green/10 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <Link href="/" className="hover:text-green-700 transition-colors">الرئيسية</Link>
                <span>/</span>
                <Link href="/#services" className="hover:text-green-700 transition-colors">خدماتنا</Link>
                <span>/</span>
                <span>البرجولات</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                أفضل برجولات خشبية وحديدية في{' '}
                <span className="text-green-600">جدة</span>
                <br />
                جمالية طبيعية وأناقة عصرية
              </h1>

              {/* Subheading */}
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
                محترفين الديار - خبرة 15 عاماً في تصميم وتنفيذ أفضل البرجولات في جدة.
                برجولات خشبية، حديدية، ألومنيوم وحدائق بأجود الخامات وضمان شامل
              </p>

              {/* Key Features */}
              <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-sm text-muted-foreground">
                {heroFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 space-x-reverse">
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
                <Link href="https://wa.me/+966553719009" target="_blank">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-green-600 text-green-600 hover:bg-green-50">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    واتساب الآن
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-8 w-16 h-16 bg-green/10 rounded-full blur-xl" />
          <div className="absolute bottom-1/4 right-8 w-20 h-20 bg-amber/10 rounded-full blur-xl" />
        </section>

        {/* Pergola Types Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                أنواع البرجولات المتخصصة
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                نقدم مجموعة متنوعة من البرجولات عالية الجودة لتناسب جميع الأذواق والاحتياجات
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pergolaTypes.map((pergola) => (
                <div
                  key={pergola.id}
                  className="group hover:shadow-xl transition-all duration-300 bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  {/* Pergola Header */}
                  <div className={`${pergola.bgColor} p-6 text-center relative`}>
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${pergola.iconColor} rounded-full bg-white/80 mb-4`}>
                      <TreePine className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">{pergola.title}</h3>
                    <p className="text-sm text-gray-600">{pergola.lifespan}</p>
                  </div>

                  {/* Pergola Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={pergola.image}
                      alt={pergola.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Pergola Content */}
                  <div className="p-6">
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {pergola.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-4">
                      {pergola.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Price */}
                    <div className="text-lg font-bold text-green-600 mb-4">
                      {pergola.price}
                    </div>

                    {/* CTA Button */}
                    <Link href={`https://wa.me/+966553719009?text=أرغب في الحصول على عرض سعر لـ ${pergola.title}`} target="_blank">
                      <Button className="w-full group-hover:bg-green-600 transition-colors">
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

        {/* Why Choose Pergolas Section */}
        <section className="py-20 bg-gradient-to-br from-green/5 via-amber/5 to-emerald/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                لماذا تختار برجولات الديار العالمية؟
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                البرجولات توفر العديد من المزايا لمنزلك وحديقتك
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseData.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green/10 text-green-600 rounded-full mb-4">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                لماذا نحن الخيار الأفضل للبرجولات في جدة؟
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                نحن متخصصون في تقديم أفضل حلول البرجولات بجودة استثنائية
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center bg-gradient-to-br from-green/5 to-amber/5 rounded-2xl p-6">
                  <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
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
                  <div key={index} className="group hover:shadow-xl transition-all duration-300 bg-white rounded-2xl border border-gray-100 overflow-hidden">
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
                معرض برجولاتنا المتميزة
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                اطلع على مجموعة من أفضل مشاريع البرجولات المنجزة في مختلف أنحاء جدة
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
        <section className="py-20 bg-gradient-to-br from-green/5 via-amber/5 to-emerald/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                ماذا يقول عملاؤنا عن برجولاتنا
              </h2>
              <p className="text-lg text-muted-foreground">
                تقييمات حقيقية من عملائنا الكرام الذين اختاروا برجولاتنا
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green/20 to-amber/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary font-bold text-lg">
                        {testimonial.name.split(' ')[1].charAt(0)}
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
                الأسئلة الشائعة حول البرجولات
              </h2>
              <p className="text-lg text-muted-foreground">
                إجابات شاملة على أهم استفساراتكم حول خدمات البرجولات
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-primary mb-3 flex items-start">
                      <div className="bg-green/10 text-green-600 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
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

        {/* Articles Section - قسم المقالات */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                مقالات ونصائح حول البرجولات
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                اكتشف كل ما تحتاج لمعرفته حول البرجولات من خلال مقالاتنا التعليمية المفيدة
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

        {/* Related Services Section */}
        <section className="py-20 bg-background">
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
                        <li key={index} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-3 h-3 text-green-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link href={service.href}>
                      <Button className="w-full group-hover:bg-green-600 transition-colors">
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
        <section className="py-20 bg-gradient-to-r from-green-600 to-amber-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              جاهز لتصميم برجولة أحلامك؟
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              احصل على استشارة مجانية وعرض سعر تنافسي لبرجولتك من خبراء محترفين الديار
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="tel:+966553719009">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4">
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
              <Link href="https://wa.me/+966553719009?text=أرغب في الحصول على عرض سعر للبرجولات" target="_blank">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-4">
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
