import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Shield,
  Eye,
  Home,
  Wrench,
  CheckCircle,
  Phone,
  MessageCircle,
  ArrowLeft,
  Plus,
  Award,
  Clock,
  MapPin,
  Zap,
  ThumbsUp,
  Target,
  Lock,
  Star,
  Users
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'سواتر جدة | محترفين الديار - أفضل سواتر خصوصية وحماية',
  description: 'أفضل سواتر في جدة من محترفين الديار. سواتر حديد، سواتر خشبية، سواتر قماش، سواتر شينكو. تركيب احترافي وضمان 15 سنة. اتصل الآن للحصول على عرض سعر مجاني.',
  keywords: 'سواتر جدة، سواتر حديد، سواتر خشبية، سواتر قماش، سواتر شينكو، سواتر خصوصية، تركيب سواتر، محترفين الديار',
  openGraph: {
    title: 'سواتر جدة | محترفين الديار',
    description: 'أفضل سواتر خصوصية وحماية في جدة بأعلى جودة وأفضل الأسعار. خبرة 15 عاماً في تركيب السواتر.',
    images: [
      {
        url: 'https://ext.same-assets.com/742929371/1378182230.jpeg',
        width: 1200,
        height: 630,
        alt: 'سواتر جدة - محترفين الديار',
      },
    ],
  },
};

const heroFeatures = [
  { icon: MapPin, text: 'نخدم جميع أحياء جدة' },
  { icon: Clock, text: 'ضمان 15 سنة شامل' },
  { icon: Star, text: 'أكثر من 3000 ساتر منجز' }
];

const whyChooseUsFeatures = [
  {
    icon: Shield,
    title: 'حماية وخصوصية تامة',
    description: 'نوفر أقصى درجات الحماية والخصوصية لمنزلك وعائلتك',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    icon: Lock,
    title: 'أمان عالي المستوى',
    description: 'تصاميم قوية ومتينة توفر الأمان والحماية من المتطفلين',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600'
  },
  {
    icon: Award,
    title: 'خامات عالية الجودة',
    description: 'نستخدم أجود الخامات المقاومة للعوامل الجوية والتآكل',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    icon: Users,
    title: 'فريق متخصص خبير',
    description: 'مهندسون وفنيون متخصصون في تركيب جميع أنواع السواتر',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    icon: Zap,
    title: 'تركيب سريع ومحترف',
    description: 'سرعة في التركيب مع الحفاظ على أعلى معايير الجودة',
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600'
  },
  {
    icon: Target,
    title: 'تصاميم متنوعة',
    description: 'تشكيلة واسعة من التصاميم والألوان لتناسب جميع الأذواق',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600'
  }
];

const fenceTypes = [
  {
    id: 'metal',
    title: 'سواتر حديد',
    description: 'سواتر من الحديد المجلفن والمشغول بمختلف التصاميم، تتميز بالمتانة ومقاومة الصدأ وتوفير الخصوصية التامة.',
    image: 'https://ext.same-assets.com/742929371/2544295178.jpeg',
    features: ['مقاومة عالية للصدأ', 'تصاميم زخرفية جميلة', 'متانة استثنائية'],
    price: 'تبدأ من 180 ريال/متر',
    bgColor: 'bg-gray-50',
    iconColor: 'text-gray-600',
    durability: 'مدة البقاء: 25+ سنة'
  },
  {
    id: 'wood',
    title: 'سواتر خشبية',
    description: 'سواتر من الخشب الطبيعي والصناعي المعالج بتصاميم عصرية وراقية، توفر منظراً جمالياً مع الخصوصية.',
    image: 'https://ext.same-assets.com/742929371/1284030991.jpeg',
    features: ['مظهر طبيعي جميل', 'تصاميم عصرية راقية', 'صديقة للبيئة'],
    price: 'تبدأ من 150 ريال/متر',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    durability: 'مدة البقاء: 15+ سنة'
  },
  {
    id: 'fabric',
    title: 'سواتر قماش',
    description: 'سواتر من أجود أنواع الأقمشة المقاومة للعوامل الجوية والحريق، سهلة التركيب والفك وتوفر خصوصية جيدة.',
    image: 'https://ext.same-assets.com/742929371/3643643845.jpeg',
    features: ['سهولة التركيب والفك', 'مقاومة للحريق', 'ألوان متنوعة'],
    price: 'تبدأ من 80 ريال/متر',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    durability: 'مدة البقاء: 10+ سنوات'
  },
  {
    id: 'shinko',
    title: 'سواتر شينكو',
    description: 'سواتر معدنية اقتصادية ومتينة، مناسبة للمشاريع الكبيرة والأسوار الخارجية، توفر حماية وخصوصية ممتازة.',
    image: 'https://ext.same-assets.com/742929371/3826485312.jpeg',
    features: ['اقتصادية ومناسبة', 'سريعة التركيب', 'مقاومة للعوامل الجوية'],
    price: 'تبدأ من 120 ريال/متر',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    durability: 'مدة البقاء: 20+ سنة'
  }
];

