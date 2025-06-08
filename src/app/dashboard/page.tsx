"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Eye,
  ThumbsUp,
  Calendar,
  Users,
  TrendingUp,
  Plus,
  Settings,
  FileText,
  Upload,
  Shield,
  Activity,
} from "lucide-react";

interface DashboardStats {
  totalProjects: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    date: string;
  }>;
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
    recentActivity: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [adminInfo, setAdminInfo] = useState<any>(null);

  useEffect(() => {
    checkAuth();
    loadDashboardData();
  }, []);

  const checkAuth = async () => {
    try {
      console.log("🔍 فحص المصادقة...");

      const response = await fetch("/api/auth/verify", {
        credentials: "include",
      });

      console.log("📡 استجابة فحص المصادقة:", response.status);

      if (!response.ok) {
        console.log("❌ المصادقة فشلت، إعادة توجيه إلى تسجيل الدخول");
        window.location.href = "/login";
        return;
      }

      const data = await response.json();
      console.log("✅ تم التحقق من المصادقة بنجاح:", data.admin?.username);
      setAdminInfo(data.admin);
    } catch (error) {
      console.error("❌ خطأ في المصادقة:", error);
      window.location.href = "/login";
    }
  };

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      // جلب جميع المشاريع لحساب الإحصائيات الحقيقية
      const projectsResponse = await fetch("/api/projects?limit=1000");

      if (projectsResponse.ok) {
        const projectsData = await projectsResponse.json();
        const projects = projectsData.projects || [];

        // حساب الإحصائيات الحقيقية
        const totalViews = projects.reduce(
          (sum: number, project: any) => sum + (project.views || 0),
          0,
        );
        const totalLikes = projects.reduce(
          (sum: number, project: any) => sum + (project.likes || 0),
          0,
        );
        const totalComments = projects.reduce(
          (sum: number, project: any) => sum + (project._count?.comments || 0),
          0,
        );

        setStats({
          totalProjects: projects.length,
          totalViews,
          totalLikes,
          totalComments,
          recentActivity: projects
            .sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .slice(0, 5)
            .map((project: any) => ({
              id: project.id,
              type: "project",
              description: `مشروع "${project.title}" - ${project.category}`,
              date: new Date(project.createdAt).toLocaleDateString("ar-SA"),
            })),
        });
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل لوحة التحكم...</p>
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
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">
                  لوحة تحكم الإدارة
                </h1>
                <p className="text-sm text-gray-500">محترفين الديار العالمية</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                مرحباً،{" "}
                <span className="font-medium">{adminInfo?.username}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            الإجراءات السريعة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button
              onClick={() => router.push("/dashboard/projects/add")}
              className="flex items-center justify-center gap-2 h-20 bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-6 w-6" />
              <span>إضافة مشروع جديد</span>
            </Button>

            <Button
              onClick={() => router.push("/dashboard/projects")}
              variant="outline"
              className="flex items-center justify-center gap-2 h-20"
            >
              <FileText className="h-6 w-6" />
              <span>إدارة المشاريع</span>
            </Button>

            <Button
              onClick={() => router.push("/portfolio")}
              variant="outline"
              className="flex items-center justify-center gap-2 h-20"
            >
              <Eye className="h-6 w-6" />
              <span>معاينة الموقع</span>
            </Button>

            <Button
              onClick={() => router.push("/dashboard/settings")}
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
            الإحصائيا�� العامة
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
                  {stats.totalProjects}
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
                  {stats.totalViews.toLocaleString()}
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
                  {stats.totalLikes}
                </div>
                <p className="text-xs text-muted-foreground">
                  إعجاب من العملاء
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  إجمالي التعليقات
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {stats.totalComments}
                </div>
                <p className="text-xs text-muted-foreground">
                  تعليق من العملاء
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                النشاط الأخير
              </CardTitle>
              <CardDescription>آخر التحديثات على المشاريع</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentActivity.length > 0 ? (
                  stats.recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                      <Badge variant="secondary">{activity.type}</Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    لا توجد أنشطة حديثة
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                معلومات النظام
              </CardTitle>
              <CardDescription>حالة النظام ومعلومات الأمان</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">حالة قاعدة البيانات:</span>
                  <span className="text-sm font-medium text-green-600">
                    متصلة
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">آخر تسجيل دخول:</span>
                  <span className="text-sm font-medium">
                    {adminInfo?.lastLogin
                      ? new Date(adminInfo.lastLogin).toLocaleDateString(
                          "ar-SA",
                        )
                      : "غير محدد"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">مستوى الأمان:</span>
                  <span className="text-sm font-medium text-green-600">
                    عالي
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">إصدار النظام:</span>
                  <span className="text-sm font-medium">v2.0.0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
