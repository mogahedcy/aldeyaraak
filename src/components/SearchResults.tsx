'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Eye, Heart, Clock, Tag, Star, Grid, List, ChevronLeft, ChevronRight, Loader2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';


interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  featured: boolean;
  views: number;
  likes: number;
  rating: number;
  commentsCount: number;
  keywords: string[];
  searchScore?: number;
}

interface SearchResultsProps {
  articles: Article[];
  isLoading?: boolean;
  searchQuery?: string;
  className?: string;
}

const ARTICLES_PER_PAGE = 9;

export default function SearchResults({ articles, isLoading, searchQuery, className = '' }: SearchResultsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [animatingItems, setAnimatingItems] = useState<number[]>([]);

  // Pagination logic
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = articles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  // Page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      // Add animation to current items
      setAnimatingItems(paginatedArticles.map(a => a.id));

      setTimeout(() => {
        setCurrentPage(page);
        setAnimatingItems([]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 150);
    }
  };

  const handleCardHover = (articleId: number) => {
    setAnimatingItems([articleId]);
    setTimeout(() => setAnimatingItems([]), 300);
  };

  // Highlight search terms in text - returns JSX for safety
  const highlightSearchTerms = (text: string, query: string): React.ReactNode => {
    if (!query) return text;

    const terms = query.split(' ').filter(term => term.length > 1);

    let parts = [text];

    for (const term of terms) {
      const newParts: React.ReactNode[] = [];
      for (const part of parts) {
        if (typeof part === 'string') {
          const regex = new RegExp(`(${term})`, 'gi');
          const splitParts = part.split(regex);
          splitParts.forEach((subPart, index) => {
            if (subPart.toLowerCase() === term.toLowerCase()) {
              newParts.push(
                <mark key={`${term}-${index}-${subPart}`} className="bg-yellow-200 px-1 rounded">
                  {subPart}
                </mark>
              );
            } else if (subPart) {
              newParts.push(subPart);
            }
          });
        } else {
          newParts.push(part);
        }
      }
      parts = newParts;
    }

    return parts;
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center py-20 ${className}`}>
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-accent mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">جاري البحث في المقالات...</p>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className={`text-center py-20 ${className}`}>
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-primary mb-4">لم نجد نتائج مطابقة</h3>
          <p className="text-muted-foreground mb-6">
            لم نتمكن من العثور على مقالات تطابق معايير البحث الخاصة بك. جرب:
          </p>
          <ul className="text-sm text-muted-foreground space-y-2 mb-8">
            <li>• استخدام كلمات مفتاحية مختلفة</li>
            <li>• تقليل عدد الفلاتر المطبقة</li>
            <li>• التحقق من الإملاء</li>
            <li>• استخدام مصطلحات أكثر عمومية</li>
          </ul>
          <Button onClick={() => window.location.reload()}>
            إعادة تعيين البحث
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-8 bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">
            نتائج البحث
            {searchQuery && (
              <span className="text-lg text-muted-foreground font-normal"> عن "{searchQuery}"</span>
            )}
          </h2>
          <p className="text-muted-foreground">
            تم العثور على <span className="font-semibold text-accent">{articles.length}</span> مقال
            {totalPages > 1 && (
              <span> • صفحة {currentPage} من {totalPages}</span>
            )}
          </p>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex items-center space-x-2 space-x-reverse bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-white shadow-sm text-accent'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-white shadow-sm text-accent'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Articles Grid/List */}
      <div className={`mb-12 ${
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          : 'space-y-6'
      }`}>
        {paginatedArticles.map((article, index) => (
          <article
            key={article.id}
            className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 group border border-gray-100 ${
              animatingItems.includes(article.id) ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
            } ${
              viewMode === 'list' ? 'flex' : ''
            }`}
            onMouseEnter={() => handleCardHover(article.id)}
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.6s ease-out forwards'
            }}
          >
            {/* Article Image */}
            <div className={`relative overflow-hidden ${
              viewMode === 'list' ? 'w-80 flex-shrink-0' : 'h-56'
            }`}>
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Featured Badge */}
              {article.featured && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-accent to-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  مميز
                </div>
              )}

              {/* Category Badge */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium text-primary shadow-lg">
                {article.category}
              </div>

              {/* Search Score (if relevant) */}
              {article.searchScore && article.searchScore > 10 && (
                <div className="absolute top-4 left-4 bg-accent/90 text-white px-2 py-1 rounded-md text-xs font-medium">
                  مطابقة {Math.round((article.searchScore / 50) * 100)}%
                </div>
              )}

              {/* Stats */}
              <div className="absolute bottom-4 left-4 flex items-center space-x-4 space-x-reverse text-white/90 text-sm">
                <span className="flex items-center">
                  <Eye className="w-4 h-4 ml-1" />
                  {article.views}
                </span>
                <span className="flex items-center">
                  <Heart className="w-4 h-4 ml-1" />
                  {article.likes}
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              {/* Author and Date */}
              <div className="flex items-center mb-4">
                <img
                  src={article.authorAvatar}
                  alt={article.author}
                  className="w-10 h-10 rounded-full ml-3"
                />
                <div>
                  <div className="font-medium text-sm text-primary">{article.author}</div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Calendar className="w-3 h-3 ml-1" />
                    {article.date}
                  </div>
                </div>
                <div className="mr-auto flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 ml-1" />
                  {article.readTime}
                </div>
              </div>

              <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2 leading-tight hover:text-accent transition-colors duration-300">
                {highlightSearchTerms(article.title, searchQuery || '')}
              </h3>

              <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                {highlightSearchTerms(article.excerpt, searchQuery || '')}
              </p>

              {/* Rating and Comments */}
              <div className="flex items-center justify-between mb-4 border-t border-gray-100 pt-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={`star-${article.id}-${i}`}
                      className={`w-4 h-4 ${i < Math.floor(article.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground mr-2">({article.rating})</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {article.commentsCount} تعليق
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {article.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 hover:from-accent/10 hover:to-accent/5 hover:text-accent transition-all duration-300 cursor-pointer"
                  >
                    <Tag className="w-3 h-3 ml-1" />
                    <span>
                      {highlightSearchTerms(tag, searchQuery || '')}
                    </span>
                  </Badge>
                ))}
              </div>

              {/* Read More Button */}
              <Button
                asChild
                variant="outline"
                className="w-full group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300 font-medium"
              >
                <Link href={`/articles/${article.slug}`} className="flex items-center justify-center">
                  <span>اقرأ المقال كاملاً</span>
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 space-x-reverse bg-white rounded-xl p-6 shadow-md border border-gray-100">
          {/* Previous Button */}
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center"
          >
            <ChevronRight className="w-4 h-4 ml-1" />
            السابق
          </Button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1 space-x-reverse">
            {getPageNumbers().map((page) => (
              <div key={`page-${page}`}>
                {page === '...' ? (
                  <span className="px-3 py-2 text-muted-foreground">...</span>
                ) : (
                  <button
                    onClick={() => handlePageChange(page as number)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-accent to-primary text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center"
          >
            التالي
            <ChevronLeft className="w-4 h-4 mr-1" />
          </Button>
        </div>
      )}

      {/* Results Summary */}
      <div className="text-center mt-8 text-sm text-muted-foreground">
        عرض {startIndex + 1} - {Math.min(startIndex + ARTICLES_PER_PAGE, articles.length)} من {articles.length} مقال
      </div>
    </div>
  );
}

// CSS for fade-in animation
const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
