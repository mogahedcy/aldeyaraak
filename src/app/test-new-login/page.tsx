"use client";

import { useState } from "react";

export default function TestNewLoginPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (result: any) => {
    setResults((prev) => [
      ...prev,
      { ...result, timestamp: new Date().toLocaleTimeString() },
    ]);
  };

  const testAdminExists = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/debug-admin");
      const data = await response.json();
      addResult({
        test: "فحص وجود مدير",
        success: response.ok,
        data,
      });
    } catch (error) {
      addResult({
        test: "فحص وجود مدير",
        success: false,
        error: error.message,
      });
    }
    setLoading(false);
  };

  const testLogin = async () => {
    setLoading(true);
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
      addResult({
        test: "تسجيل الدخول",
        success: response.ok,
        status: response.status,
        data,
      });
    } catch (error) {
      addResult({
        test: "تسجيل الدخول",
        success: false,
        error: error.message,
      });
    }
    setLoading(false);
  };

  const testSession = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/check-session", {
        credentials: "include",
      });
      const data = await response.json();
      addResult({
        test: "فحص الجلسة",
        success: response.ok,
        status: response.status,
        data,
      });
    } catch (error) {
      addResult({
        test: "فحص الجلسة",
        success: false,
        error: error.message,
      });
    }
    setLoading(false);
  };

  const checkCookies = () => {
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [name, value] = cookie.trim().split("=");
      if (name) acc[name] = value ? "exists" : "empty";
      return acc;
    }, {} as any);

    addResult({
      test: "فحص الكوكيز",
      success: true,
      data: cookies,
    });
  };

  const runAllTests = async () => {
    setResults([]);
    await testAdminExists();
    await new Promise((resolve) => setTimeout(resolve, 500));
    await testLogin();
    await new Promise((resolve) => setTimeout(resolve, 500));
    checkCookies();
    await new Promise((resolve) => setTimeout(resolve, 500));
    await testSession();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6">
            🔍 اختبار نظام تسجيل الدخول الجديد
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">اختبارات:</h2>
              <div className="space-y-3">
                <button
                  onClick={runAllTests}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  🚀 تشغيل جميع الاختبارات
                </button>

                <button
                  onClick={testAdminExists}
                  disabled={loading}
                  className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  1. فحص وجود مدير
                </button>

                <button
                  onClick={testLogin}
                  disabled={loading}
                  className="w-full bg-yellow-600 text-white p-3 rounded hover:bg-yellow-700 disabled:opacity-50"
                >
                  2. تسجيل الدخول
                </button>

                <button
                  onClick={checkCookies}
                  className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700"
                >
                  3. فحص الكوكيز
                </button>

                <button
                  onClick={testSession}
                  disabled={loading}
                  className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 disabled:opacity-50"
                >
                  4. فحص الجلسة
                </button>

                <a
                  href="/dashboard"
                  className="block w-full bg-gray-600 text-white p-3 rounded hover:bg-gray-700 text-center"
                >
                  5. اختبار الوصول للوحة التحكم
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">النتائج:</h2>
              <div className="bg-gray-50 p-4 rounded-lg h-96 overflow-y-auto">
                {results.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    لم يتم تشغيل أي اختبار بعد
                  </p>
                ) : (
                  <div className="space-y-3">
                    {results.map((result, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded border ${
                          result.success
                            ? "bg-green-50 border-green-200"
                            : "bg-red-50 border-red-200"
                        }`}
                      >
                        <div className="font-semibold text-sm mb-1">
                          {result.test} - {result.timestamp}
                          {result.status && ` (${result.status})`}
                        </div>
                        <pre className="text-xs overflow-auto">
                          {JSON.stringify(result.data || result.error, null, 2)}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
