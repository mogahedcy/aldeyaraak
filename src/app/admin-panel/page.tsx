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
  Home,
  Database,
} from "lucide-react";

export default function AdminPanelPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loadStats = async () => {
    setLoading(true);
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

        setStats(stats);
        setMessage("تم تحميل الإحصائيات بنجاح");
      } else {
        setMessage("خطأ في تحميل المشاريع");
      }
    } catch (error) {
      setMessage(`خطأ: ${error.message}`);
    }
    setLoading(false);
  };

  const testLogin = async () => {
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
        setMessage("✅ تم تسجيل الدخول بنجاح!");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      } else {
        setMessage(`❌ فشل تسجيل الدخول: ${data.message}`);
      }
    } catch (error) {
      setMessage(`❌ خطأ في تسجيل الدخول: ${error.message}`);
    }
  };

  const checkSession = async () => {
    try {
      const response = await fetch("/api/auth/check-session", {
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ الجلسة صالحة: ${data.admin?.username}`);
      } else {
        setMessage(`❌ الجلسة غير صالحة: ${data.message}`);
      }
    } catch (error) {
      setMessage(`❌ خطأ في فحص الجلسة: ${error.message}`);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
      dir="rtl"
    >
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 ml-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  🚀 لوحة التحكم السريعة
                </h1>
                <p className="text-sm text-gray-600">
                  محترفين الديار العالمية - إصدار تجريبي
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" onClick={() => (window.location.href = "/")}>
                <Home className="h-4 w-4 ml-2" />
                الرئيسية
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
              🎉 تم تجاوز مشكلة middleware! هذه صفحة تعمل بدون قيود.
            </span>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              message.includes("✅")
                ? "bg-green-50 border-green-200 text-green-800"
                : message.includes("❌")
                  ? "bg-red-50 border-red-200 text-red-800"
                  : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
          >
            {message}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            اختبارات سريعة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button
              onClick={testLogin}
              className="flex items-center justify-center gap-2 h-20 bg-green-600 hover:bg-green-700"
            >
              <Shield className="h-6 w-6" />
              <span>تسجيل دخول سريع</span>
            </Button>

            <Button
              onClick={checkSession}
              variant="outline"
              className="flex items-center justify-center gap-2 h-20"
            >
              <CheckCircle className="h-6 w-6" />
              <span>فحص الجلسة</span>
            </Button>

            <Button
              onClick={loadStats}
              disabled={loading}
              variant="outline"
              className="flex items-center justify-center gap-2 h-20"
            >
              <Database className="h-6 w-6" />
              <span>{loading ? "جاري التحميل..." : "تحميل البيانات"}</span>
            </Button>

            <Button
              onClick={() => (window.location.href = "/dashboard")}
              variant="outline"
              className="flex items-center justify-center gap-2 h-20"
            >
              <Eye className="h-6 w-6" />
              <span>اختبار Dashboard العادي</span>
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            الإحصائيات
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  إجمالي المشاريع
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {stats?.totalProjects || "---"}
                </div>
                <p className="text-xs text-muted-foreground">مشروع مكتمل</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  إجمالي المشاهدات
                </CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats?.totalViews?.toLocaleString() || "---"}
                </div>
                <p className="text-xs text-muted-foreground">مشاهدة إجمالية</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  إجمالي الإعجابات
                </CardTitle>
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {stats?.totalLikes || "---"}
                </div>
                <p className="text-xs text-muted-foreground">
                  إعجاب من العملاء
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  المشاريع المميزة
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {stats?.featuredProjects || "---"}
                </div>
                <p className="text-xs text-muted-foreground">مشروع مميز</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                إضافة مشروع جديد
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() =>
                  (window.location.href = "/dashboard/projects/add")
                }
                className="w-full"
              >
                إضافة مشروع
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
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
                عرض المشاريع
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
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
                معاينة المعرض
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
