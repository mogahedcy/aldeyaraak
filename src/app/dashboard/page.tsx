"use client";

export default function DashboardPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>🎉 لوحة التحكم</h1>
      <p>تم تسجيل الدخول بنجاح!</p>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => (window.location.href = "/login")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          تسجيل خروج
        </button>
      </div>
    </div>
  );
}
