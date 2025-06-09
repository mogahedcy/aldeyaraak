import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("🚪 تسجيل خروج...");

    const response = NextResponse.json({
      success: true,
      message: "تم تسجيل الخروج بنجاح",
    });

    // حذف جميع كوكيز المصادقة
    const cookiesToClear = [
      "admin-session",
      "admin-logged-in",
      "admin-token", // الكوكيز القديم
      "auth-status",
      "bypass-token",
    ];

    cookiesToClear.forEach((cookieName) => {
      response.cookies.set(cookieName, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        expires: new Date(0),
        path: "/",
      });

      // نسخة للكوكيز غير HTTP-only
      response.cookies.set(cookieName, "", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        expires: new Date(0),
        path: "/",
      });
    });

    console.log("✅ تم حذف جميع كوكيز المصادقة");

    return response;
  } catch (error) {
    console.error("❌ خطأ في تسجيل الخروج:", error);
    return NextResponse.json(
      {
        success: false,
        message: "حدث خطأ في تسجيل الخروج",
      },
      { status: 500 },
    );
  }
}
