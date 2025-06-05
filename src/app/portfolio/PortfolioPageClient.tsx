'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import AdvancedFilters from '@/components/AdvancedFilters';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Calendar,
  MapPin,
  Eye,
  Heart,
  MessageCircle,
  ExternalLink,
  AlertCircle,
  RefreshCw,
  Star
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  completionDate: string;
  client?: string;
  featured: boolean;
  views: number;
  likes: number;
  rating: number;
  projectDuration: string;
  projectCost: string;
  mediaItems: Array<{
    id: string;
    type: 'IMAGE' | 'VIDEO';
    src: string;
    thumbnail?: string;
    title?: string;
  }>;
  tags: Array<{ name: string }>;
  materials: Array<{ name: string }>;
  createdAt: string;
  updatedAt: string;
}

type ViewMode = 'grid' | 'list' | 'map';
type SortOption = 'newest' | 'oldest' | 'mostViewed' | 'featured' | 'rating';

const categories = [
  'الكل',
  'مظلات',
  'برجولات',
  'سواتر',
  'ساندوتش بانل',
  'تنسيق حدائق',
  'خيام ملكية',
  'بيوت شعر',
  'ترميم'
];

const sortOptions = [
  { value: 'newest', label: 'الأحدث' },
  { value: 'oldest', label: 'الأقدم' },
  { value: 'mostViewed', label: 'الأكثر مشاهدة' },
  { value: 'featured', label: 'المميز' },
  { value: 'rating', label: 'الأعلى تقييماً' }
];

