'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: 'أحمد المالكي',
    location: 'حي الروضة، جدة',
    service: 'مظلات سيارات',
    rating: 5,
    text: 'خدمة ممتازة من محترفين الديار. تم تركيب مظلات السيارات بجودة عالية وفي الوقت المحدد. أنصح بالتعامل معهم.',
    date: '2024'
  },
  {
    id: 2,
    name: 'فاطمة العتيبي',
    location: 'حي النسيم، جدة',
    service: 'برجولة حديقة',
    rating: 5,
    text: 'برجولة الحديقة تمت بإتقان شديد. التصميم رائع والخامات عالية الجودة. شكراً لفريق محترفين الديار.',
    date: '2024'
  },
  {
    id: 3,
    name: 'محمد الغامدي',
    location: 'حي الأندلس، جدة',
    service: 'ساندوتش بانل',
    rating: 5,
    text: 'تركيب ساندوتش بانل لمستودعي تم بمهنية عالية. العزل ممتاز والتنفيذ سريع. أفضل شركة في جدة.',
    date: '2023'
  },
  {
    id: 4,
    name: 'سارة القحطاني',
    location: 'حي الشاطئ، جدة',
    service: 'سواتر خصوصية',
    rating: 5,
    text: 'السواتر حققت الخصوصية المطلوبة بتصميم جميل. فريق العمل محترف والخدمة متميزة.',
    date: '2024'
  },
  {
    id: 5,
    name: 'عبدالله الحربي',
    location: 'شمال جدة',
    service: 'ترميم ملحقات',
    rating: 5,
    text: 'ترميم الملحق تم بشكل رائع. اهتمام بالتفاصيل ومواد عالية الجودة. النتيجة فاقت التوقعات.',
    date: '2024'
  },
  {
    id: 6,
    name: 'نورا السلمي',
    location: 'حي الزهراء، جدة',
    service: 'تنسيق حدائق',
    rating: 5,
    text: 'تنسيق الحديقة أصبح أجمل من المتوقع. النباتات مناسبة للمناخ ونظام الري ممتاز.',
    date: '2023'
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextTestimonial = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const prevTestimonial = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            شهادات عملائنا الكرام في جدة
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            نفخر بثقة عملائنا وآرائهم الإيجابية في خدماتنا. إليكم بعض شهادات العملاء
            الذين تعاملوا مع محترفين الديار واختبروا جودة خدماتنا المتميزة
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-4xl mx-auto mb-12">
          <div
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 text-accent/20">
              <Quote className="w-16 h-16" />
            </div>

            {/* Rating Stars */}
            <div className="flex items-center justify-center mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={`star-${currentTestimonial.id}-${i}`} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-xl md:text-2xl text-center text-primary leading-relaxed mb-8 font-medium">
              "{currentTestimonial.text}"
            </blockquote>

            {/* Client Info */}
            <div className="text-center">
              <div className="font-bold text-lg text-primary mb-1">
                {currentTestimonial.name}
              </div>
              <div className="text-muted-foreground mb-2">
                {currentTestimonial.location}
              </div>
              <div className="inline-flex items-center bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
                خدمة: {currentTestimonial.service}
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 transform -translate-y-1/2 left-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
            <div className="absolute top-1/2 transform -translate-y-1/2 right-4">
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Testimonial Dots */}
        <div className="flex justify-center space-x-2 space-x-reverse mb-12">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-accent w-8' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-xl p-6 shadow-lg transition-all duration-300 cursor-pointer ${
                index === currentIndex ? 'ring-2 ring-accent shadow-xl' : 'hover:shadow-xl'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={`star-grid-${testimonial.id}-${i}`} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Client Info */}
              <div className="border-t pt-4">
                <div className="font-semibold text-primary text-sm">
                  {testimonial.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {testimonial.location} • {testimonial.service}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-primary mb-4">
            انضم إلى عملائنا الراضين
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            احصل على نفس مستوى الجودة والخدمة المتميزة التي حصل عليها آلاف العملاء قبلك
          </p>
          <Button size="lg" className="text-lg px-8 py-6 h-auto">
            احصل على استشارة مجانية الآن
          </Button>
        </div>
      </div>
    </section>
  );
}
