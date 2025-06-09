"use client";

import { useState, useRef, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Upload,
  X,
  Eye,
  Save,
  ArrowLeft,
  Image as ImageIcon,
  Video,
  Trash2,
  CheckCircle,
} from "lucide-react";

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
  title: string;
}

export default function AddProjectPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "مظلات",
    location: "",
    client: "",
    projectDuration: "",
    projectCost: "",
    completionDate: "",
    featured: false,
  });

  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [newMaterial, setNewMaterial] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const categories = [
    "مظلات",
    "برجولات",
    "سواتر",
    "ساندوتش بانل",
    "تنسيق حدائق",
    "خيام ملكية",
    "بيوت شعر",
    "ترميم",
  ];

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/verify", {
        credentials: "include",
      });

      if (!response.ok) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      router.push("/login");
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const mediaType = file.type.startsWith("image/") ? "image" : "video";
      const mediaFile: MediaFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
        type: mediaType,
        title: file.name.split(".")[0],
      };

      setMediaFiles((prev) => [...prev, mediaFile]);
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeMediaFile = (id: string) => {
    setMediaFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const updateMediaTitle = (id: string, newTitle: string) => {
    setMediaFiles((prev) =>
      prev.map((file) =>
        file.id === id ? { ...file, title: newTitle } : file,
      ),
    );
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags((prev) => [...prev, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const addMaterial = () => {
    if (newMaterial.trim() && !materials.includes(newMaterial.trim())) {
      setMaterials((prev) => [...prev, newMaterial.trim()]);
      setNewMaterial("");
    }
  };

  const removeMaterial = (materialToRemove: string) => {
    setMaterials((prev) =>
      prev.filter((material) => material !== materialToRemove),
    );
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    console.log("🚀 بدء رفع الملف:", {
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
    });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      console.log("📡 استجابة السيرفر:", response.status, response.statusText);

      // Get response text first to debug JSON parsing issues
      const responseText = await response.text();
      console.log("📄 نص الاستجابة:", responseText.substring(0, 200));

      if (!response.ok) {
        let errorMessage = "فشل في رفع الملف";
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || errorData.details || errorMessage;
          console.error("❌ خطأ من السيرفر:", errorData);
        } catch (parseError) {
          console.error("❌ خطأ في تحليل استجابة الخطأ:", parseError);
          console.error("❌ النص الكامل للاستجابة:", responseText);
          errorMessage = `خطأ في السيرفر (${response.status})`;
        }
        throw new Error(errorMessage);
      }

      // Parse JSON response
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("❌ خطأ في تحليل JSON:", parseError);
        console.error("❌ النص المستلم:", responseText);
        throw new Error("استجابة غير صحيحة من السيرفر. تحقق من سجلات السيرفر.");
      }

      console.log("✅ نتيجة الرفع:", data);

      // التحقق من نجاح العملية
      if (!data.success) {
        throw new Error(data.error || "فشل في رفع الملف");
      }

      // التحقق من وجود الملفات المرفوعة
      if (!data.files || data.files.length === 0) {
        throw new Error("لم يتم إرجاع أي ملفات من الخادم");
      }

      // إرجاع رابط الملف الأول
      const uploadedFile = data.files[0];
      if (!uploadedFile.src && !uploadedFile.url) {
        throw new Error("لم يتم إرجاع رابط صحيح للملف");
      }

      const fileUrl = uploadedFile.src || uploadedFile.url;
      console.log("🔗 رابط الملف:", fileUrl);

      return fileUrl;
    } catch (networkError) {
      console.error("❌ خطأ في الشبكة:", networkError);

      if (networkError.message.includes("JSON")) {
        throw new Error(
          "خطأ في تحليل استجابة السيرفر. تحقق من إعدادات الخادم.",
        );
      }

      throw new Error(`خطأ في الاتصال: ${networkError.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // التحقق من البيانات الأساسية
      if (!formData.title || !formData.description || !formData.category) {
        alert("يرجى ملء جميع الحقول المطلوبة");
        return;
      }

      // رفع الملفات أولاً
      const uploadedMedia = [];
      let failedUploads = 0;

      console.log(`📤 بدء رفع ${mediaFiles.length} ملف...`);

      for (let i = 0; i < mediaFiles.length; i++) {
        const mediaFile = mediaFiles[i];

        // تحديث مؤشر التقدم
        setUploadProgress(Math.round((i / mediaFiles.length) * 100));
        setUploadStatus(
          `رفع الملف ${i + 1} من ${mediaFiles.length}: ${mediaFile.file.name}`,
        );

        try {
          console.log(
            `📤 رفع الملف ${i + 1} من ${mediaFiles.length}: ${mediaFile.file.name}`,
          );

          // التحقق من حجم الملف
          const isVideo = mediaFile.type === "video";
          const maxSize = isVideo ? 100 * 1024 * 1024 : 20 * 1024 * 1024; // 100MB للفيديو، 20MB للصور

          if (mediaFile.file.size > maxSize) {
            const maxSizeMB = Math.round(maxSize / 1024 / 1024);
            throw new Error(`حجم الملف كبير جداً. الحد الأقصى: ${maxSizeMB}MB`);
          }

          // التحقق من نوع الملف
          const allowedImageTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            "image/gif",
          ];
          const allowedVideoTypes = [
            "video/mp4",
            "video/mov",
            "video/avi",
            "video/webm",
            "video/quicktime",
          ];

          if (isVideo && !allowedVideoTypes.includes(mediaFile.file.type)) {
            throw new Error(
              "نوع الفيديو غير مدعوم. الأنواع المدعومة: MP4, MOV, AVI, WebM",
            );
          }

          if (!isVideo && !allowedImageTypes.includes(mediaFile.file.type)) {
            throw new Error(
              "نوع الصورة غير مدعوم. الأنواع المدعومة: JPG, PNG, WebP, GIF",
            );
          }

          const url = await uploadToCloudinary(mediaFile.file);
          if (!url) {
            throw new Error("لم يتم إرجاع رابط صحيح");
          }

          console.log(
            `✅ تم رفع الملف بنجاح: ${mediaFile.file.name} -> ${url}`,
          );

          uploadedMedia.push({
            type: mediaFile.type.toUpperCase(),
            src: url,
            thumbnail: isVideo
              ? `${url.replace("/upload/", "/upload/c_fill,h_200,w_300,so_0/")}.jpg`
              : url,
            title: mediaFile.title || mediaFile.file.name,
            description: mediaFile.description || "",
            order: uploadedMedia.length,
          });
        } catch (uploadError) {
          failedUploads++;
          console.error(
            `❌ خطأ في رفع الملف ${mediaFile.file.name}:`,
            uploadError,
          );

          const errorMessage =
            uploadError instanceof Error
              ? uploadError.message
              : "خطأ غير معروف";

          // إظهار رسالة خطأ مفصلة
          const shouldContinue = confirm(
            `فشل في رفع الملف: ${mediaFile.file.name}\n\n` +
              `الخطأ: ${errorMessage}\n\n` +
              `هل تريد المتابعة مع باقي الملفات؟\n` +
              `(اضغط "موافق" للمتابعة أو "إلغاء" للتوقف)`,
          );

          if (!shouldContinue) {
            return;
          }
        }
      }

      // تحديث مؤشر التقدم للانتهاء من الرفع
      setUploadProgress(100);
      setUploadStatus(`تم رفع ${uploadedMedia.length} ملف بنجاح!`);

      if (uploadedMedia.length === 0) {
        alert("لم يتم رفع أي ملفات بنجاح. يرجى المحاولة مرة أخرى.");
        return;
      }

      console.log(
        `📊 نتيجة الرفع: ${uploadedMedia.length} ملف نجح، ${failedUploads} ملف فشل`,
      );

      // إظهار حالة إنشاء المشروع
      setUploadStatus("إنشاء المشروع...");

      // إنشاء المشروع
      const projectData = {
        ...formData,
        mediaItems: uploadedMedia,
        tags: tags, // إرسال كـ array من strings
        materials: materials, // إرسال كـ array من strings
        completionDate: new Date(formData.completionDate).toISOString(),
      };

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        alert("تم إضافة المشروع بنجاح! 🎉");
        router.push(`/dashboard/projects/${result.project.id}`);
      } else {
        const error = await response.json();
        console.error("API Error:", error);
        alert(`خطأ في إضافة المشروع: ${error.error || "خطأ غير معروف"}`);
      }
    } catch (error) {
      console.error("Error creating project:", error);
      alert(
        `حدث خطأ في إنشاء المشروع: ${error instanceof Error ? error.message : "خطأ غير معروف"}`,
      );
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
      setUploadStatus("");
    }
  };

  if (previewMode) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-2xl font-bold text-gray-900">
                معاينة المشروع
              </h1>
              <Button variant="outline" onClick={() => setPreviewMode(false)}>
                <ArrowLeft className="h-4 w-4 ml-2" />
                العودة للتحرير
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <CardTitle>{formData.title || "عنوان المشروع"}</CardTitle>
              <CardDescription>
                {formData.category} • {formData.location} •{" "}
                {formData.completionDate}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Media Gallery */}
                {mediaFiles.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {mediaFiles.map((media) => (
                      <div
                        key={media.id}
                        className="aspect-video rounded-lg overflow-hidden"
                      >
                        {media.type === "image" ? (
                          <img
                            src={media.preview}
                            alt={media.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <video
                            src={media.preview}
                            className="w-full h-full object-cover"
                            controls
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">وصف المشروع</h3>
                  <p className="text-gray-600">
                    {formData.description || "لا يوجد وصف متاح"}
                  </p>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">تفاصيل المشروع</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        <strong>العميل:</strong> {formData.client || "غير محدد"}
                      </p>
                      <p>
                        <strong>المدة:</strong>{" "}
                        {formData.projectDuration || "غير محدد"}
                      </p>
                      <p>
                        <strong>التكلفة:</strong>{" "}
                        {formData.projectCost || "غير محدد"}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">العلامات</h4>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Materials */}
                {materials.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">المواد المستخدمة</h4>
                    <div className="flex flex-wrap gap-2">
                      {materials.map((material) => (
                        <span
                          key={material}
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
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
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/dashboard/projects")}
              >
                <ArrowLeft className="h-4 w-4 ml-2" />
                العودة
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  إضافة مشروع جديد
                </h1>
                <p className="text-sm text-gray-500">
                  إنشاء مشروع جديد في معرض الأعمال
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPreviewMode(true)}
                disabled={!formData.title}
              >
                <Eye className="h-4 w-4 ml-2" />
                معاينة
              </Button>
              <Button
                type="submit"
                form="project-form"
                disabled={isSubmitting || !formData.title}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {uploadStatus || "حفظ..."}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    حفظ المشروع
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Upload Progress Bar */}
      {isSubmitting && uploadProgress > 0 && (
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                {uploadStatus}
              </span>
              <span className="text-sm text-gray-500">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <form
        id="project-form"
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>المعلومات الأساسية</CardTitle>
              <CardDescription>أدخل المعلومات الأساسية للمشروع</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    عنوان المشروع *
                  </label>
                  <Input
                    required
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="مثال: مظلة سيارات فيلا الرياض"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    الفئة *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    الموقع *
                  </label>
                  <Input
                    required
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    placeholder="مثال: جدة - حي الروضة"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    العميل
                  </label>
                  <Input
                    value={formData.client}
                    onChange={(e) =>
                      handleInputChange("client", e.target.value)
                    }
                    placeholder="اسم العميل (اختياري)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    تاريخ الإنجاز *
                  </label>
                  <Input
                    type="date"
                    required
                    value={formData.completionDate}
                    onChange={(e) =>
                      handleInputChange("completionDate", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    مدة التنفيذ
                  </label>
                  <Input
                    value={formData.projectDuration}
                    onChange={(e) =>
                      handleInputChange("projectDuration", e.target.value)
                    }
                    placeholder="مثال: 5 أيام"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    التكلفة التقريبية
                  </label>
                  <Input
                    value={formData.projectCost}
                    onChange={(e) =>
                      handleInputChange("projectCost", e.target.value)
                    }
                    placeholder="مثال: 15,000 ريال"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    وصف المشروع *
                  </label>
                  <Textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="وصف تفصيلي للمشروع والمواد المستخدمة..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        handleInputChange("featured", e.target.checked)
                      }
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm font-medium">
                      مشروع مميز (يظهر في الصفحة الرئيسية)
                    </span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Media Upload */}
          <Card>
            <CardHeader>
              <CardTitle>الصور والفيديوهات</CardTitle>
              <CardDescription>
                ارفع صور وفيديوهات المشروع (يُنصح برفع 5-10 صور على الأقل)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Upload Area */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 cursor-pointer transition-colors"
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-600 mb-2">
                    انقر لرفع الملفات
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, MP4, MOV حتى 10MB لكل ملف
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                {/* Media Preview */}
                {mediaFiles.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-medium">
                      الملفات المرفوعة ({mediaFiles.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mediaFiles.map((media) => (
                        <div
                          key={media.id}
                          className="border rounded-lg p-4 space-y-3"
                        >
                          <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                            {media.type === "image" ? (
                              <img
                                src={media.preview}
                                alt={media.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <video
                                src={media.preview}
                                className="w-full h-full object-cover"
                                controls
                              />
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {media.type === "image" ? (
                              <ImageIcon className="h-4 w-4 text-blue-500" />
                            ) : (
                              <Video className="h-4 w-4 text-green-500" />
                            )}
                            <Input
                              size="sm"
                              value={media.title}
                              onChange={(e) =>
                                updateMediaTitle(media.id, e.target.value)
                              }
                              placeholder="عنوان الملف"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeMediaFile(media.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tags and Materials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>العلامات</CardTitle>
                <CardDescription>أضف كلمات مفتاحية للمشروع</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="أضف علامة جديدة"
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTag())
                      }
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      إضافة
                    </Button>
                  </div>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-blue-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Materials */}
            <Card>
              <CardHeader>
                <CardTitle>المواد المستخدمة</CardTitle>
                <CardDescription>أضف قائمة بالمواد المستخدمة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newMaterial}
                      onChange={(e) => setNewMaterial(e.target.value)}
                      placeholder="أضف مادة جديدة"
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addMaterial())
                      }
                    />
                    <Button
                      type="button"
                      onClick={addMaterial}
                      variant="outline"
                    >
                      إضافة
                    </Button>
                  </div>

                  {materials.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {materials.map((material) => (
                        <span
                          key={material}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                        >
                          {material}
                          <button
                            type="button"
                            onClick={() => removeMaterial(material)}
                            className="hover:text-green-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
