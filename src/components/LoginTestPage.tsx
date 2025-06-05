'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, LogOut, Settings, User, Clock, CheckCircle } from 'lucide-react';

export default function LoginTestPage() {
  const [sessionData, setSessionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = () => {
    setIsLoading(true);

    try {
      const adminSession = localStorage.getItem('adminSession');
      const oldLogin = localStorage.getItem('isAdminLoggedIn');
      const oldTime = localStorage.getItem('adminLoginTime');

      const sessionInfo = {
        newSession: adminSession ? JSON.parse(adminSession) : null,
        oldLogin,
        oldTime,
        currentTime: Date.now()
      };

      setSessionData(sessionInfo);
    } catch (error) {
      console.error('Error checking session:', error);
      setSessionData({ error: error.message });
    }

    setIsLoading(false);
  };

  const clearAllSessions = () => {
    localStorage.removeItem('adminSession');
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    checkSession();
  };

  const createTestSession = () => {
    const session = {
      username: 'admin',
      loginTime: Date.now(),
      expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 ساعة
    };
    localStorage.setItem('adminSession', JSON.stringify(session));
    checkSession();
  };

  const goToLogin = () => {
    window.location.href = '/login';
  };

  const goToAdmin = () => {
    window.location.href = '/portfolio/admin';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">اختبار نظام تسجيل الدخول</h1>
          </div>

          {/* Session Status */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              حالة تسجيل الدخول
            </h2>

            {sessionData?.newSession ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">مسجل دخول بنجاح</span>
                </div>
                <div className="space-y-2 text-sm text-green-700">
                  <p><strong>المستخدم:</strong> {sessionData.newSession.username}</p>
                  <p><strong>وقت التسجيل:</strong> {new Date(sessionData.newSession.loginTime).toLocaleString('ar-SA')}</p>
                  <p><strong>تنتهي في:</strong> {new Date(sessionData.newSession.expiresAt).toLocaleString('ar-SA')}</p>
                  <p><strong>متبقي:</strong> {Math.round((sessionData.newSession.expiresAt - Date.now()) / (1000 * 60 * 60))} ساعة</p>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-800">غير مسجل دخول</span>
                </div>
                <p className="text-sm text-red-700">لا توجد جلسة نشطة</p>
              </div>
            )}
          </div>

          {/* Legacy Session Check */}
          {(sessionData?.oldLogin || sessionData?.oldTime) && (
            <div className="mb-8">
              <h3 className="text-md font-semibold mb-3 text-orange-800">بيانات قديمة موجودة:</h3>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="space-y-2 text-sm text-orange-700">
                  {sessionData.oldLogin && <p><strong>isAdminLoggedIn:</strong> {sessionData.oldLogin}</p>}
                  {sessionData.oldTime && <p><strong>adminLoginTime:</strong> {new Date(sessionData.oldTime).toLocaleString('ar-SA')}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Debug Info */}
          <div className="mb-8">
            <h3 className="text-md font-semibold mb-3">معلومات تقنية:</h3>
            <div className="bg-gray-50 border rounded-lg p-4">
              <pre className="text-xs text-gray-600 overflow-auto">
                {JSON.stringify(sessionData, null, 2)}
              </pre>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold">الإجراءات:</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-700">التنقل:</h4>
                <Button onClick={goToLogin} className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  الذهاب لصفحة تسجيل الدخول
                </Button>
                <Button onClick={goToAdmin} variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  الذهاب للوحة الإدارة
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-700">الاختبار:</h4>
                <Button onClick={createTestSession} variant="secondary" className="w-full">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  إنشاء جلسة تجريبية
                </Button>
                <Button onClick={clearAllSessions} variant="destructive" className="w-full">
                  <LogOut className="w-4 h-4 mr-2" />
                  مسح جميع الجلسات
                </Button>
              </div>
            </div>

            <Button onClick={checkSession} variant="outline" className="w-full">
              تحديث البيانات
            </Button>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">كيفية الاستخدام:</h4>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>انقر "الذهاب لصفحة تسجيل الدخول"</li>
              <li>استخدم: <strong>admin</strong> / <strong>aldeyar2024</strong></li>
              <li>سيتم توجيهك للوحة الإدارة تلقائياً</li>
              <li>إذا لم يعمل، انقر "مسح جميع الجلسات" وأعد المحاولة</li>
            </ol>
          </div>

          {/* Credentials */}
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">بيانات تسجيل الدخول:</h4>
            <div className="text-sm text-green-800 space-y-1">
              <p><strong>اسم المستخدم:</strong> admin</p>
              <p><strong>كلمة المرور:</strong> aldeyar2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
