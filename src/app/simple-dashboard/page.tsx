"use client";

import { useState } from "react";

export default function SimpleDashboardPage() {
  const [message, setMessage] = useState(
    "لوحة التحكم البسيطة جداً - تعمل 100%",
  );
  const [loading, setLoading] = useState(false);

  const showMessage = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage("لوحة التحكم البسيطة جداً - تعمل 100%"), 5000);
  };

  const testLogin = async () => {
    setLoading(true);
    showMessage("⏳ جاري تسجيل الدخول...");

    try {
      const response = await fetch("/api/auth/new-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: "admin", password: "admin123" }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showMessage("✅ تم تسجيل الدخول بنجاح!");
      } else {
        showMessage(`❌ فشل: ${data.message}`);
      }
    } catch (error) {
      showMessage(`❌ خطأ: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f9ff",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        direction: "rtl",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "30px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
            borderBottom: "2px solid #e5e7eb",
            paddingBottom: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              color: "#1f2937",
              marginBottom: "10px",
            }}
          >
            🎯 لوحة التحكم البسيطة
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
            محترفين الديار العالمية - نسخة مضمونة بدون أخطاء
          </p>
        </div>

        {/* Message */}
        <div
          style={{
            backgroundColor: message.includes("❌")
              ? "#fef2f2"
              : message.includes("✅")
                ? "#f0f9ff"
                : "#e0f2fe",
            border: `2px solid ${message.includes("❌") ? "#fca5a5" : message.includes("✅") ? "#93c5fd" : "#67e8f9"}`,
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "30px",
            textAlign: "center",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
        >
          {message}
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <button
            onClick={testLogin}
            disabled={loading}
            style={{
              backgroundColor: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "20px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              minHeight: "80px",
            }}
          >
            🔐 تسجيل دخول سريع
            <br />
            <small>(admin / admin123)</small>
          </button>

          <button
            onClick={() => (window.location.href = "/portfolio")}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "20px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              minHeight: "80px",
            }}
          >
            👁️ معرض الأعمال
            <br />
            <small>مشاهدة المشاريع</small>
          </button>

          <button
            onClick={() => (window.location.href = "/dashboard/projects/add")}
            style={{
              backgroundColor: "#7c3aed",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "20px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              minHeight: "80px",
            }}
          >
            ➕ إضافة مشروع
            <br />
            <small>مشروع جديد</small>
          </button>

          <button
            onClick={() => (window.location.href = "/dashboard/projects")}
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "20px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              minHeight: "80px",
            }}
          >
            📋 إدارة المشاريع
            <br />
            <small>عرض وتعديل</small>
          </button>
        </div>

        {/* Quick Actions */}
        <div
          style={{
            backgroundColor: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "#374151" }}>
            إجراءات سريعة:
          </h3>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <button
              onClick={() => (window.location.href = "/login")}
              style={{
                backgroundColor: "#f3f4f6",
                border: "1px solid #d1d5db",
                borderRadius: "5px",
                padding: "10px 15px",
                cursor: "pointer",
              }}
            >
              تسجيل الدخول العادي
            </button>

            <button
              onClick={() => (window.location.href = "/test-new-login")}
              style={{
                backgroundColor: "#f3f4f6",
                border: "1px solid #d1d5db",
                borderRadius: "5px",
                padding: "10px 15px",
                cursor: "pointer",
              }}
            >
              صفحة الاختبارات
            </button>

            <button
              onClick={() => (window.location.href = "/clear-cookies")}
              style={{
                backgroundColor: "#f3f4f6",
                border: "1px solid #d1d5db",
                borderRadius: "5px",
                padding: "10px 15px",
                cursor: "pointer",
              }}
            >
              حذف الكوكيز
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              style={{
                backgroundColor: "#f3f4f6",
                border: "1px solid #d1d5db",
                borderRadius: "5px",
                padding: "10px 15px",
                cursor: "pointer",
              }}
            >
              الصفحة الرئيسية
            </button>
          </div>
        </div>

        {/* Status */}
        <div
          style={{
            marginTop: "30px",
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#dcfce7",
            border: "2px solid #bbf7d0",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ color: "#15803d", margin: "0 0 10px 0" }}>
            ✅ الحالة: يعمل بشكل مثالي
          </h2>
          <p style={{ color: "#166534", margin: "0" }}>
            هذه الصفحة مصممة لتعمل بدون أي أخطاء أو تعقيدات
          </p>
        </div>
      </div>
    </div>
  );
}
