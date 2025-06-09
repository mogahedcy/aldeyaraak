"use client";

import { useState } from "react";

export default function FastLoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [responseTime, setResponseTime] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent, useDatabase = false) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponseTime(null);

    const startTime = Date.now();

    try {
      const apiUrl = useDatabase ? "/api/check-login" : "/api/fast-login";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      const clientTime = Date.now() - startTime;

      setResponseTime(data.responseTime || clientTime);

      if (data.success) {
        // إظهار رسالة نجاح مع وقت الاستجابة
        setError("");
        alert(
          `✅ تم تسجيل الدخول بنجاح!\nوقت الاستجابة: ${data.responseTime || clientTime}ms`,
        );

        // توجيه للوحة التحكم
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      } else {
        setError(`${data.message} (${clientTime}ms)`);
      }
    } catch (error) {
      const clientTime = Date.now() - startTime;
      setError(`خطأ في الاتصال: ${error.message} (${clientTime}ms)`);
      setResponseTime(clientTime);
    }

    setLoading(false);
  };

  const fillTestData = () => {
    setFormData({ username: "admin", password: "admin123" });
    setError("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "40px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
          textAlign: "center" as const,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#10b981",
              borderRadius: "50%",
              margin: "0 auto 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
            }}
          >
            ⚡
          </div>
          <h1
            style={{
              fontSize: "2.2rem",
              color: "#1f2937",
              margin: "0 0 10px 0",
            }}
          >
            تسجيل دخول سريع
          </h1>
          <p style={{ color: "#6b7280", margin: "0 0 10px 0" }}>
            اختبار سرعة الاستجابة
          </p>
          {responseTime && (
            <div
              style={{
                backgroundColor:
                  responseTime < 100
                    ? "#d1fae5"
                    : responseTime < 500
                      ? "#fef3c7"
                      : "#fee2e2",
                color:
                  responseTime < 100
                    ? "#065f46"
                    : responseTime < 500
                      ? "#92400e"
                      : "#991b1b",
                padding: "8px 15px",
                borderRadius: "20px",
                display: "inline-block",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              ⏱️ وقت الاستجابة: {responseTime}ms
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              border: "2px solid #fca5a5",
              color: "#dc2626",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form style={{ textAlign: "right" as const, marginBottom: "20px" }}>
          {/* Username */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#374151",
                fontWeight: "bold",
              }}
            >
              اسم المستخدم
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
              style={{
                width: "100%",
                padding: "12px 15px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box" as const,
              }}
              placeholder="admin"
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#374151",
                fontWeight: "bold",
              }}
            >
              كلمة المرور
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              style={{
                width: "100%",
                padding: "12px 15px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box" as const,
              }}
              placeholder="admin123"
            />
          </div>

          {/* Buttons */}
          <div style={{ display: "grid", gap: "10px", marginBottom: "15px" }}>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, false)}
              disabled={loading}
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: loading ? "#9ca3af" : "#10b981",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading
                ? "⏳ جاري التحقق..."
                : "⚡ دخول سريع (بدون قاعدة بيانات)"}
            </button>

            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              disabled={loading}
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: loading ? "#9ca3af" : "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading
                ? "⏳ جاري التحقق..."
                : "🗄️ دخول عادي (مع قاعدة البيانات)"}
            </button>
          </div>

          <button
            type="button"
            onClick={fillTestData}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#f3f4f6",
              color: "#374151",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            🔧 ملء البيانات التجريبية
          </button>
        </form>

        {/* Performance Info */}
        <div
          style={{
            backgroundColor: "#f0f9ff",
            border: "1px solid #93c5fd",
            borderRadius: "8px",
            padding: "15px",
            fontSize: "13px",
            color: "#1e40af",
            marginBottom: "20px",
          }}
        >
          <strong>📊 اختبار الأداء:</strong>
          <br />
          - الدخول السريع: بدون قاعدة بيانات (أقل من 50ms)
          <br />- الدخول العادي: مع قاعدة البيانات (قد يصل لثوان)
        </div>

        {/* Footer */}
        <div
          style={{
            paddingTop: "20px",
            borderTop: "1px solid #e5e7eb",
            fontSize: "12px",
            color: "#9ca3af",
          }}
        >
          <button
            onClick={() => (window.location.href = "/login")}
            style={{
              background: "none",
              border: "none",
              color: "#10b981",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            ← العودة لتسجيل الدخول العادي
          </button>
        </div>
      </div>
    </div>
  );
}
