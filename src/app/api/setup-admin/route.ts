import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findFirst();

    if (existingAdmin) {
      return NextResponse.json({
        success: false,
        message: "يوجد مدير بالفعل في النظام",
      });
    }

    // Create default admin
    const hashedPassword = await bcrypt.hash("admin123", 12);

    const admin = await prisma.admin.create({
      data: {
        username: "admin",
        password: hashedPassword,
        email: "admin@aldeyarksa.tech",
      },
    });

    return NextResponse.json({
      success: true,
      message: "تم إنشاء حساب الإدارة بنجاح",
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("خطأ في إنشاء حساب الإدارة:", error);
    return NextResponse.json(
      {
        success: false,
        error: "حدث خطأ في إنشاء حساب الإدارة",
        details: error instanceof Error ? error.message : "خطأ غير معروف",
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