export default function PortfolioPageClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [retryCount, setRetryCount] = useState(0);

  const projectsPerPage = 12;

  const fetchProjects = useCallback(async (retryAttempt = 0) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        category: selectedCategory === 'الكل' ? 'all' : selectedCategory,
        page: currentPage.toString(),
        limit: projectsPerPage.toString(),
        search: searchTerm,
        sort: sortBy
      });

      console.log('🔍 جلب المشاريع مع المعايير:', {
        category: selectedCategory,
        page: currentPage,
        search: searchTerm,
        sort: sortBy
      });

      const response = await fetch(`/api/projects?${params}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      console.log('📦 البيانات المستلمة من API:', data);

      if (data.success) {
        setProjects(data.projects || []);
        setTotalProjects(data.total || 0);
        console.log('✅ تم جلب المشاريع بنجاح:', data.projects?.length || 0);
      } else if (data.projects) {
        // التوافق مع التنسيق القديم
        setProjects(data.projects || []);
        setTotalProjects(data.pagination?.total || data.projects?.length || 0);
        console.log('✅ تم جلب المشاريع بنجاح (تنسيق قديم):', data.projects?.length || 0);
      } else {
        throw new Error(data.error || 'فشل في جلب المشاريع');
      }

    } catch (error) {
      console.error('❌ خطأ في جلب المشاريع:', error);

      // إعادة المحاولة تلقائياً (حتى 3 مرات)
      if (retryAttempt < 3) {
        console.log(`🔄 إعادة المحاولة ${retryAttempt + 1}/3...`);
        setTimeout(() => {
          fetchProjects(retryAttempt + 1);
        }, 1000 * (retryAttempt + 1)); // تأخير متدرج
        return;
      }

      setError(error instanceof Error ? error.message : 'حدث خطأ غير متوقع');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, currentPage, searchTerm, sortBy]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchProjects();
  };

  const filteredAndSortedProjects = useMemo(() => {
    if (!projects.length) return [];

    let filtered = [...projects];

    // تطبيق الترتيب
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'mostViewed':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    return filtered;
  }, [projects, sortBy]);

  const totalPages = Math.ceil(totalProjects / projectsPerPage);

  // عرض حالة التحميل
  if (loading && !projects.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">جاري تحميل المشاريع...</h3>
          <p className="text-gray-600">يرجى الانتظار قليلاً</p>
        </div>
      </div>
    );
  }

  // عرض حالة الخطأ
  if (error && !projects.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">حدث خطأ في تحميل المشاريع</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <Button onClick={handleRetry} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              إعادة المحاولة
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()} className="w-full">
              تحديث الصفحة
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-accent py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            معرض أعمالنا المتميزة
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            استكشف مجموعة من أروع المشاريع التي نفذناها بأعلى معايير الجودة والإتقان
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="ابحث في المشاريع..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-12 py-4 text-lg bg-white/95 backdrop-blur border-0 shadow-lg"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className="transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* View Options */}
          <div className="flex items-center gap-4">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* View Mode */}
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Filters */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              الفلاتر
            </Button>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            عرض {projects.length} من أصل {totalProjects} مشروع
            {searchTerm && (
              <span className="font-medium"> • البحث عن: "{searchTerm}"</span>
            )}
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              جاري التحديث...
            </div>
          )}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mb-8">
            <AdvancedFilters onFiltersChange={() => {}} />
          </div>
        )}

        {/* Projects Grid/List */}
        {projects.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد مشاريع</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? `لم نجد أي مشاريع تطابق البحث "${searchTerm}"`
                : 'لا توجد مشاريع في هذه الفئة حالياً'
              }
            </p>
            {searchTerm && (
              <Button onClick={() => setSearchTerm('')} variant="outline">
                مسح البحث
              </Button>
            )}
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredAndSortedProjects.map((project) => (
                  <ProjectListItem key={project.id} project={project} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  السابق
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="min-w-[40px]"
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  التالي
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Project Card Component
function ProjectCard({ project }: { project: Project }) {
  const mainImage = project.mediaItems.find(item => item.type === 'IMAGE');
  const mainVideo = project.mediaItems.find(item => item.type === 'VIDEO');
  const mainMedia = mainImage || mainVideo;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      {/* Project Media */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        {mainImage ? (
          <Image
            src={mainImage.src}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              console.error('خطأ في تحميل الصورة:', mainImage.src);
            }}
          />
        ) : mainVideo ? (
          <div className="relative w-full h-full bg-gray-900">
            {/* صورة مصغرة كخلفية */}
            {mainVideo.thumbnail && (
              <Image
                src={mainVideo.thumbnail}
                alt={`معاينة ${project.title}`}
                fill
                className="object-cover"
                priority={false}
              />
            )}

            {/* الفيديو */}
            <video
              key={`video-${project.id}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              poster={mainVideo.thumbnail || undefined}
              onError={(e) => {
                console.error('خطأ في تحميل الفيديو:', mainVideo.src);
                // إخفاء الفيديو عند حدوث خطأ
                const videoElement = e.target as HTMLVideoElement;
                videoElement.style.display = 'none';
              }}
              onLoadedData={(e) => {
                console.log('تم تحميل الفيديو بنجاح:', project.title);
                const video = e.target as HTMLVideoElement;
                video.play().catch((error) => {
                  console.warn('لا يمكن تشغيل الفيديو تلقائياً:', error);
                });
              }}
            >
              <source src={mainVideo.src} type="video/mp4" />
              <source src={mainVideo.src} type="video/webm" />
              متصفحك لا يدعم عرض الفيديو
            </video>

            {/* شارة الفيديو */}
            <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              فيديو
            </div>

            {/* أيقونة تشغيل مع تأثير hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-black/40 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">لا توجد وسائط</span>
            </div>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Media Type Badge */}
        <div className="absolute top-4 right-4 flex gap-2">
          {project.featured && (
            <Badge className="bg-yellow-500 hover:bg-yellow-600">
              <Star className="h-3 w-3 mr-1" />
              مميز
            </Badge>
          )}
          {mainVideo && (
            <Badge className="bg-blue-500 hover:bg-blue-600">
              <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              فيديو
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {project.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {project.likes}
            </span>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {project.category}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span>{project.rating}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {project.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(project.completionDate).toLocaleDateString('ar-SA')}
          </span>
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag.name} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                {tag.name}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action Button */}
        <Link href={`/portfolio/${project.id}`}>
          <Button className="w-full group-hover:bg-primary/90">
            <ExternalLink className="h-4 w-4 mr-2" />
            مشاهدة التفاصيل
          </Button>
        </Link>
      </div>
    </div>
  );
}

