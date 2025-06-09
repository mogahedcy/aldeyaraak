import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log("🔍 فحص وجود المدير...");

    // فحص جميع المدراء
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        lastLogin: true,
      },
    });

    console.log("📊 عدد المدراء الموجودين:", admins.length);

    // فحص المدير المحدد
    const adminUser = await prisma.admin.findUnique({
      where: { username: "admin" },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        createdAt: true,
        lastLogin: true,
      },
    });

    let passwordTest = null;
    if (adminUser) {
      // اختبار كلمة المرور
      try {
        const isValid = await bcrypt.compare("admin123", adminUser.password);
        passwordTest = {
          passwordValid: isValid,
          passwordHash: adminUser.password.substring(0, 20) + "...",
        };
      } catch (error) {
        passwordTest = {
          passwordValid: false,
          error: error.message,
        };
      }
    }

    return NextResponse.json({
      success: true,
      totalAdmins: admins.length,
      allAdmins: admins,
      targetAdmin: adminUser
        ? {
            id: adminUser.id,
            username: adminUser.username,
            email: adminUser.email,
            createdAt: adminUser.createdAt,
            lastLogin: adminUser.lastLogin,
          }
        : null,
      passwordTest,
      message: adminUser ? "المدير موجود" : "المدير غير موجود",
    });
  } catch (error) {
    console.error("❌ خطأ في فحص المدير:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: "خطأ في فحص قاعدة البيانات",
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}

// إنشاء مدير جديد للاختبار
export async function POST() {
  try {
    console.log("🔧 إنشاء مدير جديد...");

    // حذف المدير القديم إذا كان موجوداً
    await prisma.admin.deleteMany({
      where: { username: "admin" },
    });

    // إنشاء مدير جديد
    const hashedPassword = await bcrypt.hash("admin123", 12);

    const newAdmin = await prisma.admin.create({
      data: {
        username: "admin",
        password: hashedPassword,
        email: "admin@aldeyarksa.tech",
      },
    });

    console.log("✅ تم إنشاء مدير جديد:", newAdmin.username);

    return NextResponse.json({
      success: true,
      admin: {
        id: newAdmin.id,
        username: newAdmin.username,
        email: newAdmin.email,
        createdAt: newAdmin.createdAt,
      },
      message: "تم إنشاء مدير جديد بنجاح",
    });
  } catch (error) {
    console.error("❌ خطأ في إنشاء المدير:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: "خطأ في إنشاء المدير",
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
