'use client';

import { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck, Trash2, Search, Clock, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SavedSearch {
  id: string;
  query: string;
  filters: {
    category?: string;
    author?: string;
    date?: string;
    readTime?: string;
    tags?: string[];
    sort?: string;
  };
  timestamp: number;
  resultsCount?: number;
}

interface SavedSearchesProps {
  currentQuery?: string;
  currentFilters?: Record<string, unknown>;
  onLoadSearch?: (search: SavedSearch) => void;
  className?: string;
}

export default function SavedSearches({
  currentQuery = '',
  currentFilters = {},
  onLoadSearch,
  className = ''
}: SavedSearchesProps) {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showSavedSearches, setShowSavedSearches] = useState(false);

  // Load saved searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedSearches');
    const history = localStorage.getItem('searchHistory');

    if (saved) {
      try {
        setSavedSearches(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved searches:', error);
      }
    }

    if (history) {
      try {
        setSearchHistory(JSON.parse(history));
      } catch (error) {
        console.error('Error loading search history:', error);
      }
    }
  }, []);

  // Save current search
  const saveCurrentSearch = () => {
    if (!currentQuery.trim()) return;

    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      query: currentQuery,
      filters: currentFilters,
      timestamp: Date.now()
    };

    // Check if this search already exists
    const existingIndex = savedSearches.findIndex(
      search => search.query === currentQuery &&
      JSON.stringify(search.filters) === JSON.stringify(currentFilters)
    );

    let updatedSearches: SavedSearch[];
    if (existingIndex >= 0) {
      // Update timestamp if search exists
      updatedSearches = [...savedSearches];
      updatedSearches[existingIndex].timestamp = Date.now();
    } else {
      // Add new search (keep only last 10)
      updatedSearches = [newSearch, ...savedSearches.slice(0, 9)];
    }

    setSavedSearches(updatedSearches);
    localStorage.setItem('savedSearches', JSON.stringify(updatedSearches));
  };

  // Delete a saved search
  const deleteSavedSearch = (id: string) => {
    const updatedSearches = savedSearches.filter(search => search.id !== id);
    setSavedSearches(updatedSearches);
    localStorage.setItem('savedSearches', JSON.stringify(updatedSearches));
  };

  // Clear all saved searches
  const clearAllSearches = () => {
    setSavedSearches([]);
    localStorage.removeItem('savedSearches');
  };

  // Clear search history
  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  // Load a saved search
  const loadSearch = (search: SavedSearch) => {
    if (onLoadSearch) {
      onLoadSearch(search);
    }
  };

  // Format filter description
  const formatFilters = (filters: SavedSearch['filters']) => {
    const parts = [];
    if (filters.category && filters.category !== 'الكل') parts.push(filters.category);
    if (filters.author && filters.author !== 'الكل') parts.push(filters.author);
    if (filters.date) parts.push(getDateLabel(filters.date));
    if (filters.readTime) parts.push(getReadTimeLabel(filters.readTime));
    if (filters.tags && filters.tags.length > 0) parts.push(`${filters.tags.length} كلمة مفتاحية`);

    return parts.length > 0 ? parts.join(' • ') : 'بلا فلاتر';
  };

  const getDateLabel = (value: string) => {
    const labels: { [key: string]: string } = {
      'today': 'اليوم',
      'week': 'هذا الأسبوع',
      'month': 'هذا الشهر',
      '3months': 'آخر 3 شهور',
      'year': 'هذا العام'
    };
    return labels[value] || value;
  };

  const getReadTimeLabel = (value: string) => {
    const labels: { [key: string]: string } = {
      'short': 'أقل من 3 دقائق',
      'medium': '3-6 دقائق',
      'long': 'أكثر من 6 دقائق'
    };
    return labels[value] || value;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) return 'منذ قليل';
    if (diffInHours < 24) return `منذ ${Math.floor(diffInHours)} ساعة`;
    if (diffInHours < 48) return 'أمس';

    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const currentSearchExists = savedSearches.some(
    search => search.query === currentQuery &&
    JSON.stringify(search.filters) === JSON.stringify(currentFilters)
  );

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Save Current Search Button */}
      {currentQuery && (
        <div className="flex items-center justify-between bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/20 rounded-lg p-4">
          <div className="flex items-center">
            <Search className="w-5 h-5 text-accent ml-2" />
            <div>
              <p className="font-medium text-gray-800">البحث الحالي</p>
              <p className="text-sm text-muted-foreground">"{currentQuery}"</p>
            </div>
          </div>
          <Button
            onClick={saveCurrentSearch}
            variant={currentSearchExists ? "outline" : "default"}
            size="sm"
            className="flex items-center"
          >
            {currentSearchExists ? (
              <>
                <BookmarkCheck className="w-4 h-4 ml-1" />
                محفوظ
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 ml-1" />
                حفظ البحث
              </>
            )}
          </Button>
        </div>
      )}

      {/* Saved Searches */}
      {savedSearches.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center">
              <Bookmark className="w-5 h-5 text-accent ml-2" />
              البحثات المحفوظة ({savedSearches.length})
            </h3>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSavedSearches(!showSavedSearches)}
              >
                {showSavedSearches ? 'إخفاء' : 'عرض'}
              </Button>
              {savedSearches.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllSearches}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {showSavedSearches && (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {savedSearches.map((search) => (
                <div
                  key={search.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1 cursor-pointer" onClick={() => loadSearch(search)}>
                    <div className="flex items-center mb-1">
                      <h4 className="font-medium text-gray-800 text-sm">"{search.query}"</h4>
                      <Badge variant="secondary" className="mr-2 text-xs">
                        <Star className="w-3 h-3 ml-1" />
                        محفوظ
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {formatFilters(search.filters)}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Clock className="w-3 h-3 ml-1" />
                      {formatDate(search.timestamp)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => loadSearch(search)}
                      className="text-accent hover:bg-accent/10"
                    >
                      تطبيق
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteSavedSearch(search.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Recent Search History */}
      {searchHistory.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center">
              <Clock className="w-5 h-5 text-muted-foreground ml-2" />
              تاريخ البحث الأخير
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearchHistory}
              className="text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchHistory.slice(0, 5).map((query, index) => (
              <button
                key={`history-${index}-${query.slice(0,10)}`}
                onClick={() => onLoadSearch?.({
                  id: `history-${index}`,
                  query,
                  filters: {},
                  timestamp: Date.now()
                })}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No saved searches message */}
      {savedSearches.length === 0 && searchHistory.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">لا توجد بحثات محفوظة</h3>
          <p className="text-sm text-muted-foreground mb-4">
            احفظ عمليات البحث المفيدة للوصول إليها بسرعة لاحقاً
          </p>
          {currentQuery && (
            <Button onClick={saveCurrentSearch} size="sm">
              <Bookmark className="w-4 h-4 ml-1" />
              احفظ البحث الحالي
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
