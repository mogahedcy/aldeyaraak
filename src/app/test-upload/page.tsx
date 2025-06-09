"use client";

import { useState } from "react";

export default function TestUploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
    setResults(null);
    setError("");
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setError("يرجى اختيار ملف أولاً");
      return;
    }

    setUploading(true);
    setError("");
    setResults(null);

    try {
      const formData = new FormData();

      // إضافة جميع الملفات
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]);
      }

      console.log("🚀 بدء رفع الملفات...");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log("📡 نتيجة الرفع:", data);

      if (data.success) {
        setResults(data);
      } else {
        setError(data.error || "فشل في رفع الملفات");
      }
    } catch (err) {
      console.error("❌ خطأ في الرفع:", err);
      setError(`خطأ في الشبكة: ${err.message}`);
    }

    setUploading(false);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("video/")) return "🎬";
    if (type.startsWith("image/")) return "🖼️";
    return "📄";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        direction: "rtl",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "30px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            marginBottom: "20px",
            color: "#1e293b",
            textAlign: "center",
          }}
        >
          🧪 اختبار رفع الملفات
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          اختبر رفع الصور والفيديوهات للتأكد من عمل النظام
        </p>

        {/* File Input */}
        <div
          style={{
            border: "2px dashed #cbd5e1",
            borderRadius: "10px",
            padding: "40px",
            textAlign: "center",
            marginBottom: "20px",
            backgroundColor: "#f8fafc",
          }}
        >
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileSelect}
            style={{
              display: "none",
            }}
            id="fileInput"
          />

          <label
            htmlFor="fileInput"
            style={{
              cursor: "pointer",
              color: "#3b82f6",
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          >
            📁 اختر الصور أو الفيديوهات
          </label>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "0.9rem",
              marginTop: "10px",
            }}
          >
            الحد الأقصى: 20MB للصور، 100MB للفيديو
          </p>
        </div>

        {/* Selected Files */}
        {selectedFiles && selectedFiles.length > 0 && (
          <div
            style={{
              marginBottom: "20px",
              backgroundColor: "#f1f5f9",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ marginBottom: "15px", color: "#1e293b" }}>
              الملفات المختارة ({selectedFiles.length}):
            </h3>
            {Array.from(selectedFiles).map((file, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  marginBottom: "5px",
                }}
              >
                <span>
                  {getFileIcon(file.type)} {file.name}
                </span>
                <span style={{ color: "#64748b", fontSize: "0.9rem" }}>
                  {formatFileSize(file.size)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!selectedFiles || selectedFiles.length === 0 || uploading}
          style={{
            width: "100%",
            padding: "15px",
            backgroundColor: uploading ? "#94a3b8" : "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: uploading ? "not-allowed" : "pointer",
            marginBottom: "20px",
          }}
        >
          {uploading ? "⏳ جاري الرفع..." : "📤 رفع الملفات"}
        </button>

        {/* Error */}
        {error && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              border: "1px solid #fca5a5",
              color: "#dc2626",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            ❌ {error}
          </div>
        )}

        {/* Results */}
        {results && (
          <div
            style={{
              backgroundColor: "#d1fae5",
              border: "1px solid #bbf7d0",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ color: "#166534", marginBottom: "15px" }}>
              ✅ {results.message}
            </h3>

            <p style={{ color: "#15803d", marginBottom: "15px" }}>
              تم رفع {results.count} ملف بنجاح على{" "}
              {results.storage_type === "cloudinary"
                ? "Cloudinary"
                : "التخزين المحلي"}
            </p>

            {results.warnings && results.warnings.length > 0 && (
              <div
                style={{
                  backgroundColor: "#fef3c7",
                  border: "1px solid #f59e0b",
                  color: "#92400e",
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "15px",
                }}
              >
                <strong>تحذيرات:</strong>
                <ul style={{ marginTop: "5px", paddingRight: "20px" }}>
                  {results.warnings.map((warning: string, index: number) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <strong style={{ color: "#166534" }}>الملفات المرفوعة:</strong>
              <div style={{ marginTop: "10px" }}>
                {results.files.map((file: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "white",
                      padding: "15px",
                      borderRadius: "5px",
                      marginBottom: "10px",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <strong>
                        {file.type === "VIDEO" ? "🎬" : "🖼️"}{" "}
                        {file.originalName}
                      </strong>
                      <span style={{ fontSize: "0.9rem", color: "#16a34a" }}>
                        {formatFileSize(file.size)}
                      </span>
                    </div>

                    {/* Preview */}
                    {file.type === "IMAGE" ? (
                      <img
                        src={file.src}
                        alt={file.originalName}
                        style={{
                          maxWidth: "200px",
                          maxHeight: "150px",
                          borderRadius: "5px",
                          marginBottom: "10px",
                        }}
                      />
                    ) : (
                      <video
                        src={file.src}
                        controls
                        style={{
                          maxWidth: "300px",
                          maxHeight: "200px",
                          borderRadius: "5px",
                          marginBottom: "10px",
                        }}
                      />
                    )}

                    <div style={{ fontSize: "0.8rem", color: "#166534" }}>
                      <div>
                        الرابط:{" "}
                        <a
                          href={file.src}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {file.src}
                        </a>
                      </div>
                      {file.cloudinary_public_id && (
                        <div>Cloudinary ID: {file.cloudinary_public_id}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div
          style={{
            backgroundColor: "#f0f9ff",
            border: "1px solid #7dd3fc",
            padding: "20px",
            borderRadius: "8px",
            color: "#0c4a6e",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>📋 تعليمات:</h3>
          <ul style={{ paddingRight: "20px" }}>
            <li>يمكن رفع صور بصيغة: JPG, PNG, WebP, GIF</li>
            <li>يمكن رفع فيديو بصيغة: MP4, MOV, AVI, WebM</li>
            <li>الحد الأقصى للصور: 20MB</li>
            <li>الحد الأقصى للفيديو: 100MB</li>
            <li>يمكن رفع عدة ملفات في نفس الوقت</li>
          </ul>
        </div>

        {/* Back to Dashboard */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            onClick={() => (window.location.href = "/dashboard")}
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ← العودة للوحة التحكم
          </button>
        </div>
      </div>
    </div>
  );
}