const galleryImages = [
  {
    id: 1,
    src: 'https://ext.same-assets.com/742929371/2877641733.jpeg',
    title: 'سواتر حديد فاخرة',
    category: 'سواتر حديد',
    description: 'ساتر حديد مشغول بتصميم فاخر لفيلا في شمال جدة'
  },
  {
    id: 2,
    src: 'https://ext.same-assets.com/742929371/3583571490.jpeg',
    title: 'سواتر خشبية مميزة',
    category: 'سواتر خشبية',
    description: 'ساتر خشبي عصري لحديقة منزل في حي الروضة'
  },
  {
    id: 3,
    src: 'https://ext.same-assets.com/742929371/2152465902.jpeg',
    title: 'سواتر قماش عالية الجودة',
    category: 'سواتر قماش',
    description: 'ساتر قماش مقاوم للحريق في مجمع سكني'
  },
  {
    id: 4,
    src: 'https://ext.same-assets.com/742929371/3988408509.jpeg',
    title: 'سواتر شينكو متينة',
    category: 'سواتر شينكو',
    description: 'ساتر شينكو لمصنع في المنطقة الصناعية'
  },
  {
    id: 5,
    src: 'https://ext.same-assets.com/742929371/706870550.jpeg',
    title: 'سواتر للفلل الفاخرة',
    category: 'سواتر فلل',
    description: 'ساتر مختلط حديد وخشب لفيلا فاخرة'
  },
  {
    id: 6,
    src: 'https://ext.same-assets.com/742929371/460471090.jpeg',
    title: 'سواتر حديد مشغول',
    category: 'سواتر زخرفية',
    description: 'ساتر حديد مشغول بزخارف إسلامية'
  },
  {
    id: 7,
    src: 'https://ext.same-assets.com/742929371/1815830835.jpeg',
    title: 'سواتر خشبية عصرية',
    category: 'سواتر عصرية',
    description: 'ساتر خشبي بتصميم عصري ومعاصر'
  },
  {
    id: 8,
    src: 'https://ext.same-assets.com/742929371/1177614720.jpeg',
    title: 'سواتر للمجمعات السكنية',
    category: 'سواتر مجمعات',
    description: 'سواتر شاملة لمجمع سكني كبير'
  }
];

const stats = [
  { number: '3000+', label: 'ساتر منجز' },
  { number: '15+', label: 'سنة خبرة' },
  { number: '97%', label: 'رضا العملاء' },
  { number: '24/7', label: 'خدمة العملاء' }
];

const testimonials = [
  {
    id: 1,
    name: 'أبو محمد الأحمدي',
    role: 'صاحب فيلا - حي النخيل',
    content: 'ركبوا لي ساتر حديد مشغول للفيلا. الشغل ممتاز والتصميم جميل جداً. يوفر خصوصية تامة ومظهر راقي. أنصح الجميع بالتعامل معهم.',
    rating: 5,
    image: '/images/testimonials/client1.jpg'
  },
  {
    id: 2,
    name: 'أم عبدالله السعودي',
    role: 'صاحبة استراحة - شرق جدة',
    content: 'اخترت سواتر خشبية للاستراحة وكانت النتيجة رائعة. فريق محترف والجودة عالية. السواتر مقاومة للشمس والأمطار.',
    rating: 5,
    image: '/images/testimonials/client2.jpg'
  },
  {
    id: 3,
    name: 'مهندس خالد العمراني',
    role: 'مطور عقاري - غرب جدة',
    content: 'تعاملت معهم في عدة مشاريع سكنية. سواتر شينكو بجودة ممتازة وأسعار منافسة. دائماً ما يلتزمون بالمواعيد والجودة.',
    rating: 5,
    image: '/images/testimonials/client3.jpg'
  }
];

