import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
});

// Add connection timeout
const timeoutPromise = (ms: number) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Database operation timeout")), ms);
  });
};

// Fallback sample data
const fallbackProjects = [
  {
    id: "sample-1",
    title: "مظلة خشبية فاخرة",
    description:
      "مظلة خشبية مصممة خصيصاً لحديقة فيلا في جدة بأحدث التقنيات والمواد عالية الجودة",
    category: "مظلات",
    location: "جدة - حي الزهراء",
    completionDate: "2024-01-15T00:00:00.000Z",
    client: "عائلة الأحمد",
    featured: true,
    views: 150,
    likes: 25,
    rating: 4.8,
    projectDuration: "15 يوم",
    projectCost: "50,000 ريال",
    mediaItems: [
      {
        id: "media-1",
        type: "IMAGE",
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80",
        thumbnail:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        title: "المظلة من الأمام",
        description: "منظر شامل للمظلة الخشبية",
        order: 0,
      },
    ],
    tags: [
      { name: "خشب طبيعي" },
      { name: "مقاوم للعوامل الجوية" },
      { name: "تصميم عصري" },
    ],
    materials: [
      { name: "خشب السيكوا" },
      { name: "مسامير ستانلس ستيل" },
      { name: "طلاء واقي" },
    ],
    createdAt: "2024-01-15T00:00:00.000Z",
    updatedAt: "2024-01-15T00:00:00.000Z",
  },
  {
    id: "sample-2",
    title: "ساتر خشبي مع إضاءة LED",
    description: "ساتر خشبي مبتكر مزود بإضاءة LED للحدائق والمساحات الخارجية",
    category: "سواتر",
    location: "جدة - أبحر الشمالية",
    completionDate: "2024-02-01T00:00:00.000Z",
    client: "مؤسسة النور التجارية",
    featured: false,
    views: 89,
    likes: 12,
    rating: 4.5,
    projectDuration: "10 أيام",
    projectCost: "30,000 ريال",
    mediaItems: [
      {
        id: "media-2",
        type: "IMAGE",
        src: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        thumbnail:
          "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        title: "الساتر الخشبي مع الإضاءة",
        description: "ساتر خشبي مع إضاءة LED ليلية",
        order: 0,
      },
    ],
    tags: [{ name: "إضاءة LED" }, { name: "خصوصية" }, { name: "طاقة موفرة" }],
    materials: [
      { name: "خشب الصنوبر" },
      { name: "شرائط LED" },
      { name: "محول كهربائي" },
    ],
    createdAt: "2024-02-01T00:00:00.000Z",
    updatedAt: "2024-02-01T00:00:00.000Z",
  },
  {
    id: "sample-3",
    title: "تنسيق حديقة فيلا عصرية",
    description:
      "تنسيق شامل لحديقة فيلا بتصميم عصري يجمع بين الجمال والوظائف العملية",
    category: "تنسيق حدائق",
    location: "جدة - حي الروضة",
    completionDate: "2024-01-20T00:00:00.000Z",
    client: "عائلة الغامدي",
    featured: true,
    views: 203,
    likes: 38,
    rating: 4.9,
    projectDuration: "25 يوم",
    projectCost: "75,000 ريال",
    mediaItems: [
      {
        id: "media-3",
        type: "IMAGE",
        src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        thumbnail:
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        title: "تنسيق الحديقة الأمامية",
        description: "منظر شامل للحديقة المنسقة",
        order: 0,
      },
    ],
    tags: [
      { name: "نباتات محلية" },
      { name: "ري ذكي" },
      { name: "صديق للبيئة" },
    ],
    materials: [
      { name: "نباتات الزينة" },
      { name: "نظام ري تلقائي" },
      { name: "أحجار طبيعية" },
    ],
    createdAt: "2024-01-20T00:00:00.000Z",
    updatedAt: "2024-01-20T00:00:00.000Z",
  },
];

// GET - جلب جميع المشاريع
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");
    const sort = searchParams.get("sort"); // newest, oldest, featured, popular

    const skip = page
      ? (Number.parseInt(page) - 1) * (limit ? Number.parseInt(limit) : 12)
      : 0;
    const take = limit ? Number.parseInt(limit) : 12;

    const where: any = {};

    if (category && category !== "all") {
      where.category = category;
    }

    if (featured === "true") {
      where.featured = true;
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

    // Test database connection first
    try {
      await Promise.race([prisma.$queryRaw`SELECT 1`, timeoutPromise(5000)]);
    } catch (dbError) {
      console.error("❌ خطأ في الاتصال بقاعدة البيانات:", dbError);
      return NextResponse.json(
        {
          error: "فشل الاتصال بقاعدة البيانات",
          success: false,
          projects: [],
          total: 0,
        },
        { status: 503 },
      );
    }

    // Fetch projects with timeout protection
    const projects = await Promise.race([
      prisma.project.findMany({
        where,
        include: {
          mediaItems: {
            orderBy: { order: "asc" },
          },
          tags: true,
          materials: true,
          _count: {
            select: {
              comments: true,
            },
          },
        },
        orderBy,
        skip,
        take,
      }),
      timeoutPromise(10000), // 10 second timeout
    ]);

    // تحويل البيانات لتتوافق مع التنسيق المطلوب
    const formattedProjects = projects.map((project) => ({
      ...project,
      views: project.views || 0,
      likes: project.likes || 0,
      rating: project.rating || 0,
    }));

    console.log("📊 المشاريع المجلبة:", {
      count: projects.length,
      projects: projects.map((p) => ({
        id: p.id,
        title: p.title,
        mediaCount: p.mediaItems.length,
        mediaTypes: p.mediaItems.map((m) => m.type),
      })),
    });

    const totalCount = await Promise.race([
      prisma.project.count({ where }),
      timeoutPromise(5000),
    ]);

    return NextResponse.json({
      success: true,
      projects: formattedProjects,
      total: totalCount,
      pagination: {
        total: totalCount,
        page: page ? Number.parseInt(page) : 1,
        limit: take,
        totalPages: Math.ceil(totalCount / take),
      },
    });
  } catch (error) {
    console.error("❌ خطأ في جلب المشاريع:", error);

    // Check if it's a timeout error
    if (error instanceof Error && error.message.includes("timeout")) {
      return NextResponse.json(
        {
          error: "انتهت المهلة الزمنية للاتصال بقاعدة البيانات",
          success: false,
          projects: [],
          total: 0,
        },
        { status: 504 },
      );
    }

    // Database connection error
    if (
      error instanceof Error &&
      (error.message.includes("connection") ||
        error.message.includes("connect") ||
        error.message.includes("ECONNREFUSED"))
    ) {
      return NextResponse.json(
        {
          error: "فشل الاتصال بقاعدة البيانات",
          success: false,
          projects: [],
          total: 0,
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        error: "حدث خطأ في جلب المشاريع",
        success: false,
        projects: [],
        total: 0,
      },
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
