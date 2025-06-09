"use client";

import { useState } from "react";

export default function SimpleLoginPage() {
  const [formData, setFormData] = useState({
    username: "admin",
    password: "admin123",
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("🔐 محاولة تسجيل الدخول البسيط...");

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("📡 نتيجة تسجيل الدخول:", data);

      setResult({ success: response.ok, data, status: response.status });

      if (response.ok && data.success) {
        // إعادة توجيه فورية
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      }
    } catch (error) {
      console.error("❌ خطأ:", error);
      setResult({ success: false, error: error.message });
    }

    setLoading(false);
  };

  const testDashboardAccess = async () => {
    try {
      const response = await fetch("/dashboard", { credentials: "include" });
      console.log("🏠 اختبار الوصول لـ dashboard:", response.status);
      setResult({
        type: "dashboard-test",
        success: response.ok,
        status: response.status,
        redirected: response.redirected,
        url: response.url,
      });
    } catch (error) {
      setResult({ type: "dashboard-test", error: error.message });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8" dir="rtl">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">تسجيل دخول بسيط</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              اسم المستخدم:
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              كلمة المرور:
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <div className="mt-4 space-y-2">
          <button
            onClick={testDashboardAccess}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            اختبار الوصول للوحة التحكم
          </button>

          <a
            href="/dashboard"
            className="block w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 text-center"
          >
            الذهاب للوحة التحكم مباشرة
          </a>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h3 className="font-bold mb-2">النتيجة:</h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
