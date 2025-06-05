'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const faqs = [
  {
    id: 1,
    category: 'عام',
    question: 'ما هي الخدمات التي تقدمها شركة محترفين الديار؟',
    answer: 'نقدم 8 خدمات متخصصة شاملة: مظلات سيارات، برجولات حدائق، سواتر خصوصية، ساندوتش بانل، ترميم ملحقات، تنسيق حدائق، بيوت شعر تراثية، وخيام ملكية. جميع خدماتنا متاحة في جدة والمناطق المحيطة.'
  },
  {
    id: 2,
    category: 'مظلات',
    question: 'كم تبلغ مدة الضمان على مظلات السيارات؟',
    answer: 'نقدم ضمان شامل لمدة 10 سنوات على جميع مظلات السيارات، يشمل الهيكل المعدني والقماش والتركيب. كما نوفر صيانة دورية مجانية خلال السنة الأولى.'
  },
  {
    id: 3,
    category: 'تركيب',
    question: 'كم تستغرق عملية تركيب المظلات أو البرجولات؟',
    answer: 'عادة ما تستغرق عملية التركيب من يوم إلى 3 أيام حسب حجم المشروع وتعقيده. مظلات السيارات العادية تحتاج يوم واحد، بينما البرجولات الكبيرة قد تحتاج إلى 2-3 أيام.'
  },
  {
    id: 4,
    category: 'ساندوتش بانل',
    question: 'هل ساندوتش بانل مناسب للمناخ الحار في جدة؟',
    answer: 'نعم، ساندوتش بانل مثالي للمناخ الحار في جدة. يوفر عزل حراري ممتاز يقلل استهلاك الكهرباء بنسبة تصل إلى 40%، ومقاوم للرطوبة والحرارة العالية.'
  },
  {
    id: 5,
    category: 'أسعار',
    question: 'هل تقدمون عروض أسعار مجانية؟',
    answer: 'نعم، نقدم عروض أسعار مجانية ومفصلة لجميع خدماتنا. يمكنكم طلب الزيارة المجانية عبر الواتساب أو الاتصال المباشر، وسيقوم مهندسنا بالزيارة وأخذ القياسات وتقديم العرض.'
  },
  {
    id: 6,
    category: 'ترميم',
    question: 'ما أنواع أعمال الترميم التي تقومون بها؟',
    answer: 'نقوم بجميع أعمال الترميم: ترميم الفلل والمنازل، ترميم الملاحق والاستراحات، تجديد المرافق، إصلاح التشققات، تجديد الدهانات، وترميم الأسقف والجدران.'
  },
  {
    id: 7,
    category: 'مواد',
    question: 'ما نوع المواد المستخدمة في التصنيع؟',
    answer: 'نستخدم أجود المواد المستوردة والمحلية: حديد مجلفن مقاوم للصدأ، أقمشة PVC عالية الجودة، ألواح ساندوتش بانل بمعايير عالمية، وخشب طبيعي معالج ضد الحشرات والرطوبة.'
  },
  {
    id: 8,
    category: 'تنسيق حدائق',
    question: 'هل تقدمون أنظمة ري ذكية للحدائق؟',
    answer: 'نعم، نقدم أنظمة ري ذكية حديثة تشمل: ري بالتنقيط، رشاشات أوتوماتيكية، أنظمة تحكم ذكية بالوقت والكمية، وأنظمة ري موفرة للمياه مناسبة لمناخ جدة.'
  },
  {
    id: 9,
    category: 'خدمة عملاء',
    question: 'هل لديكم خدمة عملاء على مدار الساعة؟',
    answer: 'نعم، لدينا خدمة عملاء متاحة 24/7 عبر الواتساب والهاتف. كما نوفر خدمة صيانة طوارئ للحالات العاجلة. فريقنا جاهز لخدمتكم في أي وقت.'
  },
  {
    id: 10,
    category: 'مناطق الخدمة',
    question: 'ما هي المناطق التي تغطونها في جدة؟',
    answer: 'نغطي جميع أحياء ومناطق جدة: شمال جدة، جنوب جدة، شرق جدة، وسط جدة، وجميع الأحياء الجديدة والقديمة. كما نخدم المحافظات القريبة من جدة حسب حجم المشروع.'
  }
];

const categories = ['الكل', 'عام', 'مظلات', 'ساندوتش بانل', 'ترميم', 'تنسيق حدائق', 'أسعار', 'خدمة عملاء'];

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(1);
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const filteredFAQs = selectedCategory === 'الكل'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 text-accent rounded-full mb-6">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            الأسئلة الشائعة
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            إجابات شاملة على أكثر الأسئلة التي يطرحها عملاؤنا حول خدمات محترفين الديار.
            لم تجد إجابة لسؤالك؟ تواصل معنا مباشرة
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-accent text-accent-foreground shadow-lg'
                  : 'hover:bg-accent/10 hover:border-accent'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-12">
          {filteredFAQs.map((faq) => (
            <div key={faq.id} className="bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full text-right p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4 space-x-reverse">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    faq.category === 'مظلات' ? 'bg-blue-100 text-blue-700' :
                    faq.category === 'ساندوتش بانل' ? 'bg-orange-100 text-orange-700' :
                    faq.category === 'ترميم' ? 'bg-green-100 text-green-700' :
                    faq.category === 'تنسيق حدائق' ? 'bg-emerald-100 text-emerald-700' :
                    faq.category === 'أسعار' ? 'bg-purple-100 text-purple-700' :
                    faq.category === 'خدمة عملاء' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {faq.category}
                  </span>
                  <h3 className="text-lg font-semibold text-primary text-right">
                    {faq.question}
                  </h3>
                </div>
                <div className="flex-shrink-0">
                  {openFAQ === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-accent" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </button>

              {openFAQ === faq.id && (
                <div className="px-6 pb-6">
                  <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-xl p-4 border-r-4 border-accent">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">
            لم تجد إجابة لسؤالك؟
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            فريق خدمة العملاء في محترفين الديار جاهز للإجابة على جميع استفساراتكم
            وتقديم الاستشارة المجانية المناسبة لاحتياجاتكم
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
              <Link href="https://wa.me/+966553719009" className="flex items-center space-x-3 space-x-reverse">
                <MessageCircle className="w-5 h-5" />
                <span>تواصل عبر الواتساب</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
              <Link href="tel:+966553719009" className="flex items-center space-x-3 space-x-reverse">
                <Phone className="w-5 h-5" />
                <span>اتصال مباشر</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
