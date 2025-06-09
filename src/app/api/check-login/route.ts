import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// استخدام Prisma instance واحد لتحسين الأداء
const prisma = new PrismaClient({
  log: ["error"], // تقليل logging
});

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const { username, password } = await request.json();

    // التحقق السريع من البيانات
    if (!username?.trim() || !password) {
      return NextResponse.json({
        success: false,
        message: "يرجى إدخال اسم المستخدم وكلمة المرور",
      });
    }

    const trimmedUsername = username.trim().toLowerCase();
    console.log("🔐 تسجيل دخول سريع:", trimmedUsername);

    // استعلام محسن مع timeout
    const adminPromise = prisma.admin.findUnique({
      where: { username: trimmedUsername },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      },
    });

    // إضافة timeout للاستعلام
    const admin = (await Promise.race([
      adminPromise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Database timeout")), 5000),
      ),
    ])) as any;

    if (!admin) {
      console.log("❌ مستخدم غير موجود");
      return NextResponse.json({
        success: false,
        message: "اسم المستخدم أو كلمة المرور غير صحيحة",
      });
    }

    // تحسين مقارنة كلمة المرور
    const passwordPromise = bcrypt.compare(password, admin.password);
    const isValid = (await Promise.race([
      passwordPromise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Password check timeout")), 3000),
      ),
    ])) as boolean;

    if (!isValid) {
      console.log("❌ كلمة مرور خاطئة");
      return NextResponse.json({
        success: false,
        message: "اسم المستخدم أو كلمة المرور غير صحيحة",
      });
    }

    // تحديث آخر دخول بدون انتظار (fire and forget)
    prisma.admin
      .update({
        where: { id: admin.id },
        data: { lastLogin: new Date() },
      })
      .catch((err) => console.log("تحديث آخر دخول فشل:", err));

    const responseTime = Date.now() - startTime;
    console.log(`✅ نجح في ${responseTime}ms`);

    return NextResponse.json({
      success: true,
      message: "تم التحقق بنجاح",
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
      responseTime,
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error(`❌ خطأ بعد ${responseTime}ms:`, error.message);

    if (error.message.includes("timeout")) {
      return NextResponse.json(
        {
          success: false,
          message: "المهلة الزمنية انتهت، يرجى المحاولة مرة أخرى",
        },
        { status: 408 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "حدث خطأ في الخادم",
      },
      { status: 500 },
    );
  }
}
