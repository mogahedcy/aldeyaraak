'use client';

import { useState, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdvancedSearch from '@/components/AdvancedSearch';
import SearchResults from '@/components/SearchResults';
import { ArrowLeft, BookOpen, TrendingUp, Eye, Heart, Clock, Tag, Star, Brain, Zap, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// بيانات المقالات الموسعة والشاملة
const articles = [
  {
    id: 1,
    slug: 'best-car-shades-jeddah-2024',
    title: 'أفضل أنواع مظلات السيارات في جدة 2024',
    excerpt: 'دليل شامل لاختيار أفضل مظلة لسيارتك في مناخ جدة الساحلي. تعرف على المواد والتصاميم المختلفة ونصائح الاختيار.',
    content: "...", // المحتوى موجود من قبل
    category: 'مظلات سيارات',
    author: 'فريق محترفين الديار العالمية',
    authorAvatar: 'https://ui-avatars.com/api/?name=فريق+محترفين+الديار+العالمية&background=0f172a&color=fff',
    date: '15 نوفمبر 2024',
    readTime: '5 دقائق',
    image: '/uploads/mazallat-1.webp',
    tags: ['مظلات', 'سيارات', 'جدة', 'دليل'],
    featured: true,
    views: 1250,
    likes: 89,
    rating: 4.8,
    commentsCount: 12,
    keywords: ['مظلات سيارات', 'حماية السيارات', 'المناخ الساحلي', 'جودة المواد']
  },
  {
    id: 2,
    slug: 'wooden-pergola-maintenance-coastal-climate',
    title: 'كيفية صيانة البرجولة الخشبية في المناخ الساحلي',
    excerpt: 'نصائح مهمة للحفاظ على برجولتك الخشبية من آثار الرطوبة والملوحة في جدة. جدول صيانة شهري وسنوي.',
    content: "...",
    category: 'برجولات',
    author: 'المهندس أحمد الديار',
    authorAvatar: 'https://ui-avatars.com/api/?name=أحمد+الديار&background=059669&color=fff',
    date: '10 نوفمبر 2024',
    readTime: '4 دقائق',
    image: '/uploads/pergola-1.jpg',
    tags: ['برجولات', 'صيانة', 'خشب', 'نصائح'],
    featured: false,
    views: 890,
    likes: 67,
    rating: 4.6,
    commentsCount: 8,
    keywords: ['برجولات خشبية', 'صيانة الحدائق', 'المناخ الرطب', 'العناية بالخشب']
  },
  {
    id: 3,
    slug: 'sandwich-panel-thermal-insulation-saudi',
    title: 'ساندوتش بانل: الحل الأمثل للعزل الحراري في السعودية',
    excerpt: 'لماذا يعتبر الساندوتش بانل الخيار الأول للمباني التجارية والصناعية؟ فوائد العزل الحراري وتوفير الطاقة.',
    content: "...",
    category: 'ساندوتش بانل',
    author: 'المهندس سعد التقني',
    authorAvatar: 'https://ui-avatars.com/api/?name=سعد+التقني&background=dc2626&color=fff',
    date: '5 نوفمبر 2024',
    readTime: '6 دقائق',
    image: '/uploads/sandwich-panel-1.jpg',
    tags: ['ساندوتش بانل', 'عزل حراري', 'توفير طاقة'],
    featured: true,
    views: 2100,
    likes: 145,
    rating: 4.9,
    commentsCount: 18,
    keywords: ['عزل حراري', 'مباني تجارية', 'توفير الطاقة', 'ساندوتش بانل']
  },
  {
    id: 4,
    slug: 'smart-fences-privacy-elegance',
    title: 'السواتر الذكية: خصوصية وأناقة في آن واحد',
    excerpt: 'تعرف على أحدث أنواع السواتر التي تجمع بين الجمال والوظيفة. سواتر متحركة وأتوماتيكية وصديقة للبيئة.',
    content: `
      <div class="prose prose-lg max-w-none">
        <h2 class="text-2xl font-bold text-primary mb-4">ثورة في عالم السواتر</h2>
        <p class="text-gray-700 leading-relaxed mb-6">السواتر الذكية تمثل نقلة نوعية في مجال الخصوصية والحماية، حيث تجمع بين التكنولوجيا الحديثة والتصميم الأنيق. في عالم يتطور باستمرار، أصبحت الحاجة إلى حلول ذكية ومتطورة ضرورة حتمية.</p>

        <h3 class="text-xl font-bold text-primary mb-4">أنواع السواتر الذكية المتوفرة</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="font-semibold text-blue-800 mb-2">السواتر المتحركة كهربائياً</h4>
            <p class="text-blue-700 text-sm">تعمل بالتحكم عن بُعد وتوفر مرونة في التحكم بمستوى الخصوصية</p>
          </div>
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 class="font-semibold text-green-800 mb-2">السواتر ذات أجهزة الاستشعار</h4>
            <p class="text-green-700 text-sm">تتفاعل مع الظروف الجوية وتعدل موضعها تلقائياً</p>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">المزايا التقنية والوظيفية</h3>
        <ul class="space-y-3 mb-6">
          <li class="flex items-start">
            <span class="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2 ml-3"></span>
            <div>
              <strong>التحكم الذكي:</strong> إمكانية التحكم عبر التطبيقات الذكية أو أنظمة المنزل الذكي
            </div>
          </li>
          <li class="flex items-start">
            <span class="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2 ml-3"></span>
            <div>
              <strong>المقاومة العالية:</strong> تتحمل الظروف الجوية القاسية والرياح العاتية
            </div>
          </li>
          <li class="flex items-start">
            <span class="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2 ml-3"></span>
            <div>
              <strong>التصميم المخصص:</strong> إمكانية التخصيص حسب احتياجات العميل والمساحة المتاحة
            </div>
          </li>
        </ul>
      </div>
    `,
    category: 'سواتر',
    author: 'مصمم السواتر عمر',
    authorAvatar: 'https://ui-avatars.com/api/?name=عمر&background=ea580c&color=fff',
    date: '25 أكتوبر 2024',
    readTime: '3 دقائق',
    image: '/uploads/sawater-1.webp',
    tags: ['سواتر', 'خصوصية', 'تقنية ذكية'],
    featured: true,
    views: 1890,
    likes: 127,
    rating: 4.8,
    commentsCount: 22,
    keywords: ['سواتر ذكية', 'خصوصية المنزل', 'التحكم الآلي', 'تقنيات حديثة']
  },
  {
    id: 5,
    slug: 'royal-tents-luxury-occasions-guide',
    title: 'خيام ملكية فاخرة: دليل التصميم للمناسبات الخاصة',
    excerpt: 'كيف تختار الخيمة الملكية المثالية لمناسباتك؟ أنواع الأقمشة والتصاميم والإكسسوارات لكل مناسبة.',
    content: `
      <div class="prose prose-lg max-w-none">
        <h2 class="text-2xl font-bold text-primary mb-4">فن اختيار الخيام الملكية</h2>
        <p class="text-gray-700 leading-relaxed mb-6">الخيام الملكية ليست مجرد مأوى، بل هي تعبير عن الفخامة والأناقة والتراث العريق. في المملكة العربية السعودية، تحتل الخيام الملكية مكانة خاصة في المناسبات الاجتماعية والثقافية.</p>

        <h3 class="text-xl font-bold text-primary mb-4">أنواع الخيام الملكية حسب المناسبة</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
            <h4 class="font-semibold text-purple-800 mb-2">خيام الأفراح</h4>
            <p class="text-purple-700 text-sm">تصاميم فاخرة بألوان زاهية ونقوش تراثية</p>
          </div>
          <div class="bg-gold-50 border border-yellow-200 rounded-lg p-4 text-center">
            <h4 class="font-semibold text-yellow-800 mb-2">خيام المؤتمرات</h4>
            <p class="text-yellow-700 text-sm">تصاميم أنيقة ومريحة للفعاليات الرسمية</p>
          </div>
          <div class="bg-rose-50 border border-rose-200 rounded-lg p-4 text-center">
            <h4 class="font-semibold text-rose-800 mb-2">خيام العزاء</h4>
            <p class="text-rose-700 text-sm">تصاميم بسيطة ومهيبة تناسب المناسبة</p>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">معايير الجودة والاختيار</h3>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <ul class="space-y-3">
            <li><strong>جودة القماش:</strong> استخدام أقمشة مقاومة للماء والحريق</li>
            <li><strong>قوة الهيكل:</strong> هياكل معدنية مجلفنة تتحمل الرياح</li>
            <li><strong>العزل الحراري:</strong> طبقات عازلة للحرارة والبرودة</li>
            <li><strong>سهولة التركيب:</strong> نظام تركيب سريع ومرن</li>
          </ul>
        </div>
      </div>
    `,
    category: 'خيام ملكية',
    author: 'خبير الضيافة محمد',
    authorAvatar: 'https://ui-avatars.com/api/?name=محمد&background=7c3aed&color=fff',
    date: '20 أكتوبر 2024',
    readTime: '6 دقائق',
    image: '/uploads/khayyam-1.webp',
    tags: ['خيام ملكية', 'مناسبات', 'فخامة'],
    featured: false,
    views: 980,
    likes: 73,
    rating: 4.7,
    commentsCount: 15,
    keywords: ['خيام فاخرة', 'مناسبات اجتماعية', 'التراث السعودي', 'ضيافة']
  },
  {
    id: 6,
    slug: 'traditional-hair-houses-heritage-modern',
    title: 'بيوت الشعر التراثية: جمع الأصالة والحداثة',
    excerpt: 'كيف تحافظ على الطابع التراثي لبيت الشعر مع إضافة لمسات عصرية؟ مواد تقليدية بتقنيات حديثة.',
    content: `
      <div class="prose prose-lg max-w-none">
        <h2 class="text-2xl font-bold text-primary mb-4">بيوت الشعر: رمز الأصالة والتراث</h2>
        <p class="text-gray-700 leading-relaxed mb-6">بيوت الشعر تحمل في طياتها تاريخاً عريقاً وتراثاً أصيلاً يعكس حياة البدو في الجزيرة العربية. اليوم، نجمع بين هذا التراث العريق والتقنيات الحديثة لنقدم تجربة فريدة ومميزة.</p>

        <h3 class="text-xl font-bold text-primary mb-4">المواد التقليدية والحديثة</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-brown-50 border border-brown-200 rounded-lg p-4">
            <h4 class="font-semibold text-brown-800 mb-2">المواد التقليدية</h4>
            <ul class="text-brown-700 text-sm space-y-1">
              <li>• شعر الماعز الطبيعي</li>
              <li>• الحبال المجدولة يدوياً</li>
              <li>• الأعمدة الخشبية التراثية</li>
            </ul>
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="font-semibold text-blue-800 mb-2">التحسينات الحديثة</h4>
            <ul class="text-blue-700 text-sm space-y-1">
              <li>• معالجة مقاومة للحشرات</li>
              <li>• تقنيات عزل متطورة</li>
              <li>• أنظمة تهوية محسنة</li>
            </ul>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">الاستخدامات العصرية</h3>
        <p class="text-gray-700 leading-relaxed mb-4">بيوت الشعر اليوم لا تقتصر على الاستخدامات التقليدية، بل توسعت لتشمل المقاهي الشعبية والمطاعم التراثية والفعاليات الثقافية.</p>

        <div class="bg-amber-50 border-r-4 border-amber-400 p-6 mb-6">
          <h4 class="font-semibold text-amber-800 mb-2">نصيحة خبير</h4>
          <p class="text-amber-700">عند اختيار بيت الشعر، تأكد من أن المواد المستخدمة معالجة ضد العوامل الجوية والحشرات مع الحفاظ على الطابع التراثي الأصيل.</p>
        </div>
      </div>
    `,
    category: 'بيوت شعر',
    author: 'أستاذ التراث عبدالله',
    authorAvatar: 'https://ui-avatars.com/api/?name=عبدالله&background=16a34a&color=fff',
    date: '18 أكتوبر 2024',
    readTime: '5 دقائق',
    image: '/uploads/byoot-shaar-1.webp',
    tags: ['بيوت شعر', 'تراث', 'أصالة'],
    featured: false,
    views: 1340,
    likes: 91,
    rating: 4.5,
    commentsCount: 19,
    keywords: ['التراث السعودي', 'بيوت شعر', 'ثقافة بدوية', 'تصميم تراثي']
  },
  {
    id: 7,
    slug: 'garden-design-trends-saudi-2024',
    title: 'اتجاهات تصميم الحدائق في المملكة 2024',
    excerpt: 'أحدث صيحات تنسيق الحدائق المناسبة للمناخ السعودي. نباتات محلية وأنظمة ري ذكية وتصاميم مستدامة.',
    content: `
      <div class="prose prose-lg max-w-none">
        <h2 class="text-2xl font-bold text-primary mb-4">الحدائق المستدامة في المناخ الصحراوي</h2>
        <p class="text-gray-700 leading-relaxed mb-6">تنسيق الحدائق في المملكة العربية السعودية يتطلب فهماً عميقاً للمناخ المحلي والنباتات المحلية. في عام 2024، نشهد توجهاً متزايداً نحو الاستدامة والتوافق البيئي.</p>

        <h3 class="text-xl font-bold text-primary mb-4">النباتات المحلية المُوصى بها</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 class="font-semibold text-green-800 mb-2">الأشجار</h4>
            <ul class="text-green-700 text-sm space-y-1">
              <li>• نخيل الواشنطونيا</li>
              <li>• شجر الغاف</li>
              <li>• شجر السدر</li>
            </ul>
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="font-semibold text-blue-800 mb-2">الشجيرات</h4>
            <ul class="text-blue-700 text-sm space-y-1">
              <li>• اللافندر</li>
              <li>• الدفلة</li>
              <li>• الياسمين البري</li>
            </ul>
          </div>
          <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 class="font-semibold text-purple-800 mb-2">النباتات العطرية</h4>
            <ul class="text-purple-700 text-sm space-y-1">
              <li>• الريحان</li>
              <li>• النعناع</li>
              <li>• الزعتر البري</li>
            </ul>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">أنظمة الري الذكية</h3>
        <p class="text-gray-700 leading-relaxed mb-4">استخدام التقنيات الحديثة في الري يوفر حتى 50% من استهلاك المياه مع ضمان نمو صحي للنباتات.</p>

        <div class="bg-cyan-50 border border-cyan-200 rounded-lg p-6 mb-6">
          <h4 class="font-semibold text-cyan-800 mb-3">تقنيات الري المتطورة</h4>
          <ul class="text-cyan-700 space-y-2">
            <li>• أجهزة استشعار الرطوبة التلقائية</li>
            <li>• نظام الري بالتنقيط المبرمج</li>
            <li>• تطبيقات الهاتف للتحكم عن بُعد</li>
            <li>• أنظمة إعادة تدوير المياه الرمادية</li>
          </ul>
        </div>
      </div>
    `,
    category: 'تنسيق حدائق',
    author: 'أخصائي التنسيق فيصل',
    authorAvatar: 'https://ui-avatars.com/api/?name=فيصل&background=16a34a&color=fff',
    date: '1 نوفمبر 2024',
    readTime: '5 دقائق',
    image: '/uploads/landscaping-1.webp',
    tags: ['تنسيق حدائق', 'نباتات محلية', 'تصميم'],
    featured: false,
    views: 1560,
    likes: 98,
    rating: 4.7,
    commentsCount: 15,
    keywords: ['تنسيق حدائق', 'نباتات صحراوية', 'ري ذكي', 'استدامة']
  },
  {
    id: 8,
    slug: 'renovation-secrets-modern-techniques',
    title: 'أسرار ترميم الملحقات بأحدث التقنيات',
    excerpt: 'كيف تعيد الحياة لملحقاتك القديمة؟ تقنيات حديثة في الترميم والعزل وإضافة اللمسات العصرية.',
    content: `
      <div class="prose prose-lg max-w-none">
        <h2 class="text-2xl font-bold text-primary mb-4">فن ترميم الملحقات العصري</h2>
        <p class="text-gray-700 leading-relaxed mb-6">ترميم الملحقات ليس مجرد إصلاح، بل إعادة إحياء وتطوير. نجمع بين الحفاظ على الطابع الأصلي وإضافة التقنيات الحديثة لخلق مساحات وظيفية وجميلة.</p>

        <h3 class="text-xl font-bold text-primary mb-4">مراحل الترميم المتقدم</h3>
        <div class="space-y-4 mb-6">
          <div class="flex items-start space-x-4 space-x-reverse">
            <div class="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <h4 class="font-semibold text-gray-800">التقييم والتشخيص</h4>
              <p class="text-gray-600 text-sm">فحص شامل للهيكل والأسس والتمديدات</p>
            </div>
          </div>
          <div class="flex items-start space-x-4 space-x-reverse">
            <div class="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <h4 class="font-semibold text-gray-800">التخطيط والتصميم</h4>
              <p class="text-gray-600 text-sm">وضع خطة شاملة تجمع بين الأصالة والحداثة</p>
            </div>
          </div>
          <div class="flex items-start space-x-4 space-x-reverse">
            <div class="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <h4 class="font-semibold text-gray-800">التنفيذ والتطوير</h4>
              <p class="text-gray-600 text-sm">تطبيق التقنيات الحديثة مع الحفاظ على الهوية</p>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">التقنيات الحديثة في الترميم</h3>
        <div class="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-lg p-6 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 class="font-semibold text-gray-800 mb-2">العزل المتطور</h4>
              <ul class="text-gray-700 text-sm space-y-1">
                <li>• عزل حراري بألواح عاكسة</li>
                <li>• عزل صوتي بمواد حديثة</li>
                <li>• حماية من الرطوبة</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-gray-800 mb-2">الأنظمة الذكية</h4>
              <ul class="text-gray-700 text-sm space-y-1">
                <li>• إضاءة LED ذكية</li>
                <li>• أنظمة تكييف موفرة للطاقة</li>
                <li>• أنظمة أمنية متطورة</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `,
    category: 'ترميم',
    author: 'مقاول الترميم خالد',
    authorAvatar: 'https://ui-avatars.com/api/?name=خالد&background=7c3aed&color=fff',
    date: '28 أكتوبر 2024',
    readTime: '4 دقائق',
    image: '/uploads/renovation-1.jpg',
    tags: ['ترميم', 'ملحقات', 'تجديد'],
    featured: false,
    views: 750,
    likes: 52,
    rating: 4.5,
    commentsCount: 6,
    keywords: ['ترميم منازل', 'تطوير ملحقات', 'تقنيات حديثة', 'عزل متطور']
  }
];

const categories = [
  'الكل',
  'مظلات سيارات',
  'برجولات',
  'ساندوتش بانل',
  'تنسيق حدائق',
  'ترميم',
  'سواتر',
  'خيام ملكية',
  'بيوت شعر'
];

// نظام البحث الذكي بالذكاء الاصطناعي
const intelligentSearch = (query: string, articles: typeof articles) => {
  if (!query.trim()) return articles;

  const searchTerms = query.toLowerCase().split(' ');

  return articles
    .map(article => {
      let score = 0;
      const searchableText = `${article.title} ${article.excerpt} ${article.category} ${article.author} ${article.tags.join(' ')} ${article.keywords.join(' ')}`.toLowerCase();

      // حساب النقاط بناءً على مطابقة الكلمات
      for (const term of searchTerms) {
        if (article.title.toLowerCase().includes(term)) score += 10;
        if (article.category.toLowerCase().includes(term)) score += 8;
        if (article.excerpt.toLowerCase().includes(term)) score += 5;
        if (article.keywords.some(keyword => keyword.toLowerCase().includes(term))) score += 7;
        if (article.tags.some(tag => tag.toLowerCase().includes(term))) score += 6;
        if (searchableText.includes(term)) score += 3;
      }

      // إضافة نقاط للمقالات المميزة والأكثر مشاهدة
      if (article.featured) score += 2;
      if (article.views > 1000) score += 1;

      return { ...article, searchScore: score };
    })
    .filter(article => article.searchScore > 0)
    .sort((a, b) => b.searchScore - a.searchScore);
};

export default function ArticlesPage() {
  const [searchResults, setSearchResults] = useState(articles);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchResults = (results: typeof articles) => {
    setSearchResults(results);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        {/* Enhanced Header Section */}
        <section className="py-20 bg-gradient-to-r from-primary via-accent to-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <BookOpen className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              مدونة محترفين الديار العالمية
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed opacity-90 mb-8">
              اكتشف أحدث المقالات والنصائح المتخصصة في مجال المظلات والبرجولات والساندوتش بانل من خبراء محترفين الديار العالمية
            </p>

            {/* AI Search Badge */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              <Brain className="w-4 h-4 ml-2" />
              مدعوم بالذكاء الاصطناعي
              <Zap className="w-4 h-4 mr-2 text-yellow-300" />
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Advanced Search Component */}
          <AdvancedSearch
            articles={articles}
            onSearchResults={handleSearchResults}
            className="mb-16"
          />

          {/* Search Results */}
          <SearchResults
            articles={searchResults}
            isLoading={isLoading}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
