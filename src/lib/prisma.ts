import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// تحسين إعدادات Prisma للأداء
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    datasourceUrl: process.env.DATABASE_URL,
    errorFormat: "minimal",
    // تحسينات الاتصال
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// تحسين معالجة الأخطاء والاتصال
export async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log("✅ متصل بقاعدة البيانات");
  } catch (error) {
    console.error("❌ فشل في الاتصال بقاعدة البيانات:", error);
    throw error;
  }
}

export async function disconnectFromDatabase() {
  try {
    await prisma.$disconnect();
    console.log("🔌 تم قطع الاتصال بقاعدة البيانات");
  } catch (error) {
    console.error("❌ خطأ في قطع الاتصال:", error);
  }
}
