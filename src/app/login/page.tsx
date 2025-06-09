"use client";

import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/check-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // توجيه فوري للوحة التحكم بدون حفظ أي بيانات
        window.location.href = "/dashboard";
      } else {
        setError(data.message || "اسم المستخدم أو كلمة المرور غير صحيحة");
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
        background: "linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)",
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
          padding: "50px",
          width: "100%",
          maxWidth: "450px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
          textAlign: "center" as const,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "#1e3a8a",
              borderRadius: "50%",
              margin: "0 auto 25px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.5rem",
              boxShadow: "0 10px 30px rgba(30,58,138,0.3)",
            }}
          >
            🏢
          </div>
          <h1
            style={{
              fontSize: "2.5rem",
              color: "#1f2937",
              margin: "0 0 15px 0",
              fontWeight: "bold",
            }}
          >
            تسجيل الدخول
          </h1>
          <p
            style={{
              color: "#6b7280",
              margin: 0,
              fontSize: "1.1rem",
            }}
          >
            لوحة تحكم محترفين الديار العالمية
          </p>
          <p
            style={{
              color: "#9ca3af",
              margin: "10px 0 0 0",
              fontSize: "0.9rem",
            }}
          >
            يرجى إدخال بياناتك في كل مرة
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              border: "2px solid #fca5a5",
              color: "#dc2626",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "25px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            ❌ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ textAlign: "right" as const }}>
          {/* Username */}
          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                color: "#374151",
                fontWeight: "bold",
                fontSize: "16px",
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
                padding: "15px 20px",
                border: "2px solid #e5e7eb",
                borderRadius: "10px",
                fontSize: "16px",
                outline: "none",
                transition: "all 0.3s",
                boxSizing: "border-box" as const,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#1e3a8a";
                e.target.style.boxShadow = "0 0 0 3px rgba(30,58,138,0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
              }}
              placeholder="أدخل اسم المستخدم"
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "30px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                color: "#374151",
                fontWeight: "bold",
                fontSize: "16px",
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
                padding: "15px 20px",
                border: "2px solid #e5e7eb",
                borderRadius: "10px",
                fontSize: "16px",
                outline: "none",
                transition: "all 0.3s",
                boxSizing: "border-box" as const,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#1e3a8a";
                e.target.style.boxShadow = "0 0 0 3px rgba(30,58,138,0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
              }}
              placeholder="أدخل كلمة المرور"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "18px",
              backgroundColor: loading ? "#9ca3af" : "#1e3a8a",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s",
              marginBottom: "20px",
              boxShadow: loading ? "none" : "0 4px 15px rgba(30,58,138,0.3)",
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "#1e40af";
                e.currentTarget.style.transform = "translateY(-2px)";
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "#1e3a8a";
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            {loading ? (
              <>
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    border: "2px solid #ffffff",
                    borderTop: "2px solid transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    marginLeft: "10px",
                  }}
                ></span>
                جاري التحقق...
              </>
            ) : (
              "🔓 دخول"
            )}
          </button>

          {/* Test Data Button */}
          <button
            type="button"
            onClick={fillTestData}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#f8fafc",
              color: "#475569",
              border: "2px solid #e2e8f0",
              borderRadius: "10px",
              fontSize: "14px",
              cursor: "pointer",
              marginBottom: "30px",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#f1f5f9";
              e.currentTarget.style.borderColor = "#cbd5e1";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#f8fafc";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          >
            🔧 ملء البيانات التجريبية (admin / admin123)
          </button>
        </form>

        {/* Note */}
        <div
          style={{
            backgroundColor: "#fef3c7",
            border: "1px solid #f59e0b",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "20px",
            fontSize: "13px",
            color: "#92400e",
          }}
        >
          📝 <strong>ملاحظة:</strong> لا يتم حفظ بيانات تسجيل الدخول. يجب إدخال
          البيانات في كل مرة.
        </div>

        {/* Footer */}
        <div
          style={{
            paddingTop: "25px",
            borderTop: "1px solid #e5e7eb",
            fontSize: "13px",
            color: "#6b7280",
          }}
        >
          <p style={{ margin: "0 0 15px 0" }}>🔒 منطقة محمية للمدراء فقط</p>
          <button
            onClick={() => (window.location.href = "/")}
            style={{
              background: "none",
              border: "none",
              color: "#1e3a8a",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "14px",
            }}
          >
            ← العودة للصفحة الرئيسية
          </button>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
