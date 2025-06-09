import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log("🔐 محاولة تسجيل دخول:", {
      username,
      hasPassword: !!password,
      bodyKeys: Object.keys(body),
    });

    // التحقق من وجود البيانات
    if (!username || !password) {
      console.log("❌ بيانات ناقصة:", {
        username: !!username,
        password: !!password,
      });
      return NextResponse.json(
        {
          success: false,
          message: "اسم المستخدم وكلمة المرور مطلوبان",
          received: { username: !!username, password: !!password },
        },
        { status: 400 },
      );
    }

    // البحث عن المستخدم
    console.log("🔍 البحث عن المستخدم في قاعدة البيانات...");
    const admin = await prisma.admin.findUnique({
      where: { username: username.trim() },
    });

    console.log("📋 نتيجة البحث:", {
      found: !!admin,
      username: admin?.username,
    });

    if (!admin) {
      console.log("❌ المستخدم غير موجود:", username);
      return NextResponse.json(
        {
          success: false,
          message: "اسم المستخدم أو كلمة المرور غير صحيحة",
          debug: "user_not_found",
        },
        { status: 401 },
      );
    }

    // التحقق من كلمة المرور
    console.log("🔑 التحقق من كلمة المرور...");
    let isPasswordValid = false;
    try {
      isPasswordValid = await bcrypt.compare(password, admin.password);
      console.log("🔐 نتيجة التحقق من كلمة المرور:", isPasswordValid);
    } catch (bcryptError) {
      console.error("❌ خطأ في bcrypt:", bcryptError);
      return NextResponse.json(
        {
          success: false,
          message: "خطأ في التحقق من كلمة المرور",
          debug: "bcrypt_error",
        },
        { status: 500 },
      );
    }

    if (!isPasswordValid) {
      console.log("❌ كلمة مرور خاطئة للمستخدم:", username);
      return NextResponse.json(
        {
          success: false,
          message: "اسم المستخدم أو كلمة المرور غير صحيحة",
          debug: "invalid_password",
        },
        { status: 401 },
      );
    }

    // تحديث آخر تسجيل دخول
    console.log("📝 تحديث آخر تسجيل دخول...");
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() },
    });

    // إنشاء session بسيط
    const sessionData = {
      adminId: admin.id,
      username: admin.username,
      loginTime: new Date().toISOString(),
    };

    console.log("📦 إنشاء session data:", sessionData);

    const response = NextResponse.json({
      success: true,
      message: "تم تسجيل الدخول بنجاح",
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
      sessionData, // إضافة session data للاختبار
    });

    // تعيين كوكيز بسيط جداً
    const sessionString = JSON.stringify(sessionData);
    console.log("🍪 تعيين الكوكيز:", { sessionLength: sessionString.length });

    response.cookies.set("admin-session", sessionString, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 ساعة
      path: "/",
    });

    // كوكيز إضافي للقراءة من العميل
    response.cookies.set("admin-logged-in", "true", {
      httpOnly: false, // يمكن قراءته من JavaScript
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    console.log("✅ تم تسجيل الدخول بنجاح للمستخدم:", username);
    console.log("🍪 تم تعيين الكوكيز بنجاح");

    return response;
  } catch (error) {
    console.error("❌ خطأ في تسجيل الدخول:", error);
    return NextResponse.json(
      {
        success: false,
        message: "حدث خطأ في الخادم، يرجى المحاولة مرة أخرى",
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
