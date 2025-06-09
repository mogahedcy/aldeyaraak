"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // تحميل المشاريع
      const response = await fetch("/api/projects?limit=1000");
      if (response.ok) {
        const data = await response.json();
        const projects = data.projects || [];

        // حساب الإحصائيات
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

        // أحدث المشاريع
        setRecentProjects(projects.slice(0, 5));
      }
    } catch (error) {
      console.error("خطأ في تحميل البيانات:", error);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    window.location.href = "/login";
  };

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
            <p style={{ color: "#64748b", margin: 0 }}>
              محترفين الديار العالمية
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span style={{ color: "#475569" }}>
              مرحباً، <strong>المدير</strong>
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
            🎉 مرحباً بك في لوحة التحكم!
          </h2>
          <p style={{ color: "#15803d", margin: 0 }}>
            جميع الوظائف مربوطة بقاعدة البيانات وجاهزة للاستخدام
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
                boxShadow: "0 4px 15px rgba(22,163,74,0.2)",
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
                boxShadow: "0 4px 15px rgba(37,99,235,0.2)",
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
                boxShadow: "0 4px 15px rgba(124,58,237,0.2)",
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
                boxShadow: "0 4px 15px rgba(220,38,38,0.2)",
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

          {loading ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                backgroundColor: "white",
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "4px solid #e2e8f0",
                  borderTop: "4px solid #3b82f6",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 15px",
                }}
              ></div>
              <p style={{ color: "#64748b" }}>جاري تحميل الإحصائيات...</p>
            </div>
          ) : (
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
          )}
        </div>

        {/* Recent Projects */}
        <div style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              color: "#1e293b",
              marginBottom: "20px",
            }}
          >
            أحدث المشاريع
          </h2>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              overflow: "hidden",
            }}
          >
            {recentProjects.length > 0 ? (
              recentProjects.map((project, index) => (
                <div
                  key={project.id}
                  style={{
                    padding: "20px",
                    borderBottom:
                      index < recentProjects.length - 1
                        ? "1px solid #e2e8f0"
                        : "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        color: "#1e293b",
                        margin: "0 0 5px 0",
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        color: "#64748b",
                        margin: "0 0 5px 0",
                        fontSize: "14px",
                      }}
                    >
                      {project.description?.substring(0, 100)}...
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        fontSize: "12px",
                        color: "#94a3b8",
                      }}
                    >
                      <span>
                        📅{" "}
                        {new Date(project.createdAt).toLocaleDateString(
                          "ar-SA",
                        )}
                      </span>
                      <span>👁️ {project.views || 0} مشاهدة</span>
                      <span>❤�� {project.likes || 0} إعجاب</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() =>
                        (window.location.href = `/dashboard/projects/${project.id}`)
                      }
                      style={{
                        backgroundColor: "#3b82f6",
                        color: "white",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      ✏️ تعديل
                    </button>
                    <button
                      onClick={() =>
                        (window.location.href = `/portfolio/${project.id}`)
                      }
                      style={{
                        backgroundColor: "#10b981",
                        color: "white",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      👁️ مشاهدة
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  padding: "40px",
                  textAlign: "center",
                  color: "#64748b",
                }}
              >
                <p>لا توجد مشاريع بعد</p>
                <button
                  onClick={() =>
                    (window.location.href = "/dashboard/projects/add")
                  }
                  style={{
                    backgroundColor: "#16a34a",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                >
                  ➕ إضافة أول مشروع
                </button>
              </div>
            )}
          </div>
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
