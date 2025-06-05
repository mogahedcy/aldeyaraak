import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommentsSystem from '@/components/CommentsSystem';
import {
  Calendar, User, ArrowLeft, ArrowRight, Eye, Heart, Clock, Tag, Star, Share2,
  MessageCircle, ThumbsUp, Reply, Bookmark, Facebook, Twitter,
  Linkedin, Copy, CheckCircle, AlertCircle, Lightbulb, Info, TrendingUp,
  Shield, Zap, Award, Users, MapPin, ExternalLink, ChevronRight, Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import SafeHtmlContent from '@/components/SafeHtmlContent';
import StructuredDataScript from '@/components/StructuredDataScript';

// بيانات المقالات الشاملة مع المحتوى التفصيلي
const articles = [
  {
    id: 1,
    slug: 'best-car-shades-jeddah-2024',
    title: 'أفضل أنواع مظلات السيارات في جدة 2024',
    excerpt: 'دليل شامل لاختيار أفضل مظلة لسيارتك في مناخ جدة الساحلي. تعرف على المواد والتصاميم المختلفة ونصائح الاختيار.',
    content: `
      <div class="prose prose-lg max-w-none">
        <h2 class="text-2xl font-bold text-primary mb-6 flex items-center">
          <Shield class="w-6 h-6 ml-2" />
          مقدمة حول مظلات السيارات في جدة
        </h2>
        <p class="text-gray-700 leading-relaxed mb-6">تعتبر مظلات السيارات من الضروريات الأساسية في مدينة جدة، نظراً لمناخها الساحلي الحار والرطب الذي يصل إلى 45 درجة مئوية في الصيف. تساعد المظلات على تقليل درجة حرارة السيارة بنسبة تصل إلى 20 درجة مئوية، مما يوفر الراحة ويقلل استهلاك الوقود.</p>

        <div class="bg-blue-50 border-r-4 border-blue-400 p-6 mb-8 rounded-lg">
          <div class="flex items-start">
            <Info class="w-6 h-6 text-blue-400 ml-3 mt-1 flex-shrink-0" />
            <div>
              <h3 class="text-lg font-semibold text-blue-800 mb-2">حقائق مهمة</h3>
              <ul class="text-blue-700 space-y-1">
                <li>• توفر المظلات حماية من 99% من الأشعة فوق البنفسجية</li>
                <li>• تقلل تكاليف تكييف السيارة بنسبة 30%</li>
                <li>• تحمي طلاء السيارة من التلف والبهتان</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4 flex items-center">
          <Award class="w-5 h-5 ml-2" />
          أفضل المواد لمظلات السيارات
        </h3>

        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 class="font-bold text-accent mb-3">القماش المعالج ضد الأشعة فوق البنفسجية</h4>
            <div class="space-y-2 text-gray-600">
              <p>• حماية ممتازة من أشعة الشمس الضارة</p>
              <p>• تقليل درجة الحرارة بـ 15-20 درجة مئوية</p>
              <p>• مقاوم للتمزق والعوامل الجوية</p>
              <p>• ضمان 10 سنوات على اللون</p>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 class="font-bold text-accent mb-3">البولي إيثيلين عالي الكثافة (HDPE)</h4>
            <div class="space-y-2 text-gray-600">
              <p>• مقاوم للرطوبة والملوحة</p>
              <p>• مثالي للمناخ الساحلي في جدة</p>
              <p>• يتحمل الرياح العاتية حتى 120 كم/ساعة</p>
              <p>• صديق للبيئة وقابل للتدوير</p>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4 flex items-center">
          <TrendingUp class="w-5 h-5 ml-2" />
          أنواع التصاميم المختلفة
        </h3>

        <div class="space-y-6 mb-8">
          <div class="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border">
            <h4 class="font-bold text-lg mb-3">المظلات المقوسة (Arch Type)</h4>
            <p class="text-gray-600 mb-2">تصميم عصري وأنيق يوفر مساحة إضافية وتدفق هواء طبيعي</p>
            <div class="text-sm text-accent">السعر: 800-1200 ريال للمتر المربع</div>
          </div>

          <div class="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border">
            <h4 class="font-bold text-lg mb-3">المظلات الهرمية (Pyramid Type)</h4>
            <p class="text-gray-600 mb-2">مناسبة للمساحات المربعة وتوفر تغطية متوازنة</p>
            <div class="text-sm text-accent">السعر: 600-900 ريال للمتر المربع</div>
          </div>

          <div class="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border">
            <h4 class="font-bold text-lg mb-3">المظلات المائلة (Cantilever Type)</h4>
            <p class="text-gray-600 mb-2">توفر مرونة في التصميم ومناسبة للمساحات الضيقة</p>
            <div class="text-sm text-accent">السعر: 700-1000 ريال للمتر المربع</div>
          </div>
        </div>

        <div class="bg-green-50 border-r-4 border-green-400 p-6 mb-8 rounded-lg">
          <div class="flex items-start">
            <Lightbulb class="w-6 h-6 text-green-400 ml-3 mt-1 flex-shrink-0" />
            <div>
              <h3 class="text-lg font-semibold text-green-800 mb-2">نصائح الخبراء</h3>
              <ul class="text-green-700 space-y-2">
                <li>• اختر الألوان الفاتحة لتقليل امتصاص الحرارة</li>
                <li>• تأكد من وجود تصريف جيد لمياه الأمطار</li>
                <li>• استخدم أعمدة من الألمنيوم المقاوم للصدأ</li>
                <li>• احرص على التركيب المناسب لتجنب الاهتزاز</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">معايير الاختيار والتركيب</h3>
        <div class="overflow-x-auto mb-8">
          <table class="w-full border-collapse border border-gray-300">
            <thead>
              <tr class="bg-gray-50">
                <th class="border border-gray-300 p-3 text-right">المعيار</th>
                <th class="border border-gray-300 p-3 text-right">التفاصيل</th>
                <th class="border border-gray-300 p-3 text-right">الأهمية</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 p-3 font-medium">المقاومة للرياح</td>
                <td class="border border-gray-300 p-3">يجب أن تتحمل رياح بسرعة 120 كم/ساعة</td>
                <td class="border border-gray-300 p-3 text-red-600">عالية جداً</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 p-3 font-medium">مقاومة الأشعة فوق البنفسجية</td>
                <td class="border border-gray-300 p-3">حماية من 99% من الأشعة الضارة</td>
                <td class="border border-gray-300 p-3 text-red-600">عالية جداً</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-3 font-medium">جودة الهيكل</td>
                <td class="border border-gray-300 p-3">ألمنيوم مجلفن أو ستانلس ستيل</td>
                <td class="border border-gray-300 p-3 text-orange-600">عالية</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 p-3 font-medium">سهولة الصيانة</td>
                <td class="border border-gray-300 p-3">تنظيف دوري وفحص سنوي</td>
                <td class="border border-gray-300 p-3 text-yellow-600">متوسطة</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">الخلاصة والتوصيات</h3>
        <p class="text-gray-700 leading-relaxed mb-4">اختيار مظلة السيارة المناسبة في جدة يتطلب دراسة دقيقة للمناخ المحلي ومتطلبات الموقع. ننصح بالاستعانة بخبراء محترفين الديار للحصول على استشارة مجانية وضمان أفضل النتائج.</p>

        <div class="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <h4 class="font-bold text-primary mb-3">احصل على استشارة مجانية</h4>
          <p class="text-gray-600 mb-4">فريقنا من الخبراء جاهز لمساعدتك في اختيار وتركيب المظلة المثالية لسيارتك</p>
          <div class="flex flex-wrap gap-4">
            <span class="flex items-center text-sm text-gray-600">
              <Users class="w-4 h-4 ml-1" />
              خبرة 15+ سنة
            </span>
            <span class="flex items-center text-sm text-gray-600">
              <Award class="w-4 h-4 ml-1" />
              ضمان 5 سنوات
            </span>
            <span class="flex items-center text-sm text-gray-600">
              <MapPin class="w-4 h-4 ml-1" />
              خدمة في جميع أنحاء جدة
            </span>
          </div>
        </div>
      </div>
    `,
    category: 'مظلات سيارات',
    author: 'فريق محترفين الديار',
    authorAvatar: 'https://ui-avatars.com/api/?name=فريق+محترفين+الديار&background=0f172a&color=fff',
    authorBio: 'فريق متخصص من المهندسين والفنيين ذوي خبرة تزيد عن 15 عاماً في مجال المظلات والإنشاءات الخارجية.',
    date: '15 نوفمبر 2024',
    readTime: '8 دقائق',
    image: '/uploads/mazallat-1.webp',
    tags: ['مظلات', 'سيارات', 'جدة', 'دليل'],
    featured: true,
    views: 1250,
    likes: 89,
    rating: 4.8,
    commentsCount: 12,
    metaDescription: 'دليل شامل لاختيار أفضل مظلات السيارات في جدة 2024 مع نصائح الخبراء ومقارنة المواد والأسعار',
    keywords: ['مظلات سيارات جدة', 'أفضل مظلات السيارات', 'مظلات جدة', 'تركيب مظلات', 'مظلات HDPE', 'مظلات مقاومة للرياح']
  },
  {
    id: 2,
    slug: 'wooden-pergola-maintenance-coastal-climate',
    title: 'كيفية صيانة البرجولة الخشبية في المناخ الساحلي',
    excerpt: 'نصائح مهمة للحفاظ على برجولتك الخشبية من آثار الرطوبة والملوحة في جدة. جدول صيانة شهري وسنوي مع المنتجات المناسبة للحماية من التآكل والعوامل الجوية القاسية.',
    content: `
      <div class="prose prose-lg max-w-none">
        <h2 class="text-2xl font-bold text-primary mb-6 flex items-center">
          <Shield class="w-6 h-6 ml-2" />
          تحديات المناخ الساحلي للبرجولات الخشبية
        </h2>
        <p class="text-gray-700 leading-relaxed mb-6">يشكل المناخ الساحلي في جدة تحدياً حقيقياً للبرجولات الخشبية بسبب الرطوبة العالية (تصل إلى 85%) والملوحة في الهواء. هذه الظروف تؤدي إلى تسارع عمليات التآكل والتلف إذا لم تتم الصيانة بشكل صحيح.</p>

        <div class="bg-red-50 border-r-4 border-red-400 p-6 mb-8 rounded-lg">
          <div class="flex items-start">
            <AlertCircle class="w-6 h-6 text-red-400 ml-3 mt-1 flex-shrink-0" />
            <div>
              <h3 class="text-lg font-semibold text-red-800 mb-2">علامات التلف المبكر</h3>
              <ul class="text-red-700 space-y-1">
                <li>• تغير لون الخشب إلى الرمادي أو الأسود</li>
                <li>• ظهور الشقوق والتشققات</li>
                <li>• تراكم الملح على السطح</li>
                <li>• ضعف في المفاصل والوصلات</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4 flex items-center">
          <Calendar class="w-5 h-5 ml-2" />
          جدول الصيانة الدورية
        </h3>

        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 class="font-bold text-blue-800 mb-4 flex items-center">
              <Clock class="w-5 h-5 ml-2" />
              الصيانة الشهرية
            </h4>
            <ul class="space-y-2 text-blue-700">
              <li>• تنظيف السطح بالماء العذب</li>
              <li>• إزالة الأتربة والأملاح المتراكمة</li>
              <li>• فحص المفاصل والبراغي</li>
              <li>• تطبيق زيت الحماية الطبيعي</li>
            </ul>
          </div>

          <div class="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 class="font-bold text-green-800 mb-4 flex items-center">
              <Zap class="w-5 h-5 ml-2" />
              الصيانة الفصلية
            </h4>
            <ul class="space-y-2 text-green-700">
              <li>• فحص شامل للهيكل</li>
              <li>• إعادة طلاء المناطق المتضررة</li>
              <li>• تشحيم المفاصل المتحركة</li>
              <li>• معالجة الشقوق الصغيرة</li>
            </ul>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">أفضل منتجات الحماية والصيانة</h3>

        <div class="space-y-6 mb-8">
          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div class="flex items-start justify-between mb-3">
              <h4 class="font-bold text-lg">زيوت الحماية الطبيعية</h4>
              <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">موصى به</span>
            </div>
            <p class="text-gray-600 mb-3">زيت التيك الطبيعي مع مضادات الأكسدة لحماية فائقة من الرطوبة</p>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div class="text-gray-500">السعر: 80-120 ريال/لتر</div>
              <div class="text-gray-500">التطبيق: كل 3 أشهر</div>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 class="font-bold text-lg mb-3">مواد الطلاء المقاومة للملوحة</h4>
            <p class="text-gray-600 mb-3">دهانات أكريليك خاصة بالبيئة البحرية مع خصائص مضادة للفطريات</p>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div class="text-gray-500">السعر: 150-200 ريال/لتر</div>
              <div class="text-gray-500">التطبيق: سنوياً</div>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 class="font-bold text-lg mb-3">مثبتات ومقويات المفاصل</h4>
            <p class="text-gray-600 mb-3">براغي وأدوات تثبيت من الستانلس ستيل المقاوم للتآكل</p>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div class="text-gray-500">السعر: 5-15 ريال/قطعة</div>
              <div class="text-gray-500">الفحص: شهرياً</div>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">خطوات الصيانة التفصيلية</h3>

        <div class="bg-gray-50 rounded-lg p-6 mb-8">
          <h4 class="font-bold mb-4">مرحلة التنظيف الأساسي</h4>
          <ol class="space-y-3 text-gray-700">
            <li class="flex items-start">
              <span class="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm ml-3 mt-0.5 flex-shrink-0">1</span>
              <div>
                <strong>إزالة الأتربة والرواسب:</strong> استخدم فرشاة ناعمة وماء عذب لإزالة التراكمات
              </div>
            </li>
            <li class="flex items-start">
              <span class="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm ml-3 mt-0.5 flex-shrink-0">2</span>
              <div>
                <strong>معالجة البقع الملحية:</strong> استخدم محلول خل مخفف (1:10) لإزالة ترسبات الملح
              </div>
            </li>
            <li class="flex items-start">
              <span class="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm ml-3 mt-0.5 flex-shrink-0">3</span>
              <div>
                <strong>التجفيف الكامل:</strong> اتركها تجف بالكامل قبل تطبيق أي مواد حماية (24-48 ساعة)
              </div>
            </li>
          </ol>
        </div>

        <div class="bg-blue-50 border-r-4 border-blue-400 p-6 mb-8 rounded-lg">
          <div class="flex items-start">
            <Lightbulb class="w-6 h-6 text-blue-400 ml-3 mt-1 flex-shrink-0" />
            <div>
              <h3 class="text-lg font-semibold text-blue-800 mb-2">نصائح متقدمة للخبراء</h3>
              <ul class="text-blue-700 space-y-2">
                <li>• طبق الزيت في اتجاه ألياف الخشب دائماً</li>
                <li>• تجنب الصيانة في الأيام عالية الرطوبة (أكثر من 70%)</li>
                <li>• استخدم أدوات الحماية الشخصية عند التعامل مع المواد الكيميائية</li>
                <li>• احتفظ بسجل لأعمال الصيانة وتواريخها</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">التكاليف المتوقعة للصيانة</h3>
        <div class="overflow-x-auto mb-8">
          <table class="w-full border-collapse border border-gray-300">
            <thead>
              <tr class="bg-gray-50">
                <th class="border border-gray-300 p-3 text-right">نوع الصيانة</th>
                <th class="border border-gray-300 p-3 text-right">التكرار</th>
                <th class="border border-gray-300 p-3 text-right">التكلفة (ريال)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 p-3">التنظيف الأساسي</td>
                <td class="border border-gray-300 p-3">شهرياً</td>
                <td class="border border-gray-300 p-3">50-100</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 p-3">تطبيق زيت الحماية</td>
                <td class="border border-gray-300 p-3">فصلياً</td>
                <td class="border border-gray-300 p-3">200-400</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-3">إعادة الطلاء الكامل</td>
                <td class="border border-gray-300 p-3">سنوياً</td>
                <td class="border border-gray-300 p-3">800-1500</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 p-3">استبدال القطع التالفة</td>
                <td class="border border-gray-300 p-3">حسب الحاجة</td>
                <td class="border border-gray-300 p-3">300-1000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <h4 class="font-bold text-primary mb-3">خدمة الصيانة الاحترافية</h4>
          <p class="text-gray-600 mb-4">يمكن لفريق محترفين الديار تولي صيانة برجولتك بشكل دوري ومنتظم، مما يضمن بقاءها في أفضل حالة لسنوات طويلة.</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex items-center text-sm text-gray-600">
              <Award class="w-4 h-4 ml-1 text-primary" />
              ضمان على أعمال الصيانة
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <Users class="w-4 h-4 ml-1 text-primary" />
              فريق مدرب ومتخصص
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <MapPin class="w-4 h-4 ml-1 text-primary" />
              خدمة منتظمة في جدة
            </div>
          </div>
        </div>
      </div>
    `,
    category: 'برجولات',
    author: 'المهندس أحمد الديار',
    authorAvatar: 'https://ui-avatars.com/api/?name=أحمد+الديار&background=059669&color=fff',
    authorBio: 'مهندس متخصص في الإنشاءات الخارجية والبرجولات الخشبية مع خبرة 12 عاماً في المناخ الساحلي.',
    date: '10 نوفمبر 2024',
    readTime: '7 دقائق',
    image: '/uploads/pergola-1.jpg',
    tags: ['برجولات', 'صيانة', 'خشب', 'نصائح'],
    featured: false,
    views: 890,
    likes: 67,
    rating: 4.7,
    commentsCount: 8,
    metaDescription: 'دليل شامل لصيانة البرجولات الخشبية في المناخ الساحلي مع جدول صيانة دوري ونصائح الخبراء',
    keywords: ['صيانة برجولات جدة', 'برجولات خشبية', 'حماية من الرطوبة', 'صيانة الخشب الساحلي', 'زيوت حماية الخشب']
  },
  {
    id: 3,
    slug: 'sandwich-panel-thermal-insulation-saudi',
    title: 'ساندوتش بانل: الحل الأمثل للعزل الحراري في السعودية',
    excerpt: 'لماذا يعتبر الساندوتش بانل الخيار الأول للمباني التجارية والصناعية؟ فوائد العزل الحراري وتوفير الطاقة. تحليل مفصل للمواد المستخدمة ومعايير الجودة الدولية المطبقة في السوق السعودي.',
    content: `
      <div class="prose prose-lg max-w-none">
        <h2 class="text-2xl font-bold text-primary mb-6 flex items-center">
          <Zap class="w-6 h-6 ml-2" />
          مقدمة حول الساندوتش بانل والعزل الحراري
        </h2>
        <p class="text-gray-700 leading-relaxed mb-6">يُعتبر الساندوتش بانل ثورة حقيقية في مجال البناء والعزل الحراري في السعودية، حيث يوفر توفيراً في الطاقة يصل إلى 40% من تكاليف التكييف. في ظل الارتفاع المستمر لأسعار الطاقة، أصبح الاستثمار في العزل الحراري الجيد ضرورة اقتصادية وبيئية.</p>

        <div class="bg-green-50 border-r-4 border-green-400 p-6 mb-8 rounded-lg">
          <div class="flex items-start">
            <TrendingUp class="w-6 h-6 text-green-400 ml-3 mt-1 flex-shrink-0" />
            <div>
              <h3 class="text-lg font-semibold text-green-800 mb-2">فوائد اقتصادية مثبتة</h3>
              <ul class="text-green-700 space-y-1">
                <li>• توفير 30-40% من فواتير الكهرباء</li>
                <li>• استرداد التكلفة خلال 2-3 سنوات</li>
                <li>• زيادة قيمة العقار بنسبة 15-20%</li>
                <li>• تقليل انبعاثات الكربون بنسبة 35%</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4 flex items-center">
          <Award class="w-5 h-5 ml-2" />
          أنواع الساندوتش بانل والمواد المستخدمة
        </h3>

        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 class="font-bold text-accent mb-4">بانل البولي يوريثان (PU)</h4>
            <div class="space-y-3">
              <div class="text-sm text-gray-600">
                <strong>معامل التوصيل الحراري:</strong> 0.022 W/m.K
              </div>
              <div class="text-sm text-gray-600">
                <strong>السماكة المتاحة:</strong> 50-200 مم
              </div>
              <div class="text-sm text-gray-600">
                <strong>مقاومة الحريق:</strong> B2 (قابلية اشتعال منخفضة)
              </div>
              <div class="bg-blue-50 p-3 rounded text-sm">
                <strong>الاستخدام الأمثل:</strong> المباني التجارية والمكاتب
              </div>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 class="font-bold text-accent mb-4">بانل الصوف الصخري (Rock Wool)</h4>
            <div class="space-y-3">
              <div class="text-sm text-gray-600">
                <strong>معامل التوصيل الحراري:</strong> 0.037 W/m.K
              </div>
              <div class="text-sm text-gray-600">
                <strong>السماكة المتاحة:</strong> 50-150 مم
              </div>
              <div class="text-sm text-gray-600">
                <strong>مقاومة الحريق:</strong> A1 (غير قابل للاشتعال)
              </div>
              <div class="bg-red-50 p-3 rounded text-sm">
                <strong>الاستخدام الأمثل:</strong> المباني الصناعية والمستودعات
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">مقارنة الأداء والتكاليف</h3>

        <div class="overflow-x-auto mb-8">
          <table class="w-full border-collapse border border-gray-300">
            <thead>
              <tr class="bg-gray-50">
                <th class="border border-gray-300 p-3 text-right">نوع البانل</th>
                <th class="border border-gray-300 p-3 text-right">العزل الحراري</th>
                <th class="border border-gray-300 p-3 text-right">مقاومة الحريق</th>
                <th class="border border-gray-300 p-3 text-right">السعر (ريال/م²)</th>
                <th class="border border-gray-300 p-3 text-right">العمر الافتراضي</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 p-3 font-medium">بولي يوريثان 100مم</td>
                <td class="border border-gray-300 p-3 text-green-600">ممتاز</td>
                <td class="border border-gray-300 p-3 text-yellow-600">جيد</td>
                <td class="border border-gray-300 p-3">120-150</td>
                <td class="border border-gray-300 p-3">25-30 سنة</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 p-3 font-medium">صوف صخري 100مم</td>
                <td class="border border-gray-300 p-3 text-blue-600">جيد جداً</td>
                <td class="border border-gray-300 p-3 text-green-600">ممتاز</td>
                <td class="border border-gray-300 p-3">100-130</td>
                <td class="border border-gray-300 p-3">20-25 سنة</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-3 font-medium">بولي ستايرين 100مم</td>
                <td class="border border-gray-300 p-3 text-blue-600">جيد</td>
                <td class="border border-gray-300 p-3 text-red-600">ضعيف</td>
                <td class="border border-gray-300 p-3">80-110</td>
                <td class="border border-gray-300 p-3">15-20 سنة</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">معايير الجودة والشهادات المطلوبة</h3>

        <div class="space-y-6 mb-8">
          <div class="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl border border-blue-200">
            <h4 class="font-bold text-lg mb-3 flex items-center">
              <Award class="w-5 h-5 ml-2 text-blue-600" />
              الشهادات الدولية
            </h4>
            <ul class="space-y-2 text-gray-700">
              <li>• شهادة CE الأوروبية للمطابقة</li>
              <li>• شهادة ISO 9001 لإدارة الجودة</li>
              <li>• شهادة FM المتحدة لمقاومة الحريق</li>
              <li>• تصريح SABER للاستيراد في السعودية</li>
            </ul>
          </div>

          <div class="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-200">
            <h4 class="font-bold text-lg mb-3 flex items-center">
              <Shield class="w-5 h-5 ml-2 text-green-600" />
              المعايير السعودية
            </h4>
            <ul class="space-y-2 text-gray-700">
              <li>• مطابقة كود البناء السعودي (SBC)</li>
              <li>• معايير الدفاع المدني للحريق</li>
              <li>• مواصفات هيئة المدن الصناعية</li>
              <li>• شروط الهيئة السعودية للمعايير والمواصفات</li>
            </ul>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">عملية التركيب والتثبيت</h3>

        <div class="bg-gray-50 rounded-lg p-6 mb-8">
          <h4 class="font-bold mb-4">مراحل التركيب المحترف</h4>
          <ol class="space-y-4 text-gray-700">
            <li class="flex items-start">
              <span class="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm ml-3 mt-0.5 flex-shrink-0">1</span>
              <div>
                <strong>المرحلة التحضيرية:</strong>
                <p class="text-sm mt-1">دراسة المشروع وحساب الأحمال، تحديد نوع الهيكل المناسب، وطلب التصاريح اللازمة</p>
              </div>
            </li>
            <li class="flex items-start">
              <span class="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm ml-3 mt-0.5 flex-shrink-0">2</span>
              <div>
                <strong>تركيب الهيكل المعدني:</strong>
                <p class="text-sm mt-1">تثبيت العواميد والعوارض باستخدام البراغي عالية القوة مع ضمان الاستقامة والمحاذاة</p>
              </div>
            </li>
            <li class="flex items-start">
              <span class="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm ml-3 mt-0.5 flex-shrink-0">3</span>
              <div>
                <strong>تركيب الألواح:</strong>
                <p class="text-sm mt-1">تثبيت البانلات بطريقة متدرجة مع ضمان الإحكام وعدم وجود فجوات حرارية</p>
              </div>
            </li>
            <li class="flex items-start">
              <span class="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm ml-3 mt-0.5 flex-shrink-0">4</span>
              <div>
                <strong>اللمسات الأخيرة:</strong>
                <p class="text-sm mt-1">تركيب الكبسات والتشطيبات النهائية، اختبار العزل، وتسليم المشروع</p>
              </div>
            </li>
          </ol>
        </div>

        <div class="bg-yellow-50 border-r-4 border-yellow-400 p-6 mb-8 rounded-lg">
          <div class="flex items-start">
            <AlertCircle class="w-6 h-6 text-yellow-400 ml-3 mt-1 flex-shrink-0" />
            <div>
              <h3 class="text-lg font-semibold text-yellow-800 mb-2">أخطاء شائعة يجب تجنبها</h3>
              <ul class="text-yellow-700 space-y-2">
                <li>• عدم حساب التمدد الحراري للمعادن</li>
                <li>• تجاهل اتجاه الرياح السائدة في التصميم</li>
                <li>• استخدام براغي غير مناسبة لنوع المعدن</li>
                <li>• عدم تطبيق مواد منع التسرب بشكل صحيح</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">حساب العائد على الاستثمار</h3>

        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 class="font-bold text-lg mb-4 text-center">مبنى تجاري 1000 م²</h4>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span>تكلفة التركيب:</span>
                <span class="font-medium">120,000 ريال</span>
              </div>
              <div class="flex justify-between">
                <span>التوفير السنوي:</span>
                <span class="font-medium text-green-600">48,000 ريال</span>
              </div>
              <div class="flex justify-between">
                <span>فترة الاسترداد:</span>
                <span class="font-medium text-blue-600">2.5 سنة</span>
              </div>
              <div class="border-t pt-2 flex justify-between font-bold">
                <span>العائد خلال 10 سنوات:</span>
                <span class="text-green-600">360,000 ريال</span>
              </div>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 class="font-bold text-lg mb-4 text-center">مستودع صناعي 2000 م²</h4>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span>تكلفة التركيب:</span>
                <span class="font-medium">200,000 ريال</span>
              </div>
              <div class="flex justify-between">
                <span>التوفير السنوي:</span>
                <span class="font-medium text-green-600">80,000 ريال</span>
              </div>
              <div class="flex justify-between">
                <span>فترة الاسترداد:</span>
                <span class="font-medium text-blue-600">2.5 سنة</span>
              </div>
              <div class="border-t pt-2 flex justify-between font-bold">
                <span>العائد خلال 10 سنوات:</span>
                <span class="text-green-600">600,000 ريال</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <h4 class="font-bold text-primary mb-3">لماذا تختار محترفين الديار؟</h4>
          <p class="text-gray-600 mb-4">نحن متخصصون في تركيب الساندوتش بانل عالي الجودة مع ضمان الأداء والمتانة. نستخدم أفضل المواد المعتمدة دولياً مع فريق مدرب على أحدث تقنيات التركيب.</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex items-center text-sm text-gray-600">
              <Award class="w-4 h-4 ml-1 text-primary" />
              ضمان 10 سنوات على المواد
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <Users class="w-4 h-4 ml-1 text-primary" />
              فريق مهندسين معتمدين
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <TrendingUp class="w-4 h-4 ml-1 text-primary" />
              توفير مضمون في الطاقة
            </div>
          </div>
        </div>
      </div>
    `,
    category: 'ساندوتش بانل',
    author: 'المهندس سعد التقني',
    authorAvatar: 'https://ui-avatars.com/api/?name=سعد+التقني&background=dc2626&color=fff',
    authorBio: 'مهندس متخصص في أنظمة العزل الحراري والساندوتش بانل مع خبرة 10 سنوات في المشاريع الصناعية.',
    date: '5 نوفمبر 2024',
    readTime: '9 دقائق',
    image: '/uploads/sandwich-panel-1.jpg',
    tags: ['ساندوتش بانل', 'عزل حراري', 'توفير طاقة'],
    featured: true,
    views: 2100,
    likes: 145,
    rating: 4.9,
    commentsCount: 15,
    metaDescription: 'دليل شامل للساندوتش بانل والعزل الحراري في السعودية مع حساب العائد على الاستثمار ومعايير الجودة',
    keywords: ['ساندوتش بانل السعودية', 'عزل حراري جدة', 'توفير الطاقة', 'بولي يوريثان', 'صوف صخري', 'العزل الحراري']
  },
  {
    id: 4,
    slug: 'garden-design-trends-saudi-2024',
    title: 'اتجاهات تصميم الحدائق في المملكة 2024',
    excerpt: 'أحدث صيحات تنسيق الحدائق المناسبة للمناخ السعودي. نباتات محلية وأنظمة ري ذكية وتصاميم مستدامة. استكشف الحلول البيئية والاقتصادية لتنسيق حديقة جميلة ومقاومة للجفاف.',
    content: `
      <div class="prose prose-lg max-w-none">
        <h2 class="text-2xl font-bold text-primary mb-6 flex items-center">
          <TrendingUp class="w-6 h-6 ml-2" />
          اتجاهات تصميم الحدائق المستدامة 2024
        </h2>
        <p class="text-gray-700 leading-relaxed mb-6">تشهد السعودية نهضة حقيقية في مجال تصميم الحدائق المستدامة، مدفوعة برؤية 2030 وأهدافها البيئية. تركز الاتجاهات الحديثة على الاستدامة والتوافق مع المناخ المحلي، مع تقليل استهلاك المياه بنسبة 60% مقارنة بالطرق التقليدية.</p>

        <div class="bg-green-50 border-r-4 border-green-400 p-6 mb-8 rounded-lg">
          <div class="flex items-start">
            <TrendingUp class="w-6 h-6 text-green-400 ml-3 mt-1 flex-shrink-0" />
            <div>
              <h3 class="text-lg font-semibold text-green-800 mb-2">أبرز الاتجاهات لعام 2024</h3>
              <ul class="text-green-700 space-y-1">
                <li>• الحدائق الذكية مع أنظمة IoT للري والإضاءة</li>
                <li>• استخدام النباتات المحلية المقاومة للجفاف</li>
                <li>• تصاميم البيئة الدقيقة (Microclimate Design)</li>
                <li>• دمج الطاقة المتجددة في تشغيل الحديقة</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4 flex items-center">
          <Award class="w-5 h-5 ml-2" />
          النباتات المحلية الأكثر شعبية
        </h3>

        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 class="font-bold text-accent mb-4">الأشجار والشجيرات</h4>
            <div class="space-y-3">
              <div class="border-b pb-2">
                <strong class="text-primary">الغاف (Prosopis cineraria)</strong>
                <p class="text-sm text-gray-600 mt-1">شجرة صحراوية مقاومة للجفاف، توفر ظلاً ممتازاً</p>
                <div class="text-xs text-green-600 mt-1">استهلاك مياه: منخفض جداً (5 لتر/يوم)</div>
              </div>
              <div class="border-b pb-2">
                <strong class="text-primary">السدر (Ziziphus spina-christi)</strong>
                <p class="text-sm text-gray-600 mt-1">شجرة تراثية مباركة، مقاومة للعوامل الجوية</p>
                <div class="text-xs text-green-600 mt-1">استهلاك مياه: منخفض (8 لتر/يوم)</div>
              </div>
              <div>
                <strong class="text-primary">الأثل (Tamarix aphylla)</strong>
                <p class="text-sm text-gray-600 mt-1">سريع النمو، مقاوم للملوحة والرياح</p>
                <div class="text-xs text-green-600 mt-1">استهلاك مياه: منخفض (6 لتر/يوم)</div>
              </div>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 class="font-bold text-accent mb-4">النباتات الأرضية والزهور</h4>
            <div class="space-y-3">
              <div class="border-b pb-2">
                <strong class="text-primary">الخزامى (Lavandula)</strong>
                <p class="text-sm text-gray-600 mt-1">رائحة عطرة، أزهار بنفسجية جميلة</p>
                <div class="text-xs text-blue-600 mt-1">موسم الإزهار: فبراير - مايو</div>
              </div>
              <div class="border-b pb-2">
                <strong class="text-primary">الريحان البري (Ocimum forskolei)</strong>
                <p class="text-sm text-gray-600 mt-1">نبات عطري محلي، يجذب النحل والفراشات</p>
                <div class="text-xs text-blue-600 mt-1">موسم الإزهار: أكتوبر - أبريل</div>
              </div>
              <div>
                <strong class="text-primary">العشار (Calotropis procera)</strong>
                <p class="text-sm text-gray-600 mt-1">أزهار بيضاء وردية، مقاوم للجفاف الشديد</p>
                <div class="text-xs text-blue-600 mt-1">موسم الإزهار: على مدار السنة</div>
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">أنظمة الري الذكية والمستدامة</h3>

        <div class="space-y-6 mb-8">
          <div class="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl border border-blue-200">
            <h4 class="font-bold text-lg mb-3 flex items-center">
              <Zap class="w-5 h-5 ml-2 text-blue-600" />
              نظام الري بالتنقيط الذكي
            </h4>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <ul class="space-y-2 text-gray-700 text-sm">
                  <li>• توفير 40-60% من المياه مقارنة بالري التقليدي</li>
                  <li>• حساسات رطوبة التربة للري التلقائي</li>
                  <li>• توزيع متجانس للمياه والمغذيات</li>
                  <li>• تقليل نمو الأعشاب الضارة</li>
                </ul>
              </div>
              <div class="bg-blue-50 p-4 rounded-lg">
                <div class="text-sm">
                  <div class="font-medium mb-2">التكلفة المتوقعة:</div>
                  <div>• حديقة 100 م²: 2,000-3,500 ريال</div>
                  <div>• حديقة 500 م²: 8,000-12,000 ريال</div>
                  <div class="text-green-600 mt-2">فترة الاسترداد: 12-18 شهر</div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-200">
            <h4 class="font-bold text-lg mb-3 flex items-center">
              <Shield class="w-5 h-5 ml-2 text-green-600" />
              تجميع وإعادة استخدام المياه
            </h4>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <ul class="space-y-2 text-gray-700 text-sm">
                  <li>• تجميع مياه الأمطار في خزانات تحت الأرض</li>
                  <li>• معالجة المياه الرمادية للاستخدام في الري</li>
                  <li>• أنظمة ترشيح طبيعية بالنباتات</li>
                  <li>• مراقبة جودة المياه إلكترونياً</li>
                </ul>
              </div>
              <div class="bg-green-50 p-4 rounded-lg">
                <div class="text-sm">
                  <div class="font-medium mb-2">الفوائد البيئية:</div>
                  <div>• تقليل استهلاك المياه العذبة 50%</div>
                  <div>• تقليل الجريان السطحي للمياه</div>
                  <div class="text-blue-600 mt-2">مساهمة في أهداف رؤية 2030</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">تصاميم البيئة الدقيقة (Microclimate)</h3>

        <div class="bg-gray-50 rounded-lg p-6 mb-8">
          <h4 class="font-bold mb-4">مبادئ تصميم البيئة الدقيقة</h4>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h5 class="font-medium text-primary mb-3">المناطق المظللة</h5>
              <ul class="space-y-2 text-sm text-gray-700">
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-primary rounded-full mt-2 ml-2 flex-shrink-0"></span>
                  استخدام البرجولات والأشجار لتوفير الظل
                </li>
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-primary rounded-full mt-2 ml-2 flex-shrink-0"></span>
                  تقليل درجة الحرارة بـ 5-8 درجات مئوية
                </li>
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-primary rounded-full mt-2 ml-2 flex-shrink-0"></span>
                  زيادة الرطوبة النسبية في المنطقة
                </li>
              </ul>
            </div>
            <div>
              <h5 class="font-medium text-primary mb-3">مصدات الرياح الطبيعية</h5>
              <ul class="space-y-2 text-sm text-gray-700">
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-primary rounded-full mt-2 ml-2 flex-shrink-0"></span>
                  زراعة الأشجار في اتجاه الرياح السائدة
                </li>
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-primary rounded-full mt-2 ml-2 flex-shrink-0"></span>
                  حماية النباتات الحساسة من العواصف
                </li>
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-primary rounded-full mt-2 ml-2 flex-shrink-0"></span>
                  تقليل تبخر المياه من التربة
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">الاستفادة من التكنولوجيا الذكية</h3>

        <div class="overflow-x-auto mb-8">
          <table class="w-full border-collapse border border-gray-300">
            <thead>
              <tr class="bg-gray-50">
                <th class="border border-gray-300 p-3 text-right">التقنية</th>
                <th class="border border-gray-300 p-3 text-right">الوظيفة</th>
                <th class="border border-gray-300 p-3 text-right">التوفير المتوقع</th>
                <th class="border border-gray-300 p-3 text-right">التكلفة (ريال)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 p-3 font-medium">حساسات الرطوبة</td>
                <td class="border border-gray-300 p-3">مراقبة رطوبة التربة تلقائياً</td>
                <td class="border border-gray-300 p-3 text-green-600">25-40% مياه</td>
                <td class="border border-gray-300 p-3">500-1,200</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 p-3 font-medium">محطة طقس مصغرة</td>
                <td class="border border-gray-300 p-3">قياس درجة الحرارة والرطوبة والرياح</td>
                <td class="border border-gray-300 p-3 text-blue-600">تحسين الكفاءة 30%</td>
                <td class="border border-gray-300 p-3">1,500-3,000</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-3 font-medium">نظام إضاءة LED ذكي</td>
                <td class="border border-gray-300 p-3">إضاءة تلقائية بالطاقة الشمسية</td>
                <td class="border border-gray-300 p-3 text-yellow-600">90% كهرباء</td>
                <td class="border border-gray-300 p-3">800-2,500</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 p-3 font-medium">تطبيق إدارة الحديقة</td>
                <td class="border border-gray-300 p-3">متابعة وتحكم عن بُعد</td>
                <td class="border border-gray-300 p-3 text-purple-600">تحسين الإدارة 50%</td>
                <td class="border border-gray-300 p-3">مجاني - 200/شهر</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-blue-50 border-r-4 border-blue-400 p-6 mb-8 rounded-lg">
          <div class="flex items-start">
            <Lightbulb class="w-6 h-6 text-blue-400 ml-3 mt-1 flex-shrink-0" />
            <div>
              <h3 class="text-lg font-semibold text-blue-800 mb-2">نصائح للتصميم المستدام</h3>
              <ul class="text-blue-700 space-y-2">
                <li>• اختر النباتات بناءً على احتياجاتها المائية المتشابهة</li>
                <li>• استخدم الغطاء النباتي (Mulch) لتقليل التبخر</li>
                <li>• صمم مسارات من مواد مسامية لتسريب المياه</li>
                <li>• ادمج عناصر الطاقة المتجددة في التصميم من البداية</li>
                <li>• خطط للصيانة الدورية والاستدامة طويلة المدى</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">تقدير التكاليف والعائد على الاستثمار</h3>

        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 class="font-bold text-lg mb-4 text-center">حديقة منزلية مستدامة 200 م²</h4>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span>تكلفة التصميم والتنفيذ:</span>
                <span class="font-medium">25,000 ريال</span>
              </div>
              <div class="flex justify-between">
                <span>نظام الري الذكي:</span>
                <span class="font-medium">8,000 ريال</span>
              </div>
              <div class="flex justify-between">
                <span>التوفير السنوي في المياه:</span>
                <span class="font-medium text-green-600">2,400 ريال</span>
              </div>
              <div class="flex justify-between">
                <span>التوفير في الكهرباء:</span>
                <span class="font-medium text-green-600">1,200 ريال</span>
              </div>
              <div class="border-t pt-2 flex justify-between font-bold">
                <span>فترة الاسترداد:</span>
                <span class="text-blue-600">9-10 سنوات</span>
              </div>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 class="font-bold text-lg mb-4 text-center">حديقة تجارية 1000 م²</h4>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span>تكلفة التصميم والتنفيذ:</span>
                <span class="font-medium">95,000 ريال</span>
              </div>
              <div class="flex justify-between">
                <span>أنظمة ذكية ومتقدمة:</span>
                <span class="font-medium">35,000 ريال</span>
              </div>
              <div class="flex justify-between">
                <span>التوفير السنوي في المياه:</span>
                <span class="font-medium text-green-600">12,000 ريال</span>
              </div>
              <div class="flex justify-between">
                <span>قيمة العقار المضافة:</span>
                <span class="font-medium text-green-600">50,000 ريال</span>
              </div>
              <div class="border-t pt-2 flex justify-between font-bold">
                <span>العائد الإجمالي:</span>
                <span class="text-green-600">ممتاز</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <h4 class="font-bold text-primary mb-3">خدمات تصميم الحدائق المستدامة</h4>
          <p class="text-gray-600 mb-4">فريق محترفين الديار متخصص في تصميم وتنفيذ الحدائق المستدامة التي تجمع بين الجمال والكفاءة البيئية. نقدم حلولاً مبتكرة تتماشى مع رؤية السعودية 2030.</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex items-center text-sm text-gray-600">
              <Award class="w-4 h-4 ml-1 text-primary" />
              تصاميم حائزة على جوائز
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <TrendingUp class="w-4 h-4 ml-1 text-primary" />
              توفير مضمون في المياه والطاقة
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <Users class="w-4 h-4 ml-1 text-primary" />
              فريق من مهندسي المناظر الطبيعية
            </div>
          </div>
        </div>
      </div>
    `,
    category: 'تنسيق حدائق',
    author: 'أخصائي التنسيق فيصل',
    authorAvatar: 'https://ui-avatars.com/api/?name=فيصل+التنسيق&background=16a34a&color=fff',
    authorBio: 'أخصائي تنسيق حدائق معتمد مع خبرة 8 سنوات في تصميم الحدائق المستدامة والصديقة للبيئة.',
    date: '1 نوفمبر 2024',
    readTime: '10 دقائق',
    image: '/uploads/landscaping-1.webp',
    tags: ['تنسيق حدائق', 'نباتات محلية', 'تصميم'],
    featured: false,
    views: 1560,
    likes: 98,
    rating: 4.6,
    commentsCount: 11,
    metaDescription: 'اكتشف أحدث اتجاهات تصميم الحدائق المستدامة في السعودية 2024 مع النباتات المحلية وأنظمة الري الذكية',
    keywords: ['تنسيق حدائق السعودية', 'حدائق مستدامة', 'نباتات محلية', 'ري ذكي', 'تصميم حدائق جدة', 'حدائق صحراوية']
  },
  {
    id: 5,
    slug: 'renovation-secrets-modern-techniques',
    title: 'أسرار ترميم الملحقات القديمة بأحدث التقنيات',
    excerpt: 'كيف تعيد الحياة لملحقاتك القديمة؟ تقنيات حديثة في الترميم والعزل وإضافة اللمسات العصرية. دليل تفصيلي للمراحل والمواد المطلوبة مع تقدير التكاليف والوقت اللازم.',
    content: `
      <div class="prose prose-lg max-w-none">
        <h2 class="text-2xl font-bold text-primary mb-6 flex items-center">
          <Shield class="w-6 h-6 ml-2" />
          تقييم حالة الملحق وتحديد نطاق الترميم
        </h2>
        <p class="text-gray-700 leading-relaxed mb-6">يعتبر ترميم الملحقات القديمة استثماراً ذكياً يوفر 40-60% من تكلفة البناء الجديد. بدءاً من التقييم الشامل للحالة الإنشائية وصولاً إلى اللمسات النهائية، تتطلب عملية الترميم خطة محكمة وتقنيات متقدمة.</p>

        <div class="bg-orange-50 border-r-4 border-orange-400 p-6 mb-8 rounded-lg">
          <div class="flex items-start">
            <AlertCircle class="w-6 h-6 text-orange-400 ml-3 mt-1 flex-shrink-0" />
            <div>
              <h3 class="text-lg font-semibold text-orange-800 mb-2">علامات تحتاج لترميم فوري</h3>
              <ul class="text-orange-700 space-y-1">
                <li>• تشققات في الجدران أو الأسقف</li>
                <li>• مشاكل في العزل المائي أو الحراري</li>
                <li>• تلف في الأسلاك الكهربائية</li>
                <li>• مشاكل في أنظمة التكييف والتهوية</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">مراحل الترميم المتقدم</h3>

        <div class="space-y-6 mb-8">
          <div class="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl border border-blue-200">
            <h4 class="font-bold text-lg mb-3 flex items-center">
              <Award class="w-5 h-5 ml-2 text-blue-600" />
              المرحلة الأولى: التقييم والتخطيط
            </h4>
            <div class="space-y-3 text-sm text-gray-700">
              <p>• فحص شامل للهيكل الإنشائي بواسطة مهندس معتمد</p>
              <p>• تقييم أنظمة الكهرباء والسباكة والتكييف</p>
              <p>• قياس مستوى العزل الحراري والمائي</p>
              <p>• وضع تصور ثلاثي الأبعاد للشكل النهائي</p>
            </div>
          </div>

          <div class="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-200">
            <h4 class="font-bold text-lg mb-3 flex items-center">
              <Zap class="w-5 h-5 ml-2 text-green-600" />
              المرحلة الثانية: الترميم الإنشائي
            </h4>
            <div class="space-y-3 text-sm text-gray-700">
              <p>• معالجة التشققات بتقنيات الحقن المتقدمة</p>
              <p>• تقوية الأساسات والعوارض إذا لزم الأمر</p>
              <p>• تجديد أنظمة العزل بمواد عالية الكفاءة</p>
              <p>• إعادة تأهيل البنية التحتية للخدمات</p>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">التقنيات الحديثة في الترميم</h3>

        <div class="overflow-x-auto mb-8">
          <table class="w-full border-collapse border border-gray-300">
            <thead>
              <tr class="bg-gray-50">
                <th class="border border-gray-300 p-3 text-right">التقنية</th>
                <th class="border border-gray-300 p-3 text-right">الاستخدام</th>
                <th class="border border-gray-300 p-3 text-right">المزايا</th>
                <th class="border border-gray-300 p-3 text-right">التكلفة (ريال/م²)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 p-3 font-medium">حقن الراتنج الإيبوكسي</td>
                <td class="border border-gray-300 p-3">معالجة التشققات الهيكلية</td>
                <td class="border border-gray-300 p-3 text-green-600">قوة أعلى من الخرسانة الأصلية</td>
                <td class="border border-gray-300 p-3">150-250</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 p-3 font-medium">العزل الحراري المتقدم</td>
                <td class="border border-gray-300 p-3">تحسين كفاءة الطاقة</td>
                <td class="border border-gray-300 p-3 text-blue-600">توفير 50% من الطاقة</td>
                <td class="border border-gray-300 p-3">100-180</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-3 font-medium">أنظمة التحكم الذكي</td>
                <td class="border border-gray-300 p-3">التحكم في الإضاءة والتكييف</td>
                <td class="border border-gray-300 p-3 text-purple-600">راحة وتوفير في التشغيل</td>
                <td class="border border-gray-300 p-3">200-400</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <h4 class="font-bold text-primary mb-3">خدمات الترميم المتكاملة</h4>
          <p class="text-gray-600 mb-4">نقدم حلول ترميم شاملة تجمع بين الخبرة الهندسية والتقنيات الحديثة لإعادة إحياء ملحقاتك بأعلى معايير الجودة.</p>
        </div>
      </div>
    `,
    category: 'ترميم',
    author: 'مقاول الترميم خالد',
    authorAvatar: 'https://ui-avatars.com/api/?name=خالد+الترميم&background=f59e0b&color=fff',
    authorBio: 'مقاول معتمد في أعمال الترميم والتجديد مع خبرة 15 عاماً في إعادة تأهيل المباني القديمة.',
    date: '28 أكتوبر 2024',
    readTime: '6 دقائق',
    image: '/uploads/renovation-1.jpg',
    tags: ['ترميم', 'ملحقات', 'تجديد'],
    featured: false,
    views: 750,
    likes: 52,
    rating: 4.5,
    commentsCount: 6,
    metaDescription: 'دليل شامل لترميم الملحقات القديمة بأحدث التقنيات مع خطة عمل واضحة وتقدير للتكاليف',
    keywords: ['ترميم ملحقات جدة', 'تجديد المباني', 'ترميم حديث', 'تقوية الأساسات', 'عزل حراري']
  },
  {
    id: 6,
    slug: 'smart-fences-privacy-elegance',
    title: 'السواتر الذكية: خصوصية وأناقة في آن واحد',
    excerpt: 'تعرف على أحدث أنواع السواتر التي تجمع بين الجمال والوظيفة. سواتر متحركة وأتوماتيكية وصديقة للبيئة. مقارنة شاملة بين المواد والتقنيات المختلفة مع التكاليف المتوقعة.',
    content: `
      <div class="prose prose-lg max-w-none">
        <h2 class="text-2xl font-bold text-primary mb-6 flex items-center">
          <Shield class="w-6 h-6 ml-2" />
          ثورة السواتر الذكية في التصميم المعاصر
        </h2>
        <p class="text-gray-700 leading-relaxed mb-6">تشهد صناعة السواتر تطوراً تقنياً مذهلاً مع ظهور السواتر الذكية التي تجمع بين الخصوصية والأناقة والتحكم الإلكتروني. هذه الحلول المبتكرة توفر مرونة فائقة في التحكم بدرجة الخصوصية والإضاءة حسب الحاجة.</p>

        <div class="bg-blue-50 border-r-4 border-blue-400 p-6 mb-8 rounded-lg">
          <div class="flex items-start">
            <TrendingUp class="w-6 h-6 text-blue-400 ml-3 mt-1 flex-shrink-0" />
            <div>
              <h3 class="text-lg font-semibold text-blue-800 mb-2">مزايا السواتر الذكية</h3>
              <ul class="text-blue-700 space-y-1">
                <li>• تحكم عن بُعد عبر التطبيقات الذكية</li>
                <li>• توفير 30% من استهلاك الطاقة</li>
                <li>• مقاومة فائقة للعوامل الجوية</li>
                <li>• صيانة أقل مقارنة بالسواتر التقليدية</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">أنواع السواتر الذكية</h3>

        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 class="font-bold text-accent mb-4">السواتر الكهروضوئية</h4>
            <div class="space-y-3">
              <p class="text-gray-600 text-sm">تتحكم في شفافيتها تلقائياً حسب شدة الضوء الخارجي</p>
              <div class="space-y-2 text-sm">
                <div><strong>المادة:</strong> زجاج ذكي مع طبقة LCD</div>
                <div><strong>التحكم:</strong> تلقائي أو يدوي</div>
                <div><strong>السعر:</strong> 400-600 ريال/م²</div>
              </div>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 class="font-bold text-accent mb-4">السواتر المحركة إلكترونياً</h4>
            <div class="space-y-3">
              <p class="text-gray-600 text-sm">تتحرك عمودياً أو أفقياً بضغطة زر واحدة</p>
              <div class="space-y-2 text-sm">
                <div><strong>المادة:</strong> ألمنيوم أو PVC</div>
                <div><strong>التحكم:</strong> ريموت كنترول أو تطبيق</div>
                <div><strong>السعر:</strong> 250-400 ريال/م²</div>
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">التقنيات المدمجة</h3>

        <div class="space-y-6 mb-8">
          <div class="bg-gradient-to-r from-purple-50 to-white p-6 rounded-xl border border-purple-200">
            <h4 class="font-bold text-lg mb-3">أنظمة التحكم الذكي</h4>
            <ul class="space-y-2 text-gray-700 text-sm">
              <li>• حساسات الضوء والحرارة للتشغيل التلقائي</li>
              <li>• تطبيقات الهاتف الذكي للتحكم عن بُعد</li>
              <li>• برمجة أوقات محددة للفتح والإغلاق</li>
              <li>• ربط مع أنظمة الأمان المنزلي</li>
            </ul>
          </div>

          <div class="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-200">
            <h4 class="font-bold text-lg mb-3">الطاقة المتجددة</h4>
            <ul class="space-y-2 text-gray-700 text-sm">
              <li>• ألواح شمسية مدمجة لتشغيل المحركات</li>
              <li>• بطاريات ليثيوم للتشغيل الليلي</li>
              <li>• أنظمة إدارة الطاقة الذكية</li>
              <li>• صفر انبعاثات كربونية</li>
            </ul>
          </div>
        </div>

        <div class="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <h4 class="font-bold text-primary mb-3">السواتر الذكية من محترفين الديار</h4>
          <p class="text-gray-600 mb-4">نقدم أحدث حلول السواتر الذكية التي تجمع بين التقنية المتقدمة والتصميم الأنيق، مع ضمان شامل وخدمة ما بعد البيع.</p>
        </div>
      </div>
    `,
    category: 'سواتر',
    author: 'مصمم السواتر عمر',
    authorAvatar: 'https://ui-avatars.com/api/?name=عمر+السواتر&background=8b5cf6&color=fff',
    authorBio: 'مصمم ومهندس متخصص في السواتر الذكية والحلول التقنية المتقدمة للخصوصية.',
    date: '25 أكتوبر 2024',
    readTime: '5 دقائق',
    image: '/uploads/sawater-1.webp',
    tags: ['سواتر', 'خصوصية', 'تقنية ذكية'],
    featured: true,
    views: 1890,
    likes: 127,
    rating: 4.8,
    commentsCount: 14,
    metaDescription: 'اكتشف السواتر الذكية الحديثة التي تجمع بين الخصوصية والأناقة مع التحكم الإلكتروني والطاقة المتجددة',
    keywords: ['سواتر ذكية جدة', 'سواتر كهربائية', 'خصوصية ذكية', 'سواتر متحركة', 'تحكم إلكتروني']
  },
  {
    id: 7,
    slug: 'royal-tents-luxury-occasions-guide',
    title: 'خيام ملكية فاخرة: كيف تختار التصميم المناسب لمناسبتك',
    excerpt: 'دليل شامل لاختيار الخيمة الملكية المثالية لمناسباتك الخاصة. أنواع الأقمشة والتصاميم والإكسسوارات المناسبة لكل مناسبة. نصائح للحصول على أفضل قيمة مقابل المال.',
    content: `
      <div class="prose prose-lg max-w-none">
        <h2 class="text-2xl font-bold text-primary mb-6 flex items-center">
          <Award class="w-6 h-6 ml-2" />
          عالم الخيام الملكية الفاخرة
        </h2>
        <p class="text-gray-700 leading-relaxed mb-6">تمثل الخيام الملكية قمة الأناقة والضيافة العربية الأصيلة. من المناسبات العائلية الخاصة إلى الفعاليات الكبرى، تتطلب كل مناسبة اختيار دقيق للتصميم والمواد والديكورات لضمان ترك انطباع لا يُنسى.</p>

        <div class="bg-amber-50 border-r-4 border-amber-400 p-6 mb-8 rounded-lg">
          <div class="flex items-start">
            <Award class="w-6 h-6 text-amber-400 ml-3 mt-1 flex-shrink-0" />
            <div>
              <h3 class="text-lg font-semibold text-amber-800 mb-2">معايير الخيمة الملكية المثالية</h3>
              <ul class="text-amber-700 space-y-1">
                <li>• أقمشة عالية الجودة مقاومة للحريق</li>
                <li>• تصميم يعكس الطابع الثقافي المطلوب</li>
                <li>• أنظمة تكييف وإضاءة متطورة</li>
                <li>• مرونة في التخطيط والتقسيم الداخلي</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">أنواع الخيام حسب المناسبة</h3>

        <div class="space-y-6 mb-8">
          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 class="font-bold text-lg text-accent mb-3">خيام الأفراح والمناسبات الكبرى</h4>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <h5 class="font-medium mb-2">المواصفات:</h5>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• مساحة: 500-2000 م²</li>
                  <li>• ارتفاع: 6-12 متر</li>
                  <li>• سعة: 200-1000 شخص</li>
                  <li>• أقمشة: حرير مطرز أو قماش ملكي</li>
                </ul>
              </div>
              <div>
                <h5 class="font-medium mb-2">الميزات الخاصة:</h5>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• مداخل متعددة مع بوابات فخمة</li>
                  <li>• أنظمة صوت ومرئيات متطورة</li>
                  <li>• إضاءة شندلير وديكورات ذهبية</li>
                  <li>• مناطق منفصلة للنساء والرجال</li>
                </ul>
              </div>
            </div>
            <div class="mt-4 text-center bg-primary/5 p-3 rounded">
              <span class="font-bold text-primary">السعر: 25,000-80,000 ريال</span>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 class="font-bold text-lg text-accent mb-3">خيام الاستقبالات الرسمية</h4>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <h5 class="font-medium mb-2">المواصفات:</h5>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• مساحة: 200-800 م²</li>
                  <li>• ارتفاع: 4-8 متر</li>
                  <li>• سعة: 50-300 شخص</li>
                  <li>• أقمشة: قماش دمشقي أو كشمير</li>
                </ul>
              </div>
              <div>
                <h5 class="font-medium mb-2">الميزات الخاصة:</h5>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• منطقة استقبال فخمة</li>
                  <li>• أثاث ملكي مذهب</li>
                  <li>• سجاد فارسي أصيل</li>
                  <li>• خدمة ضيافة متكاملة</li>
                </ul>
              </div>
            </div>
            <div class="mt-4 text-center bg-blue-50 p-3 rounded">
              <span class="font-bold text-blue-600">السعر: 15,000-45,000 ريال</span>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">دليل اختيار الأقمشة والديكورات</h3>

        <div class="overflow-x-auto mb-8">
          <table class="w-full border-collapse border border-gray-300">
            <thead>
              <tr class="bg-gray-50">
                <th class="border border-gray-300 p-3 text-right">نوع القماش</th>
                <th class="border border-gray-300 p-3 text-right">المناسبة</th>
                <th class="border border-gray-300 p-3 text-right">المتانة</th>
                <th class="border border-gray-300 p-3 text-right">السعر (ريال/م²)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 p-3 font-medium">الحرير الطبيعي المطرز</td>
                <td class="border border-gray-300 p-3">الأفراح الملكية</td>
                <td class="border border-gray-300 p-3 text-yellow-600">عالية</td>
                <td class="border border-gray-300 p-3">200-350</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 p-3 font-medium">القماش الدمشقي</td>
                <td class="border border-gray-300 p-3">الاستقبالات الرسمية</td>
                <td class="border border-gray-300 p-3 text-green-600">ممتازة</td>
                <td class="border border-gray-300 p-3">150-280</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-3 font-medium">الكشمير المصنع</td>
                <td class="border border-gray-300 p-3">المناسبات الشتوية</td>
                <td class="border border-gray-300 p-3 text-blue-600">جيدة جداً</td>
                <td class="border border-gray-300 p-3">120-200</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <h4 class="font-bold text-primary mb-3">خيام ملكية حصرية من محترفين الديار</h4>
          <p class="text-gray-600 mb-4">نصمم وننفذ أرقى الخيام الملكية بأعلى معايير الجودة والفخامة، مع خدمة شاملة تشمل التصميم والتنفيذ والتشغيل.</p>
        </div>
      </div>
    `,
    category: 'خيام ملكية',
    author: 'خبير الضيافة محمد',
    authorAvatar: 'https://ui-avatars.com/api/?name=محمد+الضيافة&background=dc2626&color=fff',
    authorBio: 'خبير في تصميم وتنفيذ الخيام الملكية والفعاليات الفاخرة مع خبرة 12 عاماً في الضيافة الراقية.',
    date: '20 أكتوبر 2024',
    readTime: '7 دقائق',
    image: '/uploads/khayyam-1.webp',
    tags: ['خيام ملكية', 'مناسبات', 'فخامة'],
    featured: false,
    views: 980,
    likes: 73,
    rating: 4.7,
    commentsCount: 9,
    metaDescription: 'دليل شامل لاختيار الخيام الملكية الفاخرة المناسبة لمناسباتك مع أفضل التصاميم والأقمشة',
    keywords: ['خيام ملكية جدة', 'خيام فاخرة', 'خيام أفراح', 'تأجير خيام', 'ضيافة ملكية']
  },
  {
    id: 8,
    slug: 'traditional-hair-houses-heritage-modern',
    title: 'بيوت الشعر التراثية: أصالة وعراقة في التصميم الحديث',
    excerpt: 'كيف تجمع بين الأصالة والحداثة في تصميم بيت الشعر؟ مواد تقليدية بتقنيات حديثة للحصول على أفضل النتائج. استكشف طرق الحفاظ على الطابع التراثي مع الراحة العصرية.',
    content: `
      <div class="prose prose-lg max-w-none">
        <h2 class="text-2xl font-bold text-primary mb-6 flex items-center">
          <Award class="w-6 h-6 ml-2" />
          بيوت الشعر: تراث يتجدد بالتقنيات الحديثة
        </h2>
        <p class="text-gray-700 leading-relaxed mb-6">يمثل بيت الشعر جزءاً لا يتجزأ من التراث العربي الأصيل. في عصر الحداثة، نستطيع الآن دمج التقنيات المتطورة مع المواد التقليدية لإنتاج بيوت شعر تحافظ على الطابع التراثي مع توفير الراحة والمتانة التي تتطلبها الحياة المعاصرة.</p>

        <div class="bg-amber-50 border-r-4 border-amber-400 p-6 mb-8 rounded-lg">
          <div class="flex items-start">
            <Award class="w-6 h-6 text-amber-400 ml-3 mt-1 flex-shrink-0" />
            <div>
              <h3 class="text-lg font-semibold text-amber-800 mb-2">مزايا بيوت الشعر الحديثة</h3>
              <ul class="text-amber-700 space-y-1">
                <li>• عزل حراري طبيعي ممتاز</li>
                <li>• مقاومة للرياح العاتية</li>
                <li>• سهولة النقل والتركيب</li>
                <li>• طابع تراثي أصيل وجذاب</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">أنواع شعر الماعز وخصائصه</h3>

        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 class="font-bold text-accent mb-4">الشعر البدوي الأصيل</h4>
            <div class="space-y-3">
              <div class="text-sm text-gray-600">
                <strong>المصدر:</strong> ماعز البادية السعودية
              </div>
              <div class="text-sm text-gray-600">
                <strong>اللون:</strong> أسود طبيعي أو بني غامق
              </div>
              <div class="text-sm text-gray-600">
                <strong>المتانة:</strong> 15-20 سنة مع الصيانة الجيدة
              </div>
              <div class="bg-green-50 p-3 rounded text-sm">
                <strong>السعر:</strong> 180-250 ريال/م²
              </div>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 class="font-bold text-accent mb-4">الشعر المعالج حديثاً</h4>
            <div class="space-y-3">
              <div class="text-sm text-gray-600">
                <strong>المعالجة:</strong> مقاوم للماء والحشرات
              </div>
              <div class="text-sm text-gray-600">
                <strong>اللون:</strong> متنوع مع ثبات عالي
              </div>
              <div class="text-sm text-gray-600">
                <strong>المتانة:</strong> 20-25 سنة
              </div>
              <div class="bg-blue-50 p-3 rounded text-sm">
                <strong>السعر:</strong> 220-300 ريال/م²
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">التقنيات الحديثة في التصميم</h3>

        <div class="space-y-6 mb-8">
          <div class="bg-gradient-to-r from-brown-50 to-white p-6 rounded-xl border border-amber-200">
            <h4 class="font-bold text-lg mb-3">الهيكل المعزز</h4>
            <ul class="space-y-2 text-gray-700 text-sm">
              <li>• أعمدة من الألمنيوم المطلي بالبرونز للشكل التراثي</li>
              <li>• حبال من الألياف الصناعية فائقة القوة</li>
              <li>• أوتاد تثبيت من التيتانيوم مقاومة للتآكل</li>
              <li>• نظام شد هيدروليكي للتحكم الدقيق</li>
            </ul>
          </div>

          <div class="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-200">
            <h4 class="font-bold text-lg mb-3">الراحة والتكييف</h4>
            <ul class="space-y-2 text-gray-700 text-sm">
              <li>• أنظمة تهوية طبيعية محسّنة</li>
              <li>• إمكانية تركيب تكييف مخفي</li>
              <li>• أرضيات معزولة ومريحة</li>
              <li>• إضاءة LED مدمجة بتصميم تراثي</li>
            </ul>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">مراحل التصميم والتنفيذ</h3>

        <div class="bg-gray-50 rounded-lg p-6 mb-8">
          <h4 class="font-bold mb-4">خطوات العمل المهنية</h4>
          <ol class="space-y-3 text-gray-700">
            <li class="flex items-start">
              <span class="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm ml-3 mt-0.5 flex-shrink-0">1</span>
              <div>
                <strong>الاستشارة والتصميم:</strong> دراسة الموقع وتحديد المتطلبات وإعداد التصميم المناسب
              </div>
            </li>
            <li class="flex items-start">
              <span class="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm ml-3 mt-0.5 flex-shrink-0">2</span>
              <div>
                <strong>إعداد المواد:</strong> اختيار أفضل أنواع الشعر ومعالجتها حسب المواصفات المطلوبة
              </div>
            </li>
            <li class="flex items-start">
              <span class="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm ml-3 mt-0.5 flex-shrink-0">3</span>
              <div>
                <strong>الحياكة والتجميع:</strong> حياكة القطع بالطرق التقليدية مع تقوية الوصلات
              </div>
            </li>
            <li class="flex items-start">
              <span class="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm ml-3 mt-0.5 flex-shrink-0">4</span>
              <div>
                <strong>التركيب والتشطيب:</strong> تركيب البيت في الموقع مع إضافة اللمسات النهائية
              </div>
            </li>
          </ol>
        </div>

        <div class="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <h4 class="font-bold text-primary mb-3">بيوت شعر حصرية من محترفين الديار</h4>
          <p class="text-gray-600 mb-4">نحن متخصصون في صناعة بيوت الشعر التراثية بأحدث التقنيات، مع الحفاظ على الطابع الأصيل والجودة العالية التي تدوم لعقود.</p>
        </div>
      </div>
    `,
    category: 'بيوت شعر',
    author: 'أستاذ التراث عبدالله',
    authorAvatar: 'https://ui-avatars.com/api/?name=عبدالله+التراث&background=92400e&color=fff',
    authorBio: 'خبير في صناعة وتصميم بيوت الشعر التراثية مع خبرة 20 عاماً في الحرف التراثية والتطوير الحديث.',
    date: '18 أكتوبر 2024',
    readTime: '6 دقائق',
    image: '/uploads/byoot-shaar-1.webp',
    tags: ['بيوت شعر', 'تراث', 'أصالة'],
    featured: false,
    views: 1340,
    likes: 91,
    rating: 4.6,
    commentsCount: 7,
    metaDescription: 'اكتشف فن صناعة بيوت الشعر التراثية بالتقنيات الحديثة مع الحفاظ على الطابع الأصيل والجودة العالية',
    keywords: ['بيوت شعر جدة', 'تراث سعودي', 'بيوت شعر أصيلة', 'حرف تراثية', 'تصميم تراثي حديث']
  },
  {
    id: 9,
    slug: 'common-shade-installation-mistakes',
    title: 'أخطاء شائعة في تركيب المظلات وكيفية تجنبها',
    excerpt: 'أهم الأخطاء التي يقع فيها المقاولون عند تركيب المظلات وتأثيرها على المتانة والسلامة. نصائح عملية من خبراء محترفين الديار لضمان تركيب آمن ومتين.',
    content: `
      <div class="prose prose-lg max-w-none">
        <h2 class="text-2xl font-bold text-primary mb-6 flex items-center">
          <AlertCircle class="w-6 h-6 ml-2" />
          الأخطاء الشائعة التي تهدد سلامة المظلات
        </h2>
        <p class="text-gray-700 leading-relaxed mb-6">يؤدي التركيب الخاطئ للمظلات إلى مشاكل جسيمة قد تتراوح من التلف المبكر إلى المخاطر الأمنية. إن فهم هذه الأخطاء وتجنبها يضمن الحصول على مظلة آمنة ومتينة تدوم لسنوات طويلة.</p>

        <div class="bg-red-50 border-r-4 border-red-400 p-6 mb-8 rounded-lg">
          <div class="flex items-start">
            <AlertCircle class="w-6 h-6 text-red-400 ml-3 mt-1 flex-shrink-0" />
            <div>
              <h3 class="text-lg font-semibold text-red-800 mb-2">إحصائيات مهمة</h3>
              <ul class="text-red-700 space-y-1">
                <li>• 70% من حوادث المظلات سببها أخطاء في التركيب</li>
                <li>• التركيب الصحيح يزيد عمر المظلة 3 أضعاف</li>
                <li>• 40% من تكاليف الصيانة يمكن تجنبها</li>
                <li>• الأخطاء الشائعة تقلل مقاومة الرياح بنسبة 60%</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">الأخطاء الإنشائية الخطيرة</h3>

        <div class="space-y-6 mb-8">
          <div class="bg-white border-l-4 border-red-400 p-6 shadow-sm">
            <h4 class="font-bold text-lg text-red-600 mb-3 flex items-center">
              <AlertCircle class="w-5 h-5 ml-2" />
              الخطأ #1: عدم دراسة التربة والأساسات
            </h4>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <h5 class="font-medium text-red-700 mb-2">المشاكل الناتجة:</h5>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• انهيار المظلة عند الرياح القوية</li>
                  <li>• تشقق الأساسات</li>
                  <li>• ميلان الأعمدة مع الوقت</li>
                  <li>• تكاليف إصلاح باهظة</li>
                </ul>
              </div>
              <div>
                <h5 class="font-medium text-green-700 mb-2">الحل الصحيح:</h5>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• إجراء دراسة جيوتقنية للتربة</li>
                  <li>• حساب الأحمال حسب المعايير</li>
                  <li>• اختيار عمق مناسب للأساسات</li>
                  <li>• استخدام خرسانة بالجودة المطلوبة</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-white border-l-4 border-orange-400 p-6 shadow-sm">
            <h4 class="font-bold text-lg text-orange-600 mb-3 flex items-center">
              <AlertCircle class="w-5 h-5 ml-2" />
              الخطأ #2: اختيار مواد غير مناسبة للمناخ
            </h4>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <h5 class="font-medium text-orange-700 mb-2">المشاكل الناتجة:</h5>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• تآكل سريع في الهيكل المعدني</li>
                  <li>• تلف القماش من الأشعة فوق البنفسجية</li>
                  <li>• فقدان اللون والشكل</li>
                  <li>• الحاجة لاستبدال مبكر</li>
                </ul>
              </div>
              <div>
                <h5 class="font-medium text-green-700 mb-2">الحل الصحيح:</h5>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• استخدام ألمنيوم مجلفن أو مطلي</li>
                  <li>• اختيار أقمشة مقاومة للأشعة فوق البنفسجية</li>
                  <li>• مراعاة مستوى الرطوبة والملوحة</li>
                  <li>• اختبار المواد في المختبر</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">أخطاء في عملية التركيب</h3>

        <div class="overflow-x-auto mb-8">
          <table class="w-full border-collapse border border-gray-300">
            <thead>
              <tr class="bg-gray-50">
                <th class="border border-gray-300 p-3 text-right">الخطأ</th>
                <th class="border border-gray-300 p-3 text-right">التأثير</th>
                <th class="border border-gray-300 p-3 text-right">الخطورة</th>
                <th class="border border-gray-300 p-3 text-right">كيفية التجنب</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 p-3 font-medium">شد القماش بقوة مفرطة</td>
                <td class="border border-gray-300 p-3">تمزق مبكر وتركيز الضغط</td>
                <td class="border border-gray-300 p-3 text-red-600">عالية</td>
                <td class="border border-gray-300 p-3">اتباع مواصفات الشد المحددة</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 p-3 font-medium">عدم محاذاة الأعمدة</td>
                <td class="border border-gray-300 p-3">توزيع غير متوازن للأحمال</td>
                <td class="border border-gray-300 p-3 text-orange-600">متوسطة</td>
                <td class="border border-gray-300 p-3">استخدام أجهزة قياس دقيقة</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-3 font-medium">تجاهل تصريف المياه</td>
                <td class="border border-gray-300 p-3">تجمع المياه وضغط إضافي</td>
                <td class="border border-gray-300 p-3 text-red-600">عالية</td>
                <td class="border border-gray-300 p-3">تصميم انحدار مناسب للتصريف</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-xl font-bold text-primary mb-4">قائمة مرجعية للتركيب الآمن</h3>

        <div class="bg-gray-50 rounded-lg p-6 mb-8">
          <h4 class="font-bold mb-4">خطوات التأكد من الجودة</h4>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h5 class="font-medium text-primary mb-3">قبل البدء</h5>
              <ul class="space-y-2 text-sm text-gray-700">
                <li class="flex items-start">
                  <input type="checkbox" class="mt-1 ml-2" />
                  دراسة الموقع ومقاومة التربة
                </li>
                <li class="flex items-start">
                  <input type="checkbox" class="mt-1 ml-2" />
                  حساب الأحمال والرياح المتوقعة
                </li>
                <li class="flex items-start">
                  <input type="checkbox" class="mt-1 ml-2" />
                  التأكد من جودة المواد والشهادات
                </li>
                <li class="flex items-start">
                  <input type="checkbox" class="mt-1 ml-2" />
                  إعداد المخططات التنفيذية
                </li>
              </ul>
            </div>
            <div>
              <h5 class="font-medium text-primary mb-3">أثناء التركيب</h5>
              <ul class="space-y-2 text-sm text-gray-700">
                <li class="flex items-start">
                  <input type="checkbox" class="mt-1 ml-2" />
                  فحص دقة المحاذاة والمستويات
                </li>
                <li class="flex items-start">
                  <input type="checkbox" class="mt-1 ml-2" />
                  تطبيق قوة الشد المناسبة
                </li>
                <li class="flex items-start">
                  <input type="checkbox" class="mt-1 ml-2" />
                  التأكد من سلامة الوصلات
                </li>
                <li class="flex items-start">
                  <input type="checkbox" class="mt-1 ml-2" />
                  اختبار مقاومة الرياح
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-green-50 border-r-4 border-green-400 p-6 mb-8 rounded-lg">
          <div class="flex items-start">
            <CheckCircle class="w-6 h-6 text-green-400 ml-3 mt-1 flex-shrink-0" />
            <div>
              <h3 class="text-lg font-semibold text-green-800 mb-2">علامات التركيب المحترف</h3>
              <ul class="text-green-700 space-y-2">
                <li>• محاذاة مثالية لجميع العناصر</li>
                <li>• انسيابية في تصريف المياه</li>
                <li>• ثبات ممتاز حتى في الرياح القوية</li>
                <li>• تشطيبات نهائية أنيقة ومتقنة</li>
                <li>• ضمان شامل على العمل والمواد</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <h4 class="font-bold text-primary mb-3">تركيب احترافي مضمون</h4>
          <p class="text-gray-600 mb-4">فريق محترفين الديار يضمن تركيب المظلات وفق أعلى معايير السلامة والجودة، مع تجنب جميع الأخطاء الشائعة وضمان شامل على العمل.</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex items-center text-sm text-gray-600">
              <Shield class="w-4 h-4 ml-1 text-primary" />
              ضمان السلامة والمتانة
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <Users class="w-4 h-4 ml-1 text-primary" />
              فريق مدرب ومعتمد
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <Award class="w-4 h-4 ml-1 text-primary" />
              ضمان 5 سنوات على التركيب
            </div>
          </div>
        </div>
      </div>
    `,
    category: 'مظلات سيارات',
    author: 'مدير التركيبات طارق',
    authorAvatar: 'https://ui-avatars.com/api/?name=طارق+التركيبات&background=dc2626&color=fff',
    authorBio: 'مدير فني متخصص في تركيب المظلات مع خبرة 18 عاماً في إدارة المشاريع الكبرى والتركيبات المعقدة.',
    date: '15 أكتوبر 2024',
    readTime: '8 دقائق',
    image: '/uploads/mazallat-2.webp',
    tags: ['تركيب', 'أخطاء', 'سلامة'],
    featured: false,
    views: 1120,
    likes: 84,
    rating: 4.8,
    commentsCount: 10,
    metaDescription: 'تعرف على الأخطاء الشائعة في تركيب المظلات وكيفية تجنبها لضمان السلامة والمتانة مع نصائح الخبراء',
    keywords: ['أخطاء تركيب المظلات', 'تركيب مظلات آمن', 'سلامة المظلات', 'تركيب احترافي جدة', 'ضمان المظلات']
  }
];

// بيانات التعليقات النموذجية
const sampleComments = [
  {
    id: 1,
    author: 'أحمد محمد',
    avatar: 'https://ui-avatars.com/api/?name=أحمد+محمد&background=059669&color=fff',
    date: '16 نوفمبر 2024',
    content: 'مقال ممتاز ومفيد جداً! استفدت كثيراً من نصائح اختيار المواد المناسبة للمناخ الساحلي. شكراً لكم على هذه المعلومات القيمة.',
    likes: 5,
    replies: [
      {
        id: 11,
        author: 'فريق محترفين الديار',
        avatar: 'https://ui-avatars.com/api/?name=محترفين+الديار&background=0f172a&color=fff',
        date: '16 نوفمبر 2024',
        content: 'شكراً لك أحمد على تعليقك الإيجابي. نحن سعداء لأن المقال كان مفيداً لك.',
        likes: 2
      }
    ]
  },
  {
    id: 2,
    author: 'سارة العتيبي',
    avatar: 'https://ui-avatars.com/api/?name=سارة+العتيبي&background=dc2626&color=fff',
    date: '17 نوفمبر 2024',
    content: 'هل يمكنكم توضيح الفرق في الأسعار بين المواد المختلفة؟',
    likes: 3,
    replies: []
  }
];

// دالة للعثور على المقال حسب الـ slug
function getArticleBySlug(slug: string) {
  return articles.find(article => article.slug === slug);
}

// دالة للحصول على المقالات المشابهة
function getRelatedArticles(currentId: number, category: string, limit = 3) {
  return articles
    .filter(article => article.id !== currentId && article.category === category)
    .slice(0, limit);
}

// دالة للحصول على المقال السابق والتالي
function getNavigationArticles(currentId: number) {
  const currentIndex = articles.findIndex(article => article.id === currentId);
  const previousArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  return { previousArticle, nextArticle };
}

// دالة لإنتاج structured data للـ SEO
function generateStructuredData(article: typeof articles[0]) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.metaDescription,
    "image": `https://your-domain.com${article.image}`,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "محترفين الديار",
      "logo": {
        "@type": "ImageObject",
        "url": "https://your-domain.com/logo.png"
      }
    },
    "datePublished": article.date,
    "dateModified": article.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://your-domain.com/articles/${article.slug}`
    }
  };
}

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// إنتاج metadata للـ SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'المقال غير موجود',
      description: 'المقال المطلوب غير متوفر'
    };
  }

  return {
    title: `${article.title} | محترفين الديار`,
    description: article.metaDescription,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
      type: 'article',
      publishedTime: article.date,
      authors: [article.author]
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image]
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.id, article.category);
  const { previousArticle, nextArticle } = getNavigationArticles(article.id);
  const structuredData = generateStructuredData(article);

  return (
    <>
      {/* Structured Data للـ SEO */}
      <StructuredDataScript data={structuredData} />

      <Navbar />

      <article className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        {/* Article Header */}
        <header className="py-16 bg-gradient-to-r from-primary to-accent text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <div className="flex items-center space-x-2 space-x-reverse text-white/80">
                <Link href="/" className="hover:text-white transition-colors flex items-center">
                  <Home className="w-4 h-4 ml-1" />
                  الرئيسية
                </Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
                <Link href="/articles" className="hover:text-white transition-colors">المقالات</Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
                <span className="text-white">{article.category}</span>
              </div>
            </nav>

            {/* Category Badge */}
            <div className="mb-4">
              <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center">
                <img
                  src={article.authorAvatar}
                  alt={article.author}
                  className="w-12 h-12 rounded-full ml-3 border-2 border-white/20"
                />
                <div>
                  <div className="font-medium">{article.author}</div>
                  <div className="text-sm text-white/70">{article.authorBio}</div>
                </div>
              </div>

              <div className="flex items-center space-x-6 space-x-reverse text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 ml-2" />
                  {article.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 ml-2" />
                  {article.readTime}
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 ml-2" />
                  {article.views} مشاهدة
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Article Image */}
          <div className="relative mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Article Actions */}
          <div className="flex items-center justify-between mb-12 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center space-x-4 space-x-reverse">
              {/* Rating */}
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={`rating-star-${i}-${article.id}`}
                    className={`w-5 h-5 ${i < Math.floor(article.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-sm text-muted-foreground mr-2">({article.rating})</span>
              </div>

              {/* Like Button */}
              <Button variant="outline" size="sm" className="flex items-center">
                <Heart className="w-4 h-4 ml-1" />
                {article.likes}
              </Button>

              {/* Bookmark Button */}
              <Button variant="outline" size="sm" className="flex items-center">
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-sm text-muted-foreground ml-3">مشاركة:</span>
              <Button variant="outline" size="sm">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Article Content */}
          <SafeHtmlContent
            content={article.content}
            className="prose prose-lg max-w-none mb-12"
          />

          {/* Tags */}
          <div className="mb-12">
            <h3 className="text-lg font-bold text-primary mb-4">الكلمات المفتاحية</h3>
            <div className="flex flex-wrap gap-3">
              {article.tags.map((tag) => (
                <Link
                  key={`article-${article.id}-tag-${tag}`}
                  href={`/articles?tag=${tag}`}
                  className="bg-gradient-to-r from-gray-100 to-gray-50 hover:from-accent/10 hover:to-accent/5 text-gray-600 hover:text-accent px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center"
                >
                  <Tag className="w-3 h-3 ml-1" />
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation between articles */}
          <div className="flex items-center justify-between mb-12 p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100">
            <div className="flex-1">
              {previousArticle && (
                <Link href={`/articles/${previousArticle.slug}`} className="group">
                  <div className="flex items-center text-gray-600 hover:text-primary transition-colors">
                    <ArrowRight className="w-5 h-5 ml-2" />
                    <div>
                      <div className="text-sm text-gray-500">المقال السابق</div>
                      <div className="font-medium group-hover:text-primary line-clamp-1">
                        {previousArticle.title}
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
            <div className="flex-1 text-left">
              {nextArticle && (
                <Link href={`/articles/${nextArticle.slug}`} className="group">
                  <div className="flex items-center justify-end text-gray-600 hover:text-primary transition-colors">
                    <div className="text-right">
                      <div className="text-sm text-gray-500">المقال التالي</div>
                      <div className="font-medium group-hover:text-primary line-clamp-1">
                        {nextArticle.title}
                      </div>
                    </div>
                    <ArrowLeft className="w-5 h-5 mr-2" />
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-bold text-primary mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 ml-2" />
                مقالات مشابهة
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    href={`/articles/${relatedArticle.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                      <img
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-4">
                        <span className="text-xs text-accent font-medium">
                          {relatedArticle.category}
                        </span>
                        <h4 className="font-bold text-gray-900 mt-1 group-hover:text-primary transition-colors line-clamp-2">
                          {relatedArticle.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {relatedArticle.excerpt}
                        </p>
                        <div className="flex items-center mt-3 text-xs text-gray-500">
                          <Clock className="w-3 h-3 ml-1" />
                          {relatedArticle.readTime}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <CommentsSystem
            articleId={article.id}
            currentUser={{
              name: 'فريق محترفين الديار',
              avatar: 'https://ui-avatars.com/api/?name=محترفين+الديار&background=0f172a&color=fff',
              isAdmin: true
            }}
            initialComments={sampleComments.map(comment => ({
              ...comment,
              isLiked: false,
              isDisliked: false,
              dislikes: 0,
              isApproved: true,
              isReported: false,
              reportCount: 0,
              level: 0,
              replies: comment.replies?.map(reply => ({
                ...reply,
                isLiked: false,
                isDisliked: false,
                dislikes: 0,
                isApproved: true,
                isReported: false,
                reportCount: 0,
                level: 1,
                replies: []
              })) || []
            }))}
          />

          {/* Back to Articles */}
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/articles" className="flex items-center">
                <ArrowLeft className="w-5 h-5 ml-2" />
                العودة إلى المقالات
              </Link>
            </Button>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
