import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    console.log("🔐 محاولة تسجيل دخول للمستخدم:", username);

    // التحقق من وجود البيانات
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "اسم المستخدم وكلمة المرور مطلوبان",
        },
        { status: 400 },
      );
    }

    // البحث عن المستخدم
    const admin = await prisma.admin.findUnique({
      where: { username: username.trim() },
    });

    if (!admin) {
      console.log("❌ المستخدم غير موجود:", username);
      return NextResponse.json(
        {
          success: false,
          message: "اسم المستخدم أو كلمة المرور غير صحيحة",
        },
        { status: 401 },
      );
    }

    // التحقق من كلمة المرور
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      console.log("❌ كلمة مرور خاطئة للمستخدم:", username);
      return NextResponse.json(
        {
          success: false,
          message: "اسم المستخدم أو كلمة المرور غير صحيحة",
        },
        { status: 401 },
      );
    }

    // تحديث آخر تسجيل دخول
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

    const response = NextResponse.json({
      success: true,
      message: "تم تسجيل الدخول بنجاح",
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });

    // تعيين كوكيز بسيط جداً
    response.cookies.set("admin-session", JSON.stringify(sessionData), {
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
