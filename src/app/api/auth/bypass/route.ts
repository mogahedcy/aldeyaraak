import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // فحص وجود session صالحة أولاً
    const adminToken = request.cookies.get("admin-token")?.value;

    if (!adminToken) {
      return NextResponse.json(
        {
          success: false,
          error: "لا توجد جلسة نشطة",
        },
        { status: 401 },
      );
    }

    // التحقق من صحة التوكن
    const jwt = await import("jsonwebtoken");
    try {
      const decoded = jwt.verify(
        adminToken,
        process.env.JWT_SECRET || "your-secret-key",
      );

      // إنشاء bypass token مؤقت
      const bypassToken = jwt.sign(
        {
          bypass: true,
          admin: (decoded as any).adminId,
          timestamp: Date.now(),
        },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "5m" }, // صالح لـ 5 دقائق فقط
      );

      const response = NextResponse.json({
        success: true,
        message: "تم إنشاء bypass token بنجاح",
        redirectUrl: "/dashboard",
      });

      // إضافة bypass cookie
      response.cookies.set("bypass-token", bypassToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 5 * 60 * 1000, // 5 دقائق
        path: "/",
      });

      return response;
    } catch (jwtError) {
      return NextResponse.json(
        {
          success: false,
          error: "جلسة غير صالحة",
        },
        { status: 401 },
      );
    }
  } catch (error) {
    console.error("Error in bypass auth:", error);
    return NextResponse.json(
      {
        success: false,
        error: "حدث خطأ في النظام",
      },
      { status: 500 },
    );
  }
}
