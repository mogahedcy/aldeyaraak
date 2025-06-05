'use client';

import { useState } from 'react';
import { X, Filter, Star, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  dateRange: { from: string; to: string };
  onDateRangeChange: (range: { from: string; to: string }) => void;
  ratingFilter: number;
  onRatingFilterChange: (rating: number) => void;
  onResetFilters: () => void;
}

const priceRanges = [
  { label: 'أقل من 10,000 ريال', min: 0, max: 10000 },
  { label: '10,000 - 25,000 ريال', min: 10000, max: 25000 },
  { label: '25,000 - 50,000 ريال', min: 25000, max: 50000 },
  { label: '50,000 - 100,000 ريال', min: 50000, max: 100000 },
  { label: 'أكثر من 100,000 ريال', min: 100000, max: 1000000 },
];

const ratingOptions = [
  { stars: 5, label: '5 نجوم' },
  { stars: 4, label: '4 نجوم فأكثر' },
  { stars: 3, label: '3 نجوم فأكثر' },
  { stars: 2, label: '2 نجوم فأكثر' },
  { stars: 1, label: 'نجمة واحدة فأكثر' },
];

export default function AdvancedFilters({
  isOpen,
  onClose,
  priceRange,
  onPriceRangeChange,
  dateRange,
  onDateRangeChange,
  ratingFilter,
  onRatingFilterChange,
  onResetFilters,
}: AdvancedFiltersProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">الفلاتر المتقدمة</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Price Range Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                نطاق السعر
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {priceRanges.map((range, index) => (
                  <button
                    key={index}
                    onClick={() => onPriceRangeChange([range.min, range.max])}
                    className={`p-3 rounded-lg border text-right transition-all ${
                      priceRange[0] === range.min && priceRange[1] === range.max
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>

              {/* Custom Range */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">نطاق مخصص</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">من</label>
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">إلى</label>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="100000"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Date Range Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                فترة الإنجاز
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">من تاريخ</label>
                  <input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) => onDateRangeChange({ ...dateRange, from: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">إلى تاريخ</label>
                  <input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => onDateRangeChange({ ...dateRange, to: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                التقييم
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => onRatingFilterChange(0)}
                  className={`w-full p-3 rounded-lg border text-right transition-all ${
                    ratingFilter === 0
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  جميع التقييمات
                </button>
                {ratingOptions.map((option) => (
                  <button
                    key={option.stars}
                    onClick={() => onRatingFilterChange(option.stars)}
                    className={`w-full p-3 rounded-lg border text-right transition-all flex items-center justify-between ${
                      ratingFilter === option.stars
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span>{option.label}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < option.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters Summary */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                الفلاتر النشطة
              </h3>
              <div className="flex flex-wrap gap-2">
                {priceRange[0] > 0 || priceRange[1] < 100000 ? (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    السعر: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ريال
                    <button onClick={() => onPriceRangeChange([0, 100000])}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ) : null}

                {dateRange.from && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    من: {new Date(dateRange.from).toLocaleDateString('ar-SA')}
                    <button onClick={() => onDateRangeChange({ ...dateRange, from: '' })}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}

                {dateRange.to && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    إلى: {new Date(dateRange.to).toLocaleDateString('ar-SA')}
                    <button onClick={() => onDateRangeChange({ ...dateRange, to: '' })}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}

                {ratingFilter > 0 && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {ratingFilter} نجوم فأكثر
                    <button onClick={() => onRatingFilterChange(0)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex gap-2 justify-end">
          <Button variant="outline" onClick={onResetFilters}>
            إعادة تعيين
          </Button>
          <Button onClick={onClose}>
            تطبيق الفلاتر
          </Button>
        </div>
      </div>
    </div>
  );
}
