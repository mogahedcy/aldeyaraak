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

    console.log("🔐 محاولة تسجيل دخول للمستخدم:", username);

    // البحث عن المستخدم
    const admin = await prisma.admin.findUnique({
      where: { username: username.trim() },
    });

    if (!admin) {
      console.log("❌ المستخدم غير موجود:", username);
      return NextResponse.json({
        success: false,
        message: "اسم المستخدم أو كلمة المرور غير صحيحة",
      });
    }

    // التحقق من كلمة المرور
    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
      console.log("❌ كلمة مرور خاطئة للمستخدم:", username);
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

    console.log("✅ تم تسجيل الدخول بنجاح للمستخدم:", username);

    // إرجاع نجح التحقق بدون حفظ أي cookies
    return NextResponse.json({
      success: true,
      message: "تم التحقق من البيانات بنجاح",
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });
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
