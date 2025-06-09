"use client";

import { useState, useEffect } from "react";

export default function ClearCookiesPage() {
  const [step, setStep] = useState(0);
  const [results, setResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setResults((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  const clearClientCookies = () => {
    addResult("🍪 بدء حذف كوكيز المتصفح...");

    // الحصول على جميع الكوكيز
    const cookies = document.cookie.split(";");

    addResult(`📋 وُجد ${cookies.length} كوكيز في المتصفح`);

    // حذف كل كوكيز
    cookies.forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

      if (name) {
        // حذف مع مختلف المسارات والنطاقات
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;

        addResult(`❌ حُذف كوكيز: ${name}`);
      }
    });

    addResult("✅ انتهى حذف كوكيز المتصفح");
  };

  const clearServerCookies = async () => {
    addResult("🖥️ بدء حذف كوكيز السيرفر...");

    try {
      const response = await fetch("/api/auth/clear-cookies", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        addResult("✅ تم حذف كوكيز السيرفر بنجاح");
      } else {
        addResult(`❌ فشل حذف كوكيز السيرفر: ${data.error}`);
      }
    } catch (error) {
      addResult(`❌ خطأ في حذف كوكيز السيرفر: ${error.message}`);
    }
  };

  const clearLocalStorage = () => {
    addResult("💾 بدء حذف Local Storage...");

    try {
      const itemCount = localStorage.length;
      addResult(`📋 وُجد ${itemCount} عنصر في Local Storage`);

      localStorage.clear();
      addResult("✅ تم حذف Local Storage بنجاح");
    } catch (error) {
      addResult(`❌ خطأ في حذف Local Storage: ${error.message}`);
    }
  };

  const clearSessionStorage = () => {
    addResult("🗂️ بدء حذف Session Storage...");

    try {
      const itemCount = sessionStorage.length;
      addResult(`📋 وُجد ${itemCount} عنصر في Session Storage`);

      sessionStorage.clear();
      addResult("✅ تم حذف Session Storage بنجاح");
    } catch (error) {
      addResult(`❌ خطأ في حذف Session Storage: ${error.message}`);
    }
  };

  const clearAll = async () => {
    setResults([]);
    addResult("🚀 بدء عملية التنظيف الشامل...");

    // خطوة 1: حذف كوكيز المتصفح
    clearClientCookies();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // خطوة 2: حذف كوكيز السيرفر
    await clearServerCookies();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // خطوة 3: حذف Local Storage
    clearLocalStorage();
    await new Promise((resolve) => setTimeout(resolve, 500));

    // خطوة 4: حذف Session Storage
    clearSessionStorage();
    await new Promise((resolve) => setTimeout(resolve, 500));

    addResult("🎉 انتهت عملية التنظيف الشامل!");
    addResult("⏳ سيتم إعادة تحميل الصفحة خلال 3 ثوان...");

    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  };

  const checkCurrentCookies = () => {
    const cookies = document.cookie
      .split(";")
      .filter((cookie) => cookie.trim());
    addResult(`🔍 فحص الكوكيز الحالية:`);

    if (cookies.length === 0) {
      addResult("✅ لا توجد كوكيز في المتصفح");
    } else {
      cookies.forEach((cookie) => {
        const [name] = cookie.trim().split("=");
        addResult(`📝 موجود: ${name}`);
      });
    }
  };

  return (
    <div className="min-h-screen bg-red-50 p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-red-200">
          <h1 className="text-3xl font-bold mb-6 text-center text-red-700">
            🧹 إلغاء وحذف جميع الكوكيز
          </h1>

          <div className="bg-red-100 border-r-4 border-red-500 p-4 mb-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">تحذير:</h2>
            <p className="text-red-700">
              هذه العملية ستحذف جميع الكوكيز وبيانات الجلسة. سيتم تسجيل خروجك من
              جميع الحسابات.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* أزرار التحكم */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">إجراءات التنظيف:</h3>

              <button
                onClick={clearAll}
                className="w-full bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 font-bold text-lg"
              >
                🧹 حذف شامل (كل شيء)
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={clearClientCookies}
                  className="bg-orange-600 text-white p-3 rounded hover:bg-orange-700"
                >
                  🍪 كوكيز المتصفح
                </button>

                <button
                  onClick={clearServerCookies}
                  className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
                >
                  🖥️ كوكيز السيرفر
                </button>

                <button
                  onClick={clearLocalStorage}
                  className="bg-purple-600 text-white p-3 rounded hover:bg-purple-700"
                >
                  💾 Local Storage
                </button>

                <button
                  onClick={clearSessionStorage}
                  className="bg-green-600 text-white p-3 rounded hover:bg-green-700"
                >
                  🗂️ Session Storage
                </button>
              </div>

              <button
                onClick={checkCurrentCookies}
                className="w-full bg-gray-600 text-white p-3 rounded hover:bg-gray-700"
              >
                🔍 فحص الكوكيز الحالية
              </button>

              <div className="pt-4 space-y-2">
                <a
                  href="/login"
                  className="block w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 text-center"
                >
                  ➡️ الذهاب لتسجيل الدخول
                </a>

                <a
                  href="/"
                  className="block w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 text-center"
                >
                  🏠 الذهاب للصفحة الرئيسية
                </a>
              </div>
            </div>

            {/* سجل النتائج */}
            <div>
              <h3 className="text-xl font-semibold mb-4">سجل العمليات:</h3>

              <div className="bg-gray-100 p-4 rounded-lg h-96 overflow-y-auto border">
                {results.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    لم تبدأ أي عملية بعد...
                  </p>
                ) : (
                  <div className="space-y-1">
                    {results.map((result, index) => (
                      <div
                        key={index}
                        className="text-sm font-mono bg-white p-2 rounded border-l-2 border-blue-400"
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>💡 نصيحة: بعد حذف الكوكيز، أعد تسجيل الدخول مرة أخرى</p>
          </div>
        </div>
      </div>
    </div>
  );
}
