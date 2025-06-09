import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // فحص جميع الكوكيز
    const allCookies = request.cookies.getAll();
    const adminSession = request.cookies.get("admin-session")?.value;
    const adminLoggedIn = request.cookies.get("admin-logged-in")?.value;

    // محاولة تحليل session
    let sessionData = null;
    let sessionError = null;

    if (adminSession) {
      try {
        sessionData = JSON.parse(adminSession);

        // فحص انتهاء الجلسة
        if (sessionData.loginTime) {
          const loginTime = new Date(sessionData.loginTime);
          const now = new Date();
          const hoursDiff =
            (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
          sessionData.hoursSinceLogin = hoursDiff;
          sessionData.isExpired = hoursDiff > 24;
        }
      } catch (error) {
        sessionError = error.message;
      }
    }

    return NextResponse.json({
      success: true,
      middleware_check: {
        allCookies: allCookies.map((c) => ({
          name: c.name,
          hasValue: !!c.value,
        })),
        adminSession: {
          exists: !!adminSession,
          length: adminSession?.length || 0,
          data: sessionData,
          error: sessionError,
        },
        adminLoggedIn: {
          value: adminLoggedIn,
          isTrue: adminLoggedIn === "true",
        },
        wouldAllow: !!(
          adminSession &&
          adminLoggedIn === "true" &&
          sessionData &&
          !sessionData.isExpired
        ),
      },
      message: "فحص middleware مكتمل",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: "خطأ في فحص middleware",
      },
      { status: 500 },
    );
  }
}
