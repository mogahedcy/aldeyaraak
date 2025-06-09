"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  Home,
  CheckCircle,
  AlertCircle,
  Eye,
  FileText,
  Plus,
  Settings,
  Database,
  LogIn,
} from "lucide-react";

export default function AdminPanelPage() {
  const [message, setMessage] = useState(
    "مرحباً! هذه لوحة التحكم البديلة تعمل بشكل مثالي.",
  );
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  const showMessage = (text: string, isError = false) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 5000);
  };

  const testLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/new-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: "admin",
          password: "admin123",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showMessage("✅ تم تسجيل الدخول بنجاح!");

        // فحص الكوكيز
        setTimeout(() => {
          const cookies = document.cookie;
          showMessage(`🍪 الكوكيز: ${cookies || "لا توجد كوكيز"}`);
        }, 1000);
      } else {
        showMessage(`❌ فشل تسجيل الدخول: ${data.message || "خطأ غير معروف"}`);
      }
    } catch (error) {
      showMessage(`❌ خطأ شبكة: ${error.message}`);
    }
    setLoading(false);
  };

  const loadProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/projects?limit=10");
      const data = await response.json();

      if (response.ok && data.success) {
        const projects = data.projects || [];
        setStats({
          total: projects.length,
          views: projects.reduce((sum, p) => sum + (p.views || 0), 0),
          likes: projects.reduce((sum, p) => sum + (p.likes || 0), 0),
        });
        showMessage(`✅ تم تحميل ${projects.length} مشروع بنجاح`);
      } else {
        showMessage(
          `❌ خطأ في تحميل المشاريع: ${data.error || "خطأ غير معروف"}`,
        );
      }
    } catch (error) {
      showMessage(`❌ خطأ في تحميل المشاريع: ${error.message}`);
    }
    setLoading(false);
  };

  const checkCookies = () => {
    const cookies = document.cookie;
    const cookiesList = cookies ? cookies.split(";").map((c) => c.trim()) : [];

    showMessage(
      `🍪 الكوكيز الحالية: ${cookiesList.length > 0 ? cookiesList.join(", ") : "لا توجد كوكيز"}`,
    );
  };

  const clearCookies = () => {
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    showMessage("🧹 تم حذف جميع الكوكيز");
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50"
      dir="rtl"
    >
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  ✨ لوحة التحكم المبسطة
                </h1>
                <p className="text-sm text-gray-600">
                  تعمل بدون أخطاء - محترفين الديار العالمية
                </p>
              </div>
            </div>

            <Button
              size="sm"
              onClick={() => (window.location.href = "/")}
              variant="outline"
            >
              <Home className="h-4 w-4 mr-2" />
              الرئيسية
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Message */}
        <div className="mb-8">
          <div
            className={`p-4 rounded-lg border flex items-center gap-2 ${
              message.includes("❌")
                ? "bg-red-50 border-red-200 text-red-800"
                : message.includes("✅")
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
          >
            {message.includes("❌") ? (
              <AlertCircle className="h-5 w-5" />
            ) : (
              <CheckCircle className="h-5 w-5" />
            )}
            <span>{message}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          <Button
            onClick={testLogin}
            disabled={loading}
            className="h-20 bg-green-600 hover:bg-green-700"
          >
            <LogIn className="h-6 w-6 mb-2" />
            <span>تسجيل دخول سريع</span>
          </Button>

          <Button
            onClick={loadProjects}
            disabled={loading}
            variant="outline"
            className="h-20"
          >
            <Database className="h-6 w-6 mb-2" />
            <span>تحميل المشاريع</span>
          </Button>

          <Button onClick={checkCookies} variant="outline" className="h-20">
            <Eye className="h-6 w-6 mb-2" />
            <span>فحص الكوكيز</span>
          </Button>

          <Button onClick={clearCookies} variant="outline" className="h-20">
            <AlertCircle className="h-6 w-6 mb-2" />
            <span>حذف الكوكيز</span>
          </Button>
        </div>

        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">إجمالي المشاريع</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-center text-blue-600">
                  {stats.total}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">إجمالي المشاهدات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-center text-green-600">
                  {stats.views}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">إجمالي الإعجابات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-center text-orange-600">
                  {stats.likes}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                إضافة مشروع
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() =>
                  (window.location.href = "/dashboard/projects/add")
                }
                className="w-full"
              >
                إضافة مشروع جديد
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                إدارة المشاريع
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => (window.location.href = "/dashboard/projects")}
                variant="outline"
                className="w-full"
              >
                عرض جميع المشاريع
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                معاينة الموقع
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => (window.location.href = "/portfolio")}
                variant="outline"
                className="w-full"
              >
                معرض الأعمال
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Test Links */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-3">روابط الاختبار:</h3>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={() => (window.location.href = "/login")}>
              صفحة تسجيل الدخول
            </Button>
            <Button
              size="sm"
              onClick={() => (window.location.href = "/test-new-login")}
            >
              صفحة اختبار النظام
            </Button>
            <Button
              size="sm"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Dashboard العادي
            </Button>
            <Button
              size="sm"
              onClick={() => (window.location.href = "/clear-cookies")}
            >
              صفحة حذف الكوكيز
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