const faqs = [
  {
    id: 1,
    question: 'ما هي أفضل أنواع السواتر للمنازل في جدة؟',
    answer: 'يعتمد الاختيار على احتياجاتك وميزانيتك: السواتر الحديدية مثالية للأمان والمتانة طويلة المدى، السواتر الخشبية توفر مظهراً جمالياً طبيعياً، السواتر القماشية اقتصادية وسريعة التركيب، وسواتر الشينكو مناسبة للمساحات الكبيرة. ننصح بالحديد للأمان والخشب للجمالية.'
  },
  {
    id: 2,
    question: 'كم تبلغ تكلفة تركيب السواتر في جدة؟',
    answer: 'تختلف التكلفة حسب نوع الساتر: سواتر القماش من 80 ريال/متر، سواتر الخشب من 150 ريال/متر، سواتر الحديد من 180 ريال/متر، سواتر الشينكو من 120 ريال/متر. التكلفة النهائية تشمل المواد والتركيب والضمان. نقدم عروض أسعار مجانية وإمكانية التقسيط.'
  },
  {
    id: 3,
    question: 'كم تبلغ مدة تركيب السواتر؟',
    answer: 'مدة التركيب تعتمد على نوع الساتر وطول المسافة: السواتر القماشية: 1-2 يوم، السواتر الخشبية: 2-4 أيام، السواتر الحديدية: 3-5 أيام، سواتر الشينكو: 2-3 أيام. للمشاريع الكبيرة قد تحتاج وقت أطول. نلتزم بالمواعيد المتفق عليها.'
  },
  {
    id: 4,
    question: 'ما هو الضمان المقدم على السواتر؟',
    answer: 'نقدم ضمان شامل متدرج حسب نوع الساتر: سواتر الحديد 15 سنة، سواتر الشينكو 12 سنة، السواتر الخشبية 10 سنوات، سواتر القماش 5 سنوات. الضمان يشمل جودة المواد والتركيب ومقاومة العوامل الجوية، مع صيانة مجانية للسنة الأولى.'
  },
  {
    id: 5,
    question: 'هل السواتر تحتاج صيانة دورية؟',
    answer: 'نعم، ولكن بشكل بسيط: السواتر الحديدية تحتاج فحص وتشحيم المفاصل سنوياً، السواتر الخشبية تحتاج دهان كل 3-5 سنوات، سواتر القماش تحتاج تنظيف دوري، سواتر الشينكو تحتاج أقل صيانة. نقدم خدمة صيانة دورية بأسعار مناسبة.'
  },
  {
    id: 6,
    question: 'هل يمكن تخصيص تصميم الساتر حسب الطلب؟',
    answer: 'نعم، نقدم خدمة التصميم المخصص لجميع أنواع السواتر. يمكن اختيار الألوان والزخارف والأبعاد حسب ذوقك ومتطلبات موقعك. فريق التصميم لدينا سيساعدك في اختيار أفضل تصميم يناسب منزلك أو منشأتك مع مراعاة الطابع المعماري العام.'
  }
];

const relatedServices = [
  {
    id: 'mazallat',
    title: 'المظلات',
    description: 'تصميم وتنفيذ مختلف أنواع المظلات للسيارات والحدائق والمسابح.',
    image: 'https://ext.same-assets.com/742929371/2205790480.jpeg',
    href: '/services/mazallat',
    features: ['مظلات سيارات', 'مظلات حدائق', 'مظلات مسابح']
  },
  {
    id: 'pergolas',
    title: 'البرجولات',
    description: 'تصميم وتنفيذ برجولات خشبية وحديدية بأشكال عصرية وتصاميم مميزة.',
    image: 'https://ext.same-assets.com/742929371/3318001237.jpeg',
    href: '/services/pergolas',
    features: ['برجولات خشبية', 'برجولات حديدية', 'برجولات مختلطة']
  },
  {
    id: 'byoot-shaar',
    title: 'بيوت شعر',
    description: 'تصميم وتنفيذ بيوت شعر تراثية وعصرية بخامات عالية الجودة.',
    image: 'https://ext.same-assets.com/742929371/60439396.jpeg',
    href: '/services/byoot-shaar',
    features: ['بيوت شعر تراثية', 'تصاميم عصرية', 'خامات أصيلة']
  }
];

