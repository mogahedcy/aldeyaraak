"use client";

import { useState, useEffect } from "react";

export default function FixLoginPage() {
  const [step, setStep] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const [currentCheck, setCurrentCheck] = useState("");

  const steps = [
    "فحص الكوكيز",
    "فحص الجلسة الحالية",
    "إنشاء bypass token",
    "محاولة الوصول لـ dashboard",
  ];

  const addResult = (result: any) => {
    setResults((prev) => [
      ...prev,
      { ...result, timestamp: new Date().toLocaleTimeString() },
    ]);
  };

  const checkCookies = async () => {
    setCurrentCheck("فحص الكوكيز...");

    // فحص كوكيز العميل
    const clientCookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [name, value] = cookie.trim().split("=");
      if (name) acc[name] = value;
      return acc;
    }, {} as any);

    addResult({
      step: 1,
      type: "client-cookies",
      data: clientCookies,
      hasAdminToken: !!clientCookies["admin-token"],
      hasAuthStatus: !!clientCookies["auth-status"],
    });

    // فحص كوكيز السيرفر
    try {
      const response = await fetch("/api/debug-cookies");
      const serverData = await response.json();
      addResult({
        step: 1,
        type: "server-cookies",
        data: serverData.cookieInfo,
        success: response.ok,
      });
    } catch (error) {
      addResult({
        step: 1,
        type: "server-cookies",
        error: error.message,
        success: false,
      });
    }
  };

  const checkSession = async () => {
    setCurrentCheck("فحص الجلسة الحالية...");

    try {
      const response = await fetch("/api/auth/verify", {
        credentials: "include",
      });
      const data = await response.json();

      addResult({
        step: 2,
        type: "session-check",
        success: response.ok,
        data,
        status: response.status,
      });
    } catch (error) {
      addResult({
        step: 2,
        type: "session-check",
        error: error.message,
        success: false,
      });
    }
  };

  const createBypass = async () => {
    setCurrentCheck("إنشاء bypass token...");

    try {
      const response = await fetch("/api/auth/bypass", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();

      addResult({
        step: 3,
        type: "bypass-creation",
        success: response.ok,
        data,
        status: response.status,
      });

      if (response.ok && data.success) {
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      }
    } catch (error) {
      addResult({
        step: 3,
        type: "bypass-creation",
        error: error.message,
        success: false,
      });
    }
  };

  const testDashboard = async () => {
    setCurrentCheck("اختبار الوصول لـ dashboard...");

    try {
      const response = await fetch("/dashboard", {
        credentials: "include",
        redirect: "manual", // لمنع إعادة التوجيه التلقائي
      });

      addResult({
        step: 4,
        type: "dashboard-access",
        success: response.ok,
        status: response.status,
        redirected: response.type === "opaqueredirect",
      });
    } catch (error) {
      addResult({
        step: 4,
        type: "dashboard-access",
        error: error.message,
        success: false,
      });
    }
  };

  const runStep = async () => {
    switch (step) {
      case 0:
        await checkCookies();
        break;
      case 1:
        await checkSession();
        break;
      case 2:
        await createBypass();
        break;
      case 3:
        await testDashboard();
        break;
    }

    setCurrentCheck("");
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const runAll = async () => {
    setStep(0);
    setResults([]);

    for (let i = 0; i < steps.length; i++) {
      setStep(i);
      await new Promise((resolve) => setTimeout(resolve, 500));
      await runStep();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6 text-center">
            🔧 إصلاح مشكلة تسجيل الدخول
          </h1>

          <div className="bg-yellow-50 border-r-4 border-yellow-400 p-4 mb-6">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">
              المشكلة المكتشفة:
            </h2>
            <p className="text-yellow-700">
              يتم تسجيل الدخول بنجاح لكن هناك حلقة إعادة توجيه تمنع الوصول لوحة
              التحكم. هذه الصفحة ستشخص المشكلة وتحاول إصلاحها تلقائياً.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* خطوات التشخيص */}
            <div>
              <h3 className="text-xl font-semibold mb-4">خطوات التشخيص:</h3>

              <div className="space-y-2 mb-6">
                {steps.map((stepName, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      index < step
                        ? "bg-green-50 border-green-200 text-green-800"
                        : index === step
                          ? "bg-blue-50 border-blue-200 text-blue-800"
                          : "bg-gray-50 border-gray-200 text-gray-600"
                    }`}
                  >
                    <span className="font-medium">
                      {index + 1}. {stepName}
                    </span>
                    {index === step && currentCheck && (
                      <div className="text-sm mt-1">{currentCheck}</div>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <button
                  onClick={runStep}
                  disabled={!!currentCheck}
                  className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {currentCheck || `تشغيل الخطوة ${step + 1}`}
                </button>

                <button
                  onClick={runAll}
                  disabled={!!currentCheck}
                  className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  تشغيل جميع الخطوات
                </button>

                <button
                  onClick={() => (window.location.href = "/dashboard")}
                  className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700"
                >
                  محاولة الوصول للوحة التحكم الآن
                </button>
              </div>
            </div>

            {/* النتائج */}
            <div>
              <h3 className="text-xl font-semibold mb-4">النتائج:</h3>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {results.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    لم يتم تشغيل أي اختبار بعد
                  </p>
                ) : (
                  results.map((result, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border text-sm ${
                        result.success
                          ? "bg-green-50 border-green-200"
                          : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div className="font-medium mb-1">
                        {result.type} - {result.timestamp}
                      </div>
                      <pre className="text-xs overflow-auto">
                        {JSON.stringify(result.data || result.error, null, 2)}
                      </pre>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
