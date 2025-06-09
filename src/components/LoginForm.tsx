"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Eye,
  EyeOff,
  Lock,
  User,
  Shield,
  ArrowLeft,
  AlertCircle,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // تحقق من حالة تسجيل الدخول عند تحميل الصفحة
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const response = await fetch("/api/auth/verify");
        if (response.ok) {
          // المستخدم مسجل دخوله بالفعل، إعادة توجيه
          router.push("/dashboard");
        }
      } catch (error) {
        // لا توجد جلسة صالحة
        console.log("لا توجد جلسة صالحة");
      }
    };

    checkExistingSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("🔐 محاولة تسجيل الدخول...", formData.username);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // مهم لتضمين الكوكيز
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("📡 استجابة تسجيل الدخول:", {
        success: data.success,
        status: response.status,
      });

      if (response.ok && data.success) {
        console.log("✅ نجح تسجيل الدخول، إعادة توجيه إلى:", callbackUrl);

        // تأخير بسيط للتأكد من حفظ الكوكيز
        setTimeout(() => {
          window.location.href = callbackUrl; // استخدام callback URL
        }, 500); // زيادة التأخير للإنتاج
      } else {
        console.error("❌ فشل تسجيل الدخول:", data);
        setError(data.error || "حدث خطأ في تسجيل الدخول");
      }
    } catch (error) {
      console.error("❌ خطأ في تسجيل الدخول:", error);
      setError("حدث خطأ في الاتصال بالخادم");
    }

    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(""); // إزالة رسالة الخطأ عند الكتابة
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mb-6 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            تسجيل الدخول
          </h1>
          <p className="text-gray-600">لوحة تحكم محترفين الديار العالمية</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                اسم المستخدم
              </label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="أدخل اسم المستخدم"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pr-10 pl-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="أدخل كلمة المرور"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !formData.username || !formData.password}
              className="w-full py-3 bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري تسجيل الدخول...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  تسجيل الدخول
                </div>
              )}
            </Button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              العودة للصفحة الرئيسية
            </button>

            {error && (
              <div className="space-y-1">
                <div>
                  <a
                    href="/clear-cookies"
                    className="inline-flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors text-sm font-medium"
                  >
                    🧹 إلغاء الكوكيز وإعادة المحاولة
                  </a>
                </div>
                <div>
                  <a
                    href="/fix-login"
                    className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 transition-colors text-sm"
                  >
                    🔧 إصلاح مشكلة تسجيل الدخول
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 هذه المنطقة محمية ومخصصة للمدراء فقط
          </p>
        </div>
      </div>
    </div>
  );
}
