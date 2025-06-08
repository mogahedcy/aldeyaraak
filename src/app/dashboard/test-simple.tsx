"use client";

import { useEffect, useState } from "react";

export default function SimpleDashboard() {
  const [authStatus, setAuthStatus] = useState("جاري التحقق...");
  const [adminInfo, setAdminInfo] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      console.log("🔍 فحص المصادقة في Dashboard البسيط...");

      const response = await fetch("/api/auth/verify", {
        credentials: "include",
      });

      console.log("📡 استجابة فحص المصادقة:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("✅ تم التحقق من المصادقة:", data);
        setAuthStatus("مصادق بنجاح");
        setAdminInfo(data.admin);
      } else {
        console.log("❌ فشل التحقق من المصادقة");
        setAuthStatus("غير مصادق");
      }
    } catch (error) {
      console.error("❌ خطأ في المصادقة:", error);
      setAuthStatus("خطأ في المصادقة");
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6">لوحة التحكم - اختبار بسيط</h1>

          <div className="space-y-4">
            <div>
              <strong>حالة المصادقة:</strong>
              <span
                className={`ml-2 ${authStatus === "مصادق بنجاح" ? "text-green-600" : authStatus === "غير مصادق" ? "text-red-600" : "text-yellow-600"}`}
              >
                {authStatus}
              </span>
            </div>

            {adminInfo && (
              <div>
                <strong>معلومات المدير:</strong>
                <ul className="mt-2 ml-4">
                  <li>المعرف: {adminInfo.id}</li>
                  <li>اسم المستخدم: {adminInfo.username}</li>
                  <li>البريد الإلكتروني: {adminInfo.email}</li>
                  <li>
                    آخر دخول:{" "}
                    {adminInfo.lastLogin
                      ? new Date(adminInfo.lastLogin).toLocaleString("ar-SA")
                      : "غير محدد"}
                  </li>
                </ul>
              </div>
            )}

            <div className="pt-4 space-x-4">
              <button
                onClick={checkAuth}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                إعادة فحص المصادقة
              </button>

              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                تسجيل الخروج
              </button>

              <a
                href="/dashboard"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 inline-block"
              >
                الذهاب للوحة التحكم الكاملة
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
