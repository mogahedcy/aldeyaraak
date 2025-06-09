"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [adminData, setAdminData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    checkLogin();
    loadStats();
  }, []);

  const checkLogin = () => {
    // فحص الكوكيز البسيط
    const isLoggedIn = document.cookie.includes("logged-in=yes");
    const username = document.cookie
      .split(";")
      .find((row) => row.trim().startsWith("admin-username="))
      ?.split("=")[1];

    if (!isLoggedIn) {
      // إعادة توجيه لتسجيل الدخول
      window.location.href = "/login";
      return;
    }

    setAdminData({ username: username || "المدير" });
    setLoading(false);
  };

  const loadStats = async () => {
    try {
      const response = await fetch("/api/projects?limit=1000");
      if (response.ok) {
        const data = await response.json();
        const projects = data.projects || [];

        setStats({
          totalProjects: projects.length,
          totalViews: projects.reduce(
            (sum: number, p: any) => sum + (p.views || 0),
            0,
          ),
          totalLikes: projects.reduce(
            (sum: number, p: any) => sum + (p.likes || 0),
            0,
          ),
          featuredProjects: projects.filter((p: any) => p.featured).length,
        });
      }
    } catch (error) {
      console.error("خطأ في تحميل الإحصائيات:", error);
    }
  };

  const handleLogout = () => {
    // حذف الكوكيز
    document.cookie =
      "logged-in=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "admin-id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "admin-username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // إعادة توجيه لتسجيل الدخول
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8fafc",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "5px solid #e2e8f0",
              borderTop: "5px solid #3b82f6",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }}
          ></div>
          <p style={{ color: "#64748b", fontSize: "18px" }}>
            جاري تحميل لوحة التحكم...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        fontFamily: "Arial, sans-serif",
        direction: "rtl",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #e2e8f0",
          padding: "20px 0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "2rem",
                color: "#1e293b",
                margin: "0 0 5px 0",
              }}
            >
              🏢 لوحة تحكم الإدارة
            </h1>
            <p
              style={{
                color: "#64748b",
                margin: 0,
                fontSize: "14px",
              }}
            >
              محترفين الديار العالمية
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span style={{ color: "#475569" }}>
              مرحباً، <strong>{adminData?.username}</strong>
            </span>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              🚪 تسجيل الخروج
            </button>
          </div>
        </div>
      </header>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "30px 20px",
        }}
      >
        {/* Success Message */}
        <div
          style={{
            backgroundColor: "#dcfce7",
            border: "1px solid #bbf7d0",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "#166534",
              margin: "0 0 8px 0",
              fontSize: "1.2rem",
            }}
          >
            🎉 تم تسجيل الدخول بنجاح!
          </h2>
          <p
            style={{
              color: "#15803d",
              margin: 0,
              fontSize: "14px",
            }}
          >
            مرحباً بك في لوحة التحكم الجديدة - النظام يعمل بشكل مثالي
          </p>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              color: "#1e293b",
              marginBottom: "20px",
            }}
          >
            الإجراءات السريعة
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            <button
              onClick={() => (window.location.href = "/dashboard/projects/add")}
              style={{
                backgroundColor: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "25px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                minHeight: "100px",
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <span style={{ fontSize: "2rem" }}>➕</span>
              <span>إضافة مشروع جديد</span>
            </button>

            <button
              onClick={() => (window.location.href = "/dashboard/projects")}
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "25px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                minHeight: "100px",
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <span style={{ fontSize: "2rem" }}>📋</span>
              <span>إدارة المشاريع</span>
            </button>

            <button
              onClick={() => (window.location.href = "/portfolio")}
              style={{
                backgroundColor: "#7c3aed",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "25px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                minHeight: "100px",
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <span style={{ fontSize: "2rem" }}>👁️</span>
              <span>معاينة الموقع</span>
            </button>

            <button
              onClick={() => (window.location.href = "/dashboard/settings")}
              style={{
                backgroundColor: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "25px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                minHeight: "100px",
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <span style={{ fontSize: "2rem" }}>⚙️</span>
              <span>الإعدادات</span>
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              color: "#1e293b",
              marginBottom: "20px",
            }}
          >
            الإحصائيات العامة
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "25px",
                textAlign: "center",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#2563eb",
                  marginBottom: "10px",
                }}
              >
                {stats?.totalProjects || 0}
              </div>
              <div style={{ color: "#64748b", fontSize: "14px" }}>
                إجمالي المشاريع
              </div>
            </div>

            <div
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "25px",
                textAlign: "center",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#16a34a",
                  marginBottom: "10px",
                }}
              >
                {stats?.totalViews?.toLocaleString() || 0}
              </div>
              <div style={{ color: "#64748b", fontSize: "14px" }}>
                إجمالي المشاهدات
              </div>
            </div>

            <div
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "25px",
                textAlign: "center",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#dc2626",
                  marginBottom: "10px",
                }}
              >
                {stats?.totalLikes || 0}
              </div>
              <div style={{ color: "#64748b", fontSize: "14px" }}>
                إجمالي الإعجابات
              </div>
            </div>

            <div
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "25px",
                textAlign: "center",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#7c3aed",
                  marginBottom: "10px",
                }}
              >
                {stats?.featuredProjects || 0}
              </div>
              <div style={{ color: "#64748b", fontSize: "14px" }}>
                المشاريع المميزة
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
          }}
        >
          <p
            style={{
              color: "#64748b",
              margin: 0,
              fontSize: "14px",
            }}
          >
            © 2024 محترفين الديار العالمية - جميع الحقوق محفوظة
          </p>
        </div>
      </div>

      {/* Add CSS for spinner animation */}
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
