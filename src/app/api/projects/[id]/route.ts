import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - جلب مشروع محدد
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        mediaItems: {
          orderBy: { order: "asc" },
        },
        tags: true,
        materials: true,
        comments: {
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: {
            comments: true,
            mediaItems: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "المشروع غير موجود" }, { status: 404 });
    }

    // زيادة عدد المشاهدات
    await prisma.project.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("خطأ في جلب المشروع:", error);
    return NextResponse.json(
      { error: "حدث خطأ في جلب المشروع" },
      { status: 500 },
    );
  }
}

// PUT - تحديث مشروع
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const data = await request.json();

    const {
      title,
      description,
      category,
      location,
      completionDate,
      client,
      featured,
      projectDuration,
      projectCost,
      mediaItems,
      tags,
      materials,
    } = data;

    // حذف العلاقات القديمة
    await prisma.mediaItem.deleteMany({
      where: { projectId: id },
    });

    await prisma.projectTag.deleteMany({
      where: { projectId: id },
    });

    await prisma.projectMaterial.deleteMany({
      where: { projectId: id },
    });

    // تحديث المشروع مع العلاقات الجديدة
    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        category,
        location,
        completionDate: new Date(completionDate),
        client: client || null,
        featured: featured || false,
        projectDuration,
        projectCost,
        mediaItems: {
          create:
            mediaItems?.map((item: any, index: number) => ({
              type: item.type,
              src: item.src,
              thumbnail: item.thumbnail,
              title: item.title,
              description: item.description,
              duration: item.duration,
              order: index,
            })) || [],
        },
        tags: {
          create: tags?.map((tag: string) => ({ name: tag })) || [],
        },
        materials: {
          create:
            materials?.map((material: string) => ({ name: material })) || [],
        },
      },
      include: {
        mediaItems: true,
        tags: true,
        materials: true,
      },
    });

    return NextResponse.json({
      success: true,
      project,
      message: "تم تحديث المشروع بنجاح",
    });
  } catch (error) {
    console.error("خطأ في تحديث المشروع:", error);
    return NextResponse.json(
      { error: "حدث خطأ في تحديث المشروع" },
      { status: 500 },
    );
  }
}

// DELETE - حذف مشروع
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    console.log("🗑️ بدء حذف المشروع:", id);

    // التحقق من وجود المشروع أولاً
    const existingProject = await prisma.project.findUnique({
      where: { id },
      include: {
        mediaItems: true,
        tags: true,
        materials: true,
        comments: true,
      },
    });

    if (!existingProject) {
      return NextResponse.json(
        {
          success: false,
          error: "المشروع غير موجود",
        },
        { status: 404 },
      );
    }

    console.log("📋 المشروع موجود، بدء الحذف...");

    // حذف العلاقات المرتبطة أولاً (cascade delete)
    console.log("🔗 حذف التعليقات...");
    await prisma.comment.deleteMany({
      where: { projectId: id },
    });

    console.log("🏷️ حذف العلامات...");
    await prisma.projectTag.deleteMany({
      where: { projectId: id },
    });

    console.log("🧱 حذف المواد...");
    await prisma.projectMaterial.deleteMany({
      where: { projectId: id },
    });

    console.log("📷 حذف عناصر الوسائط...");
    await prisma.mediaItem.deleteMany({
      where: { projectId: id },
    });

    // حذف المشروع نفسه
    console.log("🗑️ حذف المشروع الرئيسي...");
    await prisma.project.delete({
      where: { id },
    });

    console.log("✅ تم حذف المشروع بنجاح");

    return NextResponse.json({
      success: true,
      message: "تم حذف المشروع وجميع البيانات المرتبطة به بنجاح",
      deletedProject: {
        id: existingProject.id,
        title: existingProject.title,
      },
    });
  } catch (error) {
    console.error("❌ خطأ في حذف المشروع:", error);

    // تحليل نوع الخطأ
    let errorMessage = "حدث خطأ في حذف المشروع";

    if (error instanceof Error) {
      if (error.message.includes("Foreign key constraint")) {
        errorMessage = "لا يمكن حذف المشروع بسبب وجود بيانات مرتبطة";
      } else if (error.message.includes("Record to delete does not exist")) {
        errorMessage = "المشروع غير موجود";
      } else if (error.message.includes("timeout")) {
        errorMessage = "انتهت المهلة الزمنية. جرب مرة أخرى";
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: error instanceof Error ? error.message : "خطأ غير معروف",
      },
      { status: 500 },
    );
  }
}
