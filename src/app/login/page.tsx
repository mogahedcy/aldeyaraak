"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/simple-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("تم تسجيل الدخول بنجاح! جاري التوجيه...");

        // توجيه فوري إلى dashboard
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      } else {
        setError(data.message || "خطأ في تسجيل الدخول");
      }
    } catch (error) {
      setError("خطأ في الاتصال بالخادم");
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
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
          borderRadius: "15px",
          padding: "40px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          textAlign: "center" as const,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#667eea",
              borderRadius: "50%",
              margin: "0 auto 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
            }}
          >
            🔐
          </div>
          <h1
            style={{
              fontSize: "2rem",
              color: "#333",
              margin: "0 0 10px 0",
            }}
          >
            تسجيل الدخول
          </h1>
          <p style={{ color: "#666", margin: 0 }}>
            لوحة تحكم محترفين الديار العالمية
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              border: "1px solid #fca5a5",
              color: "#dc2626",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            ❌ {error}
          </div>
        )}

        {success && (
          <div
            style={{
              backgroundColor: "#d1fae5",
              border: "1px solid #6ee7b7",
              color: "#059669",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            ✅ {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ textAlign: "right" as const }}>
          {/* Username */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#333",
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
                transition: "border-color 0.3s",
                boxSizing: "border-box" as const,
              }}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              placeholder="أدخل اسم المستخدم"
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#333",
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
                transition: "border-color 0.3s",
                boxSizing: "border-box" as const,
              }}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              placeholder="أدخل كلمة المرور"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: loading ? "#9ca3af" : "#667eea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s",
              marginBottom: "15px",
            }}
            onMouseOver={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#5a67d8";
            }}
            onMouseOut={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#667eea";
            }}
          >
            {loading ? "⏳ جاري تسجيل الدخول..." : "🔓 تسجيل الدخول"}
          </button>

          {/* Test Data Button */}
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
              marginBottom: "20px",
            }}
          >
            🔧 ملء البيانات التجريبية (admin / admin123)
          </button>
        </form>

        {/* Footer */}
        <div
          style={{
            paddingTop: "20px",
            borderTop: "1px solid #e5e7eb",
            fontSize: "12px",
            color: "#9ca3af",
          }}
        >
          <p style={{ margin: "0 0 10px 0" }}>🔒 منطقة محمية للمدراء فقط</p>
          <button
            onClick={() => (window.location.href = "/")}
            style={{
              background: "none",
              border: "none",
              color: "#667eea",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            ← العودة للصفحة الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}