// Project List Item Component
function ProjectListItem({ project }: { project: Project }) {
  const mainImage = project.mediaItems.find(item => item.type === 'IMAGE');
  const mainVideo = project.mediaItems.find(item => item.type === 'VIDEO');

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Media */}
        <div className="relative w-full md:w-80 h-48 md:h-auto flex-shrink-0 bg-gray-100">
          {mainImage ? (
            <Image
              src={mainImage.src}
              alt={project.title}
              fill
              className="object-cover"
              onError={(e) => {
                console.error('خطأ في تحميل الصورة:', mainImage.src);
              }}
            />
          ) : mainVideo ? (
            <div className="relative w-full h-full bg-gray-900">
              {/* صورة مصغرة كخلفية */}
              {mainVideo.thumbnail && (
                <Image
                  src={mainVideo.thumbnail}
                  alt={`معاينة ${project.title}`}
                  fill
                  className="object-cover"
                  priority={false}
                />
              )}

              {/* الفيديو */}
              <video
                key={`list-video-${project.id}`}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                poster={mainVideo.thumbnail || undefined}
                onError={(e) => {
                  console.error('خطأ في تحميل الفيديو:', mainVideo.src);
                  const videoElement = e.target as HTMLVideoElement;
                  videoElement.style.display = 'none';
                }}
                onLoadedData={(e) => {
                  console.log('تم تحميل الفيديو في القائمة بنجاح:', project.title);
                  const video = e.target as HTMLVideoElement;
                  video.play().catch((error) => {
                    console.warn('لا يمكن تشغيل الفيديو تلقائياً:', error);
                  });
                }}
              >
                <source src={mainVideo.src} type="video/mp4" />
                <source src={mainVideo.src} type="video/webm" />
                متصفحك لا يدعم عرض الفيديو
              </video>

              {/* شارة الفيديو */}
              <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                فيديو
              </div>

              {/* أيقونة تشغيل */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/40 backdrop-blur-sm rounded-full p-3">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs">لا توجد وسائط</span>
              </div>
            </div>
          )}

          <div className="absolute top-4 right-4 flex gap-2">
            {project.featured && (
              <Badge className="bg-yellow-500 hover:bg-yellow-600">
                <Star className="h-3 w-3 mr-1" />
                مميز
              </Badge>
            )}
            {mainVideo && (
              <Badge className="bg-blue-500 hover:bg-blue-600">
                <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                فيديو
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="secondary">{project.category}</Badge>
                <div className="flex items-center gap-1 text-sm text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{project.rating}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {project.title}
              </h3>
            </div>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">الموقع:</span> {project.location}
            </div>
            <div>
              <span className="font-medium">التاريخ:</span> {new Date(project.completionDate).toLocaleDateString('ar-SA')}
            </div>
            <div>
              <span className="font-medium">المدة:</span> {project.projectDuration || 'غير محدد'}
            </div>
            <div>
              <span className="font-medium">الوسائط:</span>
              {project.mediaItems.filter(m => m.type === 'IMAGE').length} صور
              {project.mediaItems.filter(m => m.type === 'VIDEO').length > 0 &&
                `, ${project.mediaItems.filter(m => m.type === 'VIDEO').length} فيديو`
              }
            </div>
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 5).map((tag) => (
                <span key={tag.name} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center">
                <Eye className="h-4 w-4" />
                {project.views} مشاهدة
              </span>
              <span className="flex items-center">
                <Heart className="h-4 w-4" />
                {project.likes} إعجاب
              </span>
            </div>

            <Link href={`/portfolio/${project.id}`}>
              <Button>
                <ExternalLink className="h-4 w-4 mr-2" />
                مشاهدة التفاصيل
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}