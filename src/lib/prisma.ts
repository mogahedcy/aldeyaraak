import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

// تحسين إعدادات Prisma للأداء
const createPrismaClient = () => {
  return new PrismaClient({
    // تحسين مستوى اللوقينغ
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],

    // تحسين إعدادات قاعدة البيانات
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },

    // تحسين إعدادات الاتصال
    __internal: {
      engine: {
        // تحسين pool الاتصالات
        pool_timeout: 20,
        connection_limit: process.env.NODE_ENV === "production" ? 10 : 5,
      },
    },
  });
};

// إنشاء instance واحد في التطوير، instances متعددة في الإنتاج
export const prisma = globalThis.__prisma ?? createPrismaClient();

// في التطوير، حفظ الـ instance في global لتجنب إنشاء اتصالات متعددة
if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}

// تحسين إدارة الاتصالات
process.on("beforeExit", async () => {
  console.log("🔌 إغلاق اتصال قاعدة البيانات...");
  await prisma.$disconnect();
});

// معالجة الأخطاء
process.on("SIGINT", async () => {
  console.log("🛑 تلقي إشارة SIGINT، إغلاق اتصال قاعدة البيانات...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("🛑 تلقي إشارة SIGTERM، إغلاق اتصال قاعدة البيانات...");
  await prisma.$disconnect();
  process.exit(0);
});

// دالة مساعدة للتحقق من حالة قاعدة البيانات
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ اتصال قاعدة البيانات نشط");
    return true;
  } catch (error) {
    console.error("❌ فشل في الاتصال بقاعدة البيانات:", error);
    return false;
  }
}

// دالة مساعدة لتنفيذ العمليات مع إعادة المحاولة
export async function executeWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000,
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      console.warn(`محاولة ${attempt}/${maxRetries} فشلت:`, error);

      if (attempt < maxRetries) {
        // انتظار قبل المحاولة التالية
        await new Promise((resolve) => setTimeout(resolve, delay * attempt));
      }
    }
  }

  throw lastError!;
}

// دالة مساعدة لتنفيذ transactions محسنة
export async function executeTransaction<T>(
  operations: (prisma: PrismaClient) => Promise<T>,
): Promise<T> {
  return executeWithRetry(async () => {
    return prisma.$transaction(operations, {
      maxWait: 10000, // 10 ثوان
      timeout: 30000, // 30 ثانية
      isolationLevel: "ReadCommitted",
    });
  });
}

export default prisma;
