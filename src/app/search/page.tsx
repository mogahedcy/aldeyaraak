'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdvancedSearch from '@/components/AdvancedSearch';
import SearchResults from '@/components/SearchResults';
import { Search, BookOpen, TrendingUp, Filter, Bookmark, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Extended articles data with local images and comprehensive information
const articles = [
  {
    id: 1,
    slug: 'best-car-shades-jeddah-2024',
    title: 'أفضل أنواع مظلات السيارات في جدة 2024',
    excerpt: 'دليل شامل لاختيار أفضل مظلة لسيارتك في مناخ جدة الساحلي. تعرف على المواد والتصاميم المختلفة ونصائح الاختيار.',
    content: 'محتوى شامل عن مظلات السيارات...',
    category: 'مظلات سيارات',
    author: 'فريق محترفين الديار',
    authorAvatar: 'https://ui-avatars.com/api/?name=فريق+محترفين+الديار&background=0f172a&color=fff',
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
    content: 'محتوى شامل عن صيانة البرجولات...',
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
    content: 'محتوى شامل عن الساندوتش بانل...',
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
    content: 'محتوى شامل عن السواتر الذكية...',
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
    content: 'محتوى شامل عن الخيام الملكية...',
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
    content: 'محتوى شامل عن بيوت الشعر...',
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
    content: 'محتوى شامل عن تنسيق الحدائق...',
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
    content: 'محتوى شامل عن الترميم...',
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
  },
  {
    id: 9,
    slug: 'modern-shades-innovative-designs',
    title: 'مظلات عصرية بتصاميم مبتكرة للحدائق الحديثة',
    excerpt: 'اكتشف أحدث تصاميم المظلات العصرية التي تجمع بين الوظيفة والجمال. حلول مبتكرة للحدائق والمساحات الخارجية.',
    content: 'محتوى شامل عن المظلات العصرية...',
    category: 'مظلات سيارات',
    author: 'فريق محترفين الديار',
    authorAvatar: 'https://ui-avatars.com/api/?name=فريق+محترفين+الديار&background=0f172a&color=fff',
    date: '12 نوفمبر 2024',
    readTime: '4 دقائق',
    image: '/uploads/mazallat-2.webp',
    tags: ['مظلات', 'تصميم', 'حدائق', 'عصري'],
    featured: false,
    views: 1120,
    likes: 84,
    rating: 4.6,
    commentsCount: 11,
    keywords: ['مظلات حدائق', 'تصاميم عصرية', 'مساحات خارجية', 'حلول مبتكرة']
  },
  {
    id: 10,
    slug: 'sustainable-pergolas-eco-friendly',
    title: 'برجولات مستدامة: حلول صديقة للبيئة',
    excerpt: 'كيف تختار برجولة صديقة للبيئة؟ مواد مستدامة وتقنيات توفير الطاقة لحديقة خضراء.',
    content: 'محتوى شامل عن البرجولات المستدامة...',
    category: 'برجولات',
    author: 'المهندس أحمد الديار',
    authorAvatar: 'https://ui-avatars.com/api/?name=أحمد+الديار&background=059669&color=fff',
    date: '8 نوفمبر 2024',
    readTime: '5 دقائق',
    image: '/uploads/pergola-2.jpg',
    tags: ['برجولات', 'استدامة', 'بيئة', 'توفير طاقة'],
    featured: false,
    views: 945,
    likes: 72,
    rating: 4.7,
    commentsCount: 9,
    keywords: ['برجولات مستدامة', 'مواد بيئية', 'توفير طاقة', 'حديقة خضراء']
  }
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState(articles);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Get initial search query from URL
  const initialQuery = searchParams.get('q') || '';

  useEffect(() => {
    // If there's an initial query, perform search
    if (initialQuery) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setInitialLoad(false);
      }, 500);
    } else {
      setInitialLoad(false);
    }
  }, [initialQuery]);

  const handleSearchResults = (results: typeof articles) => {
    setSearchResults(results);
  };

  // Popular searches for suggestions
  const popularSearches = [
    'مظلات السيارات',
    'برجولات خشبية',
    'ساندوتش بانل',
    'سواتر الحدائق',
    'خيام ملكية',
    'بيوت شعر',
    'تنسيق حدائق',
    'ترميم ملحقات'
  ];

  // Recent trending topics
  const trendingTopics = [
    { topic: 'مظلات مقاومة للرياح', count: 156 },
    { topic: 'برجولات للمناخ الساحلي', count: 143 },
    { topic: 'عزل حراري متطور', count: 128 },
    { topic: 'سواتر ذكية', count: 115 },
    { topic: 'خيام فاخرة', count: 98 }
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        {/* Enhanced Header Section */}
        <section className="py-20 bg-gradient-to-r from-primary via-accent to-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <Search className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              البحث المتقدم في المقالات
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed opacity-90 mb-8">
              اكتشف المعرفة المتخصصة في عالم المظلات والبرجولات والساندوتش بانل مع نظام البحث الذكي
            </p>

            {/* Search Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <BookOpen className="w-5 h-5 ml-2" />
                <span className="font-medium">{articles.length} مقال</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <TrendingUp className="w-5 h-5 ml-2" />
                <span className="font-medium">أكثر من 12,000 مشاهدة</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Zap className="w-5 h-5 ml-2 text-yellow-300" />
                <span className="font-medium">مدعوم بالذكاء الاصطناعي</span>
              </div>
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

          {/* Trending & Popular Searches Sidebar */}
          {initialLoad && !initialQuery && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Popular Searches */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                    <TrendingUp className="w-6 h-6 ml-2 text-accent" />
                    الموضوعات الأكثر بحثاً
                  </h3>
                  <div className="space-y-3">
                    {trendingTopics.map((item, index) => (
                      <div key={`trending-${item.topic}-${index}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <span className="font-medium text-gray-700">{item.topic}</span>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs font-medium">
                            {item.count} بحث
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Access */}
              <div>
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                    <Bookmark className="w-6 h-6 ml-2 text-accent" />
                    بحث سريع
                  </h3>
                  <div className="space-y-2">
                    {popularSearches.slice(0, 6).map((search) => (
                      <button
                        key={`popular-${search}`}
                        className="w-full text-right p-3 bg-gray-50 hover:bg-accent/10 rounded-lg text-sm font-medium text-gray-700 hover:text-accent transition-all duration-300"
                        onClick={() => {
                          const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
                          if (searchInput) {
                            searchInput.value = search;
                            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                          }
                        }}
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Tips */}
                <div className="bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 rounded-xl p-6 mt-6">
                  <h4 className="text-lg font-bold text-primary mb-3 flex items-center">
                    <Zap className="w-5 h-5 ml-2 text-accent" />
                    نصائح البحث
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• استخدم كلمات مفتاحية محددة</li>
                    <li>• جرب الفلاتر لتضييق النتائج</li>
                    <li>• احفظ البحثات المفيدة</li>
                    <li>• استخدم علامات التبويب للتنظيم</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Search Results */}
          <SearchResults
            articles={searchResults}
            isLoading={isLoading}
            searchQuery={initialQuery}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">جاري تحميل صفحة البحث...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
