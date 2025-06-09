import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log("🔍 فحص حالة قاعدة البيانات...");

    // Test connection
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ نجح الاتصال بقاعدة البيانات");

    // Check if we have projects
    const projectCount = await prisma.project.count();
    console.log(`📊 عدد المشاريع: ${projectCount}`);

    // Get sample project if exists
    const sampleProject = await prisma.project.findFirst({
      include: {
        mediaItems: true,
        tags: true,
        materials: true,
      },
    });

    return NextResponse.json({
      success: true,
      status: "connected",
      projectCount,
      sampleProject: sampleProject
        ? {
            id: sampleProject.id,
            title: sampleProject.title,
            category: sampleProject.category,
            mediaCount: sampleProject.mediaItems.length,
          }
        : null,
      message: "قاعدة البيانات تعمل بشكل طبيعي",
    });
  } catch (error) {
    console.error("❌ خطأ في فحص قاعدة البيانات:", error);

    return NextResponse.json(
      {
        success: false,
        status: "disconnected",
        error: error instanceof Error ? error.message : "خطأ غير معروف",
        message: "فشل الاتصال بقاعدة البيانات",
      },
      { status: 503 },
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST() {
  try {
    console.log("🌱 إنشاء بيانات تجريبية...");

    // Test connection first
    await prisma.$queryRaw`SELECT 1`;

    // Check if we already have projects
    const existingCount = await prisma.project.count();
    if (existingCount > 0) {
      return NextResponse.json({
        success: true,
        message: `يوجد ${existingCount} مشروع بالفعل في قاعدة البيانات`,
        projectCount: existingCount,
      });
    }

    // Create sample project
    const sampleProject = await prisma.project.create({
      data: {
        title: "مظلة خشبية تجريبية",
        description: "مشروع تجريبي لاختبار قاعدة البيانات",
        category: "مظلات",
        location: "جدة - اختبار",
        completionDate: new Date(),
        featured: true,
        projectDuration: "10 أيام",
        projectCost: "25,000 ريال",
        views: 0,
        likes: 0,
        rating: 5.0,
        mediaItems: {
          create: [
            {
              type: "IMAGE",
              src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              thumbnail:
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
              title: "صورة تجريبية",
              description: "صورة لاختبار النظام",
              order: 0,
            },
          ],
        },
        tags: {
          create: [{ name: "اختبار" }, { name: "تجريبي" }],
        },
        materials: {
          create: [{ name: "خشب تجريبي" }],
        },
      },
      include: {
        mediaItems: true,
        tags: true,
        materials: true,
      },
    });

    console.log("✅ تم إنشاء مشروع تجريبي:", sampleProject.title);

    return NextResponse.json({
      success: true,
      message: "تم إنشاء مشروع تجريبي بنجاح",
      project: {
        id: sampleProject.id,
        title: sampleProject.title,
        category: sampleProject.category,
      },
    });
  } catch (error) {
    console.error("❌ خطأ في إنشاء البيانات التجريبية:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "خطأ غير معروف",
        message: "فشل في إنشاء البيانات التجريبية",
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
