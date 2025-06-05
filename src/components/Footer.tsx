import Link from 'next/link';
import {
  Phone,
  MapPin,
  Mail,
  Clock,
  Instagram,
  MessageCircle,
  Star,
  Award,
  Shield,
  Users,
  Building,
  Umbrella,
  TreePine,
  Wrench,
  Hammer,
  Tent,
  ExternalLink,
  ArrowRight,
  CheckCircle,
  Globe,
  Calendar,
  Send,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    name: 'مظلات سيارات جدة',
    href: '/services/mazallat',
    icon: Umbrella,
    color: 'text-blue-400'
  },
  {
    name: 'برجولات حدائق جدة',
    href: '/services/pergolas',
    icon: Building,
    color: 'text-green-400'
  },
  {
    name: 'سواتر خصوصية جدة',
    href: '/services/sawater',
    icon: Shield,
    color: 'text-purple-400'
  },
  {
    name: 'ساندوتش بانل جدة',
    href: '/services/sandwich-panel',
    icon: Wrench,
    color: 'text-orange-400'
  },
  {
    name: 'ترميم ملحقات جدة',
    href: '/services/renovation',
    icon: Hammer,
    color: 'text-red-400'
  },
  {
    name: 'تنسيق حدائق جدة',
    href: '/services/landscaping',
    icon: TreePine,
    color: 'text-emerald-400'
  },
  {
    name: 'بيوت شعر تراثية',
    href: '/services/byoot-shaar',
    icon: Tent,
    color: 'text-amber-400'
  },
  {
    name: 'خيام ملكية فاخرة',
    href: '/services/khayyam',
    icon: Award,
    color: 'text-indigo-400'
  }
];

const quickLinks = [
  { name: 'معرض الأعمال', href: '/portfolio', icon: Building },
  { name: 'عن محترفين الديار العالمية', href: '/about', icon: Award },
  { name: 'المقالات', href: '/articles', icon: ExternalLink },
  { name: 'عروض الأسعار', href: '/quote', icon: Send },
  { name: 'الأسئلة الشائعة', href: '/faq', icon: CheckCircle },
  { name: 'تواصل معنا', href: '/contact', icon: MessageCircle },
  { name: 'سياسة الخصوصية', href: '/privacy', icon: Shield },
  { name: 'شروط الخدمة', href: '/terms', icon: CheckCircle }
];

const areas = [
  'مظلات شمال جدة',
  'مظلات وسط جدة',
  'مظلات شرق جدة',
  'مظلات جنوب جدة',
  'مظلات غرب جدة',
  'مظلات حي الفيصلية',
  'مظلات حي الزهراء',
  'مظلات حي النعيم'
];

