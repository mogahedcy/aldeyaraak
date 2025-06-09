"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  LogIn,
  User,
  Lock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function NewLoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      console.log("🔐 بدء تسجيل الدخول...", {
        username: formData.username,
        passwordLength: formData.password.length,
        hasUsername: !!formData.username,
        hasPassword: !!formData.password,
      });

      const requestBody = {
        username: formData.username.trim(),
        password: formData.password,
      };

      console.log("📤 إرسال البيانات:", {
        username: requestBody.username,
        hasPassword: !!requestBody.password,
      });

      const response = await fetch("/api/auth/new-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      console.log("📡 استجابة HTTP:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });

      const data = await response.json();
      console.log("📦 بيانات الاستجابة:", data);

      if (response.ok && data.success) {
        setMessage({
          type: "success",
          text: "تم تسجيل الدخول بنجاح! جاري التحويل...",
        });

        console.log("✅ نجح تسجيل الدخول، فحص الكوكيز...");
        console.log("🍪 كوكيز المتصفح:", document.cookie);

        // تحويل فوري إلى dashboard
        setTimeout(() => {
          console.log("🔄 توجيه إلى dashboard...");
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        console.error("❌ فشل تسجيل الدخول:", {
          status: response.status,
          data,
        });

        let errorMessage = data.message || data.error || "فشل تسجيل الدخول";
        if (data.debug) {
          errorMessage += ` (${data.debug})`;
        }

        setMessage({
          type: "error",
          text: errorMessage,
        });
      }
    } catch (error) {
      console.error("❌ خطأ في الشبكة:", error);
      setMessage({
        type: "error",
        text: `خطأ في الاتصال بالخادم: ${error.message}`,
      });
    }

    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (message.text) setMessage({ type: "", text: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            تسجيل الدخول
          </h1>
          <p className="text-gray-600">لوحة تحكم محترفين الديار العالمية</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
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
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="أدخل اسم المستخدم"
                  autoComplete="username"
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
                  className="w-full pr-10 pl-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="أدخل كلمة المرور"
                  autoComplete="current-password"
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

            {/* Message */}
            {message.text && (
              <div
                className={`flex items-center gap-2 p-3 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <span className="text-sm">{message.text}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formData.username || !formData.password}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري تسجيل الدخول...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  تسجيل الدخول
                </>
              )}
            </button>
          </form>

          {/* Quick Login for Testing */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => {
                setFormData({ username: "admin", password: "admin123" });
                setMessage({ type: "", text: "" });
              }}
              className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              🔧 ملء البيانات التجريبية (admin / admin123)
            </button>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <a
              href="/"
              className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              ← العودة للصفحة الرئيسية
            </a>
          </div>
        </div>

        {/* Help */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">🔒 منطقة مخصصة للمدراء فقط</p>
        </div>
      </div>
    </div>
  );
}
