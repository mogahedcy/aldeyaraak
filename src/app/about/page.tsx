import type { Metadata } from 'next'
import {
  Star,
  Users,
  Award,
  Clock,
  Shield,
  CheckCircle,
  Target,
  Heart,
  Phone,
  MessageCircle,
  Mail
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import StructuredDataScript from '@/components/StructuredDataScript'

export const metadata: Metadata = {
  title: 'عن محترفين الديار | مؤسسة الديار العالمية - خبرة 15 عام في جدة',
  description: 'تعرف على مؤسسة الديار العالمية، الرائدة في خدمات المظلات والسواتر في جدة منذ 15 عاماً. فريق محترف، جودة عالية، وخدمة متميزة.',
  openGraph: {
    title: 'عن محترفين الديار | مؤسسة الديار العالمية',
    description: 'تعرف على مؤسسة الديار العالمية، الرائدة في خدمات المظلات والسواتر في جدة منذ 15 عاماً.',
    type: 'website',
    locale: 'ar_SA'
  }
}

const stats = [
  { number: '5000+', label: 'مشروع مكتمل', icon: CheckCircle },
  { number: '15+', label: 'سنة خبرة', icon: Clock },
  { number: '100%', label: 'رضا العملاء', icon: Heart },
  { number: '24/7', label: 'خدمة العملاء', icon: Shield }
];

const values = [
  {
    title: 'الجودة',
    description: 'نلتزم بأعلى معايير الجودة في جميع مشاريعنا، باستخدام أفضل المواد والتقنيات المتطورة.',
    icon: Award
  },
  {
    title: 'المصداقية',
    description: 'نبني علاقات طويلة الأمد مع عملائنا من خلال الشفافية والصدق في جميع تعاملاتنا.',
    icon: Shield
  },
  {
    title: 'الإبداع',
    description: 'نقدم حلول مبتكرة وتصاميم عصرية تلبي احتياجات العملاء وتفوق توقعاتهم.',
    icon: Star
  },
  {
    title: 'الخدمة المتميزة',
    description: 'فريق محترف متاح على مدار الساعة لضمان حصولكم على أفضل خدمة وأسرع استجابة.',
    icon: Users
  }
];



const milestones = [
  {
    year: '2009',
    title: 'تأسيس الشركة',
    description: 'بدأنا رحلتنا في جدة بفريق صغير وحلم كبير لتقديم أفضل الخدمات'
  },
  {
    year: '2012',
    title: 'التوسع الأول',
    description: 'توسعنا في الخدمات وأضفنا السواتر والبرجولات إلى خدماتنا'
  },
  {
    year: '2015',
    title: 'الريادة في السوق',
    description: 'أصبحنا من الشركات الرائدة في مجال المظلات والسواتر في جدة'
  },
  {
    year: '2018',
    title: 'التطوير التقني',
    description: 'استثمرنا في أحدث التقنيات والمعدات لضمان أعلى جودة'
  },
  {
    year: '2021',
    title: 'خدمات شاملة',
    description: 'أضفنا خدمات تنسيق الحدائق وساندوتش بانل وترميم الملحقات'
  },
  {
    year: '2024',
    title: 'التميز والإبداع',
    description: 'حققنا أكثر من 5000 مشروع ناجح ونواصل رحلة التميز'
  }
];

export default function AboutPage() {
  const whatsappMessage = "السلام عليكم، أريد الاستفسار عن خدماتكم ومعرفة المزيد عن الشركة."
  const whatsappURL = `https://wa.me/966553719009?text=${encodeURIComponent(whatsappMessage)}`

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "مؤسسة الديار العالمية",
    "description": "مؤسسة رائدة في خدمات المظلات والسواتر في جدة منذ 15 عاماً",
    "url": "https://aldeyarksa.tech",
    "logo": "https://aldeyarksa.tech/logo.png",
    "foundingDate": "2009",
    "founder": "المهندس أحمد السعيد",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "جدة",
      "addressCountry": "SA"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+966553719009",
      "contactType": "customer service"
    },
    "areaServed": "جدة",
    "knowsAbout": ["مظلات", "سواتر", "برجولات", "خيام ملكية", "بيوت شعر", "ساندوتش بانل", "تنسيق حدائق", "ترميم ملحقات"]
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredDataScript data={organizationData} />

      <Navbar />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-8">
              <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
              <span>/</span>
              <span className="text-primary font-medium">عن محترفين الديار</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  نحن <span className="text-primary">محترفين الديار</span>
                  <br />
                  رائدون في التميز منذ 2009
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  مؤسسة الديار العالمية، شريكك الموثوق في تحويل الأحلام إلى واقع.
                  نقدم خدمات شاملة ومتكاملة في جدة منذ أكثر من 15 عاماً،
                  بخبرة واسعة وفريق محترف يضمن لك أعلى معايير الجودة والإتقان.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href={whatsappURL} target="_blank">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      تواصل معنا
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      <Phone className="w-5 h-5 mr-2" />
                      اطلب استشارة
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8">
                  <div className="w-full h-full bg-white rounded-2xl shadow-2xl flex items-center justify-center">
                    <div className="text-center">
                      <Award className="w-20 h-20 text-primary mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">15+ سنة من التميز</h3>
                      <p className="text-gray-600">نفخر بثقة أكثر من 5000 عميل</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-accent" />
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                قصة نجاحنا
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                رحلة 15 عاماً من العمل الدؤوب والإبداع في خدمة أهالي جدة
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">رؤيتنا</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  أن نكون الشركة الرائدة والموثوقة في مجال تقديم الحلول المعمارية المتكاملة في المملكة العربية السعودية،
                  ونساهم في تطوير البيئة العمرانية بحلول مبتكرة وعصرية تلبي احتياجات عملائنا وتفوق توقعاتهم.
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">رسالتنا</h3>
                <p className="text-gray-600 leading-relaxed">
                  نلتزم بتقديم خدمات عالية الجودة في مجال المظلات، السواتر، والحلول المعمارية المتنوعة،
                  من خلال فريق محترف ومواد عالية الجودة، مع ضمان رضا العملاء والالتزام بالمواعيد والمعايير العالمية.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                قيمنا ومبادئنا
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                المبادئ التي نؤمن بها والتي تقود عملنا نحو التميز
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div key={value.title} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                  <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                رحلة التطور والنمو
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                محطات مهمة في تاريخ مؤسسة الديار العالمية
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20" />
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-white rounded-lg p-6 shadow-lg">
                        <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 bg-primary rounded-full relative z-10" />
                    <div className="w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>



        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              اكتشف الفرق مع محترفين الديار
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              انضم إلى آلاف العملاء الذين وثقوا بنا واختاروا التميز والجودة
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={whatsappURL} target="_blank">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  تواصل معنا الآن
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  <Mail className="w-5 h-5 mr-2" />
                  اطلب عرض سعر
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