export default function SawaterPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "سواتر جدة",
            "provider": {
              "@type": "LocalBusiness",
              "name": "محترفين الديار",
              "image": "https://ext.same-assets.com/742929371/1378182230.jpeg",
              "telephone": "+966553719009",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "جدة",
                "addressCountry": "SA"
              }
            },
            "areaServed": "جدة",
            "description": "أفضل سواتر في جدة من محترفين الديار. سواتر حديد، سواتر خشبية، سواتر قماش، سواتر شينكو.",
            "serviceType": ["سواتر حديد", "سواتر خشبية", "سواتر قماش", "سواتر شينكو"],
            "offers": {
              "@type": "AggregateOffer",
              "lowPrice": "80",
              "highPrice": "300",
              "priceCurrency": "SAR",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "priceCurrency": "SAR",
                "unitText": "متر"
              }
            }
          })
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue/5 via-accent/5 to-emerald/10 py-20 lg:py-32 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-blue/5 to-emerald/5" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Breadcrumb */}
              <div className="inline-flex items-center space-x-2 space-x-reverse bg-blue/10 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <Link href="/" className="hover:text-blue-700 transition-colors">الرئيسية</Link>
                <span>/</span>
                <Link href="/#services" className="hover:text-blue-700 transition-colors">خدماتنا</Link>
                <span>/</span>
                <span>السواتر</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                أفضل سواتر خصوصية وحماية في{' '}
                <span className="text-blue-600">جدة</span>
                <br />
                أمان وجمالية لا مثيل لها
              </h1>

              {/* Subheading */}
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
                محترفين الديار - خبرة 15 عاماً في تركيب أفضل السواتر في جدة.
                سواتر حديد، خشبية، قماش وشينكو بأجود الخامات وضمان شامل 15 سنة
              </p>

              {/* Key Features */}
              <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-sm text-muted-foreground">
                {heroFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 space-x-reverse">
                    <feature.icon className="w-4 h-4 text-blue-600" />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Link href="tel:+966553719009">
                  <Button size="lg" className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700">
                    <Phone className="w-5 h-5 mr-2" />
                    اتصل للاستشارة المجانية
                  </Button>
                </Link>
                <Link href="https://wa.me/+966553719009" target="_blank">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    واتساب الآن
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-8 w-16 h-16 bg-blue/10 rounded-full blur-xl" />
          <div className="absolute bottom-1/4 right-8 w-20 h-20 bg-emerald/10 rounded-full blur-xl" />
        </section>

        {/* Fence Types Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                أنواع السواتر المتخصصة
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                نقدم مجموعة شاملة من السواتر عالية الجودة لتوفير أقصى درجات الخصوصية والأمان
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {fenceTypes.map((fence) => (
                <div
                  key={fence.id}
                  className="group hover:shadow-xl transition-all duration-300 bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  {/* Fence Header */}
                  <div className={`${fence.bgColor} p-6 text-center relative`}>
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${fence.iconColor} rounded-full bg-white/80 mb-4`}>
                      <Shield className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">{fence.title}</h3>
                    <p className="text-sm text-gray-600">{fence.durability}</p>
                  </div>

                  {/* Fence Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={fence.image}
                      alt={fence.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Fence Content */}
                  <div className="p-6">
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {fence.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-4">
                      {fence.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Price */}
                    <div className="text-lg font-bold text-blue-600 mb-4">
                      {fence.price}
                    </div>

                    {/* CTA Button */}
                    <Link href={`https://wa.me/+966553719009?text=أرغب في الحصول على عرض سعر لـ ${fence.title}`} target="_blank">
                      <Button className="w-full group-hover:bg-blue-600 transition-colors">
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
                لماذا نحن الخيار الأفضل للسواتر في جدة؟
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                نحن متخصصون في تقديم أفضل حلول السواتر بجودة عالية وخبرة واسعة
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center bg-gradient-to-br from-blue/5 to-emerald/5 rounded-2xl p-6">
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
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
                معرض سواترنا المتميزة
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                اطلع على مجموعة من أفضل مشاريع السواتر المنجزة في مختلف أنحاء جدة
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
        <section className="py-20 bg-gradient-to-br from-blue/5 via-emerald/5 to-gray/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                ماذا يقول عملاؤنا عن سواترنا
              </h2>
              <p className="text-lg text-muted-foreground">
                تقييمات حقيقية من عملائنا الكرام الذين اختاروا سواترنا
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
                    <div className="w-12 h-12 bg-gradient-to-br from-blue/20 to-emerald/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary font-bold text-lg">
                        {testimonial.name.split(' ')[0].charAt(0)}
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
                الأسئلة الشائعة حول السواتر
              </h2>
              <p className="text-lg text-muted-foreground">
                إجابات شاملة على أهم استفساراتكم حول خدمات السواتر
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-primary mb-3 flex items-start">
                      <div className="bg-blue/10 text-blue-600 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
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
                        <li key={index} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-3 h-3 text-green-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link href={service.href}>
                      <Button className="w-full group-hover:bg-blue-600 transition-colors">
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
        <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              جاهز لتركيب سواتر عالية الجودة؟
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              احصل على استشارة مجانية وعرض سعر تنافسي لسواترك من خبراء محترفين الديار
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="tel:+966553719009">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
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
              <Link href="https://wa.me/+966553719009?text=أرغب في الحصول على عرض سعر للسواتر" target="_blank">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
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
