"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  Image,
  Video,
  ArrowLeft,
  Calendar,
  MapPin,
  DollarSign,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

// Interface متطابق مع البيانات من API
interface MediaItem {
  id: string;
  type: "IMAGE" | "VIDEO";
  src: string;
  title?: string;
  description?: string;
  order: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  completionDate: string;
  client?: string;
  featured: boolean;
  projectDuration?: string;
  projectCost?: string;
  views: number;
  likes: number;
  rating: number;
  createdAt: string;
  mediaItems: MediaItem[];
  tags: { id: string; name: string }[];
  materials: { id: string; name: string }[];
  _count: {
    comments: number;
    likes: number;
  };
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // فئات المشاريع - متطابقة مع النظام الجديد
  const categories = [
    { id: "الكل", name: "جميع الفئات" },
    { id: "مظلات", name: "مظلات" },
    { id: "برجولات", name: "برجولات" },
    { id: "سواتر", name: "سواتر" },
    { id: "ساندوتش بانل", name: "ساندوتش بانل" },
    { id: "تنسيق حدائق", name: "تنسيق حدائق" },
    { id: "خيام ملكية", name: "خيام ملكية" },
    { id: "بيوت شعر", name: "بيوت شعر" },
    { id: "ترميم", name: "ترميم" },
  ];

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, selectedCategory]);

  const checkAuthentication = async () => {
    try {
      const response = await fetch("/api/auth/verify");
      if (response.ok) {
        setIsAuthenticated(true);
        await loadProjects();
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const loadProjects = async () => {
    try {
      setError("");
      const response = await fetch("/api/projects");
      const data = await response.json();

      if (data.projects) {
        setProjects(data.projects);
      } else if (Array.isArray(data)) {
        setProjects(data);
      } else {
        setError("تنسيق البيانات غير صحيح");
      }
    } catch (error) {
      console.error("Error loading projects:", error);
      setError("فشل في تحميل المشاريع");
    }
  };

  const filterProjects = () => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.tags?.some((tag) =>
            tag.name.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (project) => project.category === selectedCategory,
      );
    }

    setFilteredProjects(filtered);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (
      !confirm(
        "هل أنت متأكد من حذف هذا المشروع؟ سيتم حذف جميع البيانات المرتبطة به نهائياً.",
      )
    )
      return;

    try {
      console.log("🗑️ بدء حذف المشروع:", projectId);

      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseText = await response.text();
      console.log("📡 استجابة حذف المشروع:", response.status, responseText);

      if (response.ok) {
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.warn("تحذير: لا يمكن تحليل استجابة JSON، لكن العملية نجحت");
          data = { success: true };
        }

        if (data.success) {
          console.log("✅ تم حذف المشروع من قاعدة البيانات");
          setProjects((prev) => prev.filter((p) => p.id !== projectId));
          alert("تم حذف المشروع بنجاح");

          // إعادة تحميل المشاريع للتأكد من التطابق مع قاعدة البيانات
          await loadProjects();
        } else {
          throw new Error(data.error || "فشل في حذف المشروع");
        }
      } else {
        let errorMessage = "فشل في حذف المشروع";
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || errorData.details || errorMessage;
        } catch (parseError) {
          console.error("خطأ في تحليل استجابة الخطأ:", parseError);
          errorMessage = `خطأ في السيرفر (${response.status})`;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("❌ خطأ في حذف المشروع:", error);
      alert(
        `حدث خطأ في حذف المشروع: ${error instanceof Error ? error.message : "خطأ غير معروف"}`,
      );
    }
  };

  const getCategoryName = (categoryId: string) => {
    const categoryMap: { [key: string]: string } = {
      مظلات: "مظلات",
      برجولات: "برجولات",
      سواتر: "سواتر",
      "ساندوتش بانل": "ساندوتش بانل",
      "تنسيق حدائق": "تنسيق حدائق",
      "خيام ملكية": "خيام ملكية",
      "بيوت شعر": "بيوت شعر",
      ترميم: "ترميم",
      // إضافة أسماء بديلة للتوافق مع الأنظمة القديمة
      mazallat: "مظلات",
      sawater: "سواتر",
      "sandwich-panel": "ساندوتش بانل",
      landscaping: "تنسيق حدائق",
      khayyam: "خيام ملكية",
      "byoot-shaar": "بيوت شعر",
      renovation: "ترميم",
      pergolas: "برجولات",
      المظلات: "مظلات",
      السواتر: "سواتر",
      "الساندوتش بانل": "ساندوتش بانل",
      "تنسيق الحدائق": "تنسيق حدائق",
      الخيام: "خيام ملكية",
      الترميم: "ترميم",
      البرجولات: "برجولات",
    };

    return categoryMap[categoryId] || categoryId;
  };

  const ProjectCard = ({ project }: { project: Project }) => {
    const mainImage = project.mediaItems?.find((item) => item.type === "IMAGE");
    const mainVideo = project.mediaItems?.find((item) => item.type === "VIDEO");
    const mainMedia = mainImage || mainVideo; // أول وسيط متاح (صورة أو فيديو)
    const totalMedia = project.mediaItems?.length || 0;
    const imageCount =
      project.mediaItems?.filter((item) => item.type === "IMAGE").length || 0;
    const videoCount =
      project.mediaItems?.filter((item) => item.type === "VIDEO").length || 0;

    // إضافة تشخيص للصور والفيديوهات
    console.log("Project:", project.title);
    console.log("Media Items:", project.mediaItems);
    console.log("Main Image:", mainImage);
    console.log("Main Video:", mainVideo);
    console.log("Main Media:", mainMedia);

    return (
      <Card className="group hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-lg mb-2 group-hover:text-green-600 transition-colors">
                {project.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            </div>
            {project.featured && (
              <Badge className="bg-yellow-500 text-white">
                <Star className="h-3 w-3 mr-1" />
                مميز
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* معاينة الوسائط (صورة أو فيديو) */}
          {mainMedia ? (
            <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
              {mainMedia.type === "IMAGE" ? (
                <img
                  src={mainMedia.src}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error("خطأ في تحميل الصورة:", mainMedia.src);
                    (e.target as HTMLImageElement).src =
                      "/placeholder-image.jpg";
                  }}
                  onLoad={() =>
                    console.log("تم تحميل الصورة بنجاح:", mainMedia.src)
                  }
                />
              ) : (
                // عرض الفيديو
                <div className="relative w-full h-full">
                  <video
                    src={mainMedia.src}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                    onMouseLeave={(e) => {
                      const video = e.target as HTMLVideoElement;
                      video.pause();
                      video.currentTime = 0;
                    }}
                    onError={(e) => {
                      console.error("خطأ في تحميل الفيديو:", mainMedia.src);
                    }}
                    onLoadedData={() =>
                      console.log("تم تحميل الفيديو بنجاح:", mainMedia.src)
                    }
                  />
                  {/* طبقة علوية مع أيقونة الفيديو */}
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center pointer-events-none">
                    <div className="bg-white bg-opacity-80 rounded-full p-2">
                      <Video className="h-6 w-6 text-gray-700" />
                    </div>
                  </div>
                </div>
              )}

              {/* شارة نوع الوسائط */}
              <div className="absolute bottom-2 right-2">
                <Badge variant="secondary" className="text-xs">
                  {totalMedia} ملف
                </Badge>
              </div>

              {/* شارة نوع الملف */}
              <div className="absolute top-2 left-2">
                <Badge
                  variant={mainMedia.type === "IMAGE" ? "secondary" : "default"}
                  className="text-xs"
                >
                  {mainMedia.type === "IMAGE" ? "صورة" : "فيديو"}
                </Badge>
              </div>
            </div>
          ) : (
            <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Image className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">لا توجد وسائط</p>
                {project.mediaItems && project.mediaItems.length > 0 && (
                  <p className="text-xs mt-1">
                    الملفات المتاحة:{" "}
                    {project.mediaItems.map((m) => m.type).join(", ")}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* تفاصيل المشروع */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Badge variant="outline">
                {getCategoryName(project.category)}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{project.location}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(project.completionDate).toLocaleDateString("ar-SA")}
              </span>
            </div>

            {project.projectCost && (
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="h-4 w-4" />
                <span>{project.projectCost}</span>
              </div>
            )}
          </div>

          {/* إحصائيات */}
          <div className="flex justify-between items-center text-sm text-gray-500 pt-2 border-t">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {project.views || 0}
              </span>
              {imageCount > 0 && (
                <span className="flex items-center gap-1">
                  <Image className="h-4 w-4" />
                  {imageCount}
                </span>
              )}
              {videoCount > 0 && (
                <span className="flex items-center gap-1">
                  <Video className="h-4 w-4" />
                  {videoCount}
                </span>
              )}
            </div>
            <span>
              {new Date(project.createdAt).toLocaleDateString("ar-SA")}
            </span>
          </div>

          {/* أزرار الإجراءات */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/dashboard/projects/${project.id}`)}
              className="flex-1"
            >
              <Eye className="h-4 w-4 mr-1" />
              عرض
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                router.push(`/dashboard/projects/${project.id}/edit`)
              }
              className="flex-1"
            >
              <Edit className="h-4 w-4 mr-1" />
              تحرير
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteProject(project.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/dashboard")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                العودة للوحة التحكم
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                إدارة المشاريع
              </h1>
            </div>
            <Button
              onClick={() => router.push("/dashboard/projects/add")}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              إضافة مشروع جديد
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* رسالة خطأ */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-red-800">{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={loadProjects}
              className="mr-auto"
            >
              إعادة المحاولة
            </Button>
          </div>
        )}

        {/* شريط البحث والفلترة */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="بحث في المشاريع..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="md:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">جميع الفئات</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* إحصائيات سريع�� */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {projects.length}
              </div>
              <p className="text-sm text-gray-600">إجمالي المشاريع</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {projects.filter((p) => p.featured).length}
              </div>
              <p className="text-sm text-gray-600">المشاريع المميزة</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600">
                {projects.reduce(
                  (sum, p) => sum + (p.mediaItems?.length || 0),
                  0,
                )}
              </div>
              <p className="text-sm text-gray-600">إجمالي الملفات</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600">
                {projects.reduce((sum, p) => sum + (p.views || 0), 0)}
              </div>
              <p className="text-sm text-gray-600">إجمالي المشاهدات</p>
            </CardContent>
          </Card>
        </div>

        {/* قائمة المشاريع */}
        {filteredProjects.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-600 mb-4">
                  {projects.length === 0
                    ? "لا توجد مشاريع بعد"
                    : "لا توجد نتائج للبحث"}
                </p>
                {projects.length === 0 && (
                  <Button
                    onClick={() => router.push("/dashboard/projects/add")}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    إضافة أول مشروع
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
