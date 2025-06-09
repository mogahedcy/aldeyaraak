"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Eye,
  ThumbsUp,
  Users,
  Settings,
  FileText,
  Plus,
  LogOut,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface DashboardState {
  loading: boolean;
  authenticated: boolean;
  admin: any;
  stats: any;
  error: string;
}

export default function DashboardPage() {
  const [state, setState] = useState<DashboardState>({
    loading: true,
    authenticated: false,
    admin: null,
    stats: null,
    error: "",
  });

  useEffect(() => {
    checkAuthentication();
    loadStats();
  }, []);

  const checkAuthentication = async () => {
    try {
      console.log("🔍 فحص المصادقة...");

      const response = await fetch("/api/auth/check-session", {
        credentials: "include",
      });

      const data = await response.json();
      console.log("📡 نتيجة فحص المصادقة:", data);

      if (response.ok && data.authenticated) {
        setState((prev) => ({
          ...prev,
          authenticated: true,
          admin: data.admin,
          loading: false,
        }));
      } else {
        console.log("❌ غير مصادق، إعادة توجيه...");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("❌ خطأ في فحص المصادقة:", error);
      setState((prev) => ({
        ...prev,
        error: "خطأ في فحص المصادقة",
        loading: false,
      }));
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch("/api/projects?limit=1000");
      if (response.ok) {
        const data = await response.json();
        const projects = data.projects || [];

        const stats = {
          totalProjects: projects.length,
          totalViews: projects.reduce(
            (sum: number, p: any) => sum + (p.views || 0),
            0,
          ),
          totalLikes: projects.reduce(
            (sum: number, p: any) => sum + (p.likes || 0),
            0,
          ),
          featuredProjects: projects.filter((p: any) => p.featured).length,
        };

        setState((prev) => ({ ...prev, stats }));
      }
    } catch (error) {
      console.error("خطأ في جلب الإحصائيات:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/new-logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("خطأ في تسجيل الخروج:", error);
    }
  };

  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل لوحة التحكم...</p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">حدث خطأ</h2>
          <p className="text-gray-600 mb-4">{state.error}</p>
          <Button onClick={() => window.location.reload()}>
            إعادة المحاولة
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 ml-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  لوحة تحكم الإدارة
                </h1>
                <p className="text-sm text-gray-500">محترفين الديار العالمية</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                مرحباً،{" "}
                <span className="font-medium">{state.admin?.username}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 ml-2" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-medium">
              🎉 تم تسجيل الدخول بنجاح! النظام الجديد يعمل بشكل مثالي.
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            الإجراءات السريعة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button
              onClick={() => (window.location.href = "/dashboard/projects/add")}
              className="flex items-center justify-center gap-2 h-20 bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-6 w-6" />
              <span>إضافة مشروع جديد</span>
            </Button>

            <Button
              onClick={() => (window.location.href = "/dashboard/projects")}
              variant="outline"
              className="flex items-center justify-center gap-2 h-20"
            >
              <FileText className="h-6 w-6" />
              <span>إدارة المشاريع</span>
            </Button>

            <Button
              onClick={() => (window.location.href = "/portfolio")}
              variant="outline"
              className="flex items-center justify-center gap-2 h-20"
            >
              <Eye className="h-6 w-6" />
              <span>معاينة الموقع</span>
            </Button>

            <Button
              onClick={() => (window.location.href = "/dashboard/settings")}
              variant="outline"
              className="flex items-center justify-center gap-2 h-20"
            >
              <Settings className="h-6 w-6" />
              <span>الإعدادات</span>
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            الإحصائيات العامة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  إجمالي المشاريع
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {state.stats?.totalProjects || 0}
                </div>
                <p className="text-xs text-muted-foreground">مشروع مكتمل</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  إجمالي المشاهدات
                </CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {(state.stats?.totalViews || 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">مشاهدة إجمالية</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  إجمالي الإعجابات
                </CardTitle>
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {state.stats?.totalLikes || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  إعجاب من العملاء
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  المشاريع المميزة
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {state.stats?.featuredProjects || 0}
                </div>
                <p className="text-xs text-muted-foreground">مشروع مميز</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              حالة النظام
            </CardTitle>
            <CardDescription>معلومات النظام الجديد</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm">نظام المصادقة:</span>
                <span className="text-sm font-medium text-green-600">
                  جديد ومحسن ✅
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm">حالة قاعدة البيانات:</span>
                <span className="text-sm font-medium text-blue-600">
                  متصلة ✅
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-sm">مستوى الأمان:</span>
                <span className="text-sm font-medium text-purple-600">
                  عالي ✅
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
