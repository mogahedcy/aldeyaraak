"use client";

import { useState } from "react";

export default function LoginTestPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const createAdmin = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/setup-admin", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      setResult({ type: "create-admin", data, status: response.status });
    } catch (error) {
      setResult({ type: "create-admin", error: error.message });
    }
    setLoading(false);
  };

  const testLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: "admin",
          password: "admin123",
        }),
      });
      const data = await response.json();
      setResult({ type: "login", data, status: response.status });
    } catch (error) {
      setResult({ type: "login", error: error.message });
    }
    setLoading(false);
  };

  const testVerify = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/verify", {
        credentials: "include",
      });
      const data = await response.json();
      setResult({ type: "verify", data, status: response.status });
    } catch (error) {
      setResult({ type: "verify", error: error.message });
    }
    setLoading(false);
  };

  const checkCookies = async () => {
    // فحص الكوكيز من جانب الكلاينت
    const clientCookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [name, value] = cookie.trim().split("=");
      if (name) acc[name] = value;
      return acc;
    }, {} as any);

    // فحص الكوكيز من جانب السيرفر
    try {
      const response = await fetch("/api/debug-cookies");
      const serverData = await response.json();

      setResult({
        type: "cookies",
        data: {
          clientCookies,
          serverData: serverData.cookieInfo,
          matches:
            !!clientCookies["admin-token"] &&
            serverData.cookieInfo?.adminTokenExists,
        },
      });
    } catch (error) {
      setResult({
        type: "cookies",
        data: { clientCookies, serverError: error.message },
      });
    }
  };

  const goToDashboard = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">اختبار تسجيل الدخول</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">إجراءات الاختبار</h2>
            <div className="space-y-3">
              <button
                onClick={createAdmin}
                disabled={loading}
                className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                1. إنشاء حساب إداري
              </button>

              <button
                onClick={testLogin}
                disabled={loading}
                className="w-full p-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                2. اختبار تسجيل الدخول
              </button>

              <button
                onClick={testVerify}
                disabled={loading}
                className="w-full p-3 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
              >
                3. اختبار التحقق من الجلسة
              </button>

              <button
                onClick={checkCookies}
                className="w-full p-3 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                4. فحص الكوكيز
              </button>

              <button
                onClick={goToDashboard}
                className="w-full p-3 bg-red-600 text-white rounded hover:bg-red-700"
              >
                5. الذهاب لـ Dashboard
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">النتائج</h2>
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
            {result && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">
                  نوع الاختبار: {result.type}
                </h3>
                {result.status && (
                  <p className="mb-2">
                    <span className="font-medium">Status:</span>
                    <span
                      className={
                        result.status === 200
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {result.status}
                    </span>
                  </p>
                )}
                <pre className="text-sm bg-white p-3 rounded border overflow-auto max-h-96">
                  {JSON.stringify(result.data || result.error, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
