import Link from 'next/link';
import {
  ArrowLeft,
  Car,
  TreePine,
  Shield,
  Flower,
  Home,
  Wrench,
  Tent,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    id: 'mazallat',
    title: 'مظلات سيارات جدة',
    description: 'مظلات سيارات عالية الجودة بتصاميم عصرية وخامات مقاومة للعوامل الجوية',
    icon: Car,
    features: [
      'حماية كاملة من الشمس والأمطار',
      'تصاميم عصرية متنوعة',
      'خامات عالية الجودة'
    ],
    href: '/services/mazallat',
    price: 'تبدأ من 2500 ريال',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    id: 'sandwich-panel',
    title: 'ساندوتش بانل جدة احترافي',
    description: 'محترفين الديار - تركيب وتوريد ساندوتش بانل في جدة بأعلى المعايير. ساندوتش بانل عازل، ساندوتش بانل حوائط، ساندوتش بانل أسقف، ساندوتش بانل مستودعات، ساندوتش بانل للمصانع والمباني التجارية في جدة والمملكة',
    icon: Home,
    features: [
      'ساندوتش بانل عازل للحرارة والصوت',
      'ساندوتش بانل حوائط خارجية وداخلية',
      'ساندوتش بانل أسقف مقاوم للحريق',
      'ساندوتش بانل مستودعات ومصانع',
      'ساندوتش بانل ألوان متعددة',
      'تركيب ساندوتش بانل احترافي'
    ],
    href: '/services/sandwich-panel',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    id: 'renovation',
    title: 'ترميم ملحقات جدة متكامل',
    description: 'محترفين الديار - خدمات ترميم ملحقات في جدة شاملة ومتخصصة. ترميم فلل، ترميم منازل، ترميم استراحات، ترميم مجالس، ترميم ملاحق، صيانة وإصلاح المباني، تجديد المرافق بأحدث المواد والتقنيات',
    icon: Wrench,
    features: [
      'ترميم فلل وقصور راقية',
      'ترميم منازل واستراحات',
      'ترميم مجالس ومرافق',
      'صيانة وإصلاح شامل',
      'تجديد المرافق والملاحق',
      'ترميم بأحدث المواد والتقنيات'
    ],
    href: '/services/renovation',
    bgColor: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
  {
    id: 'pergolas',
    title: 'برجولات حدائق جدة فاخرة',
    description: 'محترفين الديار - برجولات حدائق خشبية وحديدية فاخرة في جدة. برجولات خشبية، برجولات حديدية، برجولات قماشية، برجولات حدائق فلل، برجولات متحركة، تضفي جمالاً استثنائياً على حدائق المنازل والفلل مع مقاومة عالية للعوامل الجوية',
    icon: TreePine,
    features: [
      'برجولات خشبية طبيعية معالجة',
      'برجولات حديدية مقاومة للصدأ',
      'برجولات قماشية قابلة للطي',
      'تصاميم حصرية ومميزة',
      'برجولات حدائق فلل راقية',
      'تركيب برجولات احترافي'
    ],
    href: '/services/pergolas',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    id: 'sawater',
    title: 'سواتر خصوصية جدة عالية',
    description: 'محترفين الديار - سواتر خصوصية في جدة متنوعة ومتينة. سواتر PVC، سواتر حديدية، سواتر قماشية، سواتر خشبية، سواتر للحدائق، لضمان الخصوصية التامة والحماية من الغبار والرياح، مصممة خصيصاً لتتناسب مع مناخ جدة',
    icon: Shield,
    features: [
      'سواتر PVC عالية الجودة',
      'سواتر حديدية مقاومة للعوامل الجوية',
      'سواتر قماشية مرنة ومتينة',
      'خصوصية كاملة 100%',
      'تشكيلة واسعة من الألوان والتصاميم',
      'سواتر للحدائق والفلل'
    ],
    href: '/services/sawater',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    id: 'byoot-shaar',
    title: 'بيوت شعر تراثية أصيلة',
    description: 'محترفين الديار - بيوت شعر تراثية أصيلة في جدة بجودة استثنائية. بيوت شعر سعودية، بيوت شعر تراثية، خيام شعر، بيوت شعر للمناسبات، تحافظ على التراث السعودي العريق بتصاميم عصرية تناسب الاستخدام الحديث',
    icon: Home,
    features: [
      'بيوت شعر تراثية أصيلة 100%',
      'تصنيع يدوي متقن ومتخصص',
      'بيوت شعر للمناسبات والاستراحات',
      'تراث سعودي عريق',
      'مواد طبيعية عالية الجودة',
      'تصاميم تراثية وعصرية'
    ],
    href: '/services/byoot-shaar',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    id: 'landscaping',
    title: 'تنسيق حدائق جدة احترافي',
    description: 'محترفين الديار - تصميم وتنسيق الحدائق في جدة بأسلوب عصري واحترافي. تنسيق حدائق فلل، تنسيق حدائق منازل، تصميم حدائق، زراعة النباتات، أنظمة ري، تيل صناعي، يتناسب مع البيئة الساحلية لمدينة جدة',
    icon: Flower,
    features: [
      'تنسيق حدائق فلل ومنازل راقية',
      'تصميم حدائق عصرية ومميزة',
      'زراعة نباتات مناسبة للمناخ',
      'أنظمة ري حديثة وذكية',
      'تيل صناعي عالي الجودة',
      'صيانة دورية للحدائق'
    ],
    href: '/services/landscaping',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'khayyam',
    title: 'خيام ملكية فاخرة راقية',
    description: 'محترفين الديار - خيام ملكية فاخرة في جدة بمواصفات عالمية. خيام ملكية للمناسبات، خيام فاخرة، خيام أفراح، خيام استراحات، بتصاميم فاخرة ومواصفات عالية للمناسبات الخاصة والاستراحات في جدة والمناطق المحيطة',
    icon: Tent,
    features: [
      'خيام ملكية فاخرة للمناسبات',
      'تصاميم ملكية حصرية وراقية',
      'أقمشة عالية الجودة والفخامة',
      'خيام أفراح ومناسبات خاصة',
      'مناسبة لجميع المناسبات',
      'تركيب وتجهيز كامل'
    ],
    href: '/services/khayyam',
    bgColor: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
];

export default function ServicesSection() {
  // Generate JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "خدمات محترفين الديار",
    "provider": {
      "@type": "Organization",
      "name": "محترفين الديار",
      "url": "https://yourdomain.com"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "خدمات محترفين الديار",
      "itemListElement": services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.description,
          "serviceType": service.title,
          "url": `https://yourdomain.com${service.href}`,
          "offers": service.price ? {
            "@type": "Offer",
            "price": service.price.replace(/[^\d]/g, ''),
            "priceCurrency": "SAR",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "priceCurrency": "SAR",
              "price": service.price.replace(/[^\d]/g, ''),
              "unitText": "ريال سعودي"
            },
            "description": service.price
          } : undefined
        }
      }))
    }
  };

  return (
    <section className="py-20 bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            خدمات محترفين الديار الشاملة في جدة
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            محترفين الديار تقدم 8 خدمات متخصصة ومتكاملة: مظلات السيارات، البرجولات الفاخرة، السواتر العالية،
            ساندوتش بانل المتقدم، ترميم الملحقات، تنسيق الحدائق، بيوت الشعر التراثية، والخيام الملكية
            بأعلى معايير الجودة والحرفية لعملائنا في جدة والمناطق المحيطة بالمملكة العربية السعودية
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className="group hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden border">
                {/* Service Header */}
                <div className={`${service.bgColor} p-6 text-center`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${service.iconColor} bg-white rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {service.title}
                  </h3>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, index) => (
                      <li key={`${service.id}-feature-${index}`} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-accent rounded-full ml-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price if available */}
                  {service.price && (
                    <p className="text-sm font-semibold text-primary mb-4">
                      السعر: {service.price}
                    </p>
                  )}

                  {/* CTA Button */}
                  <Button asChild variant="outline" className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all duration-300">
                    <Link href={service.href} className="flex items-center justify-center space-x-2 space-x-reverse">
                      <span>تفاصيل أكثر</span>
                      <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-primary mb-4">
            محترفين الديار - استشارة مجانية لجميع خدماتنا
          </h3>
          <p className="text-muted-foreground mb-6">
            فريق محترفين الديار المتخصص جاهز لمساعدتك في اختيار الحل الأمثل لمشروعك في جدة
            سواء كان مظلات، برجولات، سواتر، ساندوتش بانل، ترميم، تنسيق حدائق، بيوت شعر، أو خيام ملكية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="https://wa.me/+966553719009" className="flex items-center space-x-2 space-x-reverse">
                <span>تواصل مع محترفين الديار الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/portfolio" className="flex items-center space-x-2 space-x-reverse">
                <span>شاهد جميع أعمالنا المتنوعة</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
