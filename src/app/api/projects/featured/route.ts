import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - جلب المشاريع المميزة للصفحة الرئيسية
export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(
      Number.parseInt(searchParams.get("limit") || "8"),
      20,
    ); // حد أقصى 20 مشروع

    console.log("🌟 جلب المشاريع المميزة:", { limit });

    // جلب المشاريع المميزة مع الحد الأدنى من البيانات للأداء الأمثل
    const featuredProjects = await prisma.project.findMany({
      where: {
        featured: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        location: true,
        completionDate: true,
        featured: true,
        views: true,
        likes: true,
        rating: true,
        createdAt: true,
        // جلب أول صورة/فيديو فقط لكل مشروع
        mediaItems: {
          select: {
            id: true,
            type: true,
            src: true,
            thumbnail: true,
            title: true,
            order: true,
          },
          orderBy: { order: "asc" },
          take: 2, // أول 2 ملفات فقط
        },
        // جلب أول 3 تاجات فقط
        tags: {
          select: {
            id: true,
            name: true,
          },
          take: 3,
        },
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: limit,
    });

    // إذا لم تكن هناك مشاريع مميزة كافية، اجلب مشاريع عادية
    let allProjects = featuredProjects;
    if (featuredProjects.length < limit) {
      const remainingCount = limit - featuredProjects.length;
      const featuredIds = featuredProjects.map((p) => p.id);

      const regularProjects = await prisma.project.findMany({
        where: {
          AND: [{ featured: false }, { id: { notIn: featuredIds } }],
        },
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          location: true,
          completionDate: true,
          featured: true,
          views: true,
          likes: true,
          rating: true,
          createdAt: true,
          mediaItems: {
            select: {
              id: true,
              type: true,
              src: true,
              thumbnail: true,
              title: true,
              order: true,
            },
            orderBy: { order: "asc" },
            take: 2,
          },
          tags: {
            select: {
              id: true,
              name: true,
            },
            take: 3,
          },
        },
        orderBy: [{ createdAt: "desc" }],
        take: remainingCount,
      });

      allProjects = [...featuredProjects, ...regularProjects];
    }

    // تجميع المشاريع حسب الفئة للتنوع
    const projectsByCategory = new Map();
    const diverseProjects = [];

    // أولاً، أضف مشروع واحد من كل فئة
    for (const project of allProjects) {
      if (
        !projectsByCategory.has(project.category) &&
        diverseProjects.length < limit
      ) {
        projectsByCategory.set(project.category, true);
        diverseProjects.push(project);
      }
    }

    // ثم أضف المشاريع المتبقية
    for (const project of allProjects) {
      if (diverseProjects.length >= limit) break;
      if (!diverseProjects.find((p) => p.id === project.id)) {
        diverseProjects.push(project);
      }
    }

    const endTime = Date.now();
    console.log(
      `✅ تم جلب ${diverseProjects.length} مشروع مميز في ${endTime - startTime}ms`,
    );

    // تعديل البيانات لتجنب القيم null
    const formattedProjects = diverseProjects.map((project) => ({
      ...project,
      views: project.views || 0,
      likes: project.likes || 0,
      rating: project.rating || 0,
      tags: project.tags || [],
    }));

    return NextResponse.json({
      success: true,
      projects: formattedProjects,
      count: formattedProjects.length,
      performance: {
        queryTime: endTime - startTime,
        cached: false,
      },
    });
  } catch (error) {
    console.error("❌ خطأ في جلب المشاريع المميزة:", error);
    return NextResponse.json(
      {
        error: "حدث خطأ في جلب المشاريع المميزة",
        success: false,
      },
      { status: 500 },
    );
  }
}
