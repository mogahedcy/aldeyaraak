import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "تم حذف جميع الكوكيز بنجاح",
    });

    // حذف جميع الكوكيز المتعلقة بالمصادقة
    const cookiesToClear = [
      "admin-token",
      "auth-token",
      "auth-status",
      "bypass-token",
      "session-id",
      "user-session",
      "__Secure-next-auth.session-token",
      "next-auth.session-token",
    ];

    cookiesToClear.forEach((cookieName) => {
      // حذف الكوكيز مع جميع الإعدادات الممكنة
      response.cookies.set(cookieName, "", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 0,
        expires: new Date(0),
        path: "/",
      });

      response.cookies.set(cookieName, "", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 0,
        expires: new Date(0),
        path: "/",
      });

      response.cookies.set(cookieName, "", {
        httpOnly: false,
        secure: true,
        sameSite: "lax",
        maxAge: 0,
        expires: new Date(0),
        path: "/",
      });

      response.cookies.set(cookieName, "", {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
        maxAge: 0,
        expires: new Date(0),
        path: "/",
      });
    });

    console.log("✅ تم حذف جميع كوكيز المصادقة");

    return response;
  } catch (error) {
    console.error("❌ خطأ في حذف الكوكيز:", error);
    return NextResponse.json(
      {
        success: false,
        error: "حدث خطأ في حذف الكوكيز",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  // نفس المنطق لل�� GET request
  return POST();
}
