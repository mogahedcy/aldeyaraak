import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // قراءة session من الكوكيز
    const sessionCookie = request.cookies.get("admin-session")?.value;
    const loggedInCookie = request.cookies.get("admin-logged-in")?.value;

    console.log("🔍 فحص الجلسة:");
    console.log("  - admin-session exists:", !!sessionCookie);
    console.log("  - admin-logged-in:", loggedInCookie);

    if (!sessionCookie) {
      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          message: "لا توجد جلسة نشطة",
        },
        { status: 401 },
      );
    }

    try {
      const sessionData = JSON.parse(sessionCookie);

      // فحص صحة البيانات
      if (!sessionData.adminId || !sessionData.username) {
        throw new Error("بيانات جلسة غير صالحة");
      }

      // فحص انتهاء الجلسة (24 ساعة)
      const loginTime = new Date(sessionData.loginTime);
      const now = new Date();
      const hoursDiff =
        (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);

      if (hoursDiff > 24) {
        return NextResponse.json(
          {
            success: false,
            authenticated: false,
            message: "انتهت صلاحية الجلسة",
          },
          { status: 401 },
        );
      }

      console.log(`✅ جلسة صالحة للمستخدم: ${sessionData.username}`);

      return NextResponse.json({
        success: true,
        authenticated: true,
        admin: {
          id: sessionData.adminId,
          username: sessionData.username,
        },
        session: {
          loginTime: sessionData.loginTime,
          remainingHours: Math.round(24 - hoursDiff),
        },
      });
    } catch (parseError) {
      console.error("❌ خطأ في تحليل الجلسة:", parseError);
      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          message: "جلسة تالفة",
        },
        { status: 401 },
      );
    }
  } catch (error) {
    console.error("❌ خطأ في فحص الجلسة:", error);
    return NextResponse.json(
      {
        success: false,
        authenticated: false,
        message: "خطأ في الخادم",
      },
      { status: 500 },
    );
  }
}