const achievements = [
  { icon: Users, number: '5000+', label: 'عميل راضٍ', color: 'text-blue-400' },
  { icon: Building, number: '10000+', label: 'مشروع مكتمل', color: 'text-green-400' },
  { icon: Award, number: '15', label: 'عام خبرة', color: 'text-yellow-400' },
  { icon: Star, number: '4.9', label: 'تقييم العملاء', color: 'text-purple-400' }
];

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/aldiyarglobal',
    icon: Instagram,
    color: 'hover:bg-pink-600',
    bgColor: 'bg-pink-500'
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/966553719009',
    icon: MessageCircle,
    color: 'hover:bg-green-600',
    bgColor: 'bg-green-500'
  },
  {
    name: 'TikTok',
    href: 'https://vm.tiktok.com/ZShKSH6o9/',
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.349-2.021-1.349-3.338h-2.888v13.422c0 1.798-1.462 3.26-3.26 3.26s-3.26-1.462-3.26-3.26 1.462-3.26 3.26-3.26c.337 0 .662.051.967.147V8.421a6.14 6.14 0 0 0-.967-.078c-3.393 0-6.148 2.755-6.148 6.148s2.755 6.148 6.148 6.148 6.148-2.755 6.148-6.148V9.562a9.007 9.007 0 0 0 5.204 1.634V8.308a6.191 6.191 0 0 1-2.275-.746z"/>
      </svg>
    ),
    color: 'hover:bg-gray-800',
    bgColor: 'bg-gray-700'
  }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Top Section - Company Info & Newsletter */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Company Brand */}
            <div>
              <div className="flex items-center space-x-3 space-x-reverse mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-white fill-current" />
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    محترفين الديار العالمية
                  </h2>
                  <p className="text-accent text-sm font-medium">
                    جميع الخدمات المتخصصة - جدة
                  </p>
                </div>
              </div>

              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                شركة رائدة في مجال المظلات والبرجولات والساندوتش بانل في جدة.
                خبرة 15 عاماً في تقديم أفضل الخدمات بأعلى معايير الجودة والإتقان.
              </p>

              {/* Achievements */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.label} className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <achievement.icon className={`w-6 h-6 mx-auto mb-2 ${achievement.color}`} />
                    <div className="text-2xl font-bold text-white mb-1">
                      {achievement.number}
                    </div>
                    <div className="text-xs text-gray-400">
                      {achievement.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter & Contact */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 backdrop-blur-sm border border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">ابق على تواصل معنا</h3>
                <p className="text-gray-300">احصل على أحدث العروض والمقالات التخصصية</p>
              </div>

              {/* Quick Contact */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center space-x-4 space-x-reverse">
                  <div className="flex items-center space-x-2 space-x-reverse bg-white/10 rounded-full px-4 py-2">
                    <Phone className="w-4 h-4 text-accent" />
                    <Link href="tel:+966553719009" className="text-white hover:text-accent transition-colors font-medium">
                      966553719009+
                    </Link>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse bg-white/10 rounded-full px-4 py-2">
                    <Mail className="w-4 h-4 text-accent" />
                    <Link href="mailto:info@aldeyarksa.tech" className="text-white hover:text-accent transition-colors font-medium">
                      البريد الإلكتروني
                    </Link>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="text-center">
                <h4 className="text-lg font-semibold text-white mb-4">تابعنا على</h4>
                <div className="flex justify-center space-x-4 space-x-reverse">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 ${social.bgColor} rounded-xl flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5 text-white" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Button asChild className="flex-1 bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300">
                  <Link href="/quote" className="flex items-center justify-center space-x-2 space-x-reverse">
                    <Send className="w-4 h-4" />
                    <span>طلب عرض سعر</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1 border-white/30 text-white hover:bg-white/10">
                  <Link href="https://wa.me/966553719009" className="flex items-center justify-center space-x-2 space-x-reverse">
                    <MessageCircle className="w-4 h-4" />
                    <span>واتساب</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2 space-x-reverse">
              <Wrench className="w-5 h-5 text-accent" />
              <span>خدماتنا</span>
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="flex items-center space-x-2 space-x-reverse text-gray-300 hover:text-white transition-colors duration-200 group"
                  >
                    <service.icon className={`w-4 h-4 ${service.color} group-hover:scale-110 transition-transform`} />
                    <span className="group-hover:translate-x-1 transition-transform">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2 space-x-reverse">
              <ExternalLink className="w-5 h-5 text-accent" />
              <span>روابط سريعة</span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center space-x-2 space-x-reverse text-gray-300 hover:text-white transition-colors duration-200 group"
                  >
                    <link.icon className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2 space-x-reverse">
              <MapPin className="w-5 h-5 text-accent" />
              <span>مناطق الخدمة</span>
            </h3>
            <ul className="space-y-3">
              {areas.map((area) => (
                <li key={area} className="flex items-center space-x-2 space-x-reverse text-gray-300 hover:text-white transition-colors duration-200 group">
                  <CheckCircle className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2 space-x-reverse">
              <Phone className="w-5 h-5 text-accent" />
              <span>معلومات الاتصال</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">اتصل بنا</p>
                  <Link href="tel:+966553719009" className="text-white hover:text-accent transition-colors font-medium">
                    966553719009+
                  </Link>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">البريد الإلكتروني</p>
                  <Link href="mailto:info@aldeyarksa.tech" className="text-white hover:text-accent transition-colors font-medium">
                    info@aldeyarksa.tech
                  </Link>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">الموقع</p>
                  <p className="text-white">جدة، المملكة العربية السعودية</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">ساعات العمل</p>
                  <p className="text-white">24/7 خدمة العملاء</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Rich Content */}
        <div className="sr-only">
          <h2>محترفين الديار العالمية - أفضل شركة مظلات وبرجولات في جدة</h2>
          <p>
            محترفين الديار العالمية الشركة الرائدة في جدة لتركيب مظلات السيارات، البرجولات، السواتر، الساندوتش بانل،
            ترميم الملحقات، تنسيق الحدائق، بيوت الشعر التراثية، والخيام الملكية. نخدم جميع أحياء جدة
            بخبرة 15 عاماً وضمان شامل 10 سنوات.
          </p>
          <ul>
            <li>مظلات سيارات جدة - تركيب احترافي بأفضل الأسعار</li>
            <li>برجولات حدائق جدة - تصاميم فاخرة ومواد عالية الجودة</li>
            <li>سواتر خصوصية جدة - حماية وخصوصية تامة</li>
            <li>ساندوتش بانل جدة - عزل حراري وصوتي متقدم</li>
            <li>ترميم ملحقات جدة - تجديد وصيانة شاملة</li>
            <li>تنسيق حدائق جدة - تصميم وتنفيذ احترافي</li>
          </ul>

          {/* Internal Backlinks */}
          <div className="internal-links">
            <h3>روابط ذات صلة</h3>
            <ul>
              <li><a href="/services/mazallat">أفضل مظلات سيارات في جدة</a></li>
              <li><a href="/services/pergolas">برجولات خشبية وحديدية جدة</a></li>
              <li><a href="/services/sawater">سواتر خصوصية للحدائق والفلل</a></li>
              <li><a href="/services/sandwich-panel">ساندوتش بانل عازل حراري</a></li>
              <li><a href="/services/renovation">ترميم وتجديد الملحقات</a></li>
              <li><a href="/services/landscaping">تنسيق حدائق فلل ومنازل</a></li>
              <li><a href="/portfolio">معرض أعمال محترفين الديار العالمية</a></li>
              <li><Link href="/articles">مقالات تخصصية في المظلات والبرجولات</Link></li>
            </ul>
          </div>

          {/* Local SEO Content */}
          <div className="local-seo">
            <h3>نخدم جميع أحياء جدة</h3>
            <p>
              مظلات شمال جدة، مظلات وسط جدة، مظلات شرق جدة، مظلات جنوب جدة، مظلات غرب جدة،
              مظلات حي الفيصلية، مظلات حي الزهراء، مظلات حي النعيم، مظلات حي الصفا،
              مظلات حي المرجان، مظلات حي أبحر، مظلات حي الأندلس، مظلات حي الروضة
            </p>
          </div>

          {/* Service Keywords */}
          <div className="service-keywords">
            <h3>خدماتنا المتخصصة</h3>
            <p>
              تركيب مظلات حدائق، مظلات مواقف سيارات، مظلات مسابح، برجولات خشبية،
              برجولات حديدية، سواتر قماش، سواتر حديد، ساندوتش بانل للجدران،
              ساندوتش بانل للأسقف، تنسيق حدائق منزلية، تنسيق حدائق فلل،
              بيوت شعر تراثية، خيام ملكية فاخرة، ترميم مظلات قديمة
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-400">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Globe className="w-4 h-4" />
                <span>© {currentYear} محترفين الديار العالمية</span>
              </div>
              <div className="hidden md:block">•</div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Heart className="w-4 h-4 text-red-400" />
                <span>جميع الحقوق محفوظة</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                سياسة الخصوصية
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                شروط الخدمة
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="https://aldeyarksa.tech" className="text-accent hover:text-white transition-colors font-medium">
                aldeyarksa.tech
              </Link>
            </div>
          </div>

          {/* Developer Info */}
          <div className="border-t border-white/5 mt-6 pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">
                تطوير وإدارة الموقع من قبل المهندس
              </p>
              <div className="flex items-center justify-center space-x-4 space-x-reverse">
                <span className="text-accent font-medium">Mujahed Ahmed Alhemiry</span>
                <Link
                  href="tel:+967773505749"
                  className="flex items-center space-x-2 space-x-reverse text-gray-400 hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>967773505749+</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
