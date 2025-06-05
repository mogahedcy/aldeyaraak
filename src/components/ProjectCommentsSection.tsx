'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  MessageCircle,
  Star,
  User,
  Calendar,
  Send,
  CheckCircle,
  AlertCircle,
  ThumbsUp,
  Flag,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Comment {
  id: string;
  name: string;
  message: string;
  rating: number;
  createdAt: string;
  avatar?: string;
}

interface ProjectCommentsSectionProps {
  projectId: string;
  projectTitle: string;
  initialComments?: Comment[];
}

export default function ProjectCommentsSection({ 
  projectId, 
  projectTitle,
  initialComments = []
}: ProjectCommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating'>('newest');
  const [filterByRating, setFilterByRating] = useState<number | null>(null);

  // جلب التعليقات عند تحميل المكون
  useEffect(() => {
    fetchComments();
  }, [projectId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/projects/${projectId}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error('خطأ في جلب التعليقات:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.name.trim() || !newComment.message.trim()) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects/${projectId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newComment.name,
          email: newComment.email,
          message: newComment.message,
          rating: newComment.rating
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // إضافة التعليق الجديد للقائمة
        const commentWithAvatar = {
          ...data.comment,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newComment.name)}&background=059669&color=fff`
        };

        setComments(prev => [commentWithAvatar, ...prev]);

        // إعادة تعيين النموذج
        setNewComment({
          name: '',
          email: '',
          message: '',
          rating: 5
        });

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'حدث خطأ أثناء إضافة التعليق');
      }
    } catch (error) {
      console.error('خطأ في إرسال التعليق:', error);
      setError('حدث خطأ في الاتصال. يرجى المحاولة لاحقاً');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingChange = (rating: number) => {
    setNewComment(prev => ({ ...prev, rating }));
  };

  const calculateAverageRating = () => {
    if (comments.length === 0) return 0;
    const sum = comments.reduce((acc, comment) => acc + comment.rating, 0);
    return (sum / comments.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    comments.forEach(comment => {
      distribution[comment.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const handleLikeComment = async (commentId: string) => {
    try {
      // هنا يمكن إضافة API للإعجاب بالتعليق
      console.log('إعجاب بالتعليق:', commentId);
    } catch (error) {
      console.error('خطأ في الإعجاب بالتعليق:', error);
    }
  };

  const handleReportComment = async (commentId: string) => {
    try {
      // هنا يمكن إضافة API للإبلاغ عن التعليق
      console.log('إبلاغ عن التعليق:', commentId);
      setError('تم إرسال البلاغ بنجاح');
      setTimeout(() => setError(null), 3000);
    } catch (error) {
      console.error('خطأ في الإبلاغ عن التعليق:', error);
    }
  };

  const handleSortComments = (sortBy: 'newest' | 'oldest' | 'rating') => {
    let sortedComments = [...comments];
    switch (sortBy) {
      case 'newest':
        sortedComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        sortedComments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'rating':
        sortedComments.sort((a, b) => b.rating - a.rating);
        break;
    }
    setComments(sortedComments);
  };

  const renderStars = (rating: number, interactive = false, size = 'w-5 h-5') => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && handleRatingChange(star)}
            className={`${size} ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-all duration-200`}
          >
            <Star
              className={`w-full h-full ${
                star <= rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const distribution = getRatingDistribution();
  const averageRating = calculateAverageRating();

  return (
    <section className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      {/* عنوان القسم */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <MessageCircle className="w-7 h-7 text-blue-600 ml-3" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              التقييمات والتعليقات
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              شاركنا رأيك في هذا المشروع
            </p>
          </div>
        </div>
      </div>

      {/* إحصائيات التقييم */}
      {comments.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100">
          <div className="grid md:grid-cols-2 gap-6">
            {/* التقييم العام */}
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {averageRating}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(parseFloat(averageRating)))}
              </div>
              <p className="text-gray-600">
                من أصل {comments.length} تقييم
              </p>
            </div>

            {/* توزيع التقييمات */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium w-3">{rating}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: comments.length > 0 
                          ? `${(distribution[rating as keyof typeof distribution] / comments.length) * 100}%`
                          : '0%'
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {distribution[rating as keyof typeof distribution]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* رسائل النجاح والخطأ */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center"
          >
            <CheckCircle className="w-5 h-5 text-green-600 ml-3" />
            <span className="text-green-800">تم إضافة تعليقك بنجاح!</span>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center"
          >
            <AlertCircle className="w-5 h-5 text-red-600 ml-3" />
            <span className="text-red-800">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* نموذج إضافة تعليق */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          أضف تقييمك وتعليقك
        </h3>

        <form onSubmit={handleSubmitComment} className="space-y-6">
          {/* التقييم */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              تقييمك للمشروع *
            </label>
            <div className="flex items-center gap-3">
              {renderStars(newComment.rating, true, 'w-8 h-8')}
              <span className="text-lg font-medium text-gray-700">
                ({newComment.rating} من 5)
              </span>
            </div>
          </div>

          {/* معلومات المستخدم */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الاسم الكريم *
              </label>
              <Input
                type="text"
                required
                value={newComment.name}
                onChange={(e) => setNewComment(prev => ({ ...prev, name: e.target.value }))}
                placeholder="اكتب اسمك"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني (اختياري)
              </label>
              <Input
                type="email"
                value={newComment.email}
                onChange={(e) => setNewComment(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* التعليق */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تعليقك *
            </label>
            <Textarea
              rows={4}
              required
              value={newComment.message}
              onChange={(e) => setNewComment(prev => ({ ...prev, message: e.target.value }))}
              placeholder="شاركنا رأيك في هذا المشروع..."
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {isSubmitting ? 'جاري الإرسال...' : 'إرسال التعليق'}
            </Button>

            <div className="flex items-center text-sm text-gray-500">
              <AlertCircle className="w-4 h-4 ml-2" />
              سيتم مراجعة التعليق قبل النشر
            </div>
          </div>
        </form>
      </div>

      {/* قائمة التعليقات */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            التعليقات ({comments.length})
          </h3>

          {/* أدوات التصفية والترتيب */}
          {comments.length > 0 && (
            <div className="flex items-center gap-4">
              {/* ترتيب التعليقات */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">ترتيب:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    const newSortBy = e.target.value as 'newest' | 'oldest' | 'rating';
                    setSortBy(newSortBy);
                    handleSortComments(newSortBy);
                  }}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="newest">الأحدث</option>
                  <option value="oldest">الأقدم</option>
                  <option value="rating">التقييم</option>
                </select>
              </div>

              {/* تصفية حسب التقييم */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">تصفية:</span>
                <select
                  value={filterByRating || ''}
                  onChange={(e) => setFilterByRating(e.target.value ? parseInt(e.target.value) : null)}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="">جميع التقييمات</option>
                  <option value="5">5 نجوم</option>
                  <option value="4">4 نجوم</option>
                  <option value="3">3 نجوم</option>
                  <option value="2">2 نجمة</option>
                  <option value="1">نجمة واحدة</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">جاري تحميل التعليقات...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-600 mb-2">
              لا توجد تعليقات بعد
            </h4>
            <p className="text-gray-500">
              كن أول من يقيم هذا المشروع ويترك تعليقاً
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {comments
              .filter(comment => filterByRating ? comment.rating === filterByRating : true)
              .map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* رأس التعليق */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden ml-4">
                      <img
                        src={comment.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.name)}&background=059669&color=fff`}
                        alt={comment.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {comment.name}
                      </h4>
                      <div className="flex items-center gap-3 mt-1">
                        {renderStars(comment.rating, false, 'w-4 h-4')}
                        <span className="text-sm text-gray-500 flex items-center">
                          <Calendar className="w-3 h-3 ml-1" />
                          {new Date(comment.createdAt).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleReportComment(comment.id)}
                      >
                        <Flag className="w-4 h-4 ml-2" />
                        الإبلاغ عن التعليق
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <MessageCircle className="w-4 h-4 ml-2" />
                        الرد على التعليق
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* محتوى التعليق */}
                <p className="text-gray-700 leading-relaxed">
                  {comment.message}
                </p>

                {/* أزرار التفاعل */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    <ThumbsUp className="w-4 h-4 ml-1" />
                    مفيد
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-500 hover:text-green-600 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 ml-1" />
                    رد
                  </Button>

                  <div className="flex items-center text-sm text-gray-500">
                    <span>تقييم مفيد؟</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}