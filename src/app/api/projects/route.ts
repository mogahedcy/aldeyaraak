import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - جلب جميع المشاريع
export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");
    const sort = searchParams.get("sort"); // newest, oldest, featured, popular

    const skip = page
      ? (Number.parseInt(page) - 1) * (limit ? Number.parseInt(limit) : 12)
      : 0;
    const take = Math.min(limit ? Number.parseInt(limit) : 12, 100); // تحديد الحد الأقصى

    const where: any = {};

    if (category && category !== "all") {
      where.category = category;
    }

    if (featured === "true") {
      where.featured = true;
    }

    if (search && search.trim()) {
      where.OR = [
        { title: { contains: search.trim(), mode: "insensitive" } },
        { description: { contains: search.trim(), mode: "insensitive" } },
        { location: { contains: search.trim(), mode: "insensitive" } },
      ];
    }

    // تحديد ترتيب المشاريع
    let orderBy: any[] = [];
    switch (sort) {
      case "newest":
        orderBy = [{ createdAt: "desc" }];
        break;
      case "oldest":
        orderBy = [{ createdAt: "asc" }];
        break;
      case "featured":
        orderBy = [{ featured: "desc" }, { createdAt: "desc" }];
        break;
      case "popular":
        orderBy = [{ views: "desc" }, { likes: "desc" }, { createdAt: "desc" }];
        break;
      default:
        orderBy = [{ featured: "desc" }, { createdAt: "desc" }];
    }

    console.log("🔍 جلب المشاريع مع المعايير:", {
      where,
      skip,
      take,
      sort,
      orderBy,
    });

    // استخدام parallel queries لتحسين الأداء
    const [projects, totalCount] = await Promise.all([
      prisma.project.findMany({
        where,
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          location: true,
          completionDate: true,
          client: true,
          featured: true,
          projectDuration: true,
          projectCost: true,
          views: true,
          likes: true,
          rating: true,
          createdAt: true,
          updatedAt: true,
          mediaItems: {
            select: {
              id: true,
              type: true,
              src: true,
              thumbnail: true,
              title: true,
              description: true,
              duration: true,
              order: true,
            },
            orderBy: { order: "asc" },
            take: 10, // تحديد عدد الملفات المرجعة لتحسين الأداء
          },
          tags: {
            select: {
              id: true,
              name: true,
            },
          },
          materials: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: {
              comments: true,
              likes: true,
            },
          },
        },
        orderBy,
        skip,
        take,
      }),
      // تنفيذ count فقط عند الحاجة (pagination)
      page ? prisma.project.count({ where }) : Promise.resolve(0),
    ]);

    // تحويل البيانات لتتوافق مع التنسيق المطلوب
    const formattedProjects = projects.map((project) => ({
      ...project,
      views: project.views || 0,
      likes: project.likes || 0,
      rating: project.rating || 0,
    }));

    const endTime = Date.now();
    console.log(`📊 المشاريع المجلبة في ${endTime - startTime}ms:`, {
      count: projects.length,
      totalCount,
      projects: projects.slice(0, 3).map((p) => ({
        id: p.id,
        title: p.title,
        mediaCount: p.mediaItems.length,
        mediaTypes: p.mediaItems.map((m) => m.type),
      })),
    });

    const response = {
      success: true,
      projects: formattedProjects,
      total: totalCount || projects.length,
      performance: {
        queryTime: endTime - startTime,
        projectsReturned: projects.length,
      },
    };

    // إضافة pagination فقط عند الحاجة
    if (page) {
      response.pagination = {
        total: totalCount,
        page: Number.parseInt(page),
        limit: take,
        totalPages: Math.ceil(totalCount / take),
      };
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("❌ خطأ في جلب المشاريع:", error);
    return NextResponse.json(
      { error: "حدث خطأ في جلب المشاريع", details: error.message },
      { status: 500 },
    );
  }
}

// POST - إضافة مشروع جديد
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("🔍 البيانات المستلمة:", JSON.stringify(data, null, 2));

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

    console.log("🎥 عناصر الوسائط المستلمة:", mediaItems);

    // التحقق من صحة البيانات
    if (!title || !description || !category || !location) {
      return NextResponse.json(
        { error: "البيانات الأساسية مطلوبة" },
        { status: 400 },
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        category,
        location,
        completionDate: new Date(completionDate),
        client: client || null,
        featured: featured || false,
        projectDuration: projectDuration || "",
        projectCost: projectCost || "",
        mediaItems: {
          create:
            mediaItems?.map((item: any, index: number) => {
              console.log(`📁 معالجة ملف ${index + 1}:`, item);

              // التحقق من وجود src المطلوب
              if (!item.src) {
                throw new Error(`الملف ${index + 1} لا يحتوي على رابط صحيح`);
              }

              return {
                type: item.type,
                src: item.src,
                thumbnail: item.thumbnail || item.src,
                title: item.title || `ملف ${index + 1}`,
                description: item.description || "",
                duration: item.duration || null,
                order: index,
              };
            }) || [],
        },
        tags: {
          create:
            tags?.map((tag: any) => ({
              name: typeof tag === "string" ? tag : tag.name,
            })) || [],
        },
        materials: {
          create:
            materials?.map((material: any) => ({
              name: typeof material === "string" ? material : material.name,
            })) || [],
        },
      },
      include: {
        mediaItems: true,
        tags: true,
        materials: true,
      },
    });

    console.log("✅ تم إنشاء المشروع بنجاح:", {
      id: project.id,
      title: project.title,
      mediaCount: project.mediaItems.length,
      mediaItems: project.mediaItems,
    });

    // إشعار جوجل بالمحتوى الجديد
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/sitemap/refresh`,
        {
          method: "POST",
        },
      );
    } catch (error) {
      console.warn("تعذر إشعار جوجل بالمحتوى الجديد:", error);
    }

    return NextResponse.json({
      success: true,
      project,
      message: "تم إضافة المشروع بنجاح",
    });
  } catch (error) {
    console.error("❌ خطأ في إضافة المشروع:", error);
    return NextResponse.json(
      { error: "حدث خطأ في إضافة المشروع" },
      { status: 500 },
    );
  }
}
