"use client";

import { useState, useEffect } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  mediaItems: Array<{
    id: string;
    src: string;
    type: string;
  }>;
}

export default function PortfolioPageClientSimple() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        console.log("🔍 Fetching projects...");
        const response = await fetch("/api/projects?limit=6");

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log("📦 Data received:", data.success, data.projects?.length);

        if (data.success && data.projects) {
          setProjects(data.projects);
        } else {
          throw new Error(data.error || "Failed to fetch projects");
        }
      } catch (err) {
        console.error("❌ Error:", err);
        setError(err instanceof Error ? err.message : "خطأ في تحميل المشاريع");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>جاري تحميل المشاريع...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            خطأ في تحميل المشاريع
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">معرض أعمالنا</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {project.mediaItems?.[0] ? (
                  <img
                    src={project.mediaItems[0].src}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">لا توجد صورة</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{project.category}</p>
                <p className="text-gray-700">
                  {project.description.slice(0, 100)}...
                </p>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600">لا توجد مشاريع حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
}
