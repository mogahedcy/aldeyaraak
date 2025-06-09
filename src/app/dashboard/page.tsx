"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

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
    setLoading(false);
  };

  const goToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
        fontFamily: "Arial, sans-serif",
        direction: "rtl",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #e2e8f0",
          padding: "25px 0",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
          position: "sticky" as const,
          top: 0,
          zIndex: 50,
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
                fontSize: "2.5rem",
                color: "#1e293b",
                margin: "0 0 8px 0",
                fontWeight: "bold",
              }}
            >
              🏢 لوحة التحكم
            </h1>
            <p
              style={{
                color: "#64748b",
                margin: 0,
                fontSize: "16px",
              }}
            >
              محترفين الديار العالمية - نسخة بدون كوكيز
            </p>
          </div>

          <button
            onClick={goToLogin}
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(220,38,38,0.3)",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#b91c1c";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#dc2626";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            🚪 الخروج وتسجيل دخول جديد
          </button>
        </div>
      </header>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {/* Welcome Message */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.8)",
            border: "2px solid #10b981",
            borderRadius: "15px",
            padding: "25px",
            marginBottom: "40px",
            textAlign: "center",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              color: "#065f46",
              margin: "0 0 10px 0",
              fontSize: "1.8rem",
              fontWeight: "bold",
            }}
          >
            🎉 مرحباً بك في لوحة التحكم!
          </h2>
          <p
            style={{
              color: "#047857",
              margin: 0,
              fontSize: "16px",
            }}
          >
            تم تسجيل الدخول بنجاح - النظام يعمل بدون كوكيز
          </p>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: "50px" }}>
          <h2
            style={{
              fontSize: "2rem",
              color: "#1e293b",
              marginBottom: "25px",
              fontWeight: "bold",
            }}
          >
            الإجراءات السريعة
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "25px",
            }}
          >
            <button
              onClick={() => (window.location.href = "/dashboard/projects/add")}
              style={{
                backgroundColor: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "15px",
                padding: "30px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
                minHeight: "120px",
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
                boxShadow: "0 10px 30px rgba(22,163,74,0.3)",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(22,163,74,0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(22,163,74,0.3)";
              }}
            >
              <span style={{ fontSize: "3rem" }}>➕</span>
              <span>إضافة مشروع جديد</span>
            </button>

            <button
              onClick={() => (window.location.href = "/dashboard/projects")}
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "15px",
                padding: "30px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
                minHeight: "120px",
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
                boxShadow: "0 10px 30px rgba(37,99,235,0.3)",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(37,99,235,0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(37,99,235,0.3)";
              }}
            >
              <span style={{ fontSize: "3rem" }}>📋</span>
              <span>إدارة المشاريع</span>
            </button>

            <button
              onClick={() => (window.location.href = "/portfolio")}
              style={{
                backgroundColor: "#7c3aed",
                color: "white",
                border: "none",
                borderRadius: "15px",
                padding: "30px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
                minHeight: "120px",
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
                boxShadow: "0 10px 30px rgba(124,58,237,0.3)",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(124,58,237,0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(124,58,237,0.3)";
              }}
            >
              <span style={{ fontSize: "3rem" }}>👁️</span>
              <span>معاينة الموقع</span>
            </button>

            <button
              onClick={() => (window.location.href = "/dashboard/settings")}
              style={{
                backgroundColor: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "15px",
                padding: "30px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
                minHeight: "120px",
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
                boxShadow: "0 10px 30px rgba(220,38,38,0.3)",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(220,38,38,0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(220,38,38,0.3)";
              }}
            >
              <span style={{ fontSize: "3rem" }}>⚙️</span>
              <span>الإعدادات</span>
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div style={{ marginBottom: "50px" }}>
          <h2
            style={{
              fontSize: "2rem",
              color: "#1e293b",
              marginBottom: "25px",
              fontWeight: "bold",
            }}
          >
            الإحصائيات العامة
          </h2>

          {loading ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px",
                backgroundColor: "rgba(255,255,255,0.8)",
                borderRadius: "15px",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  border: "6px solid #e2e8f0",
                  borderTop: "6px solid #3b82f6",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 20px",
                }}
              ></div>
              <p style={{ color: "#64748b", fontSize: "18px" }}>
                جاري تحميل الإحصائيات...
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "25px",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderRadius: "15px",
                  padding: "30px",
                  textAlign: "center",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                    color: "#2563eb",
                    marginBottom: "15px",
                  }}
                >
                  {stats?.totalProjects || 0}
                </div>
                <div
                  style={{
                    color: "#64748b",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  إجمالي المشاريع
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderRadius: "15px",
                  padding: "30px",
                  textAlign: "center",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                    color: "#16a34a",
                    marginBottom: "15px",
                  }}
                >
                  {stats?.totalViews?.toLocaleString() || 0}
                </div>
                <div
                  style={{
                    color: "#64748b",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  إجمالي المشاهدات
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderRadius: "15px",
                  padding: "30px",
                  textAlign: "center",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                    color: "#dc2626",
                    marginBottom: "15px",
                  }}
                >
                  {stats?.totalLikes || 0}
                </div>
                <div
                  style={{
                    color: "#64748b",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  إجمالي الإعجابات
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderRadius: "15px",
                  padding: "30px",
                  textAlign: "center",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                    color: "#7c3aed",
                    marginBottom: "15px",
                  }}
                >
                  {stats?.featuredProjects || 0}
                </div>
                <div
                  style={{
                    color: "#64748b",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  المشاريع المميزة
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Note */}
        <div
          style={{
            backgroundColor: "rgba(255,241,195,0.8)",
            border: "2px solid #f59e0b",
            borderRadius: "15px",
            padding: "25px",
            textAlign: "center",
            backdropFilter: "blur(10px)",
          }}
        >
          <h3
            style={{
              color: "#92400e",
              margin: "0 0 10px 0",
              fontSize: "1.2rem",
            }}
          >
            📝 نظام بدون كوكيز
          </h3>
          <p
            style={{
              color: "#a16207",
              margin: 0,
              fontSize: "14px",
            }}
          >
            لا يتم حفظ أي بيانات جلسة. يجب تسجيل الدخول في كل مرة تريد الوصول
            للوحة التحكم.
          </p>
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
