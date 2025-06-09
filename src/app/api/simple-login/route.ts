import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // التحقق من البيانات
    if (!username || !password) {
      return NextResponse.json({
        success: false,
        message: "يرجى إدخال اسم المستخدم وكلمة المرور",
      });
    }

    // البحث عن المستخدم
    const admin = await prisma.admin.findUnique({
      where: { username: username.trim() },
    });

    if (!admin) {
      return NextResponse.json({
        success: false,
        message: "اسم المستخدم أو كلمة المرور غير صحيحة",
      });
    }

    // التحقق من كلمة المرور
    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
      return NextResponse.json({
        success: false,
        message: "اسم المستخدم أو كلمة المرور غير صحيحة",
      });
    }

    // تحديث آخر تسجيل دخول
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() },
    });

    // إنشاء response مع كوكيز بسيط
    const response = NextResponse.json({
      success: true,
      message: "تم تسجيل الدخول بنجاح",
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });

    // كوكيز بسيط جداً
    response.cookies.set("logged-in", "yes", {
      maxAge: 24 * 60 * 60 * 1000, // 24 ساعة
      path: "/",
      httpOnly: false,
    });

    response.cookies.set("admin-id", admin.id, {
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
      httpOnly: true,
    });

    response.cookies.set("admin-username", admin.username, {
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
      httpOnly: false,
    });

    console.log("✅ تم تسجيل الدخول بنجاح:", admin.username);

    return response;
  } catch (error) {
    console.error("❌ خطأ في تسجيل الدخول:", error);
    return NextResponse.json({
      success: false,
      message: "حدث خطأ في الخادم",
    });
  } finally {
    await prisma.$disconnect();
  }
}
