import { NextRequest, NextResponse } from "next/server";

// بيانات تسجيل الدخول الثابتة للاختبار السريع
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
  id: "1",
  email: "admin@aldeyarksa.tech",
};

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const { username, password } = await request.json();

    // التحقق الفوري
    if (!username || !password) {
      return NextResponse.json({
        success: false,
        message: "يرجى إدخال اسم المستخدم وكلمة المرور",
      });
    }

    // مقارنة بسيطة وسريعة
    const isValid =
      username.trim().toLowerCase() === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password;

    const responseTime = Date.now() - startTime;

    if (isValid) {
      console.log(`✅ تسجيل دخول سريع نجح في ${responseTime}ms`);

      return NextResponse.json({
        success: true,
        message: "تم التحقق بنجاح",
        admin: {
          id: ADMIN_CREDENTIALS.id,
          username: ADMIN_CREDENTIALS.username,
          email: ADMIN_CREDENTIALS.email,
        },
        responseTime,
        method: "fast",
      });
    } else {
      console.log(`❌ بيانات خاطئة في ${responseTime}ms`);

      return NextResponse.json({
        success: false,
        message: "اسم المستخدم أو كلمة المرور غير صحيحة",
        responseTime,
      });
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error(`❌ خطأ بعد ${responseTime}ms:`, error);

    return NextResponse.json(
      {
        success: false,
        message: "حدث خطأ في الخادم",
        responseTime,
      },
      { status: 500 },
    );
  }
}
