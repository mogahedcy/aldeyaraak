import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "تم تسجيل الخروج بنجاح",
    });

    // حذف جميع كوكيز التوثيق
    const cookiesToClear = ["admin-token", "auth-status", "bypass-token"];

    cookiesToClear.forEach((cookieName) => {
      response.cookies.set(cookieName, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0,
        expires: new Date(0),
        path: "/",
      });

      response.cookies.set(cookieName, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        expires: new Date(0),
        path: "/",
      });
    });

    console.log("✅ تم حذف جميع كوكيز المصادقة عند تسجيل الخروج");

    return response;
  } catch (error) {
    console.error("خطأ في تسجيل الخروج:", error);
    return NextResponse.json(
      { error: "حدث خطأ في تسجيل الخروج" },
      { status: 500 },
    );
  }
}
