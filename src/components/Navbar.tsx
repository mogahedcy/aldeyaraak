'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Instagram,
  Home,
  User,
  FileText,
  Star,
  Award,
  Search,
  Wrench,
  ChevronDown,
  Menu,
  X,
  Shield,
  Clock,
  CheckCircle,
  Palette,
  Tent,
  Building,
  Trees,
  Car,
  Hammer,
  Grid,
  Layers,
  Camera
} from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: Star, text: '15 سنة خبرة' },
    { icon: Shield, text: 'ضمان 10 سنوات' },
    { icon: Clock, text: 'خدمة 24/7' },
    { icon: CheckCircle, text: 'جودة مضمونة' }
  ];

  const mainNavItems = [
    { label: 'الرئيسية', href: '/', icon: Home },
    { label: 'من نحن', href: '/about', icon: User },
    { label: 'المدونة', href: '/articles', icon: FileText },
    { label: 'اتصل بنا', href: '/contact', icon: Phone }
  ];

  const servicesItems = [
    {
      label: 'مظلات السيارات',
      href: '/services/mazallat',
      icon: Car,
      description: 'مظلات متطورة لحماية المركبات',
      color: 'text-blue-600'
    },
    {
      label: 'الخيام والبيوت الشعر',
      href: '/services/khayyam',
      icon: Tent,
      description: 'خيام تراثية وعصرية مميزة',
      color: 'text-amber-600'
    },
    {
      label: 'بيوت الشعر',
      href: '/services/byoot-shaar',
      icon: Home,
      description: 'بيوت شعر أصيلة وفاخرة',
      color: 'text-emerald-600'
    },
    {
      label: 'السواتر',
      href: '/services/sawater',
      icon: Shield,
      description: 'سواتر للخصوصية والحماية',
      color: 'text-red-600'
    },
    {
      label: 'تنسيق الحدائق',
      href: '/services/landscaping',
      icon: Trees,
      description: 'تصميم وتنسيق المساحات الخضراء',
      color: 'text-green-600'
    },
    {
      label: 'برجولات',
      href: '/services/pergolas',
      icon: Grid,
      description: 'برجولات خشبية وحديدية أنيقة',
      color: 'text-purple-600'
    },
    {
      label: 'التشطيبات والتجديد',
      href: '/services/renovation',
      icon: Hammer,
      description: 'خدمات التجديد والتشطيب',
      color: 'text-orange-600'
    },
    {
      label: 'الساندوتش بانل',
      href: '/services/sandwich-panel',
      icon: Layers,
      description: 'ألواح عازلة متطورة',
      color: 'text-indigo-600'
    }
  ];

  return (
    <>
      {/* Top Bar - معلومات الاتصال */}
      <div className="bg-gradient-to-r from-primary/90 to-accent/90 text-white py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Phone className="w-4 h-4" />
                <Link href="tel:+966553719009" className="hover:text-white/80 transition-colors">
                  966553719009+
                </Link>
              </div>
              <div className="hidden lg:flex items-center space-x-2 space-x-reverse">
                <Mail className="w-4 h-4" />
                <Link href="mailto:info@aldeyarksa.tech" className="hover:text-white/80 transition-colors">
                  info@aldeyarksa.tech
                </Link>
              </div>
              <div className="hidden xl:flex items-center space-x-2 space-x-reverse">
                <MapPin className="w-4 h-4" />
                <span>جدة، المملكة العربية السعودية</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="hidden lg:flex items-center space-x-3 space-x-reverse">
                {features.slice(0, 2).map((feature) => (
                  <div key={feature.text} className="flex items-center space-x-1 space-x-reverse">
                    <feature.icon className="w-3 h-3" />
                    <span className="text-xs">{feature.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Link
                  href="https://www.instagram.com/aldiyarglobal"
                  className="hover:text-white/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-4 h-4" />
                </Link>
                <Link
                  href="https://wa.me/966553719009"
                  className="hover:text-white/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
          : 'bg-white shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">

            {/* Logo - محسن للهاتف */}
            <Link href="/" className="flex items-center space-x-1 sm:space-x-2 space-x-reverse group flex-shrink-0">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-accent rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-lg group-hover:scale-105 transition-transform duration-300">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-amber-400 rounded-full flex items-center justify-center">
                  <Star className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 text-white fill-current" />
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="text-xs sm:text-sm md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent truncate">
                  محترفين الديار العالمية
                </div>
                <div className="text-xs text-muted-foreground hidden sm:block">
                  جميع الخدمات المتخصصة - جدة
                </div>
              </div>
            </Link>

            {/* Mobile Quick Actions - محسن */}
            <div className="flex items-center space-x-1 sm:space-x-2 space-x-reverse lg:hidden">
              <Link
                href="https://wa.me/966553719009"
                className="p-1.5 sm:p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors flex-shrink-0"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="واتساب"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
              <Link
                href="tel:+966553719009"
                className="p-1.5 sm:p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors flex-shrink-0"
                aria-label="اتصال"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>

              {/* Mobile menu button - محسن */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="تبديل القائمة"
                className="relative w-8 h-8 sm:w-10 sm:h-10 p-1 flex-shrink-0"
              >
                {isMenuOpen ? (
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </Button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 space-x-reverse">
              {mainNavItems.slice(0, 2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-foreground hover:text-accent hover:bg-accent/5 transition-all duration-200 font-medium flex items-center space-x-2 space-x-reverse group"
                >
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Services Dropdown */}
              <div className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className="px-4 py-2 rounded-lg text-foreground hover:text-accent hover:bg-accent/5 transition-all duration-200 font-medium flex items-center space-x-2 space-x-reverse group">
                  <Wrench className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>خدماتنا</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Services Mega Menu */}
                {isServicesOpen && (
                  <div className="absolute top-full right-0 w-[800px] bg-white border border-gray-100 rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-4 transform translate-y-2">
                    <div className="col-span-2 mb-4">
                      <h3 className="text-lg font-bold text-primary mb-2">خدماتنا المتخصصة</h3>
                      <p className="text-sm text-muted-foreground">نقدم أفضل الحلول في مجال المظلات والسواتر والتصميم</p>
                    </div>

                    {servicesItems.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="flex items-start space-x-3 space-x-reverse p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className={`p-2 rounded-lg bg-gray-50 group-hover:bg-white transition-colors ${service.color}`}>
                          <service.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                            {service.label}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {service.description}
                          </p>
                        </div>
                      </Link>
                    ))}

                    <div className="col-span-2 mt-4 pt-4 border-t border-gray-100">
                      <Link
                        href="/quote"
                        className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                      >
                        احصل على عرض سعر مجاني
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/portfolio"
                className="px-4 py-2 rounded-lg text-foreground hover:text-accent hover:bg-accent/5 transition-all duration-200 font-medium flex items-center space-x-2 space-x-reverse group"
              >
                <span>معرض الأعمال</span>
              </Link>
              <Link
                href="/portfolio/reviews"
                className="px-4 py-2 rounded-lg text-foreground hover:text-accent hover:bg-accent/5 transition-all duration-200 font-medium flex items-center space-x-2 space-x-reverse group"
              >
                <span>تقييمات العملاء</span>
              </Link>

              {mainNavItems.slice(2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-foreground hover:text-accent hover:bg-accent/5 transition-all duration-200 font-medium flex items-center space-x-2 space-x-reverse group"
                >
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* CTA Buttons - Desktop */}
            <div className="hidden lg:flex items-center space-x-3 space-x-reverse">
              <Button asChild variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-white">
                <Link href="/search" className="flex items-center space-x-2 space-x-reverse">
                  <Search className="w-4 h-4" />
                  <span>البحث</span>
                </Link>
              </Button>

              <Button asChild size="sm" className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300">
                <Link href="tel:+966553719009" className="flex items-center space-x-2 space-x-reverse">
                  <Phone className="w-4 h-4" />
                  <span>اتصل الآن</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - محسن بالكامل */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 space-y-1 sm:space-y-2">

              {/* Mobile Contact Info - محسن */}
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                    <Link href="tel:+966553719009" className="text-xs sm:text-sm font-medium">
                      966553719009+
                    </Link>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse">
                    <Link
                      href="https://wa.me/966553719009"
                      className="p-1.5 sm:p-2 rounded-full bg-green-100 text-green-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                    <Link
                      href="https://www.instagram.com/aldiyarglobal"
                      className="p-1.5 sm:p-2 rounded-full bg-pink-100 text-pink-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mobile Main Nav - محسن */}
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 sm:space-x-3 space-x-reverse px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-accent/5 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base">{item.label}</span>
                </Link>
              ))}

              {/* Mobile Services - محسن */}
              <div className="space-y-1">
                <div className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-muted-foreground border-b border-gray-100">
                  خدماتنا
                </div>
                <div className="grid grid-cols-1 gap-0.5 sm:gap-1">
                  {servicesItems.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="flex items-center space-x-2 sm:space-x-3 space-x-reverse px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-accent/5 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <service.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${service.color} flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate text-sm sm:text-base">{service.label}</div>
                        <div className="text-xs text-muted-foreground truncate hidden sm:block">{service.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile CTA - محسن */}
              <div className="pt-3 sm:pt-4 space-y-2">
                <Button asChild className="w-full bg-gradient-to-r from-primary to-accent text-sm sm:text-base h-10 sm:h-11">
                  <Link href="/quote" onClick={() => setIsMenuOpen(false)}>
                    احصل على عرض سعر مجاني
                  </Link>
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button asChild variant="outline" className="border-accent text-accent text-xs sm:text-sm h-9 sm:h-10">
                    <Link href="/search" onClick={() => setIsMenuOpen(false)}>
                      البحث المتقدم
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="text-xs sm:text-sm h-9 sm:h-10">
                    <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                      اتصل بنا
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}