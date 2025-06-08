#!/usr/bin/env node
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function testAndSeedDatabase() {
  try {
    console.log("🔍 اختبار الاتصال بقاعدة البيانات...");

    // Test connection
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ نجح الاتصال بقاعدة البيانات");

    // Check if we have any projects
    const projectCount = await prisma.project.count();
    console.log(`📊 عدد المشاريع الحالي: ${projectCount}`);

    if (projectCount === 0) {
      console.log("🌱 زراعة بيانات تجريبية...");

      // Create sample projects
      const sampleProjects = [
        {
          title: "مظلة خشبية فاخرة",
          description:
            "مظلة خشبية مصممة خصيصاً لحديقة فيلا في جدة بأحدث التقنيات والمواد عالية الجودة",
          category: "مظلات",
          location: "جدة - حي الزهراء",
          client: "عائلة الأحمد",
          featured: true,
          projectDuration: "15 يوم",
          projectCost: "50,000 ريال",
          completionDate: new Date("2024-01-15"),
          views: 150,
          likes: 25,
          rating: 4.8,
          mediaItems: {
            create: [
              {
                type: "IMAGE",
                src: "/images/projects/pergola-1.jpg",
                thumbnail: "/images/projects/pergola-1-thumb.jpg",
                title: "المظلة من الأمام",
                description: "منظر شامل للمظلة الخشبية",
                order: 0,
              },
            ],
          },
          tags: {
            create: [
              { name: "خشب طبيعي" },
              { name: "مقاوم للعوامل الجوية" },
              { name: "تصميم عصري" },
            ],
          },
          materials: {
            create: [
              { name: "خشب السيكوا" },
              { name: "مسامير ستانلس ستيل" },
              { name: "طلاء واقي" },
            ],
          },
        },
        {
          title: "ساتر خشبي مع إضاءة LED",
          description:
            "ساتر خشبي مبتكر مزود بإضاءة LED للحدائق والمساحات الخارجية",
          category: "سواتر",
          location: "جدة - أبحر الشمالية",
          client: "مؤسسة النور التجارية",
          featured: false,
          projectDuration: "10 أيام",
          projectCost: "30,000 ريال",
          completionDate: new Date("2024-02-01"),
          views: 89,
          likes: 12,
          rating: 4.5,
          mediaItems: {
            create: [
              {
                type: "IMAGE",
                src: "/images/projects/fence-1.jpg",
                thumbnail: "/images/projects/fence-1-thumb.jpg",
                title: "الساتر الخشبي مع الإضاءة",
                description: "ساتر خشبي مع إضاءة LED ليلية",
                order: 0,
              },
            ],
          },
          tags: {
            create: [
              { name: "إضاءة LED" },
              { name: "خصوصية" },
              { name: "طاقة موفرة" },
            ],
          },
          materials: {
            create: [
              { name: "خشب الصنوبر" },
              { name: "شرائط LED" },
              { name: "محول كهربائي" },
            ],
          },
        },
        {
          title: "تنسيق حديقة فيلا عصرية",
          description:
            "تنسيق شامل لحديقة فيلا بتصميم عصري يجمع بين الجمال والوظائف العملية",
          category: "تنسيق حدائق",
          location: "جدة - حي الروضة",
          client: "عائلة الغامدي",
          featured: true,
          projectDuration: "25 يوم",
          projectCost: "75,000 ريال",
          completionDate: new Date("2024-01-20"),
          views: 203,
          likes: 38,
          rating: 4.9,
          mediaItems: {
            create: [
              {
                type: "IMAGE",
                src: "/images/projects/garden-1.jpg",
                thumbnail: "/images/projects/garden-1-thumb.jpg",
                title: "تنسيق الحديقة الأمامية",
                description: "منظر شامل للحديقة المنسقة",
                order: 0,
              },
            ],
          },
          tags: {
            create: [
              { name: "نباتات محلية" },
              { name: "ري ذكي" },
              { name: "ص��يق للبيئة" },
            ],
          },
          materials: {
            create: [
              { name: "نباتات الزينة" },
              { name: "نظام ري تلقائي" },
              { name: "أحجار طبيعية" },
            ],
          },
        },
      ];

      // Create projects
      for (const projectData of sampleProjects) {
        const project = await prisma.project.create({
          data: projectData,
          include: {
            mediaItems: true,
            tags: true,
            materials: true,
          },
        });
        console.log(`✅ تم إنشاء المشروع: ${project.title}`);
      }

      console.log("🎉 تم زراعة البيانات التجريبية بنجاح!");
    } else {
      console.log("📦 يوجد مشاريع في قاعدة البيانات بالفعل");
    }

    // Test fetching projects
    console.log("🔍 اختبار جلب المشاريع...");
    const projects = await prisma.project.findMany({
      take: 3,
      include: {
        mediaItems: true,
        tags: true,
        materials: true,
      },
    });

    console.log(`✅ تم جلب ${projects.length} مشروع بنجاح`);
    projects.forEach((project) => {
      console.log(`  - ${project.title} (${project.category})`);
    });
  } catch (error) {
    console.error("❌ خطأ في العملية:", error);

    if (error.code === "P1001") {
      console.error("💡 تأكد من أن قاعدة البيانات تعمل وأن URL صحيح");
    } else if (error.code === "P2002") {
      console.error("💡 يبدو أن البيانات موجودة بالفعل");
    }

    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testAndSeedDatabase();
